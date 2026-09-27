# Memorial Descritivo Funcional Final — ASTRO

> **Versão consolidada:** 23/09/2026  
> **Escopo:** produto, regras de negócio, funcionalidades, fluxos, papéis, permissões e decisões funcionais  
> **Exclusão deliberada:** este memorial **não contém banco de dados**, tabelas, schemas, DDL, índices, chaves, relacionamentos físicos ou detalhes de persistência.  
> **Status:** fonte de verdade funcional consolidada do ASTRO após as validações desta conversa.

---

# 1. Regra de precedência deste memorial

Este documento consolida:

1. as regras funcionais do memorial anterior do ASTRO;
2. todas as alterações explicitamente aprovadas nesta conversa;
3. as funcionalidades atuais do produto;
4. os pontos que continuam deliberadamente em aberto para versões futuras.

Quando uma decisão desta conversa contradiz o memorial anterior, **a decisão mais recente desta conversa prevalece**.

Nenhuma regra antiga deve ser reintroduzida quando houver uma decisão mais recente registrada aqui.

---

# 2. Alterações consolidadas nesta conversa

As seguintes decisões substituem definições anteriores:

1. A palavra oficial do produto passa a ser **Colaborador**, e não mais Funcionário.
2. A antiga Licença passa a ser chamada de **Chave de Workspace**.
3. Evidência de conclusão de Evento está **sempre disponível**; o que muda é se ela é obrigatória ou opcional.
4. Cada conclusão de Evento pode possuir **até 3 evidências**.
5. Quando a evidência for obrigatória, pelo menos 1 evidência deve ser enviada para concluir.
6. A NR de um Formulário é **opcional**.
7. Se um Formulário possuir NR, essa NR deve estar associada à Unidade escolhida.
8. O chatbot está disponível para **Colaboradores e Gestores**.
9. O chatbot é **somente leitura** e não pode modificar dados.
10. O chatbot é voltado principalmente à consulta e compreensão do estado das Conformidades.
11. A importação de Conformidades usa **CPF**, e não e-mail, para identificar o Colaborador.
12. A importação de Colaboradores continua recebendo `NOME | EMAIL | CPF | CARGO | UNIDADE | MODALIDADE`, mas o **CPF é a identidade utilizada para localizar o Colaborador**.
13. Na criação inicial do Workspace, os Cargos e Unidades encontrados na planilha são identificados por valores distintos e **criados automaticamente**.
14. Em importações posteriores, situações de Cargo ou Unidade que precisem de correspondência são resolvidas pelo Gestor por meio de **select no front-end**, em vez de criação silenciosa.
15. A IA de análise de NRs pode apoiar tanto a análise da **empresa** quanto a análise de **NRs adequadas a cada Cargo**.
16. Existem apenas duas origens funcionais de validade de Conformidade: **EVENTO** e **MANUAL**.
17. Importação de validade por planilha continua sendo considerada origem **MANUAL**.

---

# 3. Visão geral do ASTRO

O **ASTRO** é um sistema SaaS de gestão de conformidade relacionada às Normas Regulamentadoras — NRs — e a processos operacionais de Segurança e Saúde no Trabalho.

O objetivo central do produto é reduzir trabalho manual de RH, SST e Gestores, centralizando e organizando:

- Workspaces empresariais;
- Colaboradores;
- Gestores;
- Gestor do Workspace;
- Cargos;
- Unidades;
- NRs;
- obrigações de NR por Cargo;
- NRs de contexto por Unidade;
- Conformidades individuais;
- Eventos;
- Turmas;
- participantes;
- conclusões;
- evidências;
- registros manuais de validade;
- importações em massa;
- Formulários e inspeções;
- Chat;
- chatbot;
- Notificações;
- alertas;
- indicadores;
- apoio por IA para análise de NRs;
- apoio a cálculos relacionados a exigências;
- gestão do primeiro acesso;
- gestão de acesso ao Workspace.

O ASTRO organiza, acompanha, calcula, registra, sugere e facilita decisões.

O ASTRO **não substitui a responsabilidade legal da empresa nem de profissionais habilitados**.

---

# 4. Terminologia oficial

## 4.1 Colaborador

A palavra oficial utilizada no produto é **Colaborador**.

O termo antigo “Funcionário” não deve mais ser utilizado em:

- telas;
- documentação;
- fluxos;
- textos;
- regras funcionais;
- comunicações do produto.

## 4.2 Gestor

Gestor é um Colaborador com permissões adicionais de gestão.

Ele continua sendo um Colaborador normal da empresa e continua possuindo Cargo, Unidade, modalidade e Conformidades.

## 4.3 Gestor do Workspace

É o responsável administrativo principal do Workspace.

Existe **exatamente um Gestor do Workspace por Workspace**.

## 4.4 Evento

O termo oficial para atividades acompanhadas pelo sistema é **Evento**.

Podem ser tratados como Eventos, por exemplo:

- treinamentos;
- cursos;
- capacitações;
- reciclagens;
- outras atividades acompanhadas pelo ASTRO.

## 4.5 Chave de Workspace

É a chave que autoriza a criação e o uso legítimo de um Workspace.

Ela é diferente da Chave de primeiro acesso de um Colaborador.

---

# 5. Princípios centrais do produto

1. A empresa controla seu próprio Workspace.
2. O Workspace representa o ambiente organizacional da empresa dentro do ASTRO.
3. Todos os Colaboradores possuem uma única conta.
4. Gestores continuam sendo Colaboradores; suas permissões são adicionais.
5. Existe exatamente um Gestor do Workspace por Workspace.
6. Cada Colaborador pertence a exatamente um Cargo e uma Unidade.
7. Cargo e Unidade do mesmo Colaborador devem pertencer ao mesmo Workspace.
8. A obrigação individual de NR vem exclusivamente do Cargo.
9. NRs de Unidade são contexto operacional para Formulários, inspeções e operação da Unidade.
10. NRs de Unidade não criam Conformidade individual por si só.
11. A Conformidade representa o estado atual útil do Colaborador em relação a uma NR.
12. O histórico útil deve ser preservado.
13. Todo Evento possui pelo menos uma Turma.
14. As datas do Evento pertencem às Turmas.
15. Os participantes pertencem às Turmas.
16. Somente o Gestor criador valida conclusões do próprio Evento.
17. O Gestor criador não participa do próprio Evento como Colaborador.
18. Eventos podem existir sem NR.
19. Evento sem NR não gera validade de NR.
20. Formulário exige Unidade, mas a NR é opcional.
21. Quando um Formulário possui NR, ela deve pertencer à Unidade escolhida.
22. A maior validade conhecida de uma Conformidade sempre prevalece.
23. Validade manual não cria nova obrigação de NR.
24. O ASTRO deve preservar consistência, histórico, isolamento entre empresas e simplicidade de UX.

