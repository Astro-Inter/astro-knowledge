# Eventos, Turmas, conclusões e evidências

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 30–41 e 68–69.

## Estrutura do Evento

Eventos são criados por Gestores para acompanhar treinamentos, cursos, capacitações, reciclagens e outras atividades. Cada Evento tem um único Gestor criador e pode possuir **zero ou uma NR**.

Todo Evento tem ao menos uma Turma, podendo ter várias. Cada Turma organiza participantes, data inicial, data de término e contexto da realização. Datas pertencem às Turmas; Colaboradores participam por meio delas, sem participação paralela diretamente no Evento.

Evento sem NR continua válido e pode ter Turmas, participantes, conclusões e evidências; **não gera validade de NR nem Conformidade**.

## Responsabilidade do criador

O Gestor criador é o responsável pelo Evento, é o único Gestor que valida suas conclusões e não pode participar do mesmo Evento como Colaborador. Outro Gestor não assume essa validação automaticamente.

## Modos de conclusão

| Modo | Fluxo |
| --- | --- |
| `COLABORADOR` | Colaborador envia conclusão → `PENDENTE` → Gestor criador valida → `CONCLUÍDO` ou `REJEITADO`. |
| `GESTOR` | Gestor criador registra conclusão → `CONCLUÍDO`. |

No modo Colaborador, uma rejeição permite reenvio e retorno a `PENDENTE`. Antes do primeiro envio, a participação pode existir sem conclusão. Os estados reconhecidos de conclusão são `PENDENTE`, `CONCLUÍDO` e `REJEITADO`.

## Evidências e certificados

- Evidência está sempre disponível; o Evento define se ela é opcional ou obrigatória.
- Cada conclusão aceita **até três evidências**.
- Quando obrigatória, é preciso ao menos uma evidência para aceitar a conclusão.
- Quando opcional, a conclusão pode ser enviada sem evidência, mas Colaborador ou Gestor pode anexá-la.
- Certificado pode ser uma evidência; não exige módulo obrigatório separado.
- Um certificado não substitui a validação do criador no modo que exige análise.

## Fluxo operacional

No modo Colaborador: cria Evento → define NR opcional, modo e obrigatoriedade de evidência → cria ao menos uma Turma → adiciona participantes → Colaborador envia conclusão → verifica evidências → fica pendente → criador valida ou rejeita → se concluído e houver NR, calcula validade e compara com a atual.

No modo Gestor: cria Evento e Turma → adiciona participante → criador registra conclusão → fica concluído → se houver NR, calcula validade e compara com a atual.

Para Evento com NR e conclusão válida, a fonte define a validade como **data de validação + tempo de reciclagem da NR**. O Gestor não escolhe esse tempo dentro do Evento. A regra de [maior validade](../conformidades/nrs-e-validade.md) prevalece.

## Edição e cancelamento

O Evento não deve ser livremente editado após a criação. Quando necessário, pode ser cancelado, preservando registro, histórico, motivo e contexto para rastreabilidade.

Os estados funcionais são `ATIVO` e `CANCELADO`. Situações como agendado, em andamento ou finalizado podem ser derivadas das Turmas e datas, sem edição manual de status. O memorial não enumera campos editáveis nem detalha efeitos de cancelamento sobre cada conclusão; veja os [limites da fonte](../decisoes/pendencias-e-evolucao.md).

## Relações

- [NRs e validade](../conformidades/nrs-e-validade.md) distingue o estado atual da Conformidade do histórico de conclusões.
- [Workspace e papéis](../acesso/workspace-e-papeis.md) descreve as permissões adicionais do Gestor.
