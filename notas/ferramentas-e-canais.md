# Ferramentas e canais internos

Levantado dos prints do Discord em 16/08/2026. A comunicação **interna** da empresa é no Discord.

## Discord - servidor DIGIHUB

Cerca de 20 pessoas no servidor. Meu usuário: **Fabrício Júnio** (`fabriciojunio_digihub`).

### Canais de texto
| Canal | Uso |
|---|---|
| #geral | avisos do dia a dia, atrasos, ausências, agenda, recados de fim de semana |
| #zabbix | bot do Zabbix despejando alertas de infraestrutura |
| #jira | bot do Jira Service Desk despejando comentários de chamados |

### Salas
| Canal | Uso |
|---|---|
| #qa | resultado de testes, evidências, anotações de validação |
| #dev | assuntos de desenvolvimento |

Canal de voz: **Geral**. É onde acontece a "semanal" (reunião recorrente) - dá para deduzir
pelas mensagens do tipo "não vou entrar na semanal", "vou entrar atrasado na semanal".

### Grupo de DM "Digihub - Serviços"
10 membros, é o grupo da minha área. Quem administra é o **Haislan Lima** (Head de Serviços),
que anuncia entradas de gente nova. Membros: Cassiano Brando, Fabricio Galvão, Fabrício Júnio,
Getúlio Mira, Haislan Lima, Luis Santos, Marcus Reatti, Maycon Moraes Sene, Renan Pollo,
Rodrigo Souza.

Histórico recente: Fabricio Galvão entrou em 22/06/2026, Luis Santos em 30/07/2026, eu em
17/08/2026 (anunciado em 14/08). A área está crescendo rápido.

### Pessoas e cargos no servidor
| Pessoa | Marcação |
|---|---|
| Cassiano Brando | dono do servidor (coroa) |
| Daniel Negrisoli Batista | DEV |
| alissonDigihub | DEV |
| Getúlio Mira | ENIA |
| Marcus Reatti | REVO |
| Erich Silva, Haislan Lima, Deivis Vargas, Lucas Iankoski, Luis Santos, Maycon Moraes Sene, Renan Pollo, Rodrigo Souza, Tamires Martins, Fabricio Galvão, Alex, Alex - DX4, Matheus Oliveira | sem marcação visível |

ENIA e REVO parecem ser marcações de produto ou squad, ainda não confirmado.

## Jira Service Desk (Atlassian)

Projeto **SD** (Service Desk), chamados no formato `SD-XXXX`. Em 14/08/2026 estavam na faixa
SD-2599 a SD-2603, ou seja, a numeração é contínua e o volume é relevante.

Exemplos reais observados:

| Chamado | Título | O que dá para aprender |
|---|---|---|
| SD-2602 | Erro ao pegar Token Lecom | problema de autenticação do Portal contra a Lecom, resolvido agendando reunião com o cliente para conferir parâmetros de configuração. Participação de joao.amorim@lecom.com.br |
| SD-2599 | Melhoria FV - Programação de pedido | regra de negócio nova, validação de data por segmento e mercado |
| SD-2603 | Suporte FV - Erro ao consultar cliente lista de preço adm | caractere especial no nome do cliente quebrava o link de seleção; correção por tratamento do caractere |

Padrão de nomenclatura dos chamados: `<Tipo> <Produto> - <resumo>`, com tipo sendo
Suporte, Melhoria etc. **FV** é um produto ou cliente recorrente (provavelmente Força de Vendas).

Como o pessoal escreve nos chamados: direto, primeira pessoa, saudação curta ("Boa tarde
Renan, encontrei o problema."), descrição do que causa, o que foi feito, e fecha pedindo o
aceite antes de subir para homologação. Vale copiar esse tom.

Papéis vistos: existe um usuário genérico **"Atendimento"** que triagem e encaminha, e os
técnicos comentam com o próprio nome.

## Zabbix

Monitoramento de infraestrutura com alerta no Discord. Formato do alerta: PROBLEM/OK, host,
event time, severity, operational data, trigger description, event ID e tags
(`class:os`, `component:storage`, `filesystem:/backup`, `scope:availability`, `target:linux`).

Exemplo real: host `backup`, disco `/backup` de 255,88 GB batendo 87,69% de uso, gatilho de
disco acima de 80%, recuperado 18 minutos depois. Servidores Linux.

## RabbitMQ

Mencionado no #qa como mensageria entre back e front do GOL.
