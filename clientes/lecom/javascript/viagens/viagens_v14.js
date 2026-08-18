const codEtapa = ProcessData.activityInstanceId

var Etapa = Object.freeze({
    SOLICITACAO: 1,
    APROVACAO_DO_GESTOR: 2,
    COMPRAS_E_RESERVAS: 5,
    PRESTACAO_DE_CONTAS: 6,
    CONFERENCIA_DAS_CONTAS: 10,
    MONTAGEM_DO_REPASSE: 15,
    CIENCIA_DO_CEO: 17,
    FINALIZACAO_DA_SOLICITACAO: 20,
    CONFERENCIA_DO_REPASSE: 22,
    CANCELAMENTO_DA_SOLICITACAO: 25,
    APROVACAO_DO_GERENTE_ADMINISTRATIVO: 28,
    CIENCIA_DO_GESTOR: 29,
    EFETIVACAO_DO_PROCESSO: 32,
    CIENCIA_DO_CFO: 33
});

$(document).ready(function () {
    Form.apply().then(function () {
        setFieldsSize();
        setForm();
    });
});

function setFieldsSize() {
    // Viagem
    Form.fields('CIDADE')?.className?.('col m6');
    Form.fields('HAVERA_REPASSE')?.className?.('col m3');
    Form.fields('PROD')?.className?.('col m3');
    Form.fields('NATUREZA_VIAGEM')?.className?.('col m6');
    Form.fields('USER_GC')?.className?.('col m4');
    Form.fields('COORD_RESPONSAVEL')?.className?.('col m6');
    Form.fields('SQUAD')?.className?.('col m6');

    // Aquisicoes
    Form.grids('ITENS_SOLICITADOS')?.fields('ITEM_AQUISICAO')?.className?.('col m3');
    Form.grids('ITENS_SOLICITADOS')?.fields('ITEM_DESTINO')?.className?.('col m6');
    Form.grids('ITENS_SOLICITADOS')?.fields('ITEM_VALOR')?.className?.('col m3');
    Form.grids('ITENS_SOLICITADOS')?.fields('ITEM_FORNECEDOR')?.className?.('col m9');
    Form.grids('ITENS_SOLICITADOS')?.fields('ITEM_COND_PGTO')?.className?.('col m9');
    Form.grids('ITENS_SOLICITADOS')?.fields('ITEM_VOUCHER')?.className?.('col m3');
    Form.fields('TOTAL_REPASSE_AQUISICAO')?.className?.('col m2');
    Form.fields('TOTAL_AQUISICAO')?.className?.('col m2 offset-m8');

    // Despesas
    Form.grids('ITENS_DESPESA')?.fields('TIPO_DESPESA')?.className?.('col m3');
    Form.grids('ITENS_DESPESA')?.fields('VALOR_DESPESA')?.className?.('col m3');
    Form.grids('ITENS_DESPESA')?.fields('DESP_COMPROVANTE')?.className?.('col m6');

    // Veiculo
    Form.fields('CAR_DT_DEVOLUCAO')?.className?.('col m3 offset-m3');
    Form.fields('CAR_HORARIO_DEV')?.className?.('col m3');
    Form.fields('CAR_HIST_VIAGEM')?.className?.('col m6 offset-m3');
    // Outros Repasses
    Form.grids('OUTROS_REPASSES')?.fields('OUTROS_PROTHEUS')?.className?.('col m2');
    Form.grids('OUTROS_REPASSES')?.fields('OUT_REPASSE_DESC')?.className?.('col m8');
    Form.grids('OUTROS_REPASSES')?.fields('OUT_REPASSE_VLR')?.className?.('col m2');
    Form.fields('OUT_REPASSE_TOTAL')?.className?.('col m2 offset-m10');
    // Deslocamento
    Form.fields('DESLOCAMENTO')?.className?.('col m3 offset-m1');
    Form.fields('DESLOCA_HORAS')?.className?.('col m2');
    Form.fields('VALOR_HORA')?.className?.('col m2');
    Form.fields('DESLOCA_TOTAL')?.className?.('col m2');
    // Resumo Repasse
    Form.fields('VLR_TOT_GASTO')?.className?.('col m2 offset-m8');
    Form.fields('REPASSE_TOTAL_VIAGEM')?.className?.('col m2');
}

