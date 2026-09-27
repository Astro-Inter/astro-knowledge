# NRs, Conformidades e validade

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 11–15, 22–29, 41, 63 e 70–72.

## Cargo, Unidade e catálogo de NRs

Cada Colaborador tem exatamente um Cargo e uma Unidade atuais, do mesmo Workspace. O Cargo é a **fonte exclusiva de NRs individuais obrigatórias**; não há atribuição livre de NR diretamente a uma pessoa. Cargos podem ser criados, consultados, alterados e associados a NRs.

A Unidade tem endereço e NRs contextuais para Formulários, inspeções e operação. Essas associações não geram obrigação individual automaticamente. Unidades podem ser criadas, consultadas e mantidas.

O catálogo de NRs contém código único, título, tempo de reciclagem em meses e indicação de revogação. NR revogada não deve continuar aplicável. A [IA pode sugerir associações](../ia/analise-de-nrs-e-calculos.md), sujeitas à decisão humana.

## Estado atual e histórico

Existe uma única Conformidade por **Colaborador + NR**, acompanhando aplicabilidade, maior validade conhecida, origem atual e estado derivado. A conclusão de Evento registra uma realização específica e permanece no histórico mesmo quando outra validade passa a prevalecer.

Quando a NR passa a ser exigida pelo Cargo, a Conformidade torna-se aplicável. Quando deixa de ser exigida, deixa de ser aplicável e não é apagada. Isso pode ocorrer por mudança de exigência do Cargo, mudança de Cargo, desativação do Colaborador ou revogação da NR. Se voltar a ser exigida, a Conformidade anterior é reaproveitada e reativada.

| Validade atual | Estado descrito no memorial |
| --- | --- |
| Sem validade registrada | Sem validade registrada |
| Igual ou posterior à data atual | Conforme |
| Anterior à data atual | Não conforme |

O limiar de “próximo do vencimento” ainda não está definido.

## Origem e precedência da validade

- `EVENTO`: conclusão válida de Evento associado a uma NR.
- `MANUAL`: validade externa informada por Gestor, tanto por input quanto por planilha.

Planilha não constitui terceira origem.

| Comparação com a validade já registrada | Resultado |
| --- | --- |
| Nova validade maior | Atualiza a validade para a nova data. |
| Nova validade menor | Mantém a validade atual. |
| Mesma validade | Mantém data e origem atuais; não troca a fonte. |

A comparação vale para entradas de ambas as origens.

## Registro manual

Gestor seleciona Colaborador → sistema apresenta NRs do Cargo → Gestor seleciona NR e informa validade → compara com a validade atual → aplica a maior.

O registro manual só vale para NR já exigida pelo Cargo e não cria nova obrigação. Se a data não superar a atual, mantém a atual.

## Importação de validade

```text
CPF | NR | DATA_VALIDADE
```

Resolve Colaborador pelo CPF → resolve NR → procura Conformidade existente → se não existe, rejeita a linha → se existe, processa a data → mantém a maior validade, com origem `MANUAL` quando a atualização prevalecer.

A fonte descreve atuação somente sobre Conformidade “já aplicável/existente”. Não cria obrigação nova. Se **CPF + NR** se repetir no mesmo arquivo, considera a **última ocorrência**, e só depois compara essa data com a validade já registrada. Não se escolhe automaticamente a maior entre as linhas duplicadas do arquivo.

## Validade por Evento

Para Evento com NR e conclusão válida/concluída, calcula:

```text
data de validação + tempo de reciclagem da NR
```

O tempo vem da própria NR e não é escolhido manualmente dentro do Evento. A validade calculada é comparada com a atual; somente a maior prevalece. [Eventos sem NR](../eventos/eventos-turmas-e-evidencias.md) não geram validade de NR nem Conformidade.

## Relações

- [Cadastro e importação](../colaboradores/cadastro-e-importacao.md) mostra como a mudança de Cargo recalcula aplicabilidade.
- [Eventos e evidências](../eventos/eventos-turmas-e-evidencias.md) detalha quando a conclusão se torna válida.
- [Pendências](../decisoes/pendencias-e-evolucao.md) reúne aspectos não formalizados no memorial.
