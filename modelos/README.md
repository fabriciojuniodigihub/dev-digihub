# Modelos

Ponto de partida para não começar do zero e não esquecer o padrão da casa.

| Arquivo | Para que |
|---|---|
| [processo_v1.0.js](processo_v1.0.js) | regra de tela nova, no padrão do time |
| [PDD.md](PDD.md) | documento de definição de processo, obrigatório em robô do Roberty |
| [carregar_grid_arquivo.js](carregar_grid_arquivo.js) | carregar grid a partir de planilha, exemplo do Haislan |

## Sobre o modelo de JavaScript

Segue o que está em [treinamento-09-javascript.md](../notas/treinamento-09-javascript.md) e
[time-e-padroes-de-codigo.md](../notas/time-e-padroes-de-codigo.md).

O que não pode faltar ao usar:

**O cabeçalho.** Troque nome do arquivo e do processo, e ponha seu `@author` e `@since`. Em
arquivo que já existe, **acrescente** o seu embaixo, sem apagar os anteriores.

**Os códigos das etapas** no `Object.freeze`. Pegue no Studio, na aba Atividades. O código não
segue a ordem do fluxo, então confira um por um.

**Um arquivo por processo**, vinculado a todas as atividades, com o nome terminando na versão
(`_v1.0.js`). Ao versionar o processo, copie para `_v2.0.js` e vincule ao modelo novo.

**Reuse o `JSPadrao`.** Antes de escrever validação de CPF, CNPJ, PIS, e-mail ou data, veja se
já existe no `apiJSPadrao_v1.0.7.js`. Quase sempre existe.

**Campo controlado por script sai da obrigatoriedade do Studio.** Não configure nos dois lugares.

O que evitar, que é defeito do legado e não padrão: `debugger`, `setInterval` de polling,
`setTimeout` para esperar grid (use `GRID_DATA_ROW_LOADED`) e seletor jQuery fora da APIJS.

## Sobre o carregamento de grid por planilha

Exemplo que o Haislan passou no Discord em 18/08/2026, tirado de um processo de viagem. O
caminho é `FileReader.readAsBinaryString` no anexo, `XLSX.read` com `cellDates: true` para a
data não vir como número serial do Excel, `sheet_to_row_object_array` em cada aba e um
`grid.insertDataRow` por linha. Cada aba da planilha cai numa grid diferente, e a chave do
objeto passado no `insertDataRow` é o nome do campo da grid no Studio, não o cabeçalho da
planilha.

A biblioteca é a SheetJS 0.15.3, no `xlsx.full.min.js` que está aqui do lado. Não está no Git
por causa do tamanho. Ela vem com um remendo que importa: um trecho no começo do arquivo zera
o `window.define` e outro no fim devolve. Sem isso a SheetJS se registra como módulo AMD no
RequireJS da plataforma e o `XLSX` global nunca aparece. Se pegar o arquivo direto do site da
SheetJS, esse remendo tem que ser refeito na mão.

Duas coisas do exemplo não seguem o padrão daqui e não valem cópia: o jQuery direto no rodapé
do modal para esconder o botão, e o `documentStore.store[campo].flashMessage`. Os dois mexem
em coisa interna da tela e quebram quando a versão da plataforma muda. O `validaGridPreenchida`
e o `limpaDadosGrid`, no topo do arquivo, esses sim são de uso geral.