function setForm() {

    switch (codEtapa) {

        case Etapa.SOLICITACAO:
            solicitacaoEvents();
            break;

        case Etapa.COMPRAS_E_RESERVAS:
            Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS'], false);
            toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
            Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
            setTimeout(() => Form.grids('ITENS_SOLICITADOS').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            hideElement({ name: '#CREATE', index: 0, style: 'visibility' });
            Form.apply();
            comprasEvents();
            break;

        case Etapa.PRESTACAO_DE_CONTAS:
            Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS'], false);
            toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
            hideElement({ name: '#CREATE', index: 0, style: 'display' });
            setTimeout(() => Form.grids('ITENS_SOLICITADOS').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m3 offset-m9');
            Form.apply();
            prestacaoEvents();
            break;

        case Etapa.CONFERENCIA_DAS_CONTAS:
            Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS'], false);
            toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
            hideElement({ name: "#CREATE", index: -1, style: "display" });
            setTimeout(() => Form.grids('ITENS_SOLICITADOS').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            toggleVisibility('field', 'ITENS_DESPESA', ['TIPO_DESPESA', 'VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA'], false);
            Form.fields('TOTAL_AQUISICAO')?.className?.('col m2 offset-m10');
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m3 offset-m9');
            Form.apply();
            conferenciaContasEvents();
            break;

        case Etapa.MONTAGEM_DO_REPASSE:
            Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_COND_PGTO', 'ITEM_FORNECEDOR', 'ITEM_VOUCHER', 'ITEM_OBS'], false);
            toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_COND_PGTO', 'ITEM_VALOR', 'ITEM_FORNECEDOR', 'ITEM_VOUCHER', 'ITEM_OBS', 'ITEM_VLR_REPASSE'], false);
            hideElement({ name: '#CREATE', index: 0, style: 'visibility' });
            setTimeout(() => Form.grids('ITENS_SOLICITADOS').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            Form.grids('ITENS_DESPESA').fields('TIPO_DESPESA')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_DESPESA', ['OBS_DESPESA', 'DESP_COMPROVANTE'], false);
            toggleVisibility('field', 'ITENS_DESPESA', ['VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA', 'VALOR_REPASSE'], false);
            setTimeout(() => Form.grids('ITENS_DESPESA').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m2 offset-m4');
            Form.fields('TOTAL_REPASSE_DESPESA')?.className?.('col m2');
            hideElement({ name: '#CREATE', index: 1, style: 'visibility' });
            $("#group-name_1207").after("<div class=\"form__button-group col s12 m12 l12 right-align\" style=\"margin-right: 10px;\" id=\"botaoGeraResumoRepasse\"><a id=\"gerarResumoRepasse\" onclick=\"gravaGridRepasse()\" class=\"btn waves-effect waves-light\" data-position=\"top\" data-delay=\"10\" data-tooltip=\"Atualizar Resumo\"><span>Atualizar Resumo</span><div></div></a></div>");
            Form.apply();
            repasseMontagemEvents();
            break;

        case Etapa.CONFERENCIA_DO_REPASSE:
            Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_DESCRICAO'], false);
            toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO', 'ITEM_VLR_REPASSE'], false);
            hideElement({ name: '#CREATE', index: 0, style: 'display' });
            setTimeout(() => Form.grids('ITENS_SOLICITADOS').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            Form.grids('ITENS_DESPESA').fields('TIPO_DESPESA')?.className?.('hidden');
            toggleVisibility('column', 'ITENS_DESPESA', ['OBS_DESPESA', 'DESP_COMPROVANTE'], false);
            toggleVisibility('field', 'ITENS_DESPESA', ['VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA', 'VALOR_REPASSE', 'KM'], false);
            setTimeout(() => Form.grids('ITENS_DESPESA').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m2 offset-m8');
            Form.fields('TOTAL_REPASSE_DESPESA')?.className?.('col m2');
            hideElement({ name: '#CREATE', index: 1, style: 'display' });
            conferenciaRepasseEvents();
            break;

        case Etapa.APROVACAO_DO_GERENTE_ADMINISTRATIVO:
            gridAquisicoesReadOnly({ incluirValorRepasse: true });
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m2 offset-m8');
            Form.fields('TOTAL_REPASSE_DESPESA')?.className?.('col m2');
            break;

        case Etapa.CIENCIA_DO_CEO:
        case Etapa.CIENCIA_DO_CFO:
        case Etapa.CIENCIA_DO_GESTOR:
            gridAquisicoesReadOnly({ incluirValorRepasse: true });
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m2 offset-m8');
            Form.fields('TOTAL_REPASSE_DESPESA')?.className?.('col m2');
            break;

        case Etapa.FINALIZACAO_DA_SOLICITACAO:
            gridAquisicoesReadOnly({});
            Form.fields('TOTAL_AQUISICAO')?.className?.('col m2 offset-m10');
            Form.fields('DESLOCAMENTO')?.className?.('col m3 offset-m1');
            Form.fields('DESLOCA_HORAS')?.className?.('col m2');
            Form.fields('VLR_TOT_SOLICITANTE')?.className?.('col m2 offset-m10');
            break;

        default:
            break;
    }

    Form.apply();
}

function gridAquisicoesReadOnly({ incluirValorRepasse = false }) {
    Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
    toggleVisibility('column', 'ITENS_SOLICITADOS', ['ITEM_NDOC_NF', 'ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_DESCRICAO'], false);
    toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_NDOC_NF', 'ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO', 'ITEM_VLR_REPASSE'], false);
    hideElement({ name: '#CREATE', index: 0, style: 'display' });
    setTimeout(() => Form.grids('ITENS_SOLICITADOS').updatePropsRows(null, { visibleRow: true, visibleEdit: true, visibleDelete: false }).apply(), 1000);
    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        switch (dataRows.ITEM_AQUISICAO) {
            case 'Carro':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                const condutor = Form.grids('ITENS_SOLICITADOS').fields('ITEM_CAR_CONDUTOR');
                if (condutor.value() != undefined && condutor.value() != "")
                    condutor.visible(true);
                break;
            case 'Passagem Aérea':
            case 'Passagem Rodoviária':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
            case 'Reserva de Hotel':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
        }

        let hide = ['ITEM_DESCRICAO', 'ITEM_VOUCHER', 'ITEM_COND_PGTO', 'ITEM_OBS'];
        if (incluirValorRepasse)
            hide.push('ITEM_VLR_REPASSE')

        toggleVisibility('field', 'ITENS_SOLICITADOS', hide, true);
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('visible');
    });

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO', 'ITEM_VLR_REPASSE'], false);
        Form.apply();
    });
}

function toggleVisibility(type, gridId, element, state) {
    if (type == 'column')
        element.forEach(item => Form.grids(gridId).columns(item).visible(state));

    if (type == 'field')
        element.forEach(item => Form.grids(gridId).fields(item).visible(state));

    Form.apply();
}

function hideElement({ name, index, style }) {
    const element = document.querySelectorAll(name);
    if (element.length == 0)
        return;

    if (index == -1 && style == 'display')
        element.forEach(x => x.style.display = 'none');
    else if (index != -1 && style == 'display')
        element[index].style.display = 'none';
    else if (index == -1 && style == 'visibility') {
        element.forEach(x => {
            x.style.transition = 'none';
            x.style.visibility = 'hidden';
        })
    } else {
        element[index].style.transition = 'none';
        element[index].style.visibility = 'hidden';
    }
}

function showCreateButton(index) {
    if (!index)
        document.querySelector('#CREATE').style.visibility = 'visible';
    else
        document.querySelectorAll('#CREATE')[index].style.visibility = 'visible';
}

function hideCreateButton(index) {
    if (!index)
        document.querySelector('#CREATE').style.visibility = 'hidden';
    else
        document.querySelectorAll('#CREATE')[index].style.visibility = 'hidden';
}

function comprasEvents() {

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        showCreateButton();
        switch (dataRows.ITEM_AQUISICAO) {
            case 'Carro':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO'], true);
                const condutor = Form.grids('ITENS_SOLICITADOS').fields('ITEM_CAR_CONDUTOR');
                if (condutor.value() != undefined && condutor.value() != "")
                    condutor.visible(true);
                break;
            case 'Passagem Aérea':
            case 'Passagem Rodoviária':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;

            case 'Reserva de Hotel':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
        }
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('visible');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_VALOR', 'ITEM_FORNECEDOR', 'ITEM_DESCRICAO', 'ITEM_VOUCHER', 'ITEM_COND_PGTO', 'ITEM_OBS'], true);
    });

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_RESET', () => {
        hideCreateButton();
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
        Form.apply();
    });
}

