# Pendências e evolução funcional

> Síntese do [memorial de 2026-09-23](../fontes/memorial-descritivo-funcional-2026-09-23.md), seções 21.5, 43–44, 47–49 e 77–80. As lacunas adicionais abaixo foram identificadas durante a leitura e não são decisões aprovadas.

## Pontos explicitamente reservados para V2 ou decisão futura

| Tema | Definição ainda necessária | Nota relacionada |
| --- | --- | --- |
| Formulários | Tipos oficiais de pergunta e resposta; versionamento. | [Formulários e inspeções](../operacao/formularios-e-inspecoes.md) |
| Localização | Eventual geofence/raio e suas regras, caso o produto venha a adotá-lo. O registro de localização já é exigido. | [Formulários e inspeções](../operacao/formularios-e-inspecoes.md) |
| Chat | Regras avançadas. | [Comunicação e interfaces](../operacao/comunicacao-e-interfaces.md) |
| Notificações | Gatilhos, tipos, leitura, retenção, push, navegação, comportamento após interação e conjunto definitivo. | [Comunicação e interfaces](../operacao/comunicacao-e-interfaces.md) |
| Vencimento | Critério exato de “próximo do vencimento”. | [NRs e validade](../conformidades/nrs-e-validade.md) |
| Indicadores | Métricas definitivas aprovadas. | [Comunicação e interfaces](../operacao/comunicacao-e-interfaces.md) |
| Telas | Documentação oficial completa. | [Visão geral](../produto/visao-geral.md) |
| APIs | Contratos formais após amadurecimento da implementação. | [Visão geral](../produto/visao-geral.md) |
| Importação cadastral | Tratamento de conflitos adicionais entre CPF, e-mail e registros preexistentes ainda não redefinidos. | [Cadastro e importação](../colaboradores/cadastro-e-importacao.md) |

Não foram adicionados prazos de vencimento, métricas, tipos de perguntas, raios de geofence ou políticas de Notificação por suposição.

## Limites e ambiguidades encontrados na leitura

Estes itens não são uma lista oficial adicional de V2; apontam detalhes que a fonte não resolve completamente:

- **Conformidade existente e não aplicável na importação:** a seção 29 usa “já aplicável/existente”; o fluxo rejeita a linha quando a Conformidade não existe. O comportamento para um registro existente, mas não aplicável, não está detalhado de modo inequívoco. Não interpretar isso como autorização para reativar uma obrigação pela planilha.
- **Base temporal no modo Gestor:** a seção 41 usa “data de validação” no cálculo; o modo Gestor registra diretamente como concluído. O detalhe operacional de qual instante representa essa data nesse modo não está especificado. A nota mantém a fórmula original, sem substituir por término da Turma ou envio de evidência.
- **Edição e cancelamento de Evento:** a fonte restringe edição livre e exige preservação do histórico, mas não enumera campos editáveis nem detalha todos os efeitos do cancelamento sobre conclusões e validades anteriores.
- **Substituição do Gestor criador:** outro Gestor não assume automaticamente a validação. A transferência de principalidade do Workspace não define, por si só, um fluxo para transferir essa responsabilidade de Evento.

Consulte o memorial integral e obtenha uma decisão no contexto do produto quando esses detalhes forem necessários, mantendo a distinção entre regra documentada e interpretação.

## Critérios de mudança registrados

Uma proposta deve considerar consistência do produto, isolamento entre Workspaces, preservação do histórico, segurança, simplicidade de UX, fonte de verdade, responsabilidade legal, impacto em permissões e fluxos, duplicação de conceitos e compatibilidade com decisões anteriores.

O memorial declara que uma regra nova o substitui somente quando explicitamente aprovada. Sugestões de tela, UX ou IA e protótipos visuais não equivalem a essa aprovação.

## Fora do escopo desta fonte

Banco de dados, tabelas, schemas, DDL, índices, chaves físicas, relacionamentos físicos e persistência não são documentados pelo memorial. A importação destas anotações não transforma o memorial em especificação técnica dessas áreas.
