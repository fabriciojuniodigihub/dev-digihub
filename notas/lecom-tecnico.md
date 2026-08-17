# Lecom por dentro - o que dá para aprender do material da Equipe Técnica

## Arquitetura em microserviços

A plataforma roda como um conjunto de serviços systemd no servidor Linux:

```
lecom_config-service        configuração centralizada
lecom_discovery-service     service discovery
lecom_gateway-service       gateway de entrada
lecom_form-app              aplicação de formulários
lecom_form-service          serviço de formulários
lecom_service-integration   integrações
lecom_workspace-web         Workspace
lecom_node-web-server       servidor Node
lecom_behavior-service      comportamento
lecom_audit-service         auditoria
```

O motor BPM legado tem comando próprio: `bpm -c start`, `bpm -c stop`, `bpm -c log`.

Ordem que o pessoal usa para reiniciar: derruba config, discovery, gateway, form-app,
form-service, service-integration e `bpm -c stop`; depois sobe na mesma sequência.

Migração de banco é com **Liquibase**. Quando trava com "Waiting for changelog lock",
o caminho é olhar a tabela `DATABASECHANGELOGLOCK`.

## Modelo de dados do BPM

Tabelas centrais, vistas nas queries de Power BI e relatório:

| Tabela | Colunas que importam |
|---|---|
| `PROCESSO` | `COD_PROCESSO`, `COD_FORM`, `COD_VERSAO`, `IDE_FINALIZADO`, `IDE_BETA_TESTE` |
| `PROCESSO_ETAPA` | `COD_PROCESSO`, `COD_ETAPA`, `COD_CICLO`, `DAT_GRAVACAO` (início), `DAT_LIMITE` (prazo), `DAT_FINALIZACAO`, `IDE_STATUS`, `IDE_STATUS_ANT`, `COD_USUARIO_ETAPA` |
| `ETAPA` | `COD_ETAPA`, `COD_FORM`, `COD_VERSAO`, `TITULO_ETAPA` |
| `FORMULARIO` | `COD_FORM`, `COD_VERSAO`, `DES_TITULO` |
| `USUARIO` | `COD_USUARIO`, `DES_LOGIN`, `NOM_USUARIO` |

A chave de um processo é sempre o par `COD_FORM` + `COD_VERSAO`, porque formulário é
versionado. Um processo em andamento continua na versão em que nasceu.

**Códigos de status** (`IDE_STATUS` e `IDE_FINALIZADO`):

| Código | Significado |
|---|---|
| `A` | em andamento |
| `P` | deferido (aprovado) |
| `R` | indeferido (rejeitado) |
| `C` | cancelado |
| `D` | aparece filtrado fora nas queries, provavelmente descartado/devolvido |

Os dados preenchidos no formulário ficam em tabelas com prefixo **`G_`**, uma por processo
(ex.: `G_CONF_CSCCSC`, `G_CONF_EMISSAOMODELOS_CRA`).

Usuários de sistema que precisam ser excluídos dos relatórios: `ser.cra`, `tarefa.automatica`.

**Atenção:** nem todo cliente é MySQL. As queries do Power BI usam `GETDATE()`, hint
`(NOLOCK)` e função `[dbo].DIA_UTIL(...)`, ou seja, **SQL Server**. A infraestrutura padrão
da Lecom é MySQL, mas há cliente rodando SQL Server. Sempre conferir antes de escrever query.

## API JavaScript do formulário

É o que se usa para customizar tela. Padrão do código:

```javascript
$(document).ready(function () {
    Form.apply().then(function () {
        initForm();
        validaFormOnSubmit();
        setForm();
    });
});
```

| Recurso | Uso |
|---|---|
| `Form.apply()` | promessa, só mexer no formulário depois que resolver |
| `Form.fields('CAMPO').value()` | lê o valor |
| `Form.fields('CAMPO').value(x)` | grava o valor |
| `Form.grids('CAMPO')` | acessa grid, e serve para testar se o campo é grid |
| `codEtapa` | variável global com a etapa atual |
| `ProcessData.processId` | id do processo |
| `LecomImportacaoPlanilha.configurarImportacaoPlanilha('CAMPO')` | liga importação por planilha em um campo |
| `#input__NOME_DO_CAMPO` | id do elemento no DOM. Em grid, o pai do elemento |
| jQuery | disponível |

Convenções que o time segue:

- cabeçalho no topo do arquivo com nome, processo, dependências, `@author` e `@since`
- as etapas viram um `Object.freeze({...})` com o número de cada uma, e o `initForm` faz
  `switch (codEtapa)`. Isso evita número mágico espalhado
- nome de arquivo por prefixo: `sa_` e `st_` (visto em `sa_inspecao_v2.js`,
  `st_inspecao_itens.js`, `st_plano_acao_valida_grid.js`)
- nome de campo em maiúsculo com prefixo de tipo, ex.: `TP_PLANILHA_ANEXO`
- download de documento do ECM por URL: `/bpm/view?dl=true&documentId=<id>`

PDFs de referência da API JS estão em
`Exemplos Lecom BPMs/Documentação API JS/`, com versões 5.00, 5.30, 5.40 e
**`Novo_Formulario_API_JS_570_RTM1_superior.pdf`**, que é o atual.

## Robôs e integrações Java

O backup da Atlântica mostra o padrão de customização servidor:

```
api/robo/<numero>/Rb<Nome>.jar          robôs, um diretório por robô
api/integracao/<numero>/<Nome>.jar      integrações
custom/classes/                          classes compiladas
custom/libs/                             dependências (docx4j, POI, commons-email...)
custom/web-content/config/<Nome>.properties   configuração por robô
custom/web-content/documentos/           planilhas modelo
custom/web-content/apps/<app>/pages/     JSP de app customizado
```

Cada robô ou integração tem um `.properties` de mesmo nome com sua configuração.
Nomenclatura: robô começa com `Rb`, integração usa verbo (`EnviaEmail...`, `AbreProcesso...`,
`ImportarPlanilha`, `ConsultaDadosProcessos`).

O `config-rotas-bpm.properties` guarda o essencial do ambiente:

```
urlAmbienteBase = https://app.<cliente>.lecom.com.br/
enderecoSSO     = https://app.<cliente>.lecom.com.br/sso
enderecoBPM     = https://app.<cliente>.lecom.com.br/bpm
loginUsuarioAutomatico / senhaUsuarioAutomatico / codUsuarioAutomatico
```

Existe uma lib compartilhada `RotasBPM.jar` (também `RotasBPM_v7.jar`) e um pacote
`RotasBPM_2026_04.zip` com as rotas atualizadas.

Projetos Java de referência prontos em `Exemplos Lecom BPMs/Projeto Java/`:
**Projeto-Base-BPM.zip** (o esqueleto), Asics.zip e SerEducacional.zip.
