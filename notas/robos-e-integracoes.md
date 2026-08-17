# Robôs, integrações e a biblioteca rotas-open-api

Fonte: documentação 7.0 no Confluence (espaço `VPL`), baixada inteira em
`material/_docs_lecom/confluence/`. São 341 páginas na 7.0, 305 na 6.0, 216 na 5.70,
186 na 5.60 e 75 no espaço geral, mais 210 páginas da referência de API REST em
`material/_docs_lecom/api_readme/`.

## Estrutura de um robô

Projeto Maven. O `pom.xml` já vem com o parent certo:

```xml
<parent>
  <groupId>br.com.lecom</groupId>
  <artifactId>robot-parent</artifactId>
  <version>1.0.1-RELEASE</version>
  <relativePath/>
</parent>
```

O `robot-parent` traz as bibliotecas do time de Produto e Tecnologia da Lecom, entre elas a
**WFMail**. Para integração Java o parent é `integration-parent`.

A classe de execução:

```java
@Component
@RobotModule("Radarroboenviaemail")
@Version({ 1, 0, 0 })
public class Radarroboenviaemail {

    private static final Logger LOGGER = LoggerFactory.getLogger(Radarroboenviaemail.class);

    @Execution
    public void execute() {
        LOGGER.debug("Running robot");
    }
}
```

O que importa: `@RobotModule` (ou `@IntegrationModule`) nomeia o módulo, `@Version` versiona,
`@Component` registra no Spring, e o método anotado com **`@Execution`** é o ponto de entrada.
Log com SLF4J, nunca `System.out`.

## Envio de e-mail com WFMail

```java
private static final WFMail WFMAIL = new WFMail();

try {
    EmailMessage emailMessage = new EmailMessage(SUBJECT, MESSAGE, FROM, TO, IS_EMAIL_HTML);
    WFMAIL.enviaEmailMessage(emailMessage);
} catch (EmailMessageException e) {
    LOGGER.error("Erro ao enviar o e-mail", e);
}
```

Construtor do `EmailMessage`: assunto, mensagem, remetente, destinatário e booleano de HTML.

## Conexão com banco: DBUtils

Também vem no `robot-parent`. Não abrir conexão na mão:

```java
private static final String DB_NAME = "dbTesteRadar";
private static final String SQL_SELECT_QUERY = "select usuario from tabela";

@Execution
public void execute() {
    try (Connection connection = DBUtils.getConnection(DB_NAME);
         PreparedStatement preparedStatement = connection.prepareStatement(SQL_SELECT_QUERY);
         ResultSet resultSet = preparedStatement.executeQuery()) {
        while (resultSet.next()) {
            LOGGER.info("Select encontrou o usuário: {}", resultSet.getString("usuario"));
        }
    } catch (SQLException e) {
        LOGGER.error("Erro ao realizar conexão com o banco de dados", e);
    }
}
```

`DBUtils.getConnection(nomeDoBanco)` recebe o **nome** do banco, não uma URL JDBC: a
conexão já está configurada no ambiente. Usar try-with-resources nos três recursos e
`PreparedStatement` sempre, nunca concatenar SQL.

## rotas-open-api - a biblioteca de acesso à plataforma

É como robô e integração conversam com a plataforma. Publicada no **Nexus interno da Lecom**,
então o `pom.xml` precisa declarar esse repositório. Todas as dependências (feign-core,
feign-okhttp, feign-jackson, feign-form, jackson-datatype-jsr310) já vêm empacotadas.

### Configuração na 7.0

```java
import br.com.lecom.open.api.util.ApiConfig;
import br.com.lecom.open.api.util.RotasOpenApi;

ApiConfig config = ApiConfig.builder()
    .domain("empresa.lecom.com.br")   // obrigatório
    .credentials("sua-api-key-aqui")  // obrigatório
    .build();

RotasOpenApi api = new RotasOpenApi(config);
```

| Campo | Builder | Obrigatório | Para que |
|---|---|---|---|
| `domain` | `.domain("...")` | sim | host do ambiente |
| `credentials` | `.credentials("...")` | sim | API Key |
| `modoTeste` | `.modoTeste(true)` | não | liga modo teste |
| `codigoUsuario` | `.codigoUsuario(123)` | não | usuário nas operações em modo teste |
| `urlKongApi` | `.urlKongApi("...")` | não | sobrescreve a URL base do Kong |

Dá para sobrescrever credencial numa operação só, com `executar(ApiConfig override)`.
Campo `null` no override herda do config base. Multi-tenant é uma instância por tenant.

Em Spring, o padrão da doc é injetar por `@Value` e montar o `RotasOpenApi` no construtor
do service.

