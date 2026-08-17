# Treinamento Lecom - módulo 08, Studio 4 e banco de dados

Transcrito de `08 - Módulo Studio 4 e DB.mp4` (57 min). Fecha a modelagem com **grid** e
**regras de formulário**, e depois abre o **modelo de dados completo**. É a nota mais útil
para escrever query.

## Campo do tipo grid

Grid é o campo que **repete informação**, como uma planilha dentro do formulário.

Para criar: cria-se o campo normalmente e marca-se **tipo grid**, dando um **identificador da
grid**. Todos os campos que pertencem àquela grid recebem o mesmo identificador.

**Atenção:** depois de criado, **não dá para transformar um campo em grid ou tirar de grid**.
O campo fica bloqueado nessa opção. Se esquecer e a tabela já foi gerada, tem que **inativar e
recriar**.

Dá para ter várias grids no mesmo processo (`COTACAO`, `FORNECEDOR`), e campos podem ser
acrescentados à grid em etapas diferentes — por exemplo, o fornecedor é cadastrado numa etapa
e o valor da cotação preenchido em outra, formando um quadro comparativo.

## Regras de formulário (regra de tela)

É a manipulação da interface sem código: mostrar, esconder, obrigar, bloquear campo conforme
o que foi preenchido.

**Eventos:** o mais usado é "valores dos campos carregados no processo" (dispara ao abrir o
formulário); para campo lista usa-se também "o usuário alterar o valor do campo".

**Condições:** comparar com valor fixo ou **com outro campo**. Os operadores variam conforme
o tipo (inteiro tem tamanho, texto tem igual/diferente etc.).

**Ações:** sobre agrupador, botão (aprovar e rejeitar), campo, formulário e grid.
A estrutura é um `if`/`else`: "execute as ações" e "senão, execute as ações".

Um detalhe que difere do desenvolvimento web:

> "Aqui a gente nunca trabalha com o ID. A gente sempre trabalha com o **value**."

Nada de índice ou posição da lista: compara-se pelo texto da opção.

**Nome da regra:** não existe padrão formal, e a boa prática é uma só — que dê para entender
só de bater o olho. Os exemplos reais são `Subestipulante PJ` e `Subestipulante Filial`.
O argumento é direto: se você sair de férias, outra pessoa vai dar manutenção nisso.

**A ordem de preferência, dita explicitamente:**

> "Por padrão a gente não costuma fazer todas as mudanças de tela no JavaScript. Utiliza ao
> máximo a regra de tela, que é no-code, e depois, por último, alguma regra mais complexa,
> assim como chamar um Ajax, aí sim a gente parte para o JavaScript."

## Modelo de dados

Ambientes têm três bases: **BPM** (processos), **ECM** (documentos) e **AUX** (auxiliar).

A base **aux** é para tabelas que a gente cria: cadastros, CRUDs, tabelas de apoio que um
processo grava e outro consulta. Ela não existia até uns cinco anos atrás, e nessa época
criavam-se as tabelas dentro do próprio BPM com prefixo **`AUX_`**
(`AUX_CAD_FORNECEDOR`, `AUX_CAD_CLIENTE`). O ambiente da **Ser Educacional** ainda é assim:
não tem base auxiliar, está tudo dentro do `bpm_act`.

### Tabelas do modelo (o que o Studio grava)

| Tabela | Chaves | O que guarda |
|---|---|---|
| `FORMULARIO` | PK `COD_FORM` + `COD_VERSAO` | tudo de Propriedades, inclusive o **nome da tabela de dados** e os usuários editores (separados por vírgula) |
| `ETAPA` | PK `COD_ETAPA`, FK `COD_FORM` + `COD_VERSAO` | tudo de Atividades: SLA, responsável, segue etapa |
| `CAMPO` | PK `COD_CAMPO`, FK `COD_FORM` + `COD_VERSAO` | definição do campo: label, nome, tipo, máscara e, se for label, cor e tamanho da fonte |
| `ETAPA_CAMPO` | PK composta `COD_CAMPO` + `COD_ETAPA` + `COD_FORM` + `COD_VERSAO` | **a configuração do campo em cada etapa**: valor inicial, a lista de opções, o SELECT configurado, a integração, a variável de ambiente |

Essa quarta tabela é a que quase ninguém lembra e é onde está a resposta de "por que esse
campo aparece obrigatório só nessa etapa" ou "qual query está por trás dessa lupa".

### Tabelas de execução (o que a Workspace gera)

| Tabela | Chaves | O que guarda |
|---|---|---|
| `PROCESSO` | PK `COD_PROCESSO` + `COD_ETAPA_ATUAL` + `COD_CICLO_ATUAL`, FK `COD_FORM` + `COD_VERSAO` | **só a etapa atual** do processo |
| `PROCESSO_ETAPA` | PK `COD_PROCESSO` + `COD_ETAPA` + `COD_CICLO` | **o histórico de todas as etapas**: tempo consumido, SLA definido, `IDE_STATUS`, `COD_USUARIO_ETAPA` e um `OID` (identificador para acesso externo, usado em página pública) |
| `PROCESSO_ETAPA_USUARIO` | PK `COD_PROCESSO` + `COD_ETAPA` + `COD_CICLO` + `COD_USUARIO_ETAPA` | quando a atividade vai para um **grupo**, lista **todos** que receberam |

