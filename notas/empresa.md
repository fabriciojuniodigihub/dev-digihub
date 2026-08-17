# Digihub Tecnologia - dossiê

Levantado em 16/08/2026 a partir de fontes públicas e dos prints do Discord interno.
Início na empresa: **17/08/2026**, área de **Serviços**.

## Identificação

| Item | Valor |
|---|---|
| Razão social | Digihub Inovação e Tecnologia Ltda |
| CNPJ | 39.495.842/0001-05 |
| Abertura | 20/10/2020 |
| Endereço | Rua Engenheiro Oersted Barbosa da Silva, 107 - Jd. Progresso, Bauru/SP, 17064-220 |
| Site | digihub.com.br |
| Porte | pequeno, faixa de 13 a 20 pessoas (LinkedIn declara 2-10) |
| CNAE principal | suporte técnico, manutenção e outros serviços de TI |

Posicionamento declarado: "HUB de empresas que oferecem soluções com foco em inovação e tecnologia".
Slogan: "Inovar através da tecnologia é o que nos conecta".

## Pessoas

| Nome | Papel |
|---|---|
| Cassiano de Arruda Brando | CEO / Diretor de Operações, sócio administrador |
| Erich Queiroz da Silva | sócio, também COO da Lecom (aparece no Discord como Erich Silva) |
| Haislan Bergamo Lima | Head de Serviços, gestor direto da área (ex-IBM Brasil, ex-Lecom, ex-Verity, MBA FGV) |

Contato de RH: rh@digihub.com.br

## O grupo econômico

A Digihub faz parte do ecossistema **Lecom**, grupo de hiperautomação sediado em Bauru:

- **Lecom Tecnologia** - plataforma BPM/RPA/IA, a base técnica de quase tudo
- **Ikatec** - integradora
- **Yank Solutions** - RPA, adquirida em jan/2025
- **Roberty Automation** - motor de RPA da plataforma
- **ViewB** - parceira
- **Digihub** - produtos próprios e serviços sobre a plataforma Lecom

Movimentos recentes: jul/2024 os sócios da Ikatec mais Tiago Amor compraram 75% da Lecom por
R$ 110 mi. Jan/2025 veio a Yank. Receita do grupo passou de R$ 140 mi, meta de R$ 220 mi
até o fim de 2026 e IPO projetado para 2030.

Consequência prática: muita coisa que a Digihub entrega roda **sobre a Plataforma Lecom**, e o
suporte de segundo nível às vezes vai parar na Lecom (visto no Jira, chamado SD-2602 sendo
tratado junto com joao.amorim@lecom.com.br).

## Produtos da Digihub

### GOL - Gestão OnLine de Performance
Software de análise, gerenciamento e execução de KPIs de planejamento estratégico.
Pelos testes no canal #qa, tem módulos de **BSC**, **SWOT** e **Hoshin Kanri** (plano de ação,
visão geral, objetivos). Usa RabbitMQ entre back e front.
Clientes citados no site: Grupo Votorantim, Suzano, CBA, Lorenzetti, Bom Peixe.

### Governance
Documentação e desenho de arquitetura organizacional: áreas, pessoas, cargos, processos,
sistemas, serviços e produtos, com versionamento e controle de acesso. Serve para análise de
impacto (troca de sistema, reestruturação, fusão), quadro de pessoal, faixas salariais e
padronização de processos com diagramas BPM.

### Portal de Serviços
Portal externo white label para clientes e fornecedores abrirem e acompanharem solicitações
sem entrar na operação interna.

- Usuário comum: abre solicitações, acompanha, altera cadastro, anexa documentos, comenta,
  recebe notificação por e-mail, faz autocadastro
- Administrador: cadastra usuários e configura white label (cores, servidor de e-mail,
  catálogo de serviços, categorias, parâmetros)
- Autenticação: **OAuth padrão, OAuth PKCE, GOV.BR e validação via API própria**
- Integra com a Plataforma Lecom por APIs de comunicação
- Clientes citados: Sicoob Crediminas, Royal FIC

### Cadastro Fácil
Low-code de cadastros: drag-and-drop para montar formulários e tabelas, CRUD, importação e
exportação por planilha em um clique, API REST e controle de permissões.
Também existe como módulo dentro da Plataforma Lecom (v5.70).
Setores citados: governo (gov.br), logística, financeiro (Digio), indústria.

## Stack declarada nas vagas

BPM, integração via APIs, **Java, JavaScript, SQL, RPA**. Suporte via Atlassian (Jira Service
Desk). Monitoramento com Zabbix. Mensageria com RabbitMQ.