---

# 6. Perfis e papéis

## 6.1 Colaborador

O Colaborador possui uma única conta e pode ter:

- nome;
- e-mail;
- CPF;
- Cargo;
- Unidade;
- modalidade;
- status de acesso;
- senha após o primeiro acesso;
- NRs aplicáveis;
- Conformidades;
- Eventos dos quais participa.

No Mobile, o Colaborador pode:

- visualizar Eventos;
- visualizar suas NRs;
- visualizar o estado de suas Conformidades;
- registrar conclusão quando o modo do Evento permitir;
- enviar evidências;
- visualizar alertas e Notificações conforme funcionalidades disponíveis;
- conversar com Gestores;
- acessar seus dados;
- utilizar o chatbot em modo leitura.

## 6.2 Gestor

O Gestor é o mesmo Colaborador, com permissões adicionais.

Pode:

- criar Eventos;
- configurar Eventos;
- validar conclusões dos Eventos que criou;
- registrar conclusões quando o modo do Evento permitir;
- conversar com Colaboradores;
- visualizar Colaboradores;
- responder Formulários;
- consultar NRs;
- consultar Conformidades;
- visualizar indicadores;
- realizar importações;
- registrar validade manual;
- administrar operações compatíveis com seu papel;
- utilizar o chatbot em modo leitura.

## 6.3 Gestor do Workspace

O Gestor do Workspace:

- possui todas as permissões de Gestor;
- continua sendo Colaborador normal;
- possui Cargo e Unidade;
- é o único perfil que pode promover ou adicionar outros Gestores;
- pode transferir a principalidade do Workspace;
- é único dentro do Workspace.

## 6.4 Equipe administrativa do ASTRO

A equipe administrativa do próprio ASTRO é externa à estrutura empresarial dos Workspaces.

Ela pode atuar em processos excepcionais, especialmente na transferência excepcional do Gestor do Workspace.

---

# 7. Conta única e alternância de contexto

Um Gestor não possui uma conta separada de Colaborador.

Existe uma única conta.

A mesma conta permite ao Gestor utilizar:

- contexto de Colaborador;
- funcionalidades de gestão;
- funcionalidades Web compatíveis com seu papel.

A elevação de Colaborador para Gestor não cria uma segunda identidade.

---

# 8. Workspace

O Workspace representa a empresa dentro do ASTRO.

Ele contém a estrutura organizacional necessária para operar o produto, incluindo:

- Cargos;
- Unidades;
- Colaboradores;
- Gestores;
- configurações relacionadas a NRs;
- Eventos;
- Formulários;
- Conformidades;
- demais recursos da organização.

O CNPJ da empresa deve ser único dentro do produto e possuir 14 dígitos.

---

# 9. Criação do Workspace

Fluxo funcional:

```text
Empresa inicia criação
        ↓
informa Chave de Workspace
        ↓
ASTRO valida a Chave de Workspace
        ↓
Chave válida
        ↓
Workspace é criado
        ↓
configuração inicial
        ↓
definição do Gestor do Workspace
```

Cadastros complementares podem permitir a opção “Agora não”, desde que o mínimo necessário para o ambiente tenha sido concluído.

## 9.1 Criação inicial a partir de planilha

Na criação inicial do Workspace, quando a planilha de Colaboradores é utilizada:

- o ASTRO lê os valores de Cargo existentes na planilha;
- identifica os Cargos distintos;
- cria automaticamente todos os Cargos distintos encontrados;
- lê os valores de Unidade existentes na planilha;
- identifica as Unidades distintas;
- cria automaticamente todas as Unidades distintas encontradas;
- depois associa os Colaboradores aos respectivos Cargos e Unidades.

Essa criação automática por valores distintos vale para **a criação inicial do Workspace**.

---

# 10. Chave de Workspace

A Chave de Workspace autoriza a criação e o uso legítimo do ambiente empresarial.

Ela não deve ser confundida com a Chave de primeiro acesso.

São conceitos diferentes:

- **Chave de Workspace:** usada pela empresa para criar/acessar legitimamente o Workspace;
- **Chave de primeiro acesso:** usada por um Colaborador recém-cadastrado para ativar sua conta.

---

# 11. Cargos

Cada Colaborador possui exatamente um Cargo atual.

O Cargo é a **fonte exclusiva das NRs individuais obrigatórias**.

O ASTRO permite:

- criar Cargos;
- visualizar Cargos;
- alterar Cargos;
- associar NRs aos Cargos;
- utilizar a IA para apoiar a análise das NRs adequadas ao Cargo.

Não existe atribuição livre de NR diretamente a um Colaborador específico.

Se uma NR deve ser obrigatória individualmente, ela deve decorrer do Cargo.

---

# 12. Unidades

Cada Colaborador possui exatamente uma Unidade atual.

O ASTRO permite:

- criar Unidades;
- visualizar Unidades;
- manter as informações operacionais da Unidade;
- associar NRs de contexto à Unidade;
- utilizar essas NRs em Formulários e inspeções.

Cada Unidade possui um endereço.

As NRs de Unidade servem para contexto de:

- inspeção;
- Formulário;
- operação da Unidade.

Elas **não geram Conformidade individual automaticamente**.

---

# 13. NRs

O ASTRO mantém um catálogo funcional de NRs.

Cada NR possui, funcionalmente:

- código;
- título;
- tempo de reciclagem em meses;
- indicação de revogação.

Regras:

- o código da NR é único;
- o tempo de reciclagem é utilizado para calcular validade quando um Evento associado à NR gera Conformidade;
- uma NR revogada não deve continuar sendo tratada como aplicável;
- uma NR pode ser associada a Cargos;
- uma NR pode ser associada a Unidades.

---

# 14. NRs por Cargo

A associação Cargo ↔ NR define obrigações individuais.

Fluxo conceitual:

```text
Colaborador
    ↓
Cargo
    ↓
NRs exigidas pelo Cargo
    ↓
Conformidades aplicáveis
```

A IA pode sugerir NRs para um Cargo, mas a decisão final é humana.

---

# 15. NRs por Unidade

A associação Unidade ↔ NR é contextual.

Serve para:

- Formulários;
- inspeções;
- verificações operacionais;
- contexto de segurança da Unidade.

Ela não cria obrigação individual de NR para todos os Colaboradores daquela Unidade.

---

# 16. Modalidade do Colaborador

