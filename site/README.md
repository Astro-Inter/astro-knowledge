# Site Astro Knowledge

Leitor da documentação do repositório, feito em React, TypeScript e Vite. A interface usa a identidade roxa, o ciano e a fonte Montserrat do projeto `astro-web`, com uma área de leitura clara e tema escuro opcional.

## Executar localmente

Use Node.js 22.12 ou mais recente e npm. Na raiz do repositório:

```powershell
cd site
npm install
npm run dev
```

Abra `http://127.0.0.1:5173`. O servidor escuta apenas no computador local.

## Recursos

- Navegação pelas pastas e documentos, com menu adaptado para celular.
- Busca por título, caminho e conteúdo, ignorando diferenças de acentuação. `Ctrl+K` (ou `⌘+K`) abre a busca; `Esc` limpa a busca ou fecha o menu.
- Leitura de Markdown com tabelas, listas, blocos de código, imagens e links entre notas.
- Índice de seções com links diretos, inclusive para títulos repetidos.
- Alternância entre leitura e Markdown original; download do `.md`, cópia de link e cópia de código.
- Tema claro/escuro salvo no navegador e layout de impressão.

## Adicionar documentos

Crie um arquivo `.md` na raiz ou em uma subpasta do repositório, por exemplo `docs/astro/novo-assunto/nota.md`. Não é necessário cadastrar rotas ou editar listas de documentos.

Com `npm run dev` ativo, criar, editar, mover ou excluir Markdown atualiza a biblioteca automaticamente. A navegação reflete as pastas do projeto. Documentos sem título usam o nome do arquivo; frontmatter YAML inicial não é exibido no modo de leitura.

Arquivos em pastas ocultas (como `.git`, `.agents` e `.codex`), `node_modules`, `dist`, `build`, `coverage`, `test-results` e `playwright-report` são excluídos. Links para documentos excluídos mostram que o arquivo não está na biblioteca.

Use links relativos entre documentos, como `[Validade](../conformidades/nrs-e-validade.md)`. Imagens e anexos locais referenciados também são incluídos no build: PNG, JPEG, GIF, WebP, AVIF, SVG, PDF, TXT e CSV. Caminhos que saem do repositório e links simbólicos não são publicados. HTML embutido em Markdown não é executado nem renderizado.

## Build e publicação

```powershell
npm run build
npm run preview
```

O build gera `site/dist/`, pronto para hospedagem estática, inclusive em uma subpasta. As URLs dos documentos usam `?doc=...` e não precisam de regras especiais de roteamento do servidor. Publique **somente `site/dist/`**.

A versão publicada contém os documentos disponíveis no momento do build. O workflow de GitHub Actions abaixo refaz e publica esse build automaticamente quando as alterações entram na `main`.

### Publicação automática no GitHub Pages

O workflow [Publicar Astro Knowledge](../.github/workflows/deploy-site.yml) valida testes e build em Pull Requests para `main`. Após o merge, ele publica `site/dist/` no GitHub Pages. Qualquer atualização na `main` dispara o workflow, incluindo criação, edição, movimentação e exclusão de documentos ou anexos em qualquer pasta da base.

Para ativar a primeira publicação:

1. No repositório, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** em **Source**, conforme a [documentação do GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
2. Envie os arquivos do site, o `package-lock.json` e o workflow por um PR para `main`, respeitando a aprovação exigida pelo projeto.
3. Após o merge, acompanhe **Actions → Publicar Astro Knowledge**. O job de publicação mostra a URL do site.

A URL padrão será `https://astro-inter.github.io/astro-knowledge/`, salvo configuração de domínio personalizado. O Vite usa caminhos relativos para funcionar nessa subpasta.

Também é possível refazer a publicação em **Actions → Publicar Astro Knowledge → Run workflow**, selecionando `main`. Execuções manuais em outras branches apenas validam o build. PRs não publicam o site, e falhas nos testes ou no build impedem uma nova publicação. O workflow usa o `GITHUB_TOKEN` fornecido pelo Actions, sem exigir token pessoal ou secret adicional; as permissões de publicação ficam restritas ao job `deploy`.

Se o ambiente `github-pages` tiver aprovação manual configurada, a publicação aguardará essa aprovação. Para atualizações automáticas sem essa pausa, o ambiente deve permitir deploys de `main` sem revisores obrigatórios. Os detalhes do mecanismo de publicação estão na [documentação de workflows do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Verificar

```powershell
npm test
npm run test:browser
npm run build
```

Os testes verificam descoberta de documentos, links, busca, extração de títulos, imagens, leitura, navegação, responsividade e atualização automática. No Windows, os testes de navegador usam o Edge instalado. Em outros ambientes, instale o Chromium do Playwright com `npx playwright install chromium`.

## Estrutura

- `src/`: interface e processamento de Markdown.
- `public/images/sath.png`: imagem original do mascote SATH, obtida do [Figma do projeto](https://www.figma.com/design/qdCrRXAVuiNhNkBuim95zz/Astro-2%C2%B0-ano?node-id=2722-19387), usada na página inicial.
- `scripts/knowledge-plugin.mjs`: descoberta dos documentos e inclusão de anexos no desenvolvimento/build.
- `tests/`: verificações automatizadas.
- `vite.config.mjs`: configuração do site; a raiz da base é sempre a pasta acima de `site/`.
- `../.github/workflows/deploy-site.yml`: validação em PRs e publicação automática da `main` no GitHub Pages.
