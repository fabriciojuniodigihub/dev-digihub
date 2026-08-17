# dev_digihub

Pasta de trabalho da Digihub Tecnologia. Início em 17/08/2026, área de Serviços.

`CLAUDE.md` tem as regras de como trabalhar aqui. Ler primeiro.

## Notas

### A empresa e o trabalho

| Arquivo | Assunto |
|---|---|
| [empresa.md](notas/empresa.md) | a Digihub, o grupo Lecom, produtos, pessoas |
| [ferramentas-e-canais.md](notas/ferramentas-e-canais.md) | Discord, Jira, Zabbix |
| [acessos-mapa.md](notas/acessos-mapa.md) | índice de acessos por cliente (confidencial) |
| [time-e-padroes-de-codigo.md](notas/time-e-padroes-de-codigo.md) | quem escreve o quê, cabeçalho `@author`, defeitos do legado |
| [referencias-externas-e-premios.md](notas/referencias-externas-e-premios.md) | prêmios do grupo, código público de Lecom no GitHub |

### Plataforma Lecom

| Arquivo | Assunto |
|---|---|
| [plataforma-lecom.md](notas/plataforma-lecom.md) | módulos, documentação oficial, API REST |
| [lecom-tecnico.md](notas/lecom-tecnico.md) | microserviços, robôs e integrações no modelo antigo |
| [arquivo-atos.md](notas/arquivo-atos.md) | o `.atos` por dentro, os 15 XML e o ALIAS das etapas |
| [ambiente-servidor-e-memoria.md](notas/ambiente-servidor-e-memoria.md) | dimensionamento, memória por serviço, full GC |
| [api-js-formulario.md](notas/api-js-formulario.md) | API JavaScript do formulário 5.70, referência completa |
| [robos-e-integracoes.md](notas/robos-e-integracoes.md) | rotas-open-api, WFMail, DBUtils, JSPadrao |
| [devops-gitlab.md](notas/devops-gitlab.md) | GitLab, branches por ambiente, Spring Boot (5.60+) |
| [portal-de-servicos-api.md](notas/portal-de-servicos-api.md) | API do Portal de Serviços |
| [cookbook-lecom-7.0.md](notas/cookbook-lecom-7.0.md) | todos os exemplos de código da doc 7.0 |
| [cookbook-lecom-6.0.md](notas/cookbook-lecom-6.0.md) | idem para a 6.0 |

### Treinamento oficial (transcrito dos 10 módulos)

| Arquivo | Assunto |
|---|---|
| [treinamento-01-introducao.md](notas/treinamento-01-introducao.md) | BPMS x RPA, fluxograma de negócio virando formulário |
| [treinamento-02-workspace.md](notas/treinamento-02-workspace.md) | visões, SLA por atividade, ciclo, status, modo teste |
| [treinamento-03-admin-sso.md](notas/treinamento-03-admin-sso.md) | permissões, atosmaster, calendário, SSO |
| [treinamento-04-ecm.md](notas/treinamento-04-ecm.md) | template, metadados, dossiê, check-in/check-out |
| [treinamento-05-studio-1.md](notas/treinamento-05-studio-1.md) | versões, gerar tabela, exportar `.atos` |
| [treinamento-06-studio-2.md](notas/treinamento-06-studio-2.md) | diagrama, gateways, concentradora, responsáveis |
| [treinamento-07-studio-3.md](notas/treinamento-07-studio-3.md) | campos, limites, cíclico, lupa por select e API |
| [treinamento-08-studio-4-e-banco.md](notas/treinamento-08-studio-4-e-banco.md) | grid, regras de tela e **o modelo de dados completo** |
| [treinamento-09-javascript.md](notas/treinamento-09-javascript.md) | padrão de JS da casa, um arquivo por processo |
| [treinamento-10-integracao-e-robo.md](notas/treinamento-10-integracao-e-robo.md) | integração e robô em Java, GitLab, boas práticas |
| [studio-modelagem.md](notas/studio-modelagem.md) | regras de formulário, cadastro de JS, publicação |

### Produtos e IA

| Arquivo | Assunto |
|---|---|
| [produto-governance.md](notas/produto-governance.md) | pilares, elementos, setup por JSON |
| [produto-cadastro-facil.md](notas/produto-cadastro-facil.md) | módulo à parte, API REST, argumento de venda |
| [roberty-plataforma.md](notas/roberty-plataforma.md) | Studio, Designer, Runner, ações, parâmetros, workspace |
| [roberty-lecom-integracao.md](notas/roberty-lecom-integracao.md) | as 4 ações no-code que ligam o Roberty ao BPM |
| [roberty-agentes-de-ia.md](notas/roberty-agentes-de-ia.md) | RPA x agente, guardrails, camada de acesso via RPA |
| [metodologia-e-ia.md](notas/metodologia-e-ia.md) | Spec Kit Lecom, skill de campos, Roberty |
| [automatizacao-de-campos.md](notas/automatizacao-de-campos.md) | as duas planilhas, o script Python e a skill |

## Pessoal

[pessoal/](pessoal/) guarda a assinatura de e-mail e o que for meu, fora de cliente e estudo.

## Clientes

[clientes/](clientes/) tem uma pasta por cliente, a Lecom entre eles, cada uma dividida em
`javascript/`, `robos/`, `integracoes/`, `sql/`, `atos/`, `rpa/` e `chamados/`.
Índice em [clientes/README.md](clientes/README.md).

## Provas e exercícios

[projetos/](projetos/) tem a certificação Roberty resolvida e os exercícios do treinamento
Lecom, com os testes rodando. Índice em [projetos/README.md](projetos/README.md).

## Material

- `material/EquipeTecnica/` — o pacote do Drive, extraído
- `material/zips/` e `material/videos/` — os originais do download
- `material/_texto_extraido/` — PDF, DOCX e XLSX convertidos em texto
- `material/_docs_lecom/` — 1.123 páginas do Confluence e 210 da referência de API
- `material/_docs_roberty/` — 720 páginas da documentação oficial do Roberty
- `material/_projetos_exemplo/` — projetos Java de referência
- `material/_audio/` e `material/_transcricoes/` — os 14 vídeos transcritos

O que chegar novo entra em `material/` seguindo o [LEIA-ME](material/LEIA-ME.md).

## Pendências

- `sendPortalServicos.java`, citado no manual do Portal, não veio no pacote (só o link do Drive
  dentro do PDF)
- confirmar a versão da plataforma de cada cliente, para saber quem já usa o DevOps do GitLab
  e quem ainda está no `.jar` manual
- pedir acesso ao GitLab dos ambientes (é por chamado na Lecom)
- credenciais de cliente estão em texto plano em `material/`. O time usa Bitwarden; vale
  perguntar se essa pasta deveria estar lá