As modalidades funcionais reconhecidas são:

- PRESENCIAL;
- REMOTO;
- HÍBRIDO.

A modalidade faz parte do cadastro do Colaborador e pode ser sincronizada por importação.

---

# 17. Status de acesso do Colaborador

Os estados funcionais são:

- **PRÉ-CADASTRADO**;
- **ATIVO**;
- **DESATIVADO**.

Um novo Colaborador entra como PRÉ-CADASTRADO.

Ele se torna ATIVO após concluir corretamente o primeiro acesso.

Ele só se torna DESATIVADO por ação de um Gestor autorizado.

Não existe, atualmente, outro mecanismo automático de desativação.

---

# 18. Primeiro acesso

Quando um novo Colaborador é criado:

```text
Colaborador entra como PRÉ-CADASTRADO
        ↓
Chave de primeiro acesso é gerada
        ↓
Chave é enviada imediatamente
        ↓
Colaborador informa a Chave
        ↓
ASTRO valida
        ↓
Colaborador cria senha
        ↓
status muda para ATIVO
        ↓
Chave é invalidada
        ↓
Colaborador entra no sistema
```

Não existem etapas adicionais obrigatórias no primeiro acesso além desse fluxo.

---

# 19. Chave de primeiro acesso

Regras consolidadas:

- é gerada imediatamente no pré-cadastro;
- é enviada imediatamente ao Colaborador;
- possui validade de 7 dias;
- pode ser reenviada por Gestores;
- ao ser utilizada com sucesso, é invalidada;
- ao ocorrer reenvio, uma nova Chave é criada;
- a Chave anterior é invalidada;
- começa um novo prazo de 7 dias.

Fluxo de reenvio:

```text
Gestor solicita reenvio
        ↓
nova Chave é gerada
        ↓
Chave anterior é invalidada
        ↓
novo prazo de 7 dias
        ↓
nova Chave é enviada
```

---

# 20. Login normal

Depois que o Colaborador está ATIVO, o login normal ocorre com:

```text
E-MAIL + SENHA
```

O usuário precisa estar apto a acessar conforme seu status.

---

# 21. Importação de Colaboradores

Formato funcional atual da planilha:

```text
NOME | EMAIL | CPF | CARGO | UNIDADE | MODALIDADE
```

## 21.1 Identidade na importação

A identidade utilizada para localizar o Colaborador na importação é o **CPF**.

O e-mail continua fazendo parte dos dados importados, mas não é mais o identificador principal dessa sincronização.

## 21.2 Colaborador novo

Quando o CPF ainda não corresponde a um Colaborador existente:

```text
cria novo Colaborador
        ↓
associa Cargo e Unidade
        ↓
sincroniza NRs aplicáveis pelo Cargo
        ↓
entra como PRÉ-CADASTRADO
        ↓
gera Chave de primeiro acesso
        ↓
envia Chave
```

## 21.3 Colaborador existente

Quando o CPF já existe, a planilha funciona como sincronização cadastral.

Pode atualizar:

- nome;
- e-mail;
- Cargo;
- Unidade;
- modalidade.

Não altera automaticamente:

- papel/permissão do usuário;
- senha;
- status de acesso.

## 21.4 Cargos e Unidades em importações posteriores

Fora da criação inicial do Workspace, o sistema **não deve criar silenciosamente** um Cargo ou Unidade desconhecido.

Quando houver necessidade de correspondência:

- o Gestor deve resolver pelo front-end;
- a interface deve utilizar select;
- o Gestor escolhe a associação correta.

A criação inicial do Workspace é a exceção: nela, Cargos e Unidades distintos encontrados na planilha são criados automaticamente.

## 21.5 Casos de identidade conflitante

O CPF é único e identifica o Colaborador na importação.

Comportamentos específicos para conflitos adicionais entre CPF, e-mail e registros preexistentes que não tenham sido explicitamente redefinidos devem ser tratados como **ponto a decidir**, e não inventados automaticamente.

---

# 22. Mudança de Cargo

Quando o Cargo de um Colaborador muda, o ASTRO recalcula quais NRs continuam sendo exigidas.

Fluxo conceitual:

```text
Cargo antigo
        ↓
NRs antigas
        ↓
Cargo novo
        ↓
NRs novas
        ↓
recalcula aplicabilidade
```

Resultados possíveis:

- NR deixou de ser exigida → deixa de ser aplicável;
- NR continua sendo exigida → preserva estado e histórico;
- NR passou a ser exigida → cria ou reativa a Conformidade correspondente.

O histórico anterior não é apagado.

---

# 23. Conformidade

A Conformidade representa o estado atual útil de um Colaborador em relação a uma NR.

Existe **uma única Conformidade por combinação Colaborador + NR**.

Ela acompanha funcionalmente:

- se a NR é aplicável;
- a maior validade atual conhecida;
- a origem da validade atual;
- o estado atual derivado dessa validade;
- o histórico relacionado por meio dos Eventos e registros anteriores.

---

# 24. Aplicabilidade da Conformidade

Quando uma NR passa a ser exigida pelo Cargo, a Conformidade passa a ser aplicável.

Quando deixa de ser exigida, ela deixa de ser aplicável, mas não é apagada.

Uma Conformidade pode deixar de ser aplicável quando:

- o Cargo deixa de exigir a NR;
- o Colaborador muda para um Cargo que não exige a NR;
- o Colaborador é desativado;
- a NR é revogada.

Se a NR voltar a ser exigida, a Conformidade anterior é reaproveitada e reativada.

---

# 25. Estado da Conformidade

O estado é derivado da validade atual.

Regra funcional:

```text
sem validade registrada
→ sem validade registrada
```

```text
validade igual ou posterior à data atual
→ conforme
```

```text
validade anterior à data atual
→ não conforme
```

A condição de “próximo do vencimento” pode existir como alerta ou indicador, mas os critérios exatos ainda precisam ser formalizados.

---

# 26. Origens da validade da Conformidade

Existem **somente duas origens**:

## 26.1 EVENTO

A validade atual veio de uma conclusão válida de um Evento associado a uma NR.

## 26.2 MANUAL

A validade foi informada externamente por um Gestor.

Isso inclui:

- preenchimento direto em input;
- importação por planilha.

Planilha **não é uma origem separada**.

---

# 27. Regra da maior validade

A maior validade conhecida sempre prevalece.

Exemplo:

```text
Atual: 20/10/2027
Nova: 10/05/2027
→ mantém 20/10/2027
```

```text
Atual: 20/10/2027
Nova: 15/03/2028
→ atualiza para 15/03/2028
```

Em caso de empate:

