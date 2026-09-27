import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { collectDocuments, collectAssets, includedPath } from '../scripts/knowledge-plugin.mjs';
import { parseDocument, resolveLocalLink, searchDocuments, documentHref } from '../src/knowledge.mjs';

test('discovery includes new nested Markdown while excluding settings and generated output', async () => {
  const root = await mkdtemp(join(tmpdir(), 'astro-knowledge-'));
  try {
    await writeFile(join(root, 'README.md'), '# Início');
    for (const folder of ['docs/tema/subtema', '.agents/skills', 'site/node_modules/pkg', 'site/dist']) await mkdir(join(root, folder), { recursive: true });
    for (const name of ['.agents/skills/SKILL.md', 'site/node_modules/pkg/README.md', 'site/dist/README.md']) await writeFile(join(root, name), '# Oculto');
    assert.deepEqual((await collectDocuments(root)).map((doc) => doc.path), ['README.md']);
    await writeFile(join(root, 'docs/tema/subtema/nova-nota.MD'), '# A nova nota\n\nConteúdo em português.');
    const discovered = await collectDocuments(root);
    assert.equal(discovered.length, 2);
    assert.ok(discovered.some((doc) => doc.content.includes('Conteúdo em português.')));
    await rm(join(root, 'docs/tema/subtema/nova-nota.MD'));
    assert.equal((await collectDocuments(root)).length, 1);
    assert.equal(includedPath(root, join(root, '..', 'fora.md')), false);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('relative attachments are collected but paths outside the repository are excluded', async () => {
  const root = await mkdtemp(join(tmpdir(), 'astro-assets-'));
  try {
    await mkdir(join(root, 'docs/imagens'), { recursive: true });
    await writeFile(join(root, 'docs/imagens/diagrama.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    await writeFile(join(root, 'anexo.csv'), 'a,b');
    const assets = await collectAssets(root, [{ path: 'docs/nota.md', content: '![Diagrama](imagens/diagrama.svg)\n[Arquivo](../anexo.csv)\n![Remoto](https://example.org/imagem.png)\n[Segredo](../.agents/anexo.csv)' }]);
    assert.deepEqual([...assets.keys()].sort(), ['anexo.csv', 'docs/imagens/diagrama.svg']);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('heading extraction follows Markdown, including repeated titles and excluding code fences', () => {
  const doc = parseDocument({ path: 'docs/nota.md', content: '---\ntags: [teste]\n---\n# Nota\n\n## Seção útil\n\nTexto.\n\n## Seção útil\n\n```md\n# Não é título\n```\n\nTítulo alternativo\n------------------' });
  assert.equal(doc.title, 'Nota');
  assert.deepEqual(doc.headings.map((heading) => heading.id), ['nota', 'seção-útil', 'seção-útil-1', 'título-alternativo']);
  assert.equal(doc.body.includes('tags:'), false);
});

test('search uses document content, accents and all query terms rather than just filenames', () => {
  const docs = [parseDocument({ path: 'docs/nota.md', content: '# Registro\n\nA importação usa CPF. A evidência é opcional.' }), parseDocument({ path: 'README.md', content: '# Evidências\n\nOutro assunto.' })];
  assert.deepEqual(searchDocuments(docs, 'IMPORTACAO cpf').map((doc) => doc.path), ['docs/nota.md']);
  assert.equal(searchDocuments(docs, 'naoexistente').length, 0);
  assert.equal(searchDocuments(docs, '  ').length, 0);
});

test('Markdown links resolve against the source folder, preserving fragments and encoded filenames', () => {
  assert.deepEqual(resolveLocalLink('docs/a/nota.md', '../b/nota%20nova.md#seção'), { path: 'docs/b/nota nova.md', hash: 'seção' });
  assert.deepEqual(resolveLocalLink('docs/nota.md', '#resumo'), { path: 'docs/nota.md', hash: 'resumo' });
  assert.equal(resolveLocalLink('README.md', '../fora.md'), null);
  assert.equal(resolveLocalLink('README.md', 'https://example.org/doc.md'), null);
  assert.equal(resolveLocalLink('README.md', '%invalid.md'), null);
  assert.equal(documentHref('docs/nota nova.md', 'resumo'), '?doc=docs%2Fnota%20nova.md#resumo');
});
