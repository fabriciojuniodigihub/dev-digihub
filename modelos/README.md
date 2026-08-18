# Modelos

Ponto de partida para não começar do zero e não esquecer o padrão da casa.

| Arquivo | Para que |
|---|---|
| [processo_v1.0.js](processo_v1.0.js) | regra de tela nova, no padrão do time |
| [PDD.md](PDD.md) | documento de definição de processo, obrigatório em robô do Roberty |

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