- mantém a validade atual;
- mantém a origem atual;
- não troca a fonte apenas por existir uma nova entrada com a mesma data.

Essa regra vale para validade recebida por Evento ou Manual.

---

# 28. Registro manual de Conformidade

O Gestor pode registrar uma validade manualmente.

Fluxo:

```text
Gestor seleciona Colaborador
        ↓
ASTRO apresenta NRs do Cargo
        ↓
Gestor seleciona uma dessas NRs
        ↓
informa data de validade
        ↓
ASTRO compara com validade atual
        ↓
maior validade prevalece
```

Regras:

- o Gestor só pode registrar validade para uma NR já exigida pelo Cargo do Colaborador;
- o registro manual não cria uma nova obrigação de NR;
- se a nova data não superar a validade atual, a validade atual é mantida.

---

# 29. Importação de Conformidades

Formato atual:

```text
CPF | NR | DATA_VALIDADE
```

Fluxo:

```text
resolve Colaborador pelo CPF
        ↓
resolve NR
        ↓
procura Conformidade existente
        ↓
não existe → rejeita linha
        ↓
existe → processa validade
        ↓
compara com validade atual
        ↓
maior validade prevalece
```

A importação de Conformidade:

- não cria nova obrigação de NR;
- só atua sobre uma Conformidade já aplicável/existente;
- é considerada origem MANUAL.

## 29.1 Duplicidade dentro da planilha

Se a mesma combinação:

```text
CPF + NR
```

aparecer mais de uma vez no mesmo arquivo, a última ocorrência do arquivo é considerada para processamento.

Depois disso, a data é comparada com a validade atual e a maior continua prevalecendo.

---

# 30. Eventos

Eventos são criados por Gestores.

Um Evento pode representar:

- treinamento;
- curso;
- capacitação;
- reciclagem;
- outra atividade acompanhada pela empresa.

Cada Evento possui um único Gestor criador.

---

# 31. Evento e NR

A associação de NR ao Evento é **opcional**.

Um Evento pode possuir:

```text
0 ou 1 NR
```

Evento sem NR:

- continua sendo um Evento válido;
- pode ter Turmas;
- pode ter participantes;
- pode ter conclusões;
- pode ter evidências;
- **não gera validade de NR nem Conformidade**.

Evento com NR pode gerar validade quando a conclusão válida atende às regras do produto.

---

# 32. Modos de conclusão de Evento

Existem dois modos funcionais:

- **COLABORADOR**;
- **GESTOR**.

## 32.1 Modo COLABORADOR

Fluxo:

```text
Colaborador registra conclusão
        ↓
PENDENTE
        ↓
Gestor criador analisa
        ├── CONCLUÍDO
        └── REJEITADO
```

Se rejeitado:

```text
Colaborador pode reenviar
        ↓
retorna para PENDENTE
```

## 32.2 Modo GESTOR

Fluxo:

```text
Gestor criador registra conclusão
        ↓
CONCLUÍDO
```

---

# 33. Regras do Gestor criador do Evento

O Gestor criador:

- é o responsável pelo Evento;
- é o único Gestor que valida as conclusões daquele Evento;
- não pode participar daquele mesmo Evento como Colaborador;
- não é automaticamente substituído por outro Gestor na validação.

Outro Gestor não assume a validação automaticamente.

---

# 34. Edição e cancelamento de Evento

Depois de criado, um Evento não deve ser livremente editado.

Quando necessário, ele pode ser **cancelado**.

O cancelamento deve preservar o registro e o histórico do Evento.

Um Evento pode ser funcionalmente tratado como:

- ATIVO;
- CANCELADO.

Estados como agendado, em andamento ou finalizado podem ser derivados das Turmas e datas, sem exigir uma edição manual de status.

O cancelamento deve manter motivo e contexto suficientes para preservar rastreabilidade funcional.

---

# 35. Turmas

Todo Evento possui pelo menos uma Turma.

Um Evento pode ter várias Turmas.

Cada Turma organiza:

- participantes;
- data inicial;
- data de término;
- contexto específico daquela realização do Evento.

---

# 36. Datas do Evento

As datas pertencem às Turmas, e não diretamente ao Evento.

Isso permite que um mesmo Evento possua várias realizações.

Exemplo:

```text
Evento: Treinamento de Segurança

Turma 1 → 10/10
Turma 2 → 11/10
Turma 3 → 12/10
```

---

# 37. Participantes

Os Colaboradores participam de um Evento através de uma Turma.

Fluxo conceitual:

```text
Evento
   ↓
Turma
   ↓
Participante
```

Não existe participação paralela diretamente no Evento fora da Turma.

---

# 38. Conclusões de Evento

Cada participação pode possuir uma conclusão.

Estados reconhecidos:

- PENDENTE;
- CONCLUÍDO;
- REJEITADO.

Fluxo típico do modo Colaborador:

```text
participação existe
        ↓
ainda sem conclusão
        ↓
Colaborador envia
        ↓
PENDENTE
        ↓
Gestor criador valida
        ├── CONCLUÍDO
        └── REJEITADO
                ↓
             reenvio
                ↓
             PENDENTE
```

---

# 39. Evidências de conclusão

A evidência está **sempre disponível** em uma conclusão de Evento.

O que muda é sua obrigatoriedade.

Um Evento pode definir evidência como:

- opcional;
- obrigatória.

Cada conclusão pode possuir **até 3 evidências**.

Quando a evidência for obrigatória:

- o sistema deve exigir pelo menos 1 evidência antes de aceitar a conclusão.

Quando for opcional:

- a conclusão pode ser enviada sem evidência;
- ainda assim, o Colaborador ou Gestor pode anexar evidências se desejar.

---

# 40. Certificados

Certificado pode ser utilizado como evidência.

Não existe necessidade de um módulo obrigatório separado apenas para certificado.

Um certificado enviado como evidência não substitui a validação do Gestor criador quando o modo de conclusão exige validação.

---

# 41. Validade gerada por Evento

Quando:

- o Evento possui uma NR;
- a conclusão é considerada válida/concluída;

então a validade é calculada automaticamente a partir de:

```text
data de validação
+
tempo de reciclagem da NR
```

O Gestor não escolhe manualmente o tempo de reciclagem dentro do Evento.

Esse tempo vem da configuração da própria NR.

Depois de calculada a nova validade, o ASTRO compara com a validade atual da Conformidade.

Somente a maior prevalece.

---

# 42. Formulários e inspeções

Formulários fazem parte do produto e são utilizados para inspeções, checklists e verificações operacionais.

Regras atuais:

