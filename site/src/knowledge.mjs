import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';

export const normalize = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');
export const withoutFrontmatter = (text) => text.replace(/^\uFEFF/, '').replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
const parser = unified().use(remarkParse).use(remarkGfm);

export function parseDocument(document) {
  const body = withoutFrontmatter(document.content);
  const tree = parser.parse(body);
  const slugger = new GithubSlugger();
  const headings = [];
  const blocks = [];
  for (const node of tree.children) {
    if (node.type === 'heading') {
      const text = toString(node);
      headings.push({ depth: node.depth, text, id: slugger.slug(text) });
    }
    if (['paragraph', 'heading', 'code', 'list', 'table', 'blockquote'].includes(node.type)) blocks.push(toString(node));
  }
  const plain = blocks.join('\n');
  const title = headings[0]?.text || document.path.split('/').pop().replace(/\.md$/i, '').replace(/-/g, ' ');
  const intro = tree.children.find((node) => node.type === 'paragraph');
  return {
    ...document, body, title, headings, plain,
    excerpt: intro ? toString(intro) : 'Abra o documento para consultar seu conteúdo.',
    folder: document.path.split('/').slice(0, -1).join('/'),
    minutes: Math.max(1, Math.ceil(plain.split(/\s+/).length / 220)),
    search: normalize(title + ' ' + document.path + ' ' + plain),
    isIndex: /(?:^|\/)readme\.md$/i.test(document.path),
  };
}

export function resolveLocalLink(currentPath, href) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null;
  const [pathAndQuery, ...fragments] = href.split('#');
  let target;
  try { target = decodeURIComponent(pathAndQuery.split('?')[0]); } catch { return null; }
  const parts = target.startsWith('/') ? [] : currentPath.split('/').slice(0, -1);
  if (!target) return { path: currentPath, hash: fragments.join('#') };
  for (const part of target.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') { if (!parts.length) return null; parts.pop(); }
    else parts.push(part);
  }
  return { path: parts.join('/'), hash: fragments.join('#') };
}

export function documentHref(path, hash = '') {
  return `?doc=${encodeURIComponent(path)}${hash ? '#' + hash : ''}`;
}

export function searchDocuments(documents, query) {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return documents.filter((doc) => words.every((word) => doc.search.includes(word)))
    .sort((a, b) => Number(words.every((w) => normalize(b.title).includes(w))) - Number(words.every((w) => normalize(a.title).includes(w))) || a.title.localeCompare(b.title, 'pt-BR'));
}

export function searchExcerpt(doc, query) {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const index = words.length ? normalize(doc.plain).indexOf(words[0]) : -1;
  const start = Math.max(0, index - 65);
  return (start ? '…' : '') + doc.plain.slice(start, start + 240).replace(/\s+/g, ' ') + (doc.plain.length > start + 240 ? '…' : '');
}