function solicitacaoEvents() {

    Form.actions('aprovar').subscribe('SUBMIT', function (itemId, action, reject) {
        var errorsForm = Form.errors()
        var repasse = Form.fields('HAVERA_REPASSE').value()
        var produto = Form.fields('PROD').value()
        if (repasse == 'Sim' && (produto == '' || produto == undefined))
            errorsForm[Form.fields('PROD').id] = ['Produto deve ser preenchido!']
        Form.errors(errorsForm)
        var errors = Form.errors();
        if (Object.keys(errors).length) reject()
    });
    Form.apply()

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_SUBMIT', (event, fieldId, item) => {
        const qtde = parseInt(Form.fields('QTD_ITENS').value());
        Form.fields('QTD_ITENS').value(qtde + 1).apply();

        if (item.ITEM_AQUISICAO == 'Carro') {
            Form.fields('CARRO_SOLICITADO').value('S').apply();
            Form.addCustomModal({
                title: "Solicitação de Veículo",
                description: "Ao receber a confirmação da reserva, fique atento(a) à data e ao horário de retirada e devolução do veículo, pois podem divergir do que foi solicitado.",
                showButtonClose: true,
                buttons: []
            });
        }
    });


    Form.fields('ITENS_SOLICITADOS').subscribe('GRID_DESTROY', function (event, fieldId, item) {
        const qtde = Form.fields('QTD_ITENS').value();
        Form.fields('QTD_ITENS').value(qtde - 1).apply();
        const carro = item.ITEM_AQUISICAO == 'Carro' ? 'S' : 'N';
        Form.fields('CARRO_SOLICITADO').value(carro).apply();
    });

}

