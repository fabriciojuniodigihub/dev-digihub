# Roberty - a plataforma

Baseado na documentação oficial (`docs.roberty.app`), 720 páginas baixadas em 17/08/2026 para
`material/_docs_roberty/`. Complementa [roberty-agentes-de-ia.md](roberty-agentes-de-ia.md),
que veio da gravação e cobre o discurso e os agentes.

Acesso: `studio.roberty.app`.

## As três peças

| Peça | O que é |
|---|---|
| **Roberty Studio** | onde se constrói. Tem RPA, Code, IDP, Agentes de IA, Workspace, Atividade e Perfil |
| **Designer** | o editor de um robô, com o fluxo de ações |
| **Runner** | aplicação instalada na máquina que **executa** os robôs |

A frase que resume: o Designer é onde você constrói, o Runner é onde ele roda.

## Anatomia de uma ação

Toda ação é um card com ícone, título e um **ID** (`#abrirNavegador`). O ID é o que outras ações
usam para pegar o retorno dela, e por isso é a coisa mais importante da tela.

O painel de configuração tem cinco partes: identidade (ID e versão), parâmetros de entrada,
**campos de saída**, opções de execução e salvar.

Dois detalhes que quebram fluxo:

- **trocar o ID depois que outras ações já referenciam quebra as referências.** Definir o ID
  antes de encadear
- o retorno só fica disponível para as outras ações se o **checkbox do campo de saída estiver
  marcado**. Marcar só o que vai usar

Nas opções de execução dá para escolher se o robô para em caso de erro (se não, ele pula a ação)
e quantas tentativas fazer antes de considerar falha.

## Encadeamento

A sintaxe é `idDaAcao.campo`. Só aparecem para seleção as ações que estão **antes** no fluxo.

Em campo de código, o acesso é direto pelo objeto `actions`:

```javascript
const texto = actions["obterTexto"]["value"];
const mensagem = `${actions["lerNome"]["value"]} - ${actions["lerCodigo"]["value"]}`;
return mensagem;
```

A documentação bate na tecla de usar ID descritivo: `abrirNavegador`, `obterCampoSenha`,
`fazerLogin`, nunca `action1`, `action2`.

## Tipos de campo

O mais importante é o **campo dinâmico**, que aceita seis origens de valor: texto fixo, número,
**código** (JavaScript), retorno de outra ação, **parâmetro do robô** e variável.

Existe também o **seletor de modo** (`Selecione a ação:`), que muda quais campos aparecem. A
documentação avisa: preencher ele **primeiro**, senão os outros campos nem existem ainda. É esse
campo que, no `Obter texto do elemento`, decide entre buscar por seletor ou ler de um elemento já
capturado.

Cuidado com campo de código no Windows: é JavaScript de verdade, então caminho de arquivo precisa
de barra invertida dobrada (`\\`).

## Elementos e seletores

Seletor CSS identifica o elemento na página. A forma recomendada de capturar é a **extensão
Roberty para Chrome**: botão direito no elemento, `Roberty Automation` e `Selecionar Elemento`,
que copia o seletor.

O conselho de estabilidade é o mesmo de qualquer automação web: seletor curto e baseado em id
(`#btnLogin`) aguenta mudança de página; seletor longo com vários níveis quebra fácil. Quando o
robô começar a falhar numa ação de navegador, o provável é que a página mudou e o seletor precisa
ser recapturado.

## Parâmetros e segredos

Parâmetro é variável do robô: credencial, caminho de pasta, token. Fica fora do fluxo, e mudar o
valor não exige mexer no robô.

Marcando **tratar como segredo**, o valor some de vez, nem quem criou vê depois, só dá para
sobrescrever.

Duas sintaxes, e a diferença entre elas importa:

```
{{PARAMETROS.nome}}    processado em tempo de compilação, o valor VAI para o código compilado
{{SEGREDOS.nome}}      para valor realmente oculto
```

Ou seja, senha em `{{PARAMETROS}}` não está protegida de verdade. Tem que ser segredo.

Pegadinha de infraestrutura: **parâmetro do tipo senha fica armazenado na máquina**. Desvinculou
o dispositivo, perdeu os segredos, e eles precisam ser digitados de novo.

## Tratamento de erro

Duas camadas.

Na ação, as opções de execução (parar ou não, número de tentativas).

No robô, a **sub-rotina de exceção**: quando dá erro não tratado, o fluxo principal para, o robô
chama a sub-rotina configurada e só então encerra com status de erro. É o `catch` do robô.