### Breaking changes da 6.x para a 7.0

A 7.0 **removeu toda a configuração estática**. `RotasOpenAPIConfig` e `DadosApiKey`
não existem mais.

| v6.x | v7.0 |
|---|---|
| `RotasOpenAPIConfig.setDomain()` | `ApiConfig.builder().domain().build()` |
| `RotasOpenAPIConfig.setCredentials()` | `.credentials()` no builder |
| `DadosApiKey` | removido, usar `ApiConfig` |
| `RotasOpenApi.usuario()` estático | `api.usuario()` na instância |
| single-tenant implícito | multi-tenant explícito |
| exceções propagadas | **todos os erros em `response.getErros()`** |

Essa última linha muda como se trata erro: não é try/catch, é checar `getErros()` na resposta.

### Abrir processo já preenchendo o formulário

O builder que monta campos e grid:

```java
FormularioProcesso formulario = new FormularioProcessoBuilder()
    .addCampo("CEP", "17017-370")
    .addCampo("PARALELO", "Sim")
    .addGrid(new Grid("ITENS")
        .addLinha(new Linha()
            .addCampo("LST_OPCAO", "Opção 1")
            .addCampo("DT_OPCAO", "2023-03-15")
            .addCampo("VLR_OPCAO", 153.52))
        .addLinha(new Linha()
            .addCampo("LST_OPCAO", "Opção 3")
            .addCampo("DT_OPCAO", "2023-02-15")
            .addCampo("VLR_OPCAO", 150.52)))
    .build();

ResponseOpenApi<RetornoProcessoAberto> response = api.processo()
    .abrirInstancia()
    .setCodigoProcesso(1)   // cod do formulário no Studio
    .setVersao(1)           // cod da versão no Studio
    .setFormulario(formulario)
    .executar(TipoAcao.APROVAR);
```

Detalhes que economizam tempo:

- data em grid vai no formato **`yyyy-MM-dd`**, não `dd/MM/yyyy`
- `setCodigoProcesso` é o **código do formulário** no Studio, e `setVersao` a versão. É o mesmo
  par `COD_FORM` + `COD_VERSAO` do banco
- `executar()` sem argumento abre a instância e deixa na área do usuário.
  `executar(TipoAcao.APROVAR)` ou `REPROVAR` já executa a etapa
- o retorno é `ResponseOpenApi[status, erros, content, page, links]`. **Checar `getStatus()`:
  200 tem `content`, qualquer outro tem `erros`**

**Atenção:** vários exemplos do Confluence ainda usam a forma estática `RotasOpenApi.processo()`,
que é da 6.x. Na 7.0 é `api.processo()` a partir da instância criada com `ApiConfig`.
Copiar exemplo da doc sem adaptar não compila.

### Métodos disponíveis

Tudo é fluent: `api.<dominio>().<operacao>().set...().executar()`.

**`api.usuario()`** — `buscar`, `buscarPorId(int)`, `criar` (nome, login, email),
`editar` (codigo), `retornarGrupos`, `incluirGrupo`, `excluirGrupo`, `retornarFuncoes`,
`incluirFuncao`, `excluirFuncao`, `gerarApiKey`, `revogarApiKey`.

**`api.departamento()`, `api.funcao()`, `api.grupo()`** — mesmo desenho:
`buscar`, `buscarPorId`, `criar` (nome, identificador), `editar`, `retornarUsuarios`,
`incluirUsuario`, `excluirUsuario`.

**`api.processo()`** — é o maior:

| Método | Obrigatórios |
|---|---|
| `listarProcessosParaAbrir()` | — |
| `abrirInstancia()` | codigoProcesso |
| `executarInstancia()` | codigoInstancia, codAtividade |
| `atualizarInstancia()` | codigoInstancia, codAtividade |
| `cancelarProcesso()` | codigoInstancia |
| `encaminharProcesso()` | tipoEncaminhamento, target, processo |
| `buscarProcessosPendentes()` | codigoUsuario |
| `buscarProcessosInstanciasAvancado()` | — |
| `retornaAtividadesInstancia()` | processInstanceId |
| `buscarDadosAtividade()` | processInstanceId, activityInstanceId |
| `retornaDefinicaoCamposAtividade()` | processInstanceId, activityInstanceId |
| `fases()` | processInstanceId |
| `incluirResponsavel()` / `excluirResponsavel()` | processInstanceId, activityInstanceId, codigoUsuario |
| `alteraSla()` | processInstanceId, novaDataSla |
| `removerHibernacao()` | processInstanceId |
| `incluirDocumento()` | codigoInstancia, codigoAtividade, codigoCiclo, nomeCampo, acao |
| `substituirDocumento()` | + documentoId |
| `downloadDocumento()` | + documentId, fileUniqueId |
| `excluirDocumento()` / `desvincularDocumento()` | + documentId |