function prestacaoEvents() {

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        switch (dataRows.ITEM_AQUISICAO) {
            case 'Carro':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                const condutor = Form.grids('ITENS_SOLICITADOS').fields('ITEM_CAR_CONDUTOR');
                if (condutor.value() != undefined && condutor.value() != "")
                    condutor.visible(true);
                break;
            case 'Passagem Aérea':
            case 'Passagem Rodoviária':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;

            case 'Reserva de Hotel':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
        }
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('visible');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_VOUCHER', 'ITEM_COND_PGTO', 'ITEM_OBS'], true);
    });

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
        Form.apply();
    });
}

function conferenciaContasEvents() {

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        switch (dataRows.ITEM_AQUISICAO) {
            case 'Carro':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                const condutor = Form.grids('ITENS_SOLICITADOS').fields('ITEM_CAR_CONDUTOR');
                if (condutor.value() != undefined && condutor.value() != "")
                    condutor.visible(true);
                break;
            case 'Passagem Aérea':
            case 'Passagem Rodoviária':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
            case 'Reserva de Hotel':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
        }
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_VOUCHER', 'ITEM_COND_PGTO', 'ITEM_OBS'], true);
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('visible');
    });

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
        Form.apply();
    });

    Form.grids('ITENS_DESPESA').subscribe('GRID_ADD_AFTER', () => {
        const soma = Form.grids('ITENS_DESPESA').columns('VALOR_DESPESA').sum();
        Form.fields('VLR_TOT_SOLICITANTE').value(soma).apply();
    });

    Form.grids('ITENS_DESPESA').subscribe('GRID_EDIT_AFTER', () => {
        const soma = Form.grids('ITENS_DESPESA').columns('VALOR_DESPESA').sum();
        Form.fields('VLR_TOT_SOLICITANTE').value(soma).apply();
    });

    Form.fields('ITENS_DESPESA').subscribe('GRID_DELETE_AFTER', () => {
        const soma = Form.grids('ITENS_DESPESA').columns('VALOR_DESPESA').sum();
        Form.fields('VLR_TOT_SOLICITANTE').value(soma).apply();
    });
}

