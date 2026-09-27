/// <reference types="vite/client" />

declare module 'virtual:astro-knowledge' {
  export const documents: { path: string; content: string }[];
  export const assets: Record<string, string>;
}