As boas práticas que a documentação lista, e que valem: manter simples e rápida, só notificar e
registrar; não usar ações que também podem falhar; identificar de qual robô veio o erro, já que a
sub-rotina é reaproveitada; e dados de contato vindo de parâmetro, não chumbados.

## Runner

Roda em segundo plano na máquina e atende comando do Studio, webhook, WhatsApp e agendamento.
Gerencia fila de execuções, controla o Chrome e conversa com banco local para log e fila.

Tem um **painel de admin** web local (`http://localhost:PORTA`, protegido por senha definida na
instalação), com abas de configuração (automação de navegador via CDP, gerenciador de Chromium,
banco de dados, proxy, WhatsApp, health monitor) e de monitoramento (fila de execuções e
agendamentos).

**Alteração em aba de configuração exige reiniciar o Runner.**

## Workspace

**Conexões** são credenciais guardadas uma vez e reaproveitadas: bancos (MySQL, PostgreSQL, SQL
Server, Oracle, Firebird, MongoDB), Microsoft 365, Google Workspace e provedores de IA (OpenAI,
Anthropic, Gemini). Só administrador cria.

Detalhe que confunde: criar a conexão no workspace **não basta**. O robô precisa da ação de
conexão correspondente no Designer (`Conexão do MySQL`, `Conexão do SharePoint`, e assim por
diante) antes de usar as demais ações daquele serviço.

**Dispositivos** são as máquinas com Runner vinculado, com status online, offline ou obtendo.

**Papéis**, só três: Administrador (tudo, incluindo membros, conexões e dispositivos),
Desenvolvedor (cria e edita robôs, sub-rotinas, pastas e agentes) e Usuário (só visualiza
workspace, robôs e histórico).

## Catálogo de ações

São **466 ações no-code em 52 categorias**. O catálogo completo, com a descrição de cada uma,
está em `material/_docs_roberty/_CATALOGO-ACOES.md`.

As categorias que mais importam aqui:

| Categoria | Ações | Para quê |
|---|---|---|
| `browser` | 41 | automação web, inclusive resolução de captcha e extração por IA |
| `office__excel` | 29 | Excel local |
| `documents__spreadsheet` | 18 | planilha sem Office instalado |
| `imageRecognition__advancedOCR` | 16 | OCR de formulário, tabela, linha, palavra |
| `database__*` | 65 | seis bancos, cada um com conexão, query e forEach de resultado |
| `my-robot` | 14 | controle de fluxo: loop, decisão, try/catch, sub-rotina, delay, esperar ação humana |
| `functions` | 13 | manipulação de texto, data, número, lista |
| `lecom` | 4 | integração com o BPM, ver a nota específica |
| `ai` | 1 | `Perguntar para IA`, com contexto |

Fora do no-code existe o modo **code**, com Python e Node.js, e a documentação tem tutorial de
bibliotecas externas para os dois.

## Detalhes que já me pouparam erro

**`Loop` conta a partir de 1, lista de elementos indexa a partir de 0.** Para percorrer o
resultado de um `Obter vários elementos` dentro de um `Loop`, o índice é `count - 1`.

**`Obter vários elementos` devolve `.elements` e `.size`.** O `size` volta 0 quando não acha nada,
sem gerar erro, então dá para testar antes de entrar no loop.

**`Obter texto do elemento` tem três modos.** Por navegador (busca pelo seletor), por elemento
(o "elemento já selecionado", lê de um `Obter elemento` anterior) e por lista de elementos.

**Excel não salva sozinho.** `Definir valor de uma linha` altera em memória; sem `Salvar arquivo`
no fim, o arquivo sai vazio.

## Modo agente, resumido

Coberto em detalhe na outra nota. O que a documentação acrescenta ao que veio da gravação:

- **argumentos** de entrada e saída, com tipos (texto, número, data, booleano, arquivo, JSON), e
  os de entrada marcados como "Exibir na UI" geram um **formulário automático** antes do chat
- argumento entra no prompt com `{NomeDoArgumento}`
- o agente tem ação de **executar ferramenta MCP**, além de executar RPA e chamar API
- `Executar RPA` exige **token de webhook** configurado no robô, e tem timeout padrão de 60 s
- integrações de canal: Discord, Teams, Telegram e WhatsApp
- existe memória, versões, conjuntos de teste e uma "danger zone" nas configurações