Repare na diferença de nome: em `PROCESSO` as colunas são `COD_ETAPA_ATUAL` e
`COD_CICLO_ATUAL`; em `PROCESSO_ETAPA` são `COD_ETAPA` e `COD_CICLO`, sem o sufixo.

Como funciona o responsável: enquanto a atividade está em andamento e foi para um grupo,
todos aparecem em `PROCESSO_ETAPA_USUARIO`; depois de aprovada, o `COD_USUARIO_ETAPA` de
`PROCESSO_ETAPA` fica com **quem aprovou**.

### Status

`IDE_STATUS` tem quatro valores: **`P`** aprovado, **`R`** rejeitado, **`A`** em andamento,
**`C`** cancelado.

**Atrasado e em alerta não são status.** Para obtê-los é preciso um `CASE` no SQL comparando a
data de abertura com a data limite. Isso explica exatamente os `CASE` gigantes das queries de
Power BI da Atlântica.

### Tabelas de dados do processo

Aqui está esclarecida a dúvida que eu tinha anotado sobre o prefixo. **São os dois, com
funções diferentes:**

| Tabela | Chaves | Conteúdo |
|---|---|---|
| **`F_<nome_tabela>`** | `COD_PROCESSO` + `COD_ETAPA` + `COD_CICLO` | os campos **normais** do formulário |
| **`G_<nome_tabela>_<identificador_da_grid>`** | `COD_PROCESSO` + `COD_ETAPA` + `COD_CICLO` + **`INDICE`** | os campos de **grid** |

O `INDICE` (1, 2, 3...) é a linha da grid, e é ele que permite várias informações para a mesma
etapa e ciclo.

Ou seja: `G_CONF_CSCCSC` e `G_CONF_EMISSAOMODELOS_CRA`, que apareceram nas queries da
Atlântica, são **tabelas de grid**, não tabelas de formulário. E dá para fazer `INNER JOIN`
entre a `F_` e a `G_` pelas três chaves.

### Tabelas do administrativo

| Tabela | Observação |
|---|---|
| `USUARIO` | nome, login, senha criptografada, **`COD_DEPARTAMENTO`** e o código do líder (que é outro usuário) |
| `DEPARTAMENTO` | código, identificador, o código do gestor e o proprietário |
| `GRUPO` | código, identificador (`IDE_COMANDO`), nome |
| `GRUPO_USUARIO` | relação N:N, porque o usuário pode ter **vários grupos** |
| `FUNCAO` / `FUNCAO_USUARIO` | mesma lógica do grupo |

O **departamento fica na própria tabela `USUARIO`** porque cada pessoa tem só um. Grupo e
função têm tabela de ligação porque são vários.

## Acesso ao banco

O time usa um **cliente SQL gratuito e simples** (pela descrição da tela, com campos
"Biblioteca" e escolha entre MySQL e SQL Server, é o **HeidiSQL**). Configura-se sessão nova
com host, usuário, senha e porta; sem apontar base específica, ele lista todas a que o usuário
tem acesso.

**Todos os ambientes rodam em SaaS na infraestrutura da própria Lecom** — são mais de 100,
talvez 200 ambientes. Por isso:

- é preciso estar **na VPN** para acessar banco ou SSH
- o acesso é liberado **por necessidade, projeto a projeto**. Entrou num cliente novo, pede-se
  liberação à Lecom
- às vezes é preciso **assinar termo** (NDA)

Detalhe importante que já apareceu no módulo anterior e se confirma aqui: **a query de uma
lupa roda no ambiente**, então funciona sem VPN. A VPN é para você abrir o banco por fora.

## Estrutura do material da equipe

O instrutor mostra o OneDrive compartilhado do time, e a estrutura é exatamente a mesma do
pacote "Equipe Técnica" que eu já analisei: acessos por cliente (SSH, ambiente, banco),
projetos técnicos, comandos de restart, criação de arquivo de conexão, documentação da API JS
e projetos Java de exemplo (base e Ser Educacional).

Ou seja: aquele pacote **é** o repositório oficial da equipe, não uma cópia solta.

Ele também comenta que a documentação da API JS mais recente que eles tinham era da **5.40**,
e que dava para usar na 5.70. Como eu baixei a versão **5.70 RTM 1.00** direto do Confluence,
temos algo mais atual do que estava circulando no time.

## Recado de trabalho que vale registrar

> "Se você precisar fazer uma integração, você me chama e eu te passo um exemplo. Daí você
> sai do exemplo que eu te passar."

E sobre o alcance do treinamento:

> "De fato o treinamento eu vou te passar **o básico do avançado**."

Ou seja: o treinamento não forma ninguém em integração. O caminho é pedir um exemplo pronto e
partir dele. Vale lembrar que os projetos de exemplo já estão em
`material/_projetos_exemplo/`.
