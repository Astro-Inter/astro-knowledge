import { readdir, readFile, realpath, lstat } from 'node:fs/promises';
import { isAbsolute, relative, resolve, sep } from 'node:path';

const virtualId = 'virtual:astro-knowledge';
const resolvedId = '\0' + virtualId;
const ignored = new Set(['node_modules', 'dist', 'build', 'coverage', 'test-results', 'playwright-report']);
const assetExtensions = /\.(png|jpe?g|gif|webp|avif|svg|pdf|txt|csv)$/i;
const slash = (value) => value.split(sep).join('/');

export function includedPath(root, file) {
  const path = relative(root, file);
  return path !== '' && !isAbsolute(path) && !path.startsWith('..' + sep) && path !== '..'
    && !slash(path).split('/').some((part) => part.startsWith('.') || ignored.has(part));
}

export async function collectDocuments(root) {
  root = await realpath(root);
  const documents = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = resolve(directory, entry.name);
      // Symlinks do not expand the repository's publication boundary.
      if (entry.isSymbolicLink() || !includedPath(root, file)) continue;
      if (entry.isDirectory()) await walk(file);
      else if (entry.isFile() && /\.md$/i.test(entry.name)) {
        documents.push({ path: slash(relative(root, file)), content: await readFile(file, 'utf8') });
      }
    }
  }
  await walk(root);
  return documents.sort((a, b) => a.path.localeCompare(b.path, 'pt-BR'));
}

export async function collectAssets(root, documents) {
  root = await realpath(root);
  const assets = new Map();
  for (const document of documents) {
    // Inline Markdown images/attachments and reference-style destinations.
    const targets = [...document.content.matchAll(/\]\((<[^>]+>|[^\s)]+)(?:\s+[^)]*)?\)/g)].map((m) => m[1]);
    targets.push(...[...document.content.matchAll(/^\s*\[[^\]]+\]:\s*(<[^>]+>|\S+)/gm)].map((m) => m[1]));
    for (let target of targets) {
      target = target.replace(/^<|>$/g, '').split(/[?#]/)[0];
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target) || !assetExtensions.test(target)) continue;
      try {
        const file = resolve(root, document.path, '..', decodeURIComponent(target));
        if ((await lstat(file)).isSymbolicLink()) continue;
        const actual = await realpath(file);
        if (!includedPath(root, actual)) continue;
        assets.set(slash(relative(root, file)), { file: actual, content: await readFile(actual) });
      } catch { /* Missing attachments remain visible as missing in the reader. */ }
    }
  }
  return assets;
}

export function knowledgePlugin(root) {
  let command = 'serve';
  const assetFiles = new Map();
  return {
    name: 'vite-plugin-astro-knowledge',
    configResolved(config) { command = config.command; },
    resolveId(id) { if (id === virtualId) return resolvedId; },
    async load(id) {
      if (id !== resolvedId) return;
      const documents = await collectDocuments(root);
      const attachments = await collectAssets(root, documents);
      assetFiles.clear();
      const mappings = [];
      for (const [path, asset] of attachments) {
        if (command === 'build') {
          const ref = this.emitFile({ type: 'asset', name: path.split('/').pop(), source: asset.content });
          mappings.push(`${JSON.stringify(path)}: import.meta.ROLLUP_FILE_URL_${ref}`);
        } else {
          const key = Buffer.from(path).toString('base64url');
          assetFiles.set(key, asset);
          mappings.push(`${JSON.stringify(path)}: ${JSON.stringify('/__knowledge_asset/' + key)}`);
        }
      }
      return `export const documents = ${JSON.stringify(documents)}; export const assets = {${mappings.join(',')}};`;
    },
    configureServer(server) {
      server.watcher.add(root);
      let timer;
      const refresh = (file) => {
        if (!includedPath(root, file) || !(/\.md$/i.test(file) || assetExtensions.test(file))) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          const module = server.moduleGraph.getModuleById(resolvedId);
          if (module) server.moduleGraph.invalidateModule(module);
          server.ws.send({ type: 'full-reload' });
        }, 120);
      };
      server.watcher.on('add', refresh).on('change', refresh).on('unlink', refresh).on('unlinkDir', refresh);
      server.httpServer?.on('close', () => {
        clearTimeout(timer);
        for (const event of ['add', 'change', 'unlink', 'unlinkDir']) server.watcher.off(event, refresh);
      });
      server.middlewares.use('/__knowledge_asset/', async (request, response, next) => {
        const asset = assetFiles.get(request.url?.split('?')[0]?.replace(/^\//, '') ?? '');
        if (!asset) return next();
        try {
          const types = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif', pdf: 'application/pdf', txt: 'text/plain', csv: 'text/csv' };
          response.setHeader('Content-Type', types[asset.file.split('.').pop().toLowerCase()] || 'application/octet-stream');
          response.setHeader('X-Content-Type-Options', 'nosniff');
          response.end(await readFile(asset.file));
        } catch { response.statusCode = 404; response.end('Arquivo não encontrado'); }
      });
    },
  };
}
