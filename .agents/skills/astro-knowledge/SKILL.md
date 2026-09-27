---
name: astro-knowledge
description: Pesquisar, sintetizar, documentar e conectar conhecimento no repositório Astro-Inter/astro-knowledge. Use para consultar documentos do clone, criar ou atualizar notas Markdown, arquivos de apoio, índices, pastas e subpastas, ou organizar a documentação desse projeto quando solicitado; não use para outros repositórios ou para o cofre pessoal da skill cerebro.
---

# Astro Knowledge

Use o clone local de `Astro-Inter/astro-knowledge` como base compartilhada de conhecimento da equipe. Adapte os modos de consulta, registro, conexão e organização da skill cerebro a um repositório Git de documentação. Esta skill é independente do Obsidian e não precisa da cerebro instalada.

## Localizar a base

Chame a raiz do clone de `KNOWLEDGE_ROOT`. Descubra esse caminho em cada ambiente; não grave caminhos absolutos de uma pessoa nos documentos ou nas instruções da skill.

- Priorize o clone ou caminho indicado pelo usuário. Caso contrário, use o projeto aberto e, dentro de um clone, descubra sua raiz com `git rev-parse --show-toplevel`.
- Confirme a identidade pelo remote `Astro-Inter/astro-knowledge`, aceitando HTTPS, SSH e sufixo `.git`. O remote serve para identificar o projeto; a consulta e a escrita são locais.
- Quando esta skill estiver em `.agents/skills/astro-knowledge/` dentro do projeto, a raiz que contém `.agents/` é uma candidata. Uma cópia instalada na pasta pessoal de skills não indica onde está o clone.
- Para uma cópia sem metadados Git, use o caminho informado e confira o README e a estrutura. Se houver mais de uma base possível ou nenhuma acessível, peça o caminho do clone antes de escrever; não clone o repositório automaticamente.
- Leia o `README.md`, os índices existentes e as instruções `AGENTS.md` aplicáveis. Confira o estado Git antes de editar para preservar alterações que já estavam em andamento.

## Escolher o modo

- **Consultar:** localizar documentos, responder perguntas e resumir conteúdo sem modificar a base.
- **Registrar:** criar ou atualizar documentação Markdown e arquivos de apoio quando o usuário pedir para salvar, documentar, registrar ou complementar conhecimento.
- **Conectar:** identificar relações e acrescentar links contextualizados no escopo solicitado.
- **Organizar:** criar pastas, subpastas e índices, ou mover e renomear documentos quando o usuário pedir organização das anotações.

Um pedido de consulta não autoriza escrita. Um pedido de documentação autoriza criar as pastas necessárias para os arquivos solicitados. Um pedido de organização autoriza executar a organização no escopo indicado, incluindo atualizar links afetados; não exija confirmação extra para escolhas rotineiras e reversíveis.

## Consultar e sintetizar

1. Use `rg --files` para descobrir documentos e `rg -n -i --glob '*.md'` para pesquisar conteúdo. Busque variações, siglas, títulos e nomes de arquivo. Exclua `.agents/skills/` da pesquisa de conhecimento, salvo quando o pedido tratar das próprias skills.
2. Comece pelos resultados específicos, siga links úteis e pesquise referências aos documentos encontrados.
3. Leia os documentos que sustentam a resposta antes de sintetizar. Para PDFs, documentos de escritório e outros formatos, use ferramentas adequadas disponíveis; informe quando um arquivo não puder ser lido em vez de tratá-lo como vazio.
4. Diferencie conteúdo encontrado na base, inferências e informação externa. Não atribua à equipe uma decisão que não esteja documentada.
5. Cite os arquivos consultados com links clicáveis na resposta. Nos documentos salvos, use caminhos relativos para funcionar em outros clones.

## Registrar e editar

