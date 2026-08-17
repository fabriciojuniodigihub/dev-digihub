/*
 * Processo: Efetuação de compras
 * Regras de tela via API JS
 *
 * 1. A justificativa só aparece, e como obrigatória, quando o valor do produto
 *    passa de R$ 10.000,00.
 * 2. Mês de entrega diferente de maio exibe aviso na tela.
 *
 * A obrigatoriedade da justificativa foi retirada do Studio, é controlada aqui.
 */
(function () {

    var SOLICITACAO_COMPRAS = 2;

    var LIMITE_JUSTIFICATIVA = 10000.00;
    var MES_PERMITIDO = 'Maio';

    $(document).ready(function () {

        if (ProcessData.activityInstanceId == SOLICITACAO_COMPRAS) {

            aplicaRegraJustificativa();

            Form.fields('VALOR_PRODUTO').subscribe('CHANGE', function () {
                aplicaRegraJustificativa();
            });

            Form.fields('MES_ENTREGA').subscribe('CHANGE', function () {
                validaMesEntrega();
            });
        }
    });

    function aplicaRegraJustificativa() {
        var justificativa = Form.fields('JUSTIFICATIVA');
        var exige = converteValor(Form.fields('VALOR_PRODUTO').value()) > LIMITE_JUSTIFICATIVA;

        justificativa.visible(exige);
        justificativa.setRequired('aprovar', exige);

        if (!exige) {
            justificativa.value('');
        }

        Form.apply();
    }

    function validaMesEntrega() {
        var mes = Form.fields('MES_ENTREGA').value();

        if (mes && mes !== MES_PERMITIDO) {
            Form.addMessageModal({
                message: 'Errou o mês. A entrega só pode ser agendada para ' + MES_PERMITIDO + '.',
                type: 'warning'
            });
        }
    }

    /* o campo monetário chega como '10.000,01' */
    function converteValor(valor) {
        if (!valor) {
            return 0;
        }
        var numero = parseFloat(String(valor).replace(/\./g, '').replace(',', '.'));
        return isNaN(numero) ? 0 : numero;
    }

})();
