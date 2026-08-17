# Metodologia de entrega e uso de IA na Digihub

A empresa já usa Claude Code no dia a dia. O material de treinamento
`Treinamentos/IA - Automatização de Campos e Criação de um Pré-documento/` traz duas coisas
prontas: um **Spec Kit** de slash commands e uma **skill** de geração de planilhas.
Isso define o padrão de como se trabalha aqui. É para usar, não para reinventar.

## Spec Kit Lecom v1.0

Metodologia Spec-Driven Delivery. Transforma requisito verbal em documentação versionada,
com a regra central de que **nenhuma automação é construída sem alinhamento de negócio e
processo antes**.

### Comandos

| Comando | Fase | Gera |
|---|---|---|
| `/lecom.intake` | D1 discovery | questionário de discovery BPM |
| `/lecom.brief` | D2 discovery | `specs/discovery/BRIEF - {Processo}.md` |
| `/lecom.constitution` | setup | `.lecom/constitution.md` |
| `/lecom.business` | fase 1, alinhamento estratégico | `specs/business/business_spec.md` |
| `/lecom.process` | fase 2, engenharia de processo | `process_spec.md` com `flowchart TD` |
| `/lecom.automation` | fase 3, arquitetura | `automation_spec.md` com flowchart + sequenceDiagram + erDiagram |
| `/lecom.delivery` | fase 5, go-live | `delivery_spec.md` com `gantt` |
| `/lecom.review` | qualquer | relatório de critérios de saída |
| `/lecom.diagram` | qualquer | `projects/{processo}/diagrams.md` |

Discovery é opcional quando o processo já está documentado, obrigatório quando o input é
vago ou verbal.

Instalação em projeto novo: copiar `commands/*` para `.claude/commands/` e criar
`specs/{business,process,automation,delivery}`, `metrics/` e `.lecom/`.

### Fases e critérios de saída

| Fase | Nome | Só sai quando |
|---|---|---|
| 1 | Alinhamento Estratégico | Business Spec aprovada pelo cliente |
| 2 | Engenharia de Processo | Process Spec aprovada e processo simplificado |
| 3 | Arquitetura de Automação | Automation Spec aprovada, integrações mapeadas |
| 4 | Build Estruturado | validação funcional concluída em Modo Teste |
| 5 | Go-Live Controlado | produção estabilizada, usuários treinados |
| 6 | Monitoramento | baseline de KPIs em 30/60/90 dias |

### Princípios inegociáveis

1. Business Spec aprovada antes de qualquer spec de processo ou automação
2. Nenhuma automação sem simplificação de processo documentada
3. KPIs mensuráveis definidos antes do build
4. Go-Live exige responsável nomeado e plano de governança
5. Toda entrega gera documentação estruturada e versionada

### Números da plataforma que o kit usa como régua

- Ciclo de vida do processo: **Rascunho → Modo Teste → Ativo → (Suspenso)**
- **51,6% dos processos criados terminam Suspensos.** É o argumento de por que discovery importa
- Complexidade por campos: até 100 baixa, 100 a 200 média, acima de 200 alta e suspeita
- Faixas de uso por ciclos/ano: ENTRY até 120 mil, STANDARD até 240 mil,
  PROFESSIONAL até 420 mil, ADVANCED até 800 mil, ENTERPRISE acima disso

Sinais de processo mal implementado: mais de 200 campos sem justificativa, SLA esperado
igual a zero, tempo demais em Modo Teste, processo ativo com zero ciclos, suspenso logo
após criação.

Alertas que o agente deve emitir sozinho: mais de 200 campos estimados, ausência de SLA por
etapa, cliente em versão **5.40 ou anterior** (risco crítico de upgrade), ausência de KPIs,
etapa sem responsável.

### Cinco perguntas obrigatórias em qualquer spec

1. Nova implantação ou expansão de processos já existentes na Lecom?
2. Qual o processo prioritário a digitalizar e por quê?
3. Volume estimado de instâncias por mês?
4. Há integração com sistema legado (ERP, RH, CRM)?
5. Existe urgência ou data-limite de negócio?

### Regras BPM dos diagramas Mermaid

| Elemento | Sintaxe |
|---|---|
| Início | `([🟢 INÍCIO: descrição])`, único |
| Fim | `([🔴 FIM])`, único, todas as ramificações convergem |
| Etapa humana | `["🧑 Verbo Objeto\n👤 Ator"]` |
| Etapa de robô | `[["🤖 Verbo Objeto\n⚙ Sistema"]]`, `fill:#e8f4f8,stroke:#2980b9` |
| Gateway XOR | `{Condição?}`, exatamente 2 saídas, `fill:#fef9e7,stroke:#f39c12` |
| Gateway AND | `((+))`, saídas em paralelo, `fill:#d5e8d4,stroke:#82b366` |

