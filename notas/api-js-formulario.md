# API JavaScript do formulário Lecom - referência de trabalho

Baseado em `Novo_Formulario_API_JS_570_RTM1_superior.pdf` (versão 5.70 RTM 1.00 ou superior).
Versões anteriores (5.00, 5.30, 5.40) estão na mesma pasta, úteis quando o cliente está atrasado.

## Ponto de entrada

```javascript
// forma antiga, ainda aparece em script legado de cliente
var formAPI = Lecom.api.ProcessAPI.currentProcess().form();

// forma atual
Form;
```

Componentes: `Form.fields()`, `Form.groups()`, `Form.grids()`, `Form.actions()`.

**A regra de ouro:** alterar propriedade não muda a tela. Só o `apply()` renderiza. E `apply()`
devolve uma Promise.

```javascript
// errado: 6 renderizações
Form.fields('NOME').value('x').apply();
Form.fields('CPF').value('y').apply();

// certo: 1 renderização
Form.fields('NOME').value('x');
Form.fields('CPF').value('y');
Form.apply();
```

## Campos

Leitura por `get()` ou pela função da propriedade sem argumento; escrita passando o valor,
e as chamadas encadeiam.

```javascript
Form.fields('NOME').get();          // objeto com tudo
Form.fields('NOME').get('value');   // só o value
Form.fields('NOME').value();        // idem

Form.fields('NOME').value('Fulano').label('Nome completo').disabled(true).apply();
```

| Propriedade | Tipo | Observação |
|---|---|---|
| `value` | varia por tipo | ver tabela abaixo |
| `label` | string | |
| `helpText` | string | texto de ajuda |
| `disabled` | boolean | bloqueado |
| `readOnly` | boolean | somente leitura |
| `visible` | boolean | |
| `maxLength` | number | |
| `mask` | string | só em LINHA_DE_TEXTO |
| `linebreak` | string | `NENHUM`, `SIMPLES`, `DUPLA`, `BARRA_SEPARADORA` |
| `errors` | string ou array | mensagem em vermelho embaixo do campo |
| `actions` | | ações do campo (lupa, refresh) |

Formato do `value` por tipo de campo:

| Tipo | Formato |
|---|---|
| Linha de texto, caixa de texto | String |
| Inteiro | Int |
| Decimal, monetário | Number |
| Data | String `'06/03/2018'` |
| Lista, radio, checkbox | String com o texto da opção |

Funções: `removeMask()` e `focus()`.
`focus()` precisa esperar o apply: `api.visible(true).apply().then(() => api.focus())`.

Erros também dão para setar pelo Form: `Form.errors({NOME: 'Campo inválido'}).apply();`
Escolher um dos dois caminhos e manter, não misturar.

Estado global do form: `Form.readOnly(true).apply()` e `Form.waitingForAction(true).apply()`.

## Grupos

```javascript
Form.groups('ID_GROUP').fields();            // todos os campos do grupo
Form.groups('ID_GROUP').fields('ID_FIELD');  // um campo
Form.groups('ID_GROUP').grids();
Form.groups('ID_GROUP').expanded(true);      // exige "Permitir expandir e contrair" no Studio
Form.groups('ID_GROUP').disabled(true).apply();
Form.groups('ID_GROUP').visible(false).apply();
```

Pedir um campo de outro grupo devolve `undefined` e não faz nada.

## Grids

```javascript
var gridAPI = Form.grids('GRID');

gridAPI.visible(true).apply();
gridAPI.fields('CAMPO').visible(false).apply();
gridAPI.columns('COLUNA').visible(false).apply();
```

**dataRows** aceita nada (tudo), índice (base 0) ou função de filtro:

```javascript
var todas = gridAPI.dataRows();
var segunda = gridAPI.dataRows(1);
var caras = gridAPI.dataRows(function (dataRow) { return dataRow.PRECO > 20.0; });
```

CRUD de linha:

```javascript
gridAPI.insertDataRow({ NOME: 'Item 1', PRECO_UNITARIO: 20.99, QUANTIDADE: 10 });

// updateDataRow usa a propriedade id do dataRow como referência
dataRow.PRECO_UNITARIO = 30.99;
gridAPI.updateDataRow(dataRow);

gridAPI.removeDataRow(dataRow.id);
```

Colunas:

```javascript
gridAPI.addColumn({ name: 'PRECO_TOTAL', label: 'Preço total' });        // no fim
gridAPI.addColumn({ name: 'PRECO_TOTAL', label: 'Preço total' }, true).apply();  // no início
gridAPI.editColumn({ name: 'PRECO_UNITARIO', label: 'Preço unitário' }).apply();
gridAPI.removeColumn('VALOR_OCULTO').apply();
```

