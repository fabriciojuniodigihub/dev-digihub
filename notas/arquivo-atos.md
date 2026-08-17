# O arquivo .atos por dentro

O `.atos` é o pacote de exportação e importação de um modelo de processo. O nome vem de "Atos",
como a plataforma se chamava até 2016.

Dissequei o `processo65v2.atos` que veio no Projeto-Base
(`material/_projetos_exemplo/.../rotinaJS/Desenvolvimento/API JS/v1.0.0/`), que é o processo
padrão de demonstração da API JS.

## Formato

**É um ZIP.** Dá para abrir com qualquer descompactador, sem ferramenta da Lecom.

Dentro, 15 XMLs no padrão `modelo_000000_0_<PARTE>.xml`. O conteúdo é serialização **XStream dos
VOs Hibernate** da plataforma, ou seja, cada XML é o espelho de uma tabela do banco. As classes
aparecem com o nome real (`beans.FormularioVO`, `beans.EtapaVO`, `beans.CampoVO`).

Isso explica por que o modelo de dados e o arquivo de exportação são tão parecidos: são a mesma
coisa, um em tabela e outro em XML.

## As 15 partes

| Arquivo | Classe | Equivale a | Guarda |
|---|---|---|---|
| `_F` | `FormularioVO` | `FORMULARIO` | propriedades do modelo |
| `_E` | `EtapaVO` | `ETAPA` | as atividades e o roteamento |
| `_C` | `CampoVO` | `CAMPO` | definição dos campos |
| `_EC` | `EtapaCampoVO` | `ETAPA_CAMPO` | **o campo em cada etapa** |
| `_FG` | `FormularioGrupoVO` | | grupos com permissão no modelo |
| `_FF` | `FormularioFuncaoDTO` | | funções ligadas ao modelo |
| `_Fields_Groupings` | mapa | | os agrupadores da tela |
| `_Tem` | `DocTemplate` | ECM | templates de documento |
| `_FTe` | `FormularioTemplateVO` | | qual campo usa qual template |
| `_AccGroup` / `_AccProfile` | ECM | | permissão dos templates |
| `_EtapaJavascripts` | `JavascriptVO` | | o JS vinculado a cada etapa |
| `_LF` | `Formulario` (helper) | | **lista de todos os modelos do ambiente de origem** |
| `_Phases` | | | fases (vazio quando não usa) |
| `_Form_Behavior` | | | comportamento de formulário |

## O que cada um traz de útil

### `_F`, as propriedades

`codForm` e `codVersao` formam a chave, igual no banco. Traz `desNomeTabela` (o `f_personalizada`
que vira a tabela física), `desTitulo`, `desSubtitulo`, `ideStatus`, `ideBetaTeste` (o modo
teste) e `emailTeste`.

### `_E`, as etapas e o roteamento

Aqui está a resposta para uma dúvida que a skill de campos levanta: **o ALIAS da etapa é o campo
`desEtapa`**, e o nome que aparece na tela é o `tituloEtapa`.

```xml
<codEtapa>2</codEtapa>
<desEtapa>INICIO</desEtapa>       <!-- ALIAS -->
<tituloEtapa>Início</tituloEtapa>  <!-- o que o usuário vê -->
<codTipoEtapa>1</codTipoEtapa>     <!-- 1 = início, 2 = fim -->
<ideConcentradora>N</ideConcentradora>
```

Também traz o SLA (`vlrAtraso1`, `vlrAtraso2`, `vlrAtrasoGestor`, `vlrHibernacao`), as labels dos
botões (`desLabelAprovar`, `desLabelRejeitar`) e as mensagens de aprovação e rejeição.

O **roteamento é um JSON dentro do XML**, escapado:

```json
[{"tipo":"TAREFA","nome":"","id":"8",
  "roteamentos":[{"etapas":[{"etapa":"FIM","tipoResponsavel":"","responsavel":""}],"id":"8"}],
  "acao":"APROVACAO"}]
```