Proibido: dois gateways ligados direto, gateway no início ou no fim, mais de 2 saídas por
atividade, múltiplos nós de fim, atividade repetida em sequência.
Nome de atividade: no máximo 4 palavras-chave mais o ator.

Documento sempre com data, versão e status `[RASCUNHO]`, `[EM REVISÃO]` ou `[APROVADO]`,
e uma seção de Riscos Identificados.

## Skill lecom-excel-generator v3.2

Gera as duas planilhas que alimentam `automatizar_campos.py`, o script que configura campos
de processo em massa dentro de um arquivo `.atos`.

Estrutura de pastas que a automação espera:

```
processos/            o arquivo .atos do processo
automacao/            automatizar_campos.py e lecom_wrapper.py
.lecom_temp/          especificacao_<processo>.xlsx e mapeamento_<processo>.xlsx
.lecom_temp/saida/    o .atos configurado
```

### Planilha 1 - Especificação de campos

Obrigatórias: `Tipo`, `Identificador do campo`, `Identificador do agrupador`,
`Quebra de linha` (`Sem quebra` / `Com quebra` / `Com barra separadora`).
Opcionais: label do campo e do agrupador, texto de ajuda, exibir na pesquisa, exibir no
resultado, campo pessoal ou sensível, tamanho, máscara, prefixo, exibir em grid e
identificador da grid.

Tipos válidos: `Label`, `Linha`, `Lista`, `Data`, `Inteiro`, `Monetario`, `Decimal`,
`Caixa`, `Radio button`, `Template`.

Validações que quebram tudo se erradas:

- identificador só aceita `A-Z`, `0-9` e `_`. Sem acento, espaço ou caractere especial
- identificador não pode repetir
- `Caixa` usa tamanho `linhas;colunas`, máximo `15;80`
- `Exibir em grid = Sim` exige `Identificador da grid`
- agrupador é sempre obrigatório

Campo `Label` também leva tamanho da fonte, alinhamento, cor de fundo e cor da fonte
(hex sem `#`).

### Planilha 2 - Mapeamento campo x atividade

A partir da v3.2 cada atividade ocupa **3 colunas**:
`Atividade_ALIAS`, `Inicializa_ALIAS`, `VlrValor_ALIAS`.
O ALIAS é o identificador técnico da etapa dentro do `_E.xml` do `.atos`.

Status de visibilidade (`Atividade_ALIAS`):

| Código | Significado |
|---|---|
| `N` | normal, editável |
| `SL` | somente leitura |
| `O` ou `O:A` | obrigatório na aprovação |
| `O:R` | obrigatório na rejeição |
| `O:T` | obrigatório em qualquer decisão |
| `I` | invisível, sem ocupar espaço |
| `C` | oculto, é o padrão quando vazio |

Inicialização (`Inicializa_ALIAS`): `S` sem valor (padrão), `C` valor fixo,
`R` resultado de SELECT SQL, `J` integração, `A` integração de API.
`VlrValor_ALIAS` só é obrigatório com `C` ou `R`. Em `Lista` e `Radio button` com `C`,
as opções vão separadas por `;`. Com `R`, vai o SQL completo.

Padrões comuns:

| Situação | Status | Inicializa | VlrValor |
|---|---|---|---|
| Solicitante preenche, demais só veem | `O:A` / `SL` | `S` | vazio |
| Lista com opções fixas | `O:A` | `C` | `Op1;Op2;Op3` |
| Lista vinda do banco | `O:A` | `R` | `SELECT cod, desc FROM tabela` |
| Campo sempre oculto | `C` | `S` | vazio |

A skill manda coletar **por atividade e não por campo** ("na atividade SOLICITAR, quais
campos o usuário preenche?"), e traduzir a linguagem do usuário: "campo de texto" é `Linha`,
"dropdown" é `Lista`, "upload" é `Template`, "select do banco" é `Inicializa=R`.

Regra de conduta importante: **gerar os Excels sem pedir confirmação, mas nunca executar a
automação antes do usuário validar os arquivos.**

## Roberty - RPA e agentes de IA

Roberty Automation é a empresa de RPA do grupo (CEO Adriano Bortoli). O Roberty Studio é
no-code para as áreas de negócio, com mais de 500 integrações, e tem modo "smart-code" com
Python e Node.js para desenvolvedor. Também permite publicar agentes de IA com
conhecimento, ferramentas, governança e RPA no mesmo desenho.

O discurso comercial: RPA faz tarefa repetitiva por regra, IA interpreta documento e
linguagem natural, e o agente junta os dois orquestrando sistemas e pessoas.
Casos-tipo apresentados: fechamento financeiro, onboarding de RH, N1 de TI com
escalonamento, pré-vendas, campanhas de marketing, análise de contrato, auditoria contínua,
gestão de pedidos e atendimento ao cliente. Cada um "orquestrado por um key user" da área.

Tem material de certificação em `Roberty/Certificação/` e uma gravação
`Roberty Bate papo Agent AI - 20260619.mp4`.