- Formulário é criado por Gestor;
- Unidade é obrigatória;
- NR é opcional;
- se houver NR, ela deve pertencer à Unidade escolhida;
- o Gestor responde o Formulário no Mobile;
- a localização precisa estar ativa no momento da resposta;
- a localização é registrada no envio/resposta;
- Formulário não gera Conformidade individual.

---

# 43. Tipos de perguntas de Formulário

Os tipos definitivos de pergunta e resposta ainda não estão formalizados como regra final do produto.

Também não está formalizado definitivamente o versionamento de Formulários.

Esses pontos permanecem reservados para evolução futura/V2.

Interfaces ou protótipos podem experimentar tipos de pergunta, desde que isso não seja tratado automaticamente como regra oficial sem aprovação.

---

# 44. Localização em Formulários

Ao responder um Formulário no Mobile:

- a localização deve estar ativa;
- a localização é registrada no momento da resposta.

Não existe, neste memorial, um raio oficial de geofence em metros.

Qualquer regra de distância, tolerância, raio mínimo/máximo ou bloqueio por proximidade exige decisão futura explícita.

---

# 45. Chat

O Chat permite comunicação entre:

```text
Gestor ↔ Colaborador
```

Não existe Chat direto:

```text
Colaborador ↔ Colaborador
```

O Chat é uma ferramenta operacional e não deve alterar Conformidade, NR ou Evento diretamente.

Regras avançadas de Chat permanecem abertas para evolução futura.

---

# 46. Chatbot

O chatbot está disponível para:

- Colaboradores;
- Gestores.

Sua função principal é permitir consulta e compreensão do estado das Conformidades.

O chatbot é **somente leitura**.

Ele pode:

- consultar informações autorizadas;
- explicar o estado de Conformidades;
- ajudar o usuário a entender pendências e situação atual;
- responder perguntas dentro do escopo de leitura permitido.

Ele **não pode**:

- criar dados;
- editar dados;
- excluir dados;
- validar conclusões;
- registrar conclusões;
- alterar Conformidades;
- alterar NRs;
- alterar Eventos;
- modificar cadastros;
- executar qualquer escrita no sistema.

---

# 47. Notificações

Notificações fazem parte do ASTRO.

O produto reconhece a necessidade de avisos, alertas e acompanhamento de eventos relevantes.

Entretanto, os seguintes pontos ainda não estão formalmente fechados:

- gatilhos;
- tipos;
- regras de leitura;
- retenção;
- push;
- navegação;
- comportamento após interação;
- conjunto definitivo de notificações.

Nenhuma regra detalhada de Notificação deve ser inventada como definitiva antes de aprovação.

---

# 48. Alertas e proximidade de vencimento

O ASTRO pode alertar sobre estados relevantes de Conformidade e vencimento.

A noção de “próximo do vencimento” faz sentido funcionalmente para o produto, mas o intervalo exato que define proximidade de vencimento ainda não está fixado neste memorial.

Esse limiar deve ser definido explicitamente antes de ser considerado regra oficial.

---

# 49. Indicadores e dashboards

Gestores podem visualizar indicadores.

A interface pode utilizar recursos como:

- big numbers;
- cards;
- gráficos;
- resumos de Conformidade;
- informações operacionais.

As métricas definitivas ainda precisam ser explicitamente aprovadas.

Um protótipo visual não transforma automaticamente uma métrica em regra oficial.

---

# 50. Gestão de Gestores

Somente o Gestor do Workspace pode promover/adicionar outros Gestores.

Fluxo conceitual:

```text
Colaborador
        ↓
promoção
        ↓
Gestor
```

A conta continua sendo a mesma.

A promoção não cria uma nova conta.

---

# 51. Transferência normal do Gestor do Workspace

Fluxo:

```text
Gestor do Workspace atual
        ↓
seleciona usuário que já é Gestor
        ↓
confirma
        ↓
novo usuário torna-se Gestor do Workspace
        ↓
antigo deixa a principalidade
```

Se o antigo responsável continuar na empresa, ele pode permanecer como Gestor comum.

A transferência deve preservar a regra de existir exatamente um Gestor do Workspace.

---

# 52. Transferência excepcional do Gestor do Workspace

A transferência excepcional é utilizada quando o Gestor do Workspace:

- foi desligado;
- perdeu acesso;
- saiu sem transferir;
- está indisponível;
- está impossibilitado;
- recusa indevidamente a transferência.

Fluxo:

```text
Outro Gestor
        ↓
abre solicitação/ticket para a equipe ASTRO
        ↓
informa motivo
        ↓
indica novo responsável
        ↓
envia comprovações
        ↓
equipe ASTRO analisa
        ↓
se aprovado
        ↓
principalidade é transferida
```

A troca excepcional **não é automática**.

---

# 53. Desligamento do antigo Gestor do Workspace

Se o antigo Gestor do Workspace for desligado:

- seu acesso pode ser desativado;
- o registro histórico deve permanecer;
- a empresa continua sendo dona do Workspace;
- a principalidade precisa ser resolvida conforme os fluxos de transferência.

---

# 54. Web — Gestores

O ambiente Web é voltado principalmente às tarefas administrativas.

Entre as funcionalidades estão:

- criação e configuração do Workspace;
- importação de Colaboradores;
- gestão de Cargos;
- gestão de Unidades;
- configuração e associação de NRs;
- gestão de Gestores;
- gestão de Conformidades;
- registro manual de validade;
- importação de validade por planilha;
- criação e configuração de Eventos;
- criação e configuração de Formulários;
- configurações da empresa;
- indicadores e operações administrativas compatíveis com o papel.

---

# 55. Mobile — Colaborador

O Mobile do Colaborador concentra a operação pessoal.

Funcionalidades:

- visualizar Eventos;
- registrar conclusão de Evento quando permitido;
- anexar evidências;
- consultar NRs;
- consultar sua situação de Conformidade;
- visualizar alertas e Notificações conforme disponíveis;
- acessar dados cadastrais;
- utilizar Chat com Gestores;
- utilizar chatbot em modo leitura.

---

# 56. Mobile — Gestor

O Gestor possui as funções de Colaborador e, adicionalmente:

- validar conclusões dos Eventos que criou;
- registrar conclusão quando o modo permitir;
- visualizar Colaboradores;
- utilizar Chat;
- responder Formulários;
- consultar NRs;
- consultar Conformidades;
- visualizar indicadores;
- utilizar chatbot em modo leitura.

---

# 57. Perfil

O ASTRO não depende de foto de perfil como requisito funcional.

A ausência de foto não impede o uso do produto.

---

# 58. IA para análise de NRs