Totalizadores. Os antigos `sum()`, `min()`, `max()` viram `operation()` na 5.70:

```javascript
gridAPI.columns('NUMBER_GRID').sum();   // ainda funciona

Form.grids('G1').operation('SUM',   'G_INTEIRO');
Form.grids('G1').operation('MEDIA', 'G_INTEIRO');
Form.grids('G1').operation('MAX',   'G_INTEIRO');
Form.grids('G1').operation('MIN',   'G_INTEIRO');
Form.grids('G1').operation('COUNT', 'G_INTEIRO');
```

**format** muda só a apresentação da célula, nunca o valor gravado. Aceita mapa de opções,
mapa com funções, função única, ou um componente de botão:

```javascript
gridAPI.columns('COLUNA').format({ '1': 'Valor um', '2': 'Valor dois' });

gridAPI.columns('COLUNA').format(function (data) {
    // data.value é a célula, data.tableRowData é a linha inteira
    return data.tableRowData.LISTFORMATGRID;
});

gridAPI.columns('COLUNA').format({
    component: {
        type: 'button',
        config: { icon: 'link', name: 'Download', onClick: function () {} }
    }
});
```

**updatePropsRows** controla visibilidade de linha e dos botões. Primeiro parâmetro é
função de filtro, índice, ou `null` para todas:

```javascript
Form.grids('GRID1').updatePropsRows(function (dataRow) {
    return dataRow['L1'] === 'teste';
}, { visibleRow: false, visibleEdit: false, visibleDelete: false, visibleSigned: false }).apply();
```

Cuidado: linha ocultada aqui não muda a paginação, porque paginação é do back-end.

## Autocomplete (lista)

```javascript
var lista = Form.fields('LISTA');

lista.options();                                     // lê as opções
lista.addOptions('Opção 1').apply();                 // string
lista.addOptions(['Opção 1', 'Opção 2']).apply();    // array de string
lista.addOptions([{ name: 'Opção 1', value: 1 }]).apply();  // name exibe, value vai pro servidor

lista.addOptions(['Opção 1'], true).apply();         // limpa antes
lista.addOptions(['Opção 1'], true, true).apply();   // limpa antes e mantém o selecionado

lista.removeOptions('Opção 1').apply();
lista.removeOptions([]).apply();                     // reset
lista.clear().apply();
```

## Ações

```javascript
Form.actions('aprovar').execute();
Form.fields('NOME').actions('NOME_lookup').execute();
Form.grids('GRID1').fields('PRECO').actions('PRECO_refresh').execute();
```

Convenção de id: ação de lupa é `<CAMPO>_lookup`, refresh é `<CAMPO>_refresh`.
Ações padrão do form: `aprovar`, `rejeitar`, `cancel`, `finish`.

| Propriedade | O que faz |
|---|---|
| `label` | texto do botão |
| `icon` | ícone do Material Design do Google (m2.material.io/icons) |
| `style` | `primary` azul, `cancel` cinza, `danger` vermelho |
| `disabled` | desabilita |
| `hidden` | esconde |
| `confirmsWith` | mensagem de confirmação antes de executar |

## Eventos (subscribe)

**Do form:** `SUBMIT`, `SUBMIT_SUCCESS`, `SUBMIT_ERROR`, `VALIDATION_ERROR`,
`SAVE_FORM_SUCCESS`.

O `SUBMIT` é onde vai a validação customizada. **Se a APIJS insere o erro, a APIJS é
responsável por chamar `reject()`**, senão o form segue mesmo com erro na tela:

```javascript
Form.subscribe('SUBMIT', function (formId, actionId, reject) {
    var cpf = Form.fields('CPF');
    if (!validaCPF(cpf.value())) {
        cpf.errors('CPF Inválido');
        reject();
    }
});
```

Mesma coisa para exigir pelo menos uma linha na grid:

```javascript
Form.subscribe('SUBMIT', function (formId, actionId, reject) {
    if (Form.fields('ITEMS').dataRows().length === 0) { reject(); }
});
```

**De campo:** `BLUR`, `FOCUS`, `CLICK`, `CHANGE`, `KEY_PRESS`, `SET_FIELD_VALUE`.

- `SET_FIELD_VALUE` dispara quando a APIJS muda o valor, não quando o usuário digita
- `CHANGE` dispara na digitação, mas o `.value()` ainda não está atualizado dentro dele
- `SET_FIELD_PROPERTIES` existe mas deixa o form lento porque dispara em qualquer
  propriedade. Trocar por `SET_FIELD_VALUE` quando pegar manutenção em script antigo