function repasseMontagemEvents() {

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        showCreateButton();
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('visible');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_COND_PGTO', 'ITEM_VALOR', 'ITEM_FORNECEDOR', 'ITEM_VOUCHER', 'ITEM_OBS', 'ITEM_VLR_REPASSE'], true);
    });

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
        hideCreateButton();
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_COND_PGTO', 'ITEM_VALOR', 'ITEM_FORNECEDOR', 'ITEM_VOUCHER', 'ITEM_OBS', 'ITEM_VLR_REPASSE'], false);
    });

    Form.grids('ITENS_DESPESA').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        showCreateButton(1);
        Form.grids('ITENS_DESPESA').fields('TIPO_DESPESA')?.className?.('visible');
        toggleVisibility('field', 'ITENS_DESPESA', ['VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA', 'VALOR_REPASSE'], true);
    });

    Form.grids('ITENS_DESPESA').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_DESPESA').fields('TIPO_DESPESA')?.className?.('hidden');
        hideCreateButton(1)
        toggleVisibility('field', 'ITENS_DESPESA', ['VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA', 'VALOR_REPASSE'], false);
    });

    Form.apply();
}

function conferenciaRepasseEvents() {

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        switch (dataRows.ITEM_AQUISICAO) {
            case 'Carro':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                const condutor = Form.grids('ITENS_SOLICITADOS').fields('ITEM_CAR_CONDUTOR');
                if (condutor.value() != undefined && condutor.value() != "")
                    condutor.visible(true);
                break;
            case 'Passagem Aérea':
            case 'Passagem Rodoviária':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
            case 'Reserva de Hotel':
                toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_VALOR', 'ITEM_FORNECEDOR'], true);
                break;
        }
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DESCRICAO', 'ITEM_VOUCHER', 'ITEM_COND_PGTO', 'ITEM_OBS'], true);
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('visible');
    });

    Form.grids('ITENS_SOLICITADOS').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_SOLICITADOS').fields('ITEM_AQUISICAO')?.className?.('hidden');
        toggleVisibility('field', 'ITENS_SOLICITADOS', ['ITEM_DT_RETIRADA', 'ITEM_CAR_RETIRADA', 'ITEM_CAR_DT_DEVOLUCAO', 'ITEM_CAR_HR_DEVOLUCAO', 'ITEM_CAR_CONDUTOR', 'ITEM_DESTINO', 'ITEM_DT_COMPROMISSO', 'ITEM_HR_CHEGADA', 'ITEM_HOTEL_ESTADIA_DE', 'ITEM_HOTEL_ESTADIA_ATE', 'ITEM_FORNECEDOR', 'ITEM_VALOR', 'ITEM_COND_PGTO', 'ITEM_OBS', 'ITEM_VOUCHER', 'ITEM_DESCRICAO'], false);
        Form.apply();
    });

    Form.grids('ITENS_DESPESA').subscribe('GRID_EDIT', function (formId, gridId, submittedDataRow, dataRows) {
        Form.grids('ITENS_DESPESA').fields('TIPO_DESPESA')?.className?.('visible');

        let fieldsToShow = ['VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA', 'VALOR_REPASSE'];
        if (dataRows.TIPO_DESPESA === 'Quilometragem')
            fieldsToShow.push('KM');

        toggleVisibility('field', 'ITENS_DESPESA', fieldsToShow, true);
    });

    Form.grids('ITENS_DESPESA').subscribe('GRID_RESET', () => {
        Form.grids('ITENS_DESPESA').fields('TIPO_DESPESA')?.className?.('hidden');
        hideCreateButton(1)
        toggleVisibility('field', 'ITENS_DESPESA', ['VALOR_DESPESA', 'DESP_COMPROVANTE', 'OBS_DESPESA', 'VALOR_REPASSE', 'KM'], false);
    });
}

