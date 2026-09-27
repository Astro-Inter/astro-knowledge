import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { knowledgePlugin } from './scripts/knowledge-plugin.mjs';

export default defineConfig({
  base: './',
  plugins: [react(), knowledgePlugin(fileURLToPath(new URL('../', import.meta.url)))],
  server: { port: 5173, strictPort: true },
});