Repare que o destino é referenciado **pelo ALIAS** (`"etapa":"FIM"`), não pelo código. Por isso
o ALIAS não pode ser mudado à toa.

### `_C`, os campos

`desNome` é o identificador (o que vira coluna e o que o JavaScript usa), `desLabel` é o rótulo.
`idAgrupamentoGrid` diz a qual grid o campo pertence, e vazio significa campo normal.

Os tipos ficam em `ideTipo`, com uma letra:

| `ideTipo` | Tipo |
|---|---|
| `S` | linha de texto (string) |
| `D` | data |
| `I` | inteiro |
| `M` | monetário |
| `L` | lista |
| `F` | arquivo / template |

Traz ainda `numTamanho`, `prefixo`, `numOrdem` (a posição na tela), `ideStatus` (`A` de ativo,
que é como o campo inativado fica marcado), `fontColor` e `backgroundColor` para label, e
`ideRepeticao` para grid.

### `_EC`, a configuração por etapa

É a parte mais importante para quem mexe em processo, e a que a
[skill de automatização de campos](automatizacao-de-campos.md) escreve.

```xml
<id>
  <codCampo>1</codCampo>
  <codEtapa>1</codEtapa>
  <codForm>65</codForm>
  <codVersao>2</codVersao>
</id>
<ideStatus>N</ideStatus>            <!-- visibilidade -->
<ideInicializa>S</ideInicializa>    <!-- como inicializa -->
<vlrValor> </vlrValor>              <!-- valor fixo ou SQL -->
<ideObrigaAprovaRejeita></ideObrigaAprovaRejeita>
<ideLupa>N</ideLupa>
<ideRefresh>N</ideRefresh>
```

`ideStatus` é o status de visibilidade que a planilha da skill chama de `Atividade_ALIAS`, e
`ideObrigaAprovaRejeita` é o que separa o obrigatório na aprovação do obrigatório na rejeição.
Neste arquivo aparecem `N` (normal), `R` e `B`; os demais códigos (`SL`, `O`, `I`, `C`) só
aparecem em processo que os usa.

São 40 registros para 20 campos em 2 etapas: **o produto campos x etapas, sempre completo**. É
isso que faz um processo com 200 campos e 10 etapas gerar 2.000 linhas de configuração, e por
que a skill de planilha existe.

### `_EtapaJavascripts`

Liga o JS à etapa pelo **nome do arquivo** e pelo **ALIAS da etapa**:

```xml
<nomeArquivoJS>apiJSPadrao_v1.0.0.js</nomeArquivoJS>
<tipo>P</tipo>                                  <!-- P = personalizado -->
<nomeEtapaExportacao>INICIO</nomeEtapaExportacao>
```

Confirma o que o módulo 09 ensina: o tipo é sempre personalizado, e o versionamento do JS é pelo
nome do arquivo.

## Duas coisas que valem atenção

**O `_LF` leva junto a lista de todos os modelos do ambiente de origem.** No arquivo que abri são
**186 formulários**, com código, versão e nome da tabela de cada um. Ou seja, exportar um
processo e mandar para fora expõe o inventário de processos daquele cliente. Não é segredo de
Estado, mas é informação do cliente saindo junto sem ninguém perceber.

**Dá para inspecionar e comparar `.atos` sem a plataforma.** Como é ZIP com XML, dá para
descompactar duas versões e rodar um diff para ver exatamente o que mudou entre a V1 e a V2, ou
o que difere entre homologação e produção. Isso resolve na hora aquela dúvida do módulo 05 de "a
V1 daqui está igual à V1 de lá?", que hoje o time responde na base da confiança.

## O que ainda não sei

- se a importação valida a integridade (o que acontece ao editar um XML na mão e reempacotar)
- se `.atos` de uma versão da plataforma importa em outra mais nova
- os demais códigos de `ideStatus` no `_EC`, que preciso ver num processo real com campo
  somente leitura e obrigatório