function gravaGridRepasse() {
    try {
        // ===== 1. Limpa grid
        const gridResumo = Form.fields('GRID_RESUMO_REPASSE');
        gridResumo.dataRows().forEach((dataRow) => gridResumo.removeDataRow(dataRow.id));

        // ===== 2. Coleta e processa dados
        const dadosAgrupados = new Map(); // Usando Map para agrupar por item

        // ITENS_SOLICITADOS
        Form.fields('ITENS_SOLICITADOS').dataRows().forEach((aquisicao) => {
            const repasse = Number(aquisicao.ITEM_VLR_REPASSE || 0);
            if (repasse > 0) {
                const itemKey = String(aquisicao.ITEM_AQUISICAO || '');
                const valor = Number(aquisicao.ITEM_VALOR || 0);

                if (dadosAgrupados.has(itemKey)) {
                    const existente = dadosAgrupados.get(itemKey);
                    existente.valor = (Number(existente.valor) + valor).toFixed(2);
                    existente.repasse = (Number(existente.repasse) + repasse).toFixed(2);
                } else {
                    dadosAgrupados.set(itemKey, {
                        item: itemKey,
                        valor: valor.toFixed(2),
                        repasse: repasse.toFixed(2),
                        codigo: aquisicao.ITEM_COD_FORNECEDOR || ''
                    });
                }
            }
        });

        // ITENS_DESPESA
        Form.fields('ITENS_DESPESA').dataRows().forEach((despesa) => {
            const repasse = Number(despesa.VALOR_REPASSE || 0);
            if (repasse > 0) {
                const itemKey = String(despesa.TIPO_DESPESA || '');
                const valor = Number(despesa.VALOR_DESPESA || 0);

                if (dadosAgrupados.has(itemKey)) {
                    const existente = dadosAgrupados.get(itemKey);
                    existente.valor = (Number(existente.valor) + valor).toFixed(2);
                    existente.repasse = (Number(existente.repasse) + repasse).toFixed(2);
                } else {
                    dadosAgrupados.set(itemKey, {
                        item: itemKey,
                        valor: valor.toFixed(2),
                        repasse: repasse.toFixed(2),
                        codigo: despesa.DESP_COD_PROTHEUS || ''
                    });
                }
            }
        });

        // OUTROS_REPASSES
        Form.fields('OUTROS_REPASSES').dataRows().forEach((outro) => {
            const repasse = Number(outro.OUT_REPASSE_VLR || 0);
            if (repasse > 0) {
                const itemKey = String(outro.OUT_REPASSE_DESC || '');

                if (dadosAgrupados.has(itemKey)) {
                    const existente = dadosAgrupados.get(itemKey);
                    existente.repasse = (Number(existente.repasse) + repasse).toFixed(2);
                } else {
                    dadosAgrupados.set(itemKey, {
                        item: itemKey,
                        valor: repasse.toFixed(2),
                        repasse: repasse.toFixed(2),
                        codigo: outro.OUTROS_PROTHEUS || ''
                    });
                }
            }
        });

        // DESLOCAMENTO
        const considerarDeslocamento = Form.fields('DESLOCAMENTO').value() == "Sim";
        const horasDeslocamento = Number(Form.fields('DESLOCA_HORAS').value() || 0);

        if (considerarDeslocamento && horasDeslocamento > 0) {
            const total_deslocamento = Number(Form.fields('DESLOCA_TOTAL').value() || 0);
            if (total_deslocamento > 0) {
                const itemKey = `Deslocamento - ${horasDeslocamento} hora(s)`;
                dadosAgrupados.set(itemKey, {
                    item: itemKey,
                    valor: total_deslocamento.toFixed(2),
                    repasse: total_deslocamento.toFixed(2),
                    codigo: 'X00002'
                });
            }
        }

        // Ordena
        const dados = Array.from(dadosAgrupados.values());
        const dadosOrdenados = dados.sort((a, b) => {
            const itemA = String(a.item || '');
            const itemB = String(b.item || '');
            return itemA.localeCompare(itemB);
        });

        // ===== 3. Popula grid
        const gridAPI = Form.grids('GRID_RESUMO_REPASSE');
        dadosOrdenados.forEach(item => {
            gridAPI.insertDataRow({
                REPASSE_ITEM: item.item,
                REPASSE_TOT_GASTO: item.valor,
                REPASSE_TOT_REPASSE: item.repasse,
                COD_PROTHEUS: item.codigo,
                REPASSE_TOT_CLIENTE: '0.00'
            });
        });

        // ===== 4. Atualiza total geral
        const totalGasto = dadosOrdenados.reduce((total, item) => total + Number(item.valor), 0);
        Form.fields('VLR_TOT_GASTO').value(totalGasto.toFixed(2)).apply();

        const totalRepasse = dadosOrdenados.reduce((total, item) => total + Number(item.repasse), 0);
        Form.fields('REPASSE_TOTAL_VIAGEM').value(totalRepasse.toFixed(2)).apply();

    } catch (error) {
        console.error('Erro em gravaGridRepasse:', error);
    }
}