- Pesquise o assunto antes de criar uma nota, para evitar duplicações e reutilizar a terminologia da equipe. Prefira complementar uma nota existente quando o pedido couber nela.
- Releia o destino imediatamente antes da alteração. Preserve o conteúdo, idioma, tom e estrutura existentes; não substitua anotações da equipe por uma síntese não solicitada.
- Respeite a pasta pedida. Sem indicação, reutilize uma pasta temática existente. Se a estrutura ainda não existir, crie `docs/<tema>/` com as subpastas que o conteúdo realmente precisar e informe o destino escolhido.
- Escreva Markdown em UTF-8. Siga a convenção de nomes existente; quando ainda não houver uma, use nomes curtos em português, minúsculos, sem acentos e em kebab-case, como `docs/git/revisao-de-pr.md`.
- Crie arquivos de apoio somente quando servirem ao pedido. Coloque imagens, exemplos ou anexos perto do documento ou na pasta de recursos já usada no projeto. Não copie credenciais, segredos ou dados pessoais sensíveis para a base compartilhada.
- Use títulos descritivos e seções que correspondam ao conteúdo. Inclua resumo, conceitos, passos, exemplos, decisões, relações ou fontes conforme a nota exigir; não preencha seções vazias nem invente fatos ou resultados de comandos.
- Use frontmatter, tags, aliases ou templates somente quando já forem convenção da base ou fizerem parte do pedido. Para datas registradas, use `YYYY-MM-DD`; atualize `updated` em notas antigas somente se essa propriedade já existir ou a mudança de metadados tiver sido solicitada.
- Para fontes externas, registre URLs reais junto ao conteúdo que sustentam. Não invente bibliografia. Se o conhecimento depender de informação atual ou não disponível no clone, verifique a fonte antes de registrá-lo.

Uma nota nova pode seguir este exemplo, adaptando e omitindo seções sem utilidade:

```markdown
# Revisão de Pull Requests

## Resumo

Explique o propósito da revisão e o contexto documentado pela equipe.

## Procedimento

Descreva os passos verificados, com exemplos quando úteis.

## Documentação relacionada

- [Fluxo Git](fluxo-git.md) — contexto do processo de contribuição.

## Fontes

Inclua somente fontes realmente consultadas.
```

O link do exemplo pressupõe uma nota existente: confirme o destino ou remova-o antes de usar o modelo.

## Conectar documentos

- Prefira links Markdown relativos, com extensão `.md` e barras `/`: `[Revisão de PR](../git/revisao-de-pr.md)`. Eles devem funcionar no GitHub e em outros clones.
- Reutilize wikilinks apenas quando a base já usar esse padrão ou o usuário pedir compatibilidade com Obsidian. Não imponha plugins, Bases ou configurações `.obsidian/` ao repositório.
- Explique a relação ao redor do link. Confirme que o destino e, quando usado, o título da seção existem. Só deixe links futuros não resolvidos quando o usuário pedir um esqueleto de documentação.
- Evite editar todas as notas relacionadas apenas para acrescentar links recíprocos. Crie um índice quando ele facilitar a navegação solicitada.

## Organizar pastas e subpastas

- Inspecione os assuntos e a estrutura atual antes de escolher categorias. Agrupe por tema ou projeto e crie subpastas quando houver conteúdo suficiente para justificar a divisão.
- Reutilize nomes existentes. Crie apenas diretórios necessários ao trabalho, sem árvores vazias ou categorias especulativas. Como Git não versiona pastas vazias, inclua um índice útil se o pedido exigir uma pasta ainda sem notas.
- Por exemplo, documentação sobre Git pode ficar em `docs/git/`, e documentos de arquitetura de um projeto em `docs/projetos/<projeto>/arquitetura/`. Esses caminhos são exemplos, não uma taxonomia obrigatória.
- Para um pedido amplo, informe brevemente a organização escolhida e prossiga. Preserve alterações locais; se surgir uma colisão de nomes ou uma edição incompatível, resolva sem sobrescrever conteúdo e peça esclarecimento somente quando a decisão depender do usuário.
- Ao mover ou renomear arquivos, pesquise referências, atualize links e índices afetados, e confira também links de saída e caminhos de anexos que mudam com a nova localização. Não suponha que um editor atualizará tudo automaticamente.
- Mantenha operações dentro de `KNOWLEDGE_ROOT`; confirme os destinos resolvidos antes de mover árvores. Não apague notas para organizar. Exclusão de conteúdo e mudanças fora do escopo dependem de pedido correspondente.
- Atualize o README principal ou os índices do tema quando isso for necessário para tornar a documentação criada ou reorganizada encontrável.

## Preservar e verificar

- Faça alterações focais, sem reformatação geral ou mudanças em configurações, código, `.git/`, `.agents/` ou na própria skill, salvo se esses itens fizerem parte do pedido.
- Releia os arquivos criados ou alterados, confira headings e eventual frontmatter, e valide os links e recursos adicionados ou afetados por movimentos. Revise o diff e confirme que só o escopo solicitado mudou.
- Não crie branch, commit, push, PR ou merge apenas porque documentou algo. Quando essas ações forem pedidas, respeite as convenções Git do projeto e a proteção da `main`; publique por PR e não contorne aprovações obrigatórias.
- Na entrega, informe os documentos consultados quando sustentarem a resposta, os arquivos e pastas criados ou alterados, as conexões relevantes e qualquer lacuna ou informação externa que precise ser distinguida das anotações da equipe.
