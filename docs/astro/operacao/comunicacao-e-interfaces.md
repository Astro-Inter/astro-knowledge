# Comunicação e interfaces do ASTRO

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 45–49 e 54–57.

## Chat e chatbot

| Recurso | Público e função | Limites |
| --- | --- | --- |
| Chat | Comunicação operacional entre Gestor e Colaborador. | Não há Chat direto Colaborador ↔ Colaborador; não altera Conformidade, NR ou Evento diretamente. Regras avançadas estão em aberto. |
| Chatbot | Disponível para Colaboradores e Gestores, com foco em consultar e compreender o estado das Conformidades, pendências e situação atual. | Somente leitura de informações autorizadas, dentro do escopo permitido. |

O chatbot não cria, edita ou exclui dados; não valida nem registra conclusões; não altera Conformidades, NRs, Eventos ou cadastros; não executa escrita no sistema. Essa é uma regra do chatbot do produto ASTRO descrito no memorial.

## Notificações, alertas e indicadores

Notificações e alertas fazem parte do produto para acompanhamento de situações relevantes. Ainda não estão fechados gatilhos, tipos, leitura, retenção, push, navegação, comportamento após interação e conjunto definitivo de Notificações.

“Próximo do vencimento” é um conceito funcional de alerta/indicador, mas seu intervalo exato não está fixado.

Gestores podem visualizar indicadores em dashboards, cards, big numbers, gráficos e resumos de Conformidade e operação. As métricas definitivas dependem de aprovação; um protótipo não as transforma em regra oficial.

## Canais

| Canal e contexto | Funcionalidades descritas |
| --- | --- |
| Web — Gestor | Criação/configuração do Workspace; importação de Colaboradores; gestão de Cargos, Unidades, NRs, Gestores e Conformidades; validade manual por input/planilha; criação/configuração de Eventos e Formulários; configurações da empresa e indicadores. |
| Mobile — Colaborador | Consulta de Eventos, NRs e Conformidades; conclusão quando permitida; evidências; alertas e Notificações conforme disponíveis; dados cadastrais; Chat com Gestores e chatbot de leitura. |
| Mobile — Gestor | Funções de Colaborador e funções adicionais: validar conclusões dos Eventos que criou, registrar quando permitido, consultar Colaboradores, NRs e Conformidades, responder Formulários, usar Chat, visualizar indicadores e usar chatbot de leitura. |

As operações administrativas respeitam o papel. A conta do Gestor continua única, conforme [Workspace e papéis](../acesso/workspace-e-papeis.md).

## Perfil

Foto de perfil não é requisito funcional. Sua ausência não impede usar o produto.

## Relações

- [Formulários e localização](formularios-e-inspecoes.md) detalha a resposta do Gestor no Mobile.
- [NRs e validade](../conformidades/nrs-e-validade.md) contém os estados que o chatbot consulta.
- [Pendências](../decisoes/pendencias-e-evolucao.md) centraliza as definições abertas de comunicação, alertas e métricas.