O ASTRO pode oferecer apoio por IA para análise de NRs.

A IA pode considerar:

- CNAE;
- atividade real;
- quantidade de Colaboradores;
- riscos;
- características organizacionais;
- contexto da empresa;
- contexto de um Cargo específico.

A IA pode apoiar dois níveis principais:

## 58.1 Análise da empresa

A IA pode sugerir quais NRs podem ser relevantes para a empresa considerando seu contexto.

## 58.2 Análise por Cargo

A IA pode sugerir quais NRs podem ser adequadas a um determinado Cargo considerando atividade, contexto e riscos associados.

---

# 59. Regras das sugestões de IA

Toda sugestão de NR feita pela IA deve:

- ser assistiva;
- poder ser revisada;
- possuir justificativa;
- indicar quando exige validação profissional;
- não criar obrigação automaticamente;
- não substituir decisão humana;
- não substituir responsabilidade técnica ou legal.

A decisão final permanece com o Gestor e/ou profissional responsável.

---

# 60. IA e criação de obrigação

A IA **não cria obrigação individual automaticamente**.

Uma sugestão só se transforma em regra operacional quando o responsável humano aprova a associação correspondente.

Para obrigação individual, a fonte continua sendo o Cargo.

---

# 61. Apoio a cálculos relacionados a exigências

O ASTRO pode auxiliar cálculos que dependam de informações como:

- CNAE;
- quantidade de Colaboradores;
- características organizacionais.

Esse apoio pode incluir análises relacionadas à CIPA.

Esses cálculos são auxiliares.

A decisão final permanece humana.

---

# 62. Responsabilidade legal

O ASTRO deve deixar claro que:

- automações são auxiliares;
- sugestões de IA não são parecer jurídico;
- cálculos não garantem conformidade legal por si só;
- a empresa é responsável pelos dados informados;
- profissionais responsáveis continuam responsáveis por decisões técnicas e legais;
- o sistema apoia decisão e controle, mas não substitui responsabilidade profissional.

---

# 63. Estado atual versus histórico

## 63.1 Conformidade

Representa o **estado atual útil** do Colaborador em relação a uma NR.

Inclui, funcionalmente:

- aplicabilidade;
- maior validade atual;
- origem atual.

## 63.2 Conclusão de Evento

Representa o histórico de uma conclusão específica.

Uma conclusão antiga continua fazendo parte do histórico mesmo quando outra validade maior passa a ser a validade atual da Conformidade.

## 63.3 Preservação de histórico

O produto deve evitar apagar informações históricas úteis apenas porque:

- Cargo mudou;
- obrigação deixou de ser aplicável;
- validade nova substituiu a antiga;
- Evento foi cancelado;
- Gestor mudou;
- Colaborador foi desativado.

---

# 64. Regras de não duplicação funcional

O ASTRO não deve duplicar conceitos desnecessariamente.

Regras:

- Gestor não ganha uma segunda conta;
- Gestor continua sendo Colaborador;
- não existe obrigação individual de NR criada por NR de Unidade;
- não existe obrigação individual criada apenas por importação de validade;
- datas de Evento não devem ser duplicadas fora das Turmas;
- participantes pertencem às Turmas;
- certificado não exige um módulo obrigatório separado;
- importação de planilha de validade continua sendo origem MANUAL;
- chatbot não duplica funções administrativas de escrita;
- IA não substitui a decisão do Gestor.

---

# 65. Fluxo consolidado — novo Colaborador por importação

```text
Gestor envia planilha
        ↓
ASTRO lê CPF
        ↓
CPF não existe
        ↓
resolve Cargo e Unidade
        ↓
valida modalidade
        ↓
cria Colaborador
        ↓
PRÉ-CADASTRADO
        ↓
sincroniza NRs aplicáveis do Cargo
        ↓
gera Chave de primeiro acesso
        ↓
envia Chave
        ↓
prazo de 7 dias
```

Na criação inicial do Workspace, Cargos e Unidades distintos da planilha são criados automaticamente.

Em importações posteriores, correspondências necessárias devem ser resolvidas pelo Gestor via select.

---

# 66. Fluxo consolidado — primeiro acesso

```text
Colaborador recebe Chave
        ↓
informa Chave
        ↓
ASTRO valida
        ↓
Chave válida
        ↓
Colaborador cria senha
        ↓
PRÉ-CADASTRADO → ATIVO
        ↓
Chave é invalidada
        ↓
Colaborador entra
```

---

# 67. Fluxo consolidado — atualização cadastral por importação

```text
Gestor envia planilha
        ↓
CPF existente
        ↓
atualiza dados permitidos
        ↓
se Cargo mudou
        ↓
recalcula NRs aplicáveis e Conformidades
```

Pode atualizar:

- nome;
- e-mail;
- Cargo;
- Unidade;
- modalidade.

Não altera automaticamente:

- papel/permissão;
- senha;
- status.

---

# 68. Fluxo consolidado — Evento no modo Colaborador

```text
Gestor cria Evento
        ↓
define NR opcional
        ↓
define modo COLABORADOR
        ↓
define evidência opcional ou obrigatória
        ↓
cria pelo menos uma Turma
        ↓
adiciona participantes
        ↓
Colaborador envia conclusão
        ↓
se evidência obrigatória: exige ao menos 1
        ↓
permite até 3 evidências
        ↓
PENDENTE
        ↓
Gestor criador valida
        ├── REJEITADO
        │      ↓
        │    reenvio
        │      ↓
        │   PENDENTE
        │
        └── CONCLUÍDO
                ↓
          Evento possui NR?
                ↓ sim
          calcula validade
                ↓
          compara com Conformidade
                ↓
          maior validade prevalece
```

---

# 69. Fluxo consolidado — Evento no modo Gestor

```text
Gestor cria Evento
        ↓
define modo GESTOR
        ↓
cria Turma
        ↓
adiciona participante
        ↓
Gestor criador registra conclusão
        ↓
CONCLUÍDO
        ↓
se houver NR
        ↓
calcula validade
        ↓
compara com Conformidade
        ↓
maior validade prevalece
```

---

# 70. Fluxo consolidado — validade manual por input

```text
Gestor abre registro manual
        ↓
seleciona Colaborador
        ↓
ASTRO apresenta NRs do Cargo
        ↓
Gestor seleciona NR
        ↓
informa validade
        ↓
ASTRO compara com validade atual
        ↓
se maior
→ atualiza como origem MANUAL
```

---

# 71. Fluxo consolidado — validade manual por planilha

