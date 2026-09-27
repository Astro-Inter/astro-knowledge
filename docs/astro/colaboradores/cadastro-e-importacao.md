# Colaboradores — cadastro, acesso e importação

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 9.1, 16–22 e 65–67.

## Cadastro e identidade

Cada Colaborador possui um Cargo, uma Unidade e uma modalidade: `PRESENCIAL`, `REMOTO` ou `HÍBRIDO`. O CPF é único e identifica o Colaborador nas importações. O e-mail continua sendo dado cadastral e é usado no login normal.

Formato da planilha:

```text
NOME | EMAIL | CPF | CARGO | UNIDADE | MODALIDADE
```

## Novo Colaborador por importação

Gestor envia planilha → ASTRO lê CPF → CPF ainda não existe → resolve Cargo e Unidade → valida modalidade → cria Colaborador → sincroniza NRs pelo Cargo → mantém `PRÉ-CADASTRADO` → gera e envia imediatamente Chave de primeiro acesso.

Na criação inicial do Workspace, o sistema cria automaticamente Cargos e Unidades distintos da planilha. Em importações posteriores, não cria silenciosamente valores desconhecidos: o Gestor resolve correspondências por **select no front-end**.

## Atualização de Colaborador existente

Quando o CPF já existe, a planilha sincroniza os dados permitidos.

| Pode atualizar | Não altera automaticamente |
| --- | --- |
| Nome, e-mail, Cargo, Unidade e modalidade | Papel/permissão, senha e status de acesso |

Se o Cargo mudar, recalcula as NRs aplicáveis e as Conformidades. Conflitos adicionais entre CPF, e-mail e registros preexistentes ainda não definidos são [pontos a decidir](../decisoes/pendencias-e-evolucao.md).

## Status de acesso

| Estado | Regra |
| --- | --- |
| `PRÉ-CADASTRADO` | Estado inicial do novo Colaborador. |
| `ATIVO` | Obtido após concluir o primeiro acesso. |
| `DESATIVADO` | Resulta de ação de Gestor autorizado; não há outro mecanismo automático de desativação definido. |

## Primeiro acesso e reenvio

Fluxo: recebe Chave → informa Chave → ASTRO valida → cria senha → torna-se `ATIVO` → Chave é invalidada → entra no sistema. O memorial não exige outras etapas obrigatórias nesse fluxo.

A Chave é gerada e enviada imediatamente no pré-cadastro e expira em **7 dias**. Gestores podem reenviá-la: uma nova Chave é criada e enviada, a anterior é invalidada e começa novo prazo de 7 dias. O uso bem-sucedido também invalida a Chave.

Essa chave é diferente da [Chave de Workspace](../acesso/workspace-e-papeis.md). Após ativação, o login usa **e-mail + senha**, conforme a aptidão de acesso do status.

## Mudança de Cargo

- NR deixou de ser exigida: a Conformidade deixa de ser aplicável.
- NR continua exigida: preserva estado e histórico.
- NR passou a ser exigida: cria ou reativa a Conformidade correspondente.

O histórico anterior permanece. Veja [NRs e validade](../conformidades/nrs-e-validade.md) para as regras de aplicabilidade e reaproveitamento.
