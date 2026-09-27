import { test, expect } from '@playwright/test';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

test('library reads Markdown, searches content, follows links and works on mobile', async ({ page }, info) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'O conhecimento do Astro, no mesmo lugar.' })).toBeVisible();
  await page.screenshot({ path: info.outputPath('library-desktop.png'), fullPage: true });
  await page.getByRole('button', { name: 'Começar pela visão geral' }).click();
  await expect(page.locator('article h1')).toHaveText('ASTRO — anotações funcionais');
  await page.locator('article').getByRole('link', { name: 'NRs e validade', exact: true }).click();
  await expect(page.locator('article h1')).toHaveText('NRs, Conformidades e validade');
  await expect(page.locator('article table').first()).toBeVisible();
  await page.locator('.table-of-contents').getByRole('link', { name: 'Registro manual', exact: true }).click();
  await expect(page).toHaveURL(/#registro-manual$/);
  await page.reload();
  await expect(page.locator('#registro-manual')).toBeVisible();
  await page.getByRole('button', { name: 'Markdown', exact: true }).click();
  await expect(page.locator('.source-view code')).toContainText('# NRs, Conformidades e validade');
  await page.getByRole('button', { name: 'Leitura', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Baixar documento Markdown' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('nrs-e-validade.md');
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Ativar tema claro' }).click();
  await page.getByRole('searchbox', { name: 'Buscar na biblioteca' }).fill('cpf');
  await expect(page.locator('.search-result')).not.toHaveCount(0);
  await expect(page.locator('.results-list')).toContainText('cadastro');
  await page.getByRole('searchbox').fill('zzzinexistente');
  await expect(page.getByRole('heading', { name: 'Nenhum documento encontrado' })).toBeVisible();
  await page.getByRole('button', { name: 'Limpar busca' }).click();
  await page.screenshot({ path: info.outputPath('reader-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await expect(page.getByRole('dialog', { name: 'Navegação da biblioteca' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('reader-mobile.png'), fullPage: true });
  await page.goto('/?doc=nao-existe.md');
  await expect(page.getByRole('heading', { name: 'Documento não encontrado' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('adding, changing and deleting a new document updates the running library', async ({ page }) => {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const repository = resolve(root, '..');
  const directory = await mkdtemp(join(repository, 'docs', 'site-verificacao-'));
  const documentPath = relative(repository, join(directory, 'nota-nova.md')).replaceAll('\\', '/');
  try {
    await page.goto('/');
    await writeFile(join(directory, 'imagem.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="purple"/></svg>');
    await writeFile(join(directory, 'nota-nova.md'), '# Descoberta automática verificada\n\nTexto inicial exclusivo.\n\n![Imagem de verificação](imagem.svg)');
    await expect(page.locator('.sidebar').getByRole('link', { name: 'Descoberta automática verificada', exact: true })).toBeVisible({ timeout: 20000 });
    await page.locator('.sidebar').getByRole('link', { name: 'Descoberta automática verificada', exact: true }).click();
    await expect(page.locator('article h1')).toHaveText('Descoberta automática verificada');
    expect(new URL(page.url()).searchParams.get('doc')).toBe(documentPath);
    await expect(page.getByAltText('Imagem de verificação')).toBeVisible();
    expect(await page.getByAltText('Imagem de verificação').evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
    await writeFile(join(directory, 'nota-nova.md'), '# Descoberta automática verificada\n\nConteúdo atualizado exclusivo.');
    await expect(page.locator('article')).toContainText('Conteúdo atualizado exclusivo.', { timeout: 20000 });
    await rm(join(directory, 'nota-nova.md'));
    await expect(page.getByRole('heading', { name: 'Documento não encontrado' })).toBeVisible({ timeout: 20000 });
  } finally {
    // Only the fresh mkdtemp directory under docs is eligible for recursive cleanup.
    if (!relative(repository, directory).replaceAll('\\', '/').startsWith('docs/site-verificacao-')) throw new Error('Destino de limpeza inválido');
    await rm(directory, { recursive: true, force: true });
  }
});
