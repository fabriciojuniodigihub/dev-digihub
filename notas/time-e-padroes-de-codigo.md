# Quem escreve o código e como o time realmente escreve

Levantado por autoria nos arquivos (`@author`) e nos exemplos da documentação oficial.

## Pessoas que aparecem no código

### JavaScript de formulário (clientes, principalmente Sodexo)

| Pessoa | Quando aparece | O que dá para inferir |
|---|---|---|
| **felipe.rocha** | 12/2023, 2024, 05/2024, 09/2024, 01/2025 | o nome que mais se repete, e quase sempre **em cima do trabalho de outro**. É quem pega manutenção e evolução. É a referência de estilo a seguir |
| **douglas.peixinho** | 10/2023, 02/2023, 02/2024 | autor original de vários processos grandes (plano de ação, inspeção) |
| **leonardo.granai** | 03/2022 | o mais antigo dos arquivos vistos |
| **Matheus.marchioni** | 08/2025 | entrada recente, mexeu no `sa_inspecao_v2` |
| **Roner Lopes** | 09/2025 | o mais recente, autor do `sa_planej_anual_v1` |

### Java (robôs, integrações e a lib comum)

| Pessoa | Onde |
|---|---|
| **afonso.amor** (Afonso Amór) | integração DocuSign, robô de status, token de acesso, 2021 |
| **Mauricio Moura** | `UtilECM`, funções comuns |
| **Valter Leite**, **Carlos Henrique Leda**, **Mario Oliveira**, **Alan Hayashi**, **Jéssica Silva** | `Funcoes.java`, a lib compartilhada, marcada como `@author TODOS` |
| **vinicius.henrique** | autor dos exemplos oficiais de robô da 7.0. Os repositórios de exemplo estão em `git.lecom.com.br/vinicius.henrique/RadarRoboEnviaEmail` e `RadarRoboConexaoBanco` |

## O cabeçalho é o histórico do arquivo

O padrão da casa, e isso importa muito:

```javascript
/**
 * arquivo:     st_plano_acao_valida_grid.js
 * processo:    [Segurança do Trabalho] - Plano de Ação v.1
 *
 * - Dependências:
 *
 * @author      leonardo.granai
 * @since       03/2022
 *
 * @author felipe.rocha
 * @since       12/2023
 */
```

**Quem mexe acrescenta o próprio `@author` e `@since` embaixo, sem apagar os anteriores.**
O cabeçalho vira o log de quem passou pelo arquivo. Ao pegar manutenção, adicionar
`@author fabricio.almeida` e o mês/ano, mantendo o resto. Não reescrever cabeçalho alheio.

## O esqueleto que todo script segue

```javascript
/* Globais Auxiliares */
const codForm         = ProcessData.processId;
const codVersao       = ProcessData.version;
const codProcesso     = ProcessData.processInstanceId;
const codEtapa        = ProcessData.activityInstanceId;
const codCiclo        = ProcessData.cycle;
const tituloProcesso  = ProcessData.title.replace(/\n/g, "");
const tituloEtapa     = ProcessData.activityTitle.replace(/\n/g, "");
const gridPlanoAcaoId = "GR_PLANO_ACAO";

/* Etapas */
var Etapa = Object.freeze({ INICIAR: 1, CONFERIR: 4, FINALIZAR: 11 });

$(document).ready(function () {
    Form.apply().then(function () {
        initForm();
        validaFormOnSubmit();
    });
});

function initForm() {
    switch (codEtapa) {
        case Etapa.INICIAR: ...; break;
        default: break;
    }
}
```

Convenções de nome que o time usa:

| Prefixo | Significado |
|---|---|
| `sa_` / `st_` | prefixo do arquivo por processo |
| `GR_` | grid |
| `CT_` | campo de texto |
| `LS_` | lista |
| `DT_` | data |
| `VLR_` | valor monetário |
| `TP_` | template (anexo) |
| `LST_` | lista dentro de grid |

Blocos separados por comentário de cabeçalho:
`/* ******* * EVENTOS * ******* */`, `/* ********** * VALIDAÇÕES * ********** */`,
`/* FUNCOES AUXILIARES */`.

## O que o código legado faz de errado

Isso não é crítica gratuita, é para eu não copiar defeito achando que é padrão.
Encontrado em `st_plano_acao_valida_grid.js`, que está em produção na Sodexo:

- **`debugger;` esquecido no código**, em três lugares. Trava o navegador de quem tiver o
  DevTools aberto
- **`setInterval(configuraGridPA, 300)`** — reconfigura a grid a cada 300 milissegundos, para
  sempre. Isso é o que deixa formulário lento. O jeito certo é o evento
  `GRID_DATA_ROW_LOADED`, que existe desde a 5.50 v1.04 justamente para matar esse padrão
- **Salvamento automático com `setInterval` de 5 minutos** chamando a API antiga
  `Lecom.api.ProcessAPI.currentProcess().save()`
- **Condição duplicada:** `if (lsStatus == 'Em Andamento' || lsStatus == "Em Andamento")`
- **Variável morta:** `var formErrors = Form.errors();` declarada e nunca usada, em duas funções
- **Bug real** em `setQdoTipoValidation()`: `lsStatus` vem do `dataRow`, ou seja, é uma
  string, e o código chama `lsStatus.disabled(true).apply()`. String não tem `disabled`.
  Isso lança `TypeError` sempre que a etapa Elaborar carrega com alguma linha na grid
- **`reject()` dentro de `forEach`**, chamado uma vez por linha inválida
- Código comentado espalhado, incluindo `case` inteiro comentado
- `subscribe` solto no escopo global misturado com `subscribe` dentro de função

## Como eu vou trabalhar então

1. **Arquivo existente:** seguir o estilo dele (indentação, nomes, organização em blocos),
   acrescentar meu `@author`/`@since` no cabeçalho, e **não sair refatorando o que não foi
   pedido**. Se eu encontrar um bug como o do `setQdoTipoValidation`, aviso o Fabrício e
   deixo ele decidir se entra no escopo do chamado
2. **Arquivo novo:** o esqueleto acima, mais o que o manual manda (IIFE, evitar `.then`,
   validar só no submit, nada de seletor jQuery fora da APIJS) e reusar o `JSPadrao` em vez
   de reescrever validação de CPF, CNPJ, data e e-mail
3. **Nunca** `debugger`, `setInterval` de polling, ou variável morta