```text
CPF | NR | DATA_VALIDADE
        ↓
resolve Colaborador pelo CPF
        ↓
resolve NR
        ↓
procura Conformidade
        ↓
não existe → rejeita linha
        ↓
existe → processa
        ↓
se duplicado no arquivo → última ocorrência
        ↓
compara com validade atual
        ↓
maior validade prevalece
        ↓
origem = MANUAL
```

---

# 72. Fluxo consolidado — mudança de Cargo

```text
Colaborador muda de Cargo
        ↓
consulta NRs antigas
        ↓
consulta NRs novas
        ↓
NR deixou de ser exigida
→ deixa de ser aplicável
        ↓
NR continua
→ preserva estado
        ↓
NR nova
→ cria ou reativa Conformidade
```

---

# 73. Fluxo consolidado — Formulário

```text
Gestor cria Formulário
        ↓
seleciona Unidade
        ↓
NR é opcional
        ↓
se selecionar NR
→ deve ser NR daquela Unidade
        ↓
Formulário é disponibilizado
        ↓
Gestor responde no Mobile
        ↓
localização ativa
        ↓
localização registrada
        ↓
resposta concluída
```

O Formulário não gera Conformidade individual.

---

# 74. Fluxo consolidado — transferência normal de principalidade

```text
Gestor do Workspace atual
        ↓
seleciona Gestor existente
        ↓
confirma
        ↓
novo Gestor assume principalidade
        ↓
antigo deixa principalidade
        ↓
se permanecer na empresa
→ pode continuar como Gestor
```

---

# 75. Fluxo consolidado — transferência excepcional

```text
Gestor do Workspace indisponível/incapaz
        ↓
outro Gestor abre solicitação
        ↓
justificativa + comprovação
        ↓
equipe ASTRO analisa
        ↓
se aprovada
        ↓
principalidade é transferida
```

Não é automática.

---

# 76. Features do ASTRO — visão consolidada

As features atuais do ASTRO podem ser agrupadas nos módulos abaixo.

## 76.1 Workspace e acesso

- criação de Workspace;
- Chave de Workspace;
- configuração inicial;
- definição de Gestor do Workspace;
- primeiro acesso;
- Chave de primeiro acesso;
- reenvio de Chave;
- ativação;
- desativação;
- login com e-mail e senha.

## 76.2 Colaboradores

- cadastro;
- consulta;
- importação em massa;
- sincronização cadastral;
- vínculo com Cargo;
- vínculo com Unidade;
- modalidade;
- status de acesso;
- alteração de Cargo com recálculo de aplicabilidade.

## 76.3 Cargos

- criação e manutenção;
- associação de NRs;
- definição de obrigação individual;
- apoio de IA para análise de NRs adequadas ao Cargo.

## 76.4 Unidades

- criação e manutenção;
- endereço;
- associação de NRs contextuais;
- contexto de inspeções e Formulários.

## 76.5 NRs

- catálogo;
- código e título;
- tempo de reciclagem;
- revogação;
- associação a Cargo;
- associação a Unidade;
- consulta por Gestores e Colaboradores.

## 76.6 Conformidades

- uma Conformidade por Colaborador + NR;
- aplicabilidade;
- estado derivado da validade;
- origem EVENTO;
- origem MANUAL;
- maior validade prevalece;
- preservação de histórico;
- reativação quando NR volta a ser exigida;
- registro manual;
- importação manual por planilha.

## 76.7 Eventos

- criação por Gestor;
- NR opcional;
- Turmas;
- datas por Turma;
- participantes por Turma;
- modo COLABORADOR;
- modo GESTOR;
- conclusão;
- validação;
- rejeição;
- reenvio;
- cancelamento;
- geração de validade quando associado a NR.

## 76.8 Evidências

- evidência sempre disponível;
- opcional ou obrigatória;
- até 3 evidências por conclusão;
- bloqueio de conclusão sem evidência quando obrigatória;
- certificado pode ser usado como evidência.

## 76.9 Formulários e inspeções

- criação por Gestor;
- Unidade obrigatória;
- NR opcional;
- filtro de NR pela Unidade quando utilizada;
- resposta pelo Gestor no Mobile;
- registro de localização;
- uso em inspeções/checklists/verificações;
- não gera Conformidade individual.

## 76.10 Chat

- Gestor ↔ Colaborador;
- sem Colaborador ↔ Colaborador;
- comunicação operacional.

## 76.11 Chatbot

- acesso por Colaborador;
- acesso por Gestor;
- consulta do estado das Conformidades;
- explicação de situação e pendências;
- somente leitura;
- nenhuma escrita no sistema.

## 76.12 Notificações e alertas

- Notificações como parte do produto;
- alertas de situações relevantes;
- suporte futuro a regras detalhadas de leitura, push, navegação e gatilhos.

## 76.13 Indicadores

- indicadores para Gestores;
- dashboards;
- big numbers;
- gráficos e resumos;
- métricas finais dependem de aprovação explícita.

## 76.14 IA para NRs

- análise da empresa;
- análise por Cargo;
- uso de CNAE;
- uso de atividade real;
- uso de quantidade de Colaboradores;
- uso de riscos;
- uso de características organizacionais;
- justificativa de sugestões;
- revisão humana;
- indicação de necessidade de validação profissional;
- sem criação automática de obrigação.

## 76.15 Apoio a cálculos

- cálculos auxiliares dependentes de CNAE;
- cálculos dependentes de quantidade de Colaboradores;
- cálculos dependentes de características organizacionais;
- apoio a análises relacionadas à CIPA.

## 76.16 Gestão de Gestores

- promoção de Colaborador para Gestor;
- manutenção de conta única;
- Gestor do Workspace único;
- transferência normal;
- transferência excepcional;
- preservação do histórico quando responsável muda.

---

# 77. Pontos deliberadamente reservados para V2 ou decisão futura

Ainda precisam de formalização definitiva:

- tipos oficiais de pergunta e resposta dos Formulários;
- versionamento de Formulários;
- regras avançadas de Chat;
- gatilhos definitivos de Notificação;
- tipos definitivos de Notificação;
- leitura de Notificações;
- retenção de Notificações;
- push;
- navegação de Notificações;
- critério exato de “próximo do vencimento”;
- métricas definitivas de indicadores;
- documentação oficial completa das telas;
- contratos formais de APIs após amadurecimento da implementação;
- comportamento detalhado para conflitos cadastrais adicionais que não tenham sido explicitamente aprovados;
- eventual regra de geofence/raio para Formulários, caso o produto venha a adotá-la.

Esses itens não devem ser preenchidos por suposição.

---

# 78. Regras para telas e UX

As telas devem respeitar as regras funcionais deste memorial.