**De grid:** `GRID_SUBMIT`, `GRID_ADD_SUBMIT`, `GRID_EDIT_SUBMIT`, `GRID_EDIT`,
`GRID_DESTROY`, `GRID_RESET`, e o conjunto novo da 5.50 v1.04:

| Evento | Parâmetros | Serve para |
|---|---|---|
| `GRID_DATA_ROW_LOADED` | formId, gridId, dataRows | esperar a grid carregar sem `setTimeout` |
| `GRID_ADD_BEFORE` | +submittedDataRow, dataRows, resolve, reject | cancelar ou alterar a inserção |
| `GRID_ADD_AFTER` | +submittedDataRow, dataRows | dataRows já atualizado |
| `GRID_EDIT_BEFORE` / `GRID_EDIT_AFTER` | idem | edição |
| `GRID_DELETE_BEFORE` / `GRID_DELETE_AFTER` | deletedDataRow | exclusão |

Nos `_BEFORE` dá para mudar o dado antes de gravar:

```javascript
Form.grids('G1').subscribe('GRID_ADD_BEFORE', function (formId, gridId, submittedDataRow, dataRows, resolve, reject) {
    submittedDataRow.TXT = 'teste';
    resolve(submittedDataRow);
});
```

E `reject('mensagem')` mostra a mensagem na grid.

**De ação:** `CLICK`. Ações de SUBMIT também publicam `SUBMIT`, `SUBMIT_SUCCESS`,
`SUBMIT_ERROR`, `VALIDATION_ERROR` no escopo daquela ação.

**De lupa/refresh (SEARCHER):** `SEARCHER_LOAD_SUCCESS`, `SEARCHER_LOAD_ERROR`,
`SEARCHER_SELECT`.

**De campo template (documento):** `DOCUMENT_IMPORT_FILE_SUBMITTED` (valida o arquivo
importado), `UNLINKED_FILE_SUCCESS`, `DELETE_FILE_SUCCESS`.

## Obrigatoriedade e validação

```javascript
Form.fields('TESTE').setRequired('aprovar', true).apply();
Form.fields('TESTE').setRequired('cancel',  true).apply();
Form.fields('TESTE').setRequired('rejeitar', true).apply();
Form.fields('TESTE').setRequired('finish',  true).apply();
Form.grids('ID_GRID').fields('TESTE').setRequired(true).apply();   // botão adicionar da grid

Form.fields('TESTE').validations([
    { formActionName: 'aprovar', required: true },
    { formActionName: 'cancel',  required: true }
]).apply();
```

## Modais e loading

```javascript
Form.fields('ID_CAMPO').addMessageModal({ message: 'texto', type: 'error' });  // error|warning|info

Form.addCustomModal({
    title: 'Título modal',
    description: 'mensagem',
    showButtonClose: false,
    buttons: [{ name: 'Confirmar', icon: 'add', closeOnClick: true, action: function () {} }]
});

Form.showLoader({ description: 'mensagem', icon: true });
Form.hideLoader();   // sem isso o loading não fecha
```

## Dados da atividade

```javascript
ProcessData.activityTitle;       // título da etapa
ProcessData.cycle;               // ciclo
ProcessData.activityInstanceId;  // código da etapa
ProcessData.processId;
```

## Máscaras

Pré-definidas: `cpf` e `cnpj`. Customizadas usam o jQuery Mask Plugin:

```javascript
Form.fields('CEP').mask('99.999-999').apply();
Form.fields('DATA').mask('00/00/0000').apply();
```

## Descobrir os IDs no console do navegador

```javascript
Form.fields().map(f => f.id);
Form.actions().map(a => a.id);              // ex.: ["aprovar", "cancel"]
Form.grids('GRID').fields().map(f => f.id);
Form.fields('CEP').actions().map(a => a.id); // ex.: ["CEP_lookup"]
```

## Boas práticas que o manual manda seguir

1. Encapsular o script em IIFE:
   ```javascript
   (function () {
       $(document).ready(function () {
           // código
       });
   })();
   ```
2. Guardar a API do campo numa variável em vez de chamar `Form.fields('X')` toda hora
3. **Evitar promise (`.then`)** sempre que der
4. Validar só no submit, não em tempo real
5. Escolher um jeito de inserir erro (pelo form ou pelo campo) e não misturar
6. **Evitar seletor jQuery fora da APIJS.** Estado e estilo de campo se mexe só pela APIJS

Vale notar que o código legado dos clientes viola várias dessas regras (usa `.then`,
manipula `#input__CAMPO` direto). Ao mexer em script existente, seguir o estilo do arquivo;
em script novo, seguir o manual.
