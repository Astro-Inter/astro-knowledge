# Visão geral e princípios do ASTRO

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 1–5, 64, 76 e 78–82.

## Propósito

O ASTRO é um SaaS de gestão de conformidade relacionada às Normas Regulamentadoras (NRs) e aos processos operacionais de Segurança e Saúde no Trabalho. Busca reduzir o trabalho manual de RH, SST e Gestores, centralizando a estrutura da empresa, obrigações, atividades, registros e acompanhamento.

O produto organiza, acompanha, calcula, registra e sugere. A responsabilidade legal da empresa e dos profissionais habilitados permanece humana.

## Terminologia

| Termo | Significado no memorial |
| --- | --- |
| Colaborador | Termo oficial que substitui “Funcionário” nas telas, textos e documentação. |
| Gestor | Colaborador com permissões adicionais; usa a mesma conta. |
| Gestor do Workspace | Responsável administrativo principal, único por Workspace. |
| Workspace | Ambiente organizacional da empresa. |
| Evento | Atividade acompanhada, como treinamento, curso ou reciclagem. |
| Chave de Workspace | Substitui o nome antigo “Licença”; autoriza a criação e o uso legítimo do ambiente. |
| Chave de primeiro acesso | Ativa a conta de um Colaborador recém-cadastrado; é distinta da Chave de Workspace. |
| Conformidade | Estado atual útil de um Colaborador em relação a uma NR. |

## Invariantes funcionais

- A empresa controla seu Workspace; as empresas devem permanecer isoladas entre si.
- Cada Colaborador tem uma única conta, exatamente um Cargo e uma Unidade. Cargo e Unidade devem pertencer ao mesmo Workspace.
- Existe exatamente um Gestor do Workspace. A promoção a Gestor não cria outra identidade.
- O Cargo é a fonte exclusiva de obrigação individual de NR. A Unidade fornece contexto operacional para Formulários e inspeções.
- Uma Conformidade é única por Colaborador + NR. O estado atual e o histórico de conclusões são conceitos distintos.
- As origens de validade são `EVENTO` e `MANUAL`; planilha integra `MANUAL`. A maior validade prevalece.
- Todo Evento tem ao menos uma Turma. Datas e participantes pertencem às Turmas.
- Somente o Gestor criador valida conclusões do Evento e ele não participa do próprio Evento como Colaborador.
- Evento pode não ter NR; nesse caso não gera validade de NR nem Conformidade.
- Evidências estão sempre disponíveis, com até três por conclusão. Quando obrigatórias, exige-se ao menos uma.
- Formulário exige Unidade, pode ter NR da própria Unidade e não gera Conformidade individual.
- Histórico útil deve permanecer quando Cargo, obrigação, validade, Evento, Gestor ou acesso mudar.

## Módulos registrados

Workspace e acesso; Colaboradores; Cargos; Unidades; NRs; Conformidades; Eventos; evidências; Formulários e inspeções; Chat; chatbot; Notificações e alertas; indicadores; IA para NRs; apoio a cálculos; gestão de Gestores.

A existência de um módulo no memorial não fecha todos os seus detalhes. Notificações, indicadores e outros pontos têm [decisões pendentes](../decisoes/pendencias-e-evolucao.md).

## Evolução das regras

O memorial declara que suas decisões consolidadas substituem definições anteriores conflitantes. Protótipos visuais e sugestões de IA não alteram, por si só, regras de negócio. Novas regras dependem de aprovação explícita no contexto do produto.

## Relações

- [Workspace e papéis](../acesso/workspace-e-papeis.md) detalha a estrutura de acesso e as permissões.
- [NRs e validade](../conformidades/nrs-e-validade.md) explica obrigações, estado atual e histórico.
- [Eventos e evidências](../eventos/eventos-turmas-e-evidencias.md) detalha a origem de validade por Evento.
