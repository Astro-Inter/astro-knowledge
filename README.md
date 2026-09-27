# astro-knowledge

Base compartilhada de documentação e anotações da equipe Astro. Os documentos ficam em Markdown e podem ser consultados, complementados e organizados por assunto.

## Documentação do ASTRO

Comece pelo [índice das anotações funcionais](docs/astro/README.md), organizadas a partir do memorial de 23/09/2026. O índice reúne as regras por tema, os fluxos e as pendências, com acesso ao documento original preservado.

## Site de leitura

O site está em [`site/`](site/README.md), com navegação por pastas, busca no conteúdo e leitura de Markdown. Novos documentos são descobertos automaticamente, sem cadastrar páginas.

Para abrir localmente:

```powershell
cd site
npm install
npm run dev
```

Abra `http://127.0.0.1:5173`. Consulte o [guia do site](site/README.md) para build, atualização de documentos e testes.

O [workflow de publicação](.github/workflows/deploy-site.yml) atualiza o site no GitHub Pages quando mudanças entram na `main`, incluindo novas notas e pastas. Para a primeira publicação, selecione **GitHub Actions** em **Settings → Pages → Source** do repositório e siga o [guia de ativação](site/README.md#publicação-automática-no-github-pages).

## Skill astro-knowledge

A [skill astro-knowledge](.agents/skills/astro-knowledge/SKILL.md) acompanha o repositório em `.agents/skills/astro-knowledge/`. Ela adapta o fluxo da skill `cerebro` para esta base compartilhada, sem depender de um cofre Obsidian ou de um caminho fixo no computador.

Após clonar, abra esta pasta como projeto no Codex. O Codex descobre skills em `.agents/skills/` do repositório, conforme a [documentação oficial](https://learn.chatgpt.com/docs/build-skills). Se a skill não aparecer, reinicie o Codex.

Exemplos de pedidos:

```text
Use $astro-knowledge para consultar as anotações sobre revisão de PR e citar os documentos encontrados.

Use $astro-knowledge para documentar nosso fluxo Git em Markdown, aproveitando as notas existentes.

Use $astro-knowledge para organizar as anotações de arquitetura em pastas e subpastas por projeto, atualizando os links e índices.
```

A skill permite consultar documentos, criar e atualizar notas e arquivos de apoio, conectar assuntos e organizar pastas quando solicitado. Uma consulta apenas lê a base; pedidos de documentação e organização permitem as alterações correspondentes.

## Organização da documentação

Reutilize as pastas temáticas existentes. Quando ainda não houver estrutura, crie documentos em `docs/<tema>/`, com subpastas conforme o conteúdo precisar. Use nomes descritivos e links Markdown relativos para que a navegação funcione no GitHub e em outros clones.

Crie índices úteis para os assuntos que precisarem deles. Ao mover ou renomear notas, atualize os links, os índices e os caminhos de anexos afetados.

## Contribuição

As alterações entram na `main` por Pull Request com pelo menos uma aprovação. Novos commits invalidam aprovações anteriores. A proteção também se aplica aos administradores.