As variantes de documento em grid acrescentam `identificadorGrid`, e em linha de grid
acrescentam também `linhaGrid`. Mesmo padrão da API REST.

**`api.documento()`** (ECM) — `buscar`, `listarTemplates`, `buscarTemplate`,
`metadadosTemplate`, `incluirDocumentoEcm`, `downloadDocumentoEcm`, `substituirDocumentoEcm`,
`excluirDocumentoEcm`, `dadosDocumentoEcm`, `metadadosDocumentoEcm`, `versoesDocumentoEcm`,
`listarDossies`.

Retornos vêm em `ResponseOpenApi<T>`, e há uma página só sobre paginação
(`ResponseOpenApi - Paginação - Constantes`).

## Exemplos prontos de robô na documentação 7.0

Abertura de processos, alterar SLA, aprovação automática, cancelamento, conexão com banco de
dados, edição de metadados, encaminhar processo, envio de e-mail e inclusão de documento.
Todos em `material/_docs_lecom/confluence/VPL/`.

## O modelo antigo, ainda vivo nos clientes

O `Projeto-Base-BPM` (em `material/_projetos_exemplo/`) é o esqueleto do modelo anterior:
projeto Eclipse com `libs/` na mão (`atos-api`, `atos-componentes`,
`atos_annotations_servicos`, `ecm-client`, gson, httpclient, iText, POI, log4j), `jardesc`
para gerar o `.jar`, e classes de teste em `com.lecom.testes` que chamam as rotas:
`RotaLoginTest`, `RotaAberturaProcesso`, `RotaAprovaProcesso`, `RotaSalvarProcesso`,
`RotaCancelarProcesso`, `RotaAlterarGrid`, `RotaListarDocumento`.

O fluxo lá era: `LoginAutenticacao(urlSSo, dadosLogin).getToken()`, depois
`new AbreProcesso(urlBpm, token, codForm, codVersao, modoTeste, codUsuario, dadosProcesso)`.
Compare com a 7.0, onde é `ApiConfig` com API Key e nada de login/senha.

Remotes vistos nos projetos:
`http://git.lecom.com.br/PSP/Projeto-Base-BPM.git` (GitLab antigo) e
`https://repo.lecom.com.br/clientes/devops-bpm/...` (o do DevOps atual).

Documentação em PDF que acompanha o projeto base, já convertida para texto:
Construindo e Consumindo uma API, RotasBPM, Robo Executar Atividades, Robo Importar Planilha,
Gera Excel com dados do processo, Gera PDF Único, Gerador PDF Genérico, Importação de
Planilha via JS, Inserir Usuários de planilha, Integração com D4Sign, Pegar Dados Processo,
Sincronismo de AD, Alteração de Data limite.

## JSPadrao - a biblioteca JS interna

`apiJSPadrao_v1.0.7.js` é um módulo IIFE congelado com `Object.freeze`, exatamente o padrão
que o manual da API JS manda seguir. Antes de escrever validação na mão, usar o que já existe:

`nulo`, `adicionaErro`, `removeErro`, `validaCNPJ`, `validaCPF`, `validaEmail`, `validaPIS`,
`somaDiasCorridos`, `subtraiDiasCorridos`, `somaDiasUteis`, `getDiferencaEntreDatas`,
`getDiferencaEntreDataConfig`, `validaDataFinalDeSemana`, `validaDataMaiorQueAtual`,
`validaDataMenorQueAtual`, `validaHora`, `calculaIdade`, `somaValorGrid`,
`validaPreenchimentoMinimoItensGRID`, `limparOpcoesCampoLista`, `adicionaOpcoesCampoLista`,
`getDataFormatada`, `converteDataBrEmDate`, `adicionaValidacaoTamanhoExtensaoArquivo`,
`validaExtensaoTamanhoArquivo`, `addValidacaoDeArquivos`, `limpaCampos`,
`validaDocumentoAssinado`, `getCookie`, `getLoginUsuarioLogado`,
`validaDocumentoAssinadoPorUsuarioCampo`, `validaDocumentoAssinadoPorUsuarioGrid`.

A convenção de parâmetro é um objeto `{ grid, campo }`, com `grid` opcional, e um `apply`
booleano no fim que por padrão é `false` (para acumular e dar um `Form.apply()` só).
A lib lê o cookie `LecomUserLanguage` para idioma.