Um protótipo visual não altera regra de negócio por si só.

IA pode ajudar a:

- criar telas;
- revisar telas;
- revisar UX;
- sugerir fluxos;

mas sugestões só se tornam regra oficial quando aprovadas explicitamente.

---

# 79. Regra para futuros agentes de IA trabalhando no ASTRO

Qualquer agente que receba este memorial deve assumir:

1. O termo oficial é Colaborador.
2. Gestor continua sendo Colaborador.
3. Existe exatamente um Gestor do Workspace.
4. Cada Colaborador possui um Cargo e uma Unidade.
5. Cargo define NR individual.
6. Unidade define NR contextual.
7. Conformidade é única por Colaborador + NR.
8. Histórico deve ser preservado.
9. Maior validade prevalece.
10. Origem de validade é EVENTO ou MANUAL.
11. Planilha de validade é MANUAL.
12. Evento sempre possui pelo menos uma Turma.
13. Datas pertencem às Turmas.
14. Participantes pertencem às Turmas.
15. Evento pode existir sem NR.
16. Evento sem NR não gera Conformidade.
17. Só o Gestor criador valida conclusões do próprio Evento.
18. O Gestor criador não participa do próprio Evento.
19. Evidência está sempre disponível.
20. Evidência pode ser obrigatória ou opcional.
21. São permitidas até 3 evidências por conclusão.
22. Formulário exige Unidade.
23. NR de Formulário é opcional.
24. Se houver NR no Formulário, ela pertence à Unidade escolhida.
25. Chat é Gestor ↔ Colaborador.
26. Chatbot atende Gestor e Colaborador.
27. Chatbot é somente leitura.
28. Importação de Colaborador identifica pelo CPF.
29. Importação de Conformidade identifica Colaborador pelo CPF.
30. Na criação inicial do Workspace, Cargos e Unidades distintos da planilha são criados automaticamente.
31. Em importações posteriores, correspondências de Cargo/Unidade são resolvidas pelo Gestor via select.
32. A Chave de Workspace é diferente da Chave de primeiro acesso.
33. Chave de primeiro acesso expira em 7 dias.
34. Reenvio invalida a Chave anterior.
35. Novo Colaborador entra como PRÉ-CADASTRADO.
36. Primeiro acesso é Chave → senha → ATIVO → entrada.
37. Colaborador só fica DESATIVADO por ação de Gestor autorizado.
38. A IA pode analisar NRs da empresa e por Cargo.
39. A IA não cria obrigação automaticamente.
40. A decisão final sobre NRs e conformidade legal permanece humana.
41. Nenhuma regra não definida deve ser inventada como oficial.
42. Quando houver conflito com versão anterior, as decisões desta versão prevalecem.

---

# 80. Critério para futuras alterações

Toda nova proposta deve ser avaliada considerando:

- consistência do produto;
- isolamento entre Workspaces;
- preservação de histórico;
- segurança;
- simplicidade de UX;
- fonte de verdade;
- responsabilidade legal;
- impacto em permissões;
- impacto nos fluxos existentes;
- risco de duplicar conceitos;
- compatibilidade com decisões já aprovadas.

Uma nova regra só substitui este memorial quando for explicitamente aprovada.

---

# 81. Resumo operacional definitivo

O ASTRO organiza a empresa dentro de um Workspace.

A empresa entra por uma Chave de Workspace.

O Workspace possui Cargos e Unidades.

Na criação inicial, Cargos e Unidades distintos encontrados na planilha podem ser criados automaticamente.

Cada Colaborador pertence a um Cargo e uma Unidade.

O CPF é a identidade utilizada para localizar Colaboradores nas importações atuais.

O Cargo define as NRs individuais obrigatórias.

A Unidade define NRs contextuais para inspeções e Formulários.

Para cada Colaborador + NR aplicável existe uma única Conformidade atual.

A validade de uma Conformidade pode vir de:

```text
EVENTO
MANUAL
```

MANUAL inclui tanto input direto quanto planilha.

A maior validade sempre prevalece.

Eventos são criados por Gestores.

Um Evento pode existir sem NR.

Todo Evento possui pelo menos uma Turma.

As Turmas guardam datas e participantes.

O Evento pode ser concluído no modo COLABORADOR ou no modo GESTOR.

No modo COLABORADOR, a conclusão passa por validação do Gestor criador.

No modo GESTOR, o Gestor criador registra a conclusão.

Somente o Gestor criador valida as conclusões de seu Evento.

O Gestor criador não participa do próprio Evento.

Toda conclusão pode utilizar evidências.

São permitidas até 3 evidências.

A evidência pode ser opcional ou obrigatória.

Quando obrigatória, pelo menos uma evidência é exigida.

Se um Evento concluído possui NR, o ASTRO calcula validade usando o tempo de reciclagem da NR.

Formulários são criados por Gestores, sempre pertencem a uma Unidade e podem opcionalmente possuir uma NR da própria Unidade.

Formulários são respondidos pelo Gestor no Mobile com localização ativa e não geram Conformidade individual.

O Chat conecta Gestores e Colaboradores.

O chatbot atende Gestores e Colaboradores, consulta Conformidades e é somente leitura.

Notificações e indicadores fazem parte do produto, mas regras detalhadas ainda precisam de formalização.

A IA pode apoiar análise de NRs da empresa e por Cargo, sempre de forma assistiva e revisável.

A IA não cria obrigações automaticamente.

A decisão final continua humana.

O Gestor do Workspace é único e pode transferir a principalidade para outro Gestor.

Quando a transferência normal não é possível, existe fluxo excepcional com análise da equipe ASTRO.

---

# 82. Declaração final de fonte de verdade funcional

Este documento é a **fonte de verdade funcional consolidada do ASTRO em 23/09/2026**, considerando o memorial-base e todas as decisões aprovadas nesta conversa.

Ele deve ser utilizado para compreender:

- o que é o ASTRO;
- quem utiliza o produto;
- quais são os papéis;
- quais são as permissões;
- quais features existem;
- como os principais fluxos funcionam;
- como Conformidades funcionam;
- como Eventos funcionam;
- como evidências funcionam;
- como Formulários funcionam;
- como Chat e chatbot funcionam;
- como importações funcionam;
- como a IA deve atuar;
- quais decisões estão fechadas;
- quais pontos ainda precisam de definição.

Este memorial **não documenta banco de dados**.

Nenhum agente deve reintroduzir definições antigas que foram substituídas nesta conversa.

Quando um comportamento não estiver definido aqui, deve-se pedir nova decisão em vez de inventar uma regra.
