# Workspace, papéis e principalidade

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 6–10, 50–53 e 74–75.

## Workspace e criação

O Workspace representa a empresa e contém Cargos, Unidades, Colaboradores, Gestores, NRs, Eventos, Formulários, Conformidades e configurações. O CNPJ deve ser único no produto e possuir 14 dígitos.

Fluxo: empresa informa Chave de Workspace → ASTRO valida → cria Workspace → configuração inicial → definição do Gestor do Workspace. Cadastros complementares podem oferecer “Agora não”, desde que o mínimo necessário esteja concluído; o memorial não detalha esse mínimo.

Na criação inicial por planilha, Cargos e Unidades distintos são identificados e criados automaticamente, antes de associar os Colaboradores. Essa exceção não se estende às [importações posteriores](../colaboradores/cadastro-e-importacao.md).

## Papéis e permissões

| Papel | Permissões registradas |
| --- | --- |
| Colaborador | Consulta seus Eventos, NRs, Conformidades e dados; envia conclusão quando permitido e evidências; utiliza Chat com Gestores e chatbot de leitura; visualiza alertas e Notificações conforme disponíveis. |
| Gestor | Mantém as funções de Colaborador e pode criar/configurar Eventos, validar os que criou, registrar conclusões quando permitido, consultar Colaboradores e Conformidades, responder Formulários, fazer importações, registrar validade manual e visualizar indicadores. |
| Gestor do Workspace | Tem as permissões de Gestor, pode promover/adicionar outros Gestores e transferir a principalidade. É único e continua possuindo Cargo, Unidade e a mesma conta de Colaborador. |
| Equipe administrativa ASTRO | Externa à estrutura empresarial dos Workspaces; analisa processos excepcionais, especialmente transferência de principalidade. |

A mesma conta do Gestor permite alternar o contexto de Colaborador e as funcionalidades de gestão compatíveis com o papel. As permissões para validar Eventos continuam restritas ao [Gestor criador](../eventos/eventos-turmas-e-evidencias.md).

## Transferência normal

1. O Gestor do Workspace atual seleciona alguém que já seja Gestor.
2. Confirma a transferência.
3. O novo responsável assume a principalidade e o anterior a deixa.
4. Se continuar na empresa, o anterior pode permanecer como Gestor comum.

A transferência preserva exatamente um Gestor do Workspace.

## Transferência excepcional

Aplica-se quando o responsável foi desligado, perdeu acesso, saiu sem transferir, está indisponível ou impossibilitado, ou recusa indevidamente a transferência.

Outro Gestor abre solicitação/ticket à equipe ASTRO, informa motivo e novo responsável, e envia comprovações. A equipe analisa e, se aprovar, transfere a principalidade. A troca não é automática.

Se o antigo responsável for desligado, seu acesso pode ser desativado, seu histórico permanece e a empresa continua dona do Workspace. A principalidade deve ser resolvida por um dos fluxos descritos.

## Relações

- [Cadastro e primeiro acesso](../colaboradores/cadastro-e-importacao.md) distingue a Chave de Workspace da chave de ativação da conta.
- [Visão geral](../produto/visao-geral.md) reúne os invariantes de conta única e isolamento entre empresas.
