/**
 * arquivo:     processo_v1.0.js
 * processo:    [Área] - Nome do Processo v.1
 *
 * - Dependências: apiJSPadrao_v1.0.7.js
 *
 * @author      fabricio.almeida
 * @since       08/2026
 */

/* Globais Auxiliares */
const codForm        = ProcessData.processId;
const codVersao      = ProcessData.version;
const codProcesso    = ProcessData.processInstanceId;
const codEtapa       = ProcessData.activityInstanceId;
const codCiclo       = ProcessData.cycle;
const tituloProcesso = ProcessData.title.replace(/\n/g, "");
const tituloEtapa    = ProcessData.activityTitle.replace(/\n/g, "");

/* Grids */
const gridItensId = "GR_ITENS";

/* Etapas - o código se pega no Studio, na aba Atividades */
var Etapa = Object.freeze({
    SOLICITAR: 2,
    CONFERIR:  4,
    APROVAR:   6,
    FINALIZAR: 11
});

$(document).ready(function () {
    initForm();
    registraEventos();
    validaFormOnSubmit();
});

/* ******* * INICIALIZAÇÃO * ******* */

function initForm() {
    switch (codEtapa) {
        case Etapa.SOLICITAR:
            /* regras da abertura */
            break;

        case Etapa.CONFERIR:
            /* regras da conferência */
            break;

        default:
            break;
    }

    Form.apply();
}

/* ******* * EVENTOS * ******* */

function registraEventos() {
    if (codEtapa !== Etapa.SOLICITAR) {
        return;
    }

    Form.fields("LS_TIPO").subscribe("CHANGE", function () {
        aplicaRegraTipo();
    });

    Form.grids(gridItensId).subscribe("GRID_DATA_ROW_LOADED", function () {
        /* usar este evento em vez de setTimeout para esperar a grid */
        totalizaItens();
    });
}

/* ********** * VALIDAÇÕES * ********** */

function validaFormOnSubmit() {
    Form.subscribe("SUBMIT", function (formId, actionId, reject) {
        if (actionId !== "aprovar") {
            return;
        }

        var itens = Form.grids(gridItensId).dataRows();
        if (itens.length === 0) {
            Form.fields(gridItensId).errors("Inclua ao menos um item.");
            reject();
        }
    });
}

/* FUNCOES AUXILIARES */

function aplicaRegraTipo() {
    var exigeJustificativa = Form.fields("LS_TIPO").value() === "Excepcional";

    Form.fields("CT_JUSTIFICATIVA").visible(exigeJustificativa);
    Form.fields("CT_JUSTIFICATIVA").setRequired("aprovar", exigeJustificativa);

    Form.apply();
}

function totalizaItens() {
    var total = 0;

    Form.grids(gridItensId).dataRows().forEach(function (linha) {
        total += parseFloat(linha.VLR_ITEM || 0);
    });

    Form.fields("VLR_TOTAL").value(total);
    Form.apply();
}
