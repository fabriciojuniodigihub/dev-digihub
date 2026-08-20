const codEtapa = ProcessData.activityInstanceId;

const ETAPA = Object.freeze({
  SOLICITACAO: 2,
  ANALISE_DO_JURIDICO_EXTERNO: 8,
  ANALISE_DO_CEO: 11,
  ANALISE_DO_GESTOR_ADMINISTRATIVO: 4,
  ANALISE_DO_GESTOR_COMERCIAL: 5,
  ANALISE_DO_GESTOR_OPERACIONAL: 9,
  ANALISE_DO_SOLICITANTE: 10,
  APROVACAO_DO_JURIDICO_INTERNO: 12,
  ASSINATURA_DOS_DOCUMENTOS: 13,
  CIENCIA_DO_ANALISTA_COMERCIAL: 16,
  CIENCIA_DO_COMPRAS: 20,
  CIENCIA_DO_DEPTO_DE_PESSOAL: 21,
  CIENCIA_DO_FATURAMENTO: 18,
  CIENCIA_DO_GESTOR_ADMINISTRATIVO: 17,
  CIENCIA_DO_GESTOR_COMERCIAL: 15,
  CIENCIA_DO_GESTOR_OPERACIONAL: 19,
  CIENCIA_DO_JURIDICO_INTERNO: 22,
  CIENCIA_DO_SOLICITANTE: 14,
  EFETIVACAO_DO_PROCESSO: 23,
  CANCELAMENTO_DA_SOLICITACAO: 6,
  FINALIZACAO_DO_PROCESSO: 3,
  ANALISAR_PARECER_JURIDICO_EXTERNO: 25,
  ANALISAR_PARECER_GESTOR_OPERACIONAL: 27,
  ANALISAR_PARECER_GESTOR_COMERCIAL: 28,
  ANALISAR_PARECER_CEO: 29,
  ANALISAR_PARECER_SOLICITANTE: 30,
  APROVAR_ANALISE_GESTOR_ADMINISTRATIVO: 31,
  DELIBERACAO_JURIDICO_INTERNO: 26,
  DELIBERAR_ASSINATURAS_GESTOR_ADMINISTRATIVO: 32
});

$(document).ready(function () {
  setEventos();
  setForm();
  setValidators();
  registraValidacaoEmail();
});


function setEventos() {

  if (ProcessData.activityInstanceId == ETAPA.ANALISE_DO_GESTOR_ADMINISTRATIVO) {
    // Form.fields("ACAO").subscribe(
    //   "CHANGE",
    //   function (itemId, data, response) {
    //     botaoGestorAdministrativo();
    //   }
    // );
  }

  if (ProcessData.activityInstanceId == ETAPA.SOLICITACAO) {
    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        mostrarGridAssinantes();
      }
    );

    // Form.fields("ACAO").subscribe(
    //   "CHANGE",
    //   function (itemId, data, response) {
    //     marcarAssinarGestorAdm();

    //     setTimeout(() => {
    //       Form.apply().then(function () {
    //         zerarValoresGridPorId('ASSINANTES')
    //       });
    //     }, 600)

    //   }
    // );

    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        obrigarNumeroProcesso();
      }
    );

    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "SET_FIELD_VALUE",
      function (itemId, data, response) {
        obrigarNumeroProcesso();
        mostrarGridAssinantes();
      }
    );

  }

  if (ProcessData.activityInstanceId == ETAPA.ANALISAR_PARECER_SOLICITANTE) {

    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        obrigarNumeroProcesso();
      }
    );

  }

  if (ProcessData.activityInstanceId == ETAPA.DELIBERACAO_JURIDICO_INTERNO) {

    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        obrigarNumeroProcesso();
      }
    );

  }

  if (ProcessData.activityInstanceId == ETAPA.ANALISE_DO_SOLICITANTE) {

    Form.grids("ASSINANTES").subscribe("GRID_ADD_SUBMIT", function (formId, gridId, item) {

      Form.grids('ASSINANTES').errors('');
      Form.grids('ASSINANTES').visible(true).apply;
    });
  }

  if (ProcessData.activityInstanceId == ETAPA.APROVAR_ANALISE_GESTOR_ADMINISTRATIVO) {

    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        mostrarGridAssinantes();
      }
    );
  }

  if (ProcessData.activityInstanceId == ETAPA.ANALISAR_PARECER_SOLICITANTE) {

    Form.fields("ASSINAR_DOCUMENTO").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        mostrarGridAssinantes();
      }
    );
  }

  if (ProcessData.activityInstanceId == ETAPA.APROVACAO_DO_JURIDICO_INTERNO) {

    Form.fields("FLAG_ASSINAR").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        mostrarGridAssinantes();
      }
    );

    // Form.fields("ASSINAR_DOCUMENTO").subscribe(
    //   "CHANGE",
    //   function (itemId, data, response) {
    //     obrigarNumeroProcesso();
    //   }
    // );


  }

  if (ProcessData.activityInstanceId == ETAPA.DELIBERACAO_JURIDICO_INTERNO) {

    Form.fields("FLAG_ASSINAR").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        flagsDeliberacaoJuridico();
      }
    );

    Form.fields("FLAG_APROVAR").subscribe(
      "CHANGE",
      function (itemId, data, response) {
        flagsDeliberacaoJuridico();
      }
    );
  }


}

function setForm() {

  obrigarNumeroProcesso();

  switch (codEtapa) {

    case ETAPA.ASSINATURA_DOS_DOCUMENTOS:
    case ETAPA.EFETIVACAO_DO_PROCESSO:
    case ETAPA.CANCELAMENTO_DA_SOLICITACAO:
    case ETAPA.FINALIZACAO_DO_PROCESSO:
    //case ETAPA.DELIBERAR_ASSINATURAS_GESTOR_ADMINISTRATIVO:
    case ETAPA.ANALISAR_PARECER_JURIDICO_EXTERNO:
    case ETAPA.ANALISAR_PARECER_GESTOR_OPERACIONAL:
    case ETAPA.ANALISAR_PARECER_GESTOR_COMERCIAL:
    case ETAPA.ANALISAR_PARECER_CEO:
    case ETAPA.APROVAR_ANALISE_GESTOR_ADMINISTRATIVO:

      break;

    case ETAPA.SOLICITACAO:
      setFieldsSizeByGroup('GRP_DADOS')
      Form.grids('ANEXOS').fields('ANX_DOC')?.className?.('col m9');
      //Form.actions("aprovar").hidden(false).label("Enviar Análise").apply();
      onCNPJBlur()
      mostrarCheckAssinatura()
      mostrarGridAssinantes()
      //botaoGestorAdministrativo()
      setTimeout(() => {
        Form.apply().then(function () {
          deptoSolicitante();
        });
      }, 2000)
      break;

    case ETAPA.APROVACAO_DO_JURIDICO_INTERNO:
      const ciclo = parseInt(Form.fields('AUX_CICLO').value());
      const roteamente = Form.fields('ROTEAMENTO').value();

      Form.fields('TITULO')?.className?.('col m12');
      setFieldsSizeByGroup('GRP_CABECALHO');
      setFieldsSizeByGroup('GRP_DADOS');
      document.getElementById('OBSERVACOES').style.display = 'none';

      if (ciclo > 1) {
        ['OBS_SOLICITANTE', 'OBS_GERENTE_ADM', 'OBS_CEO', 'OBS_GERENTE_COMERCIAL', 'OBS_GERENTE_OPERACIONAL', 'OBS_JURIDICO_EXTERNO'].forEach(obs => { Form.fields(obs).visible(false) });
        ['ENC_SOLICITANTE', 'ENC_GERENTE_ADM', 'ENC_CEO', 'ENC_GERENTE_COMERCIAL', 'ENC_GERENTE_OPERACIONAL', 'ENC_JURIDICO_EXTERNO'].forEach(enc => { Form.fields(enc).value('') })

        switch (roteamente) {
          case 'ANALISE_DO_SOLICITANTE':
            Form.fields('TITULO').value('Solicitante');
            Form.fields('OBS_SOLICITANTE').visible(true); break;

          case 'ANALISE_DO_GESTOR_ADMINISTRATIVO':
            Form.fields('TITULO').value('Gestor Administrativo');
            Form.fields('OBS_GERENTE_ADM').visible(true); break;

          case 'ANALISE_DO_CEO':
            Form.fields('TITULO').value('C.E.O.');
            Form.fields('OBS_CEO').visible(true); break;

          case 'ANALISE_DO_GESTOR_COMERCIAL':
            Form.fields('TITULO').value('Gestor Comercial');
            Form.fields('OBS_GERENTE_COMERCIAL').visible(true); break;

          case 'ANALISE_DO_GESTOR_OPERACIONAL':
            Form.fields('TITULO').value('Gestor Operacional');
            Form.fields('OBS_GERENTE_OPERACIONAL').visible(true); break;

          case 'ANALISE_DO_JURIDICO_EXTERNO':
            Form.fields('TITULO').value('Jurídico Externo');
            Form.fields('OBS_JURIDICO_EXTERNO').visible(true); break;
        }
      }

      Form.fields('TERMO_ASSINA').label('Declaro estar de acordo com as respostas apresentadas e desejo encaminhar o(s) documento(s) para:')
      Form.fields('FLAG_QUESTIONAR')?.className?.('col m3 offset-m2');
      Form.fields('FLAG_ASSINAR')?.className?.('col m3');
      Form.fields('FLAG_APROVAR')?.className?.('col m3');
      //Form.groups('GRP_ASSINANTES').visible(true).apply();

      break;


    case ETAPA.ANALISE_DO_SOLICITANTE:
      setFieldsSizeByGroup('GRP_CABECALHO')
      setFieldsSizeByGroup('GRP_DADOS')
      Form.grids('ASSINANTES').fields('ASS_TIPO')?.className?.('col m3');
      Form.grids('ASSINANTES').fields('ASS_ORDEM')?.className?.('col m1');
      Form.grids('ASSINANTES').fields('ASS_CPF')?.className?.('col m2');
      Form.grids('ASSINANTES').fields('ASS_NOME')?.className?.('col m5');
      Form.grids('ASSINANTES').fields('ASS_EMAIL')?.className?.('col m4');
      contaAssinantes();
      ordemAssinatura();
      validaCPF();
      somenteLeituraTipoPessoa();
      obrigarNumeroProcesso();
      mostrarGridAssinantes();
      break;

    case ETAPA.CIENCIA_DO_ANALISTA_COMERCIAL:
    case ETAPA.CIENCIA_DO_COMPRAS:
    case ETAPA.CIENCIA_DO_DEPTO_DE_PESSOAL:
    case ETAPA.CIENCIA_DO_FATURAMENTO:
    case ETAPA.CIENCIA_DO_GESTOR_ADMINISTRATIVO:
    case ETAPA.CIENCIA_DO_GESTOR_COMERCIAL:
    case ETAPA.CIENCIA_DO_GESTOR_OPERACIONAL:
    case ETAPA.CIENCIA_DO_JURIDICO_INTERNO:
    case ETAPA.CIENCIA_DO_SOLICITANTE:
      setFieldsSizeByGroup('GRP_CABECALHO')
      setFieldsSizeByGroup('GRP_DADOS')
    case ETAPA.ANALISAR_PARECER_JURIDICO_EXTERNO:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();

    case ETAPA.DELIBERAR_ASSINATURAS_GESTOR_ADMINISTRATIVO:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();

    case ETAPA.APROVAR_ANALISE_GESTOR_ADMINISTRATIVO:
      somenteLeituraTipoPessoa();
      Form.grids('ASSINANTES').visible(false).apply();
      somenteLeituraNumeroProcesso();
    //mostrarGridAssinantes();

    case ETAPA.ANALISAR_PARECER_GESTOR_OPERACIONAL:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();

    case ETAPA.ANALISAR_PARECER_GESTOR_COMERCIAL:
      somenteLeituraTipoPessoa();

    case ETAPA.ANALISAR_PARECER_CEO:
      somenteLeituraTipoPessoa();

    case ETAPA.ANALISAR_PARECER_SOLICITANTE:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();
      mostrarGridAssinantes();
      Form.actions('aprovar').hidden(false).apply();
      Form.actions('rejeitar').hidden(false).apply();

    case ETAPA.ANALISE_DO_CEO:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();

    case ETAPA.ANALISE_DO_GESTOR_COMERCIAL:
      somenteLeituraTipoPessoa();

    case ETAPA.ANALISE_DO_GESTOR_ADMINISTRATIVO:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();
    //botaoGestorAdministrativo();
    //Form.fields('ACAO').visible(false).required(false).apply();
    //Form.actions("aprovar").hidden(false).label('Encaminhar p/ Jurídico Interno').apply();

    case ETAPA.DELIBERACAO_JURIDICO_INTERNO:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();

    case ETAPA.DELIBERAR_ASSINATURAS_GESTOR_ADMINISTRATIVO:
      somenteLeituraTipoPessoa();
      somenteLeituraNumeroProcesso();


      break;


    default:
      setFieldsSizeByGroup('GRP_CABECALHO')
      setFieldsSizeByGroup('GRP_DADOS')
      break;

  }
}

function setValidators() {
  console.log("Etapa atual:", codEtapa);

  if (ProcessData.activityInstanceId == ETAPA.SOLICITACAO) {
    Form.actions("aprovar").subscribe(
      "SUBMIT",
      (itemId, action, reject) => {

        let assinatura = Form.fields('ASSINAR_DOCUMENTO').value()
        if (assinatura == "OK") {

          const validaGrid = Form.grids("ANEXOS");
          if (validaGrid.dataRows().length === 0) {
            validaGrid.errors(
              "Por favor, insira ao menos um anexo na Grid."
            );

            reject();
          }
        }

        if (assinatura == 'OK') {

          const validaGrid = Form.grids("ASSINANTES");
          if (validaGrid.dataRows().length === 0) {
            validaGrid.errors(
              "Por favor, insira ao menos um assinante."
            );

            reject();
          }
          else {
            validaEmailsDaGrid(reject);
          }
        }

      }
    );
  }

  if (ProcessData.activityInstanceId == ETAPA.ANALISE_DO_SOLICITANTE) {
    Form.actions("aprovar").subscribe(
      "SUBMIT",
      (itemId, action, reject) => {

        let assinar = Form.fields('ASSINAR_DOCUMENTO').value();

        if (assinar == 'OK') {

          const validaGrid = Form.grids("ASSINANTES");
          if (validaGrid.dataRows().length === 0) {
            validaGrid.errors(
              "Por favor, insira ao menos um assinante."
            );

            reject();
          }
          else {
            validaEmailsDaGrid(reject);
          }
        }

        let assinatura = Form.fields('ASSINAR_DOCUMENTO').value()
        if (assinatura == "OK") {

          const validaGrid = Form.grids("ANEXOS");
          if (validaGrid.dataRows().length === 0) {
            validaGrid.errors(
              "Por favor, insira ao menos um anexo na Grid."
            );

            reject();
          }
        }

      }
    );
  }

  // if (ProcessData.activityInstanceId == ETAPA.ANALISE_DO_SOLICITANTE) {
  //   Form.actions("aprovar").subscribe(
  //     "SUBMIT",
  //     (itemId, action, reject) => {
  //       const validaGrid = Form.grids("ASSINANTES");
  //       if (validaGrid.dataRows().length === 0) {
  //         validaGrid.errors(
  //           "Por favor, insira ao menos um assinante."
  //         );

  //         reject();
  //       }
  //     }
  //   );
  // }

  if (ProcessData.activityInstanceId == ETAPA.DELIBERACAO_JURIDICO_INTERNO) {
    Form.actions("aprovar").subscribe(
      "SUBMIT",
      (itemId, action, reject) => {

        let flagAssinar = Form.fields('FLAG_ASSINAR').value();

        if (flagAssinar == "Assinar Digitalmente") {

          const validaGrid = Form.grids("ASSINANTES");
          if (validaGrid.dataRows().length === 0) {
            validaGrid.errors(
              "Por favor, insira ao menos um assinante."
            );

            reject();
          }
          else {
            validaEmailsDaGrid(reject);
          }
        }
      }
    );
  }

  if (ProcessData.activityInstanceId == ETAPA.APROVACAO_DO_JURIDICO_INTERNO) {
    Form.actions("aprovar").subscribe(
      "SUBMIT",
      (itemId, action, reject) => {

        let flagAssinar = Form.fields('FLAG_ASSINAR').value();

        if (flagAssinar == "Assinar Digitalmente") {

          const validaGrid = Form.grids("ASSINANTES");
          if (validaGrid.dataRows().length === 0) {
            validaGrid.errors(
              "Por favor, insira ao menos um assinante."
            );

            reject();
          }
          else {
            validaEmailsDaGrid(reject);
          }
        }
      }
    );
  }

  if (ProcessData.activityInstanceId == ETAPA.DELIBERAR_ASSINATURAS_GESTOR_ADMINISTRATIVO) {
    Form.actions("aprovar").subscribe(
      "SUBMIT",
      (itemId, action, reject) => {
        const validaGrid = Form.grids("ASSINANTES");
        if (validaGrid.dataRows().length === 0) {
          validaGrid.errors(
            "Por favor, insira ao menos um assinante."
          );

          reject();
        }
        else {
          validaEmailsDaGrid(reject);
        }
      }
    );
  }

  if (ProcessData.activityInstanceId == ETAPA.ANALISAR_PARECER_SOLICITANTE) {
    Form.actions("aprovar").subscribe(
      "SUBMIT",
      (itemId, action, reject) => {
        const validaGrid = Form.grids("ASSINANTES");
        if (validaGrid.dataRows().length === 0) {
          validaGrid.errors(
            "Por favor, insira ao menos um assinante."
          );

          reject();
        }
        else {
          validaEmailsDaGrid(reject);
        }
      }
    );
  }

}


function registraValidacaoEmail() {
  const campo = Form.grids('ASSINANTES')?.fields?.('ASS_EMAIL');
  if (!campo) return;

  campo.subscribe('CHANGE', function () {
    sanitizaEmail();
  });
}

function validaCPF() {
  Form.grids('ASSINANTES').fields('ASS_CPF').subscribe('CHANGE', function () {
    Form.apply().then(function () {
      let retorno = JSPadrao.validaCPF({ 'grid': 'ASSINANTES', 'campo': 'ASS_CPF' });
    });
  });
}

function contaAssinantes() {
  Form.grids('ASSINANTES').subscribe('GRID_SUBMIT', (event, fieldId, item) => {
    const qtde = Form.fields('QTD_ASSINANTES').value() != undefined ? parseInt(Form.fields('QTD_ASSINANTES').value()) : 0;
    Form.fields('QTD_ASSINANTES').value(qtde + 1).apply();
  });

  Form.fields('ASSINANTES').subscribe('GRID_DESTROY', function (event, fieldId, item) {
    const qtde = Form.fields('QTD_ASSINANTES').value();
    if (qtde > 0)
      Form.fields('QTD_ASSINANTES').value(qtde - 1).apply();
  });
}

function ordemAssinatura() {
  Form.grids('ASSINANTES').fields('ASS_ORDEM').subscribe('BLUR', () => {
    Form.apply().then(() => {
      let dataRows = Form.grids('ASSINANTES').dataRows();
      let campoOrdem = Form.grids('ASSINANTES').fields('ASS_ORDEM').value();

      dataRows.forEach((linhaItens) => {
        if (linhaItens.ASS_ORDEM == campoOrdem) {
          Form.grids('ASSINANTES').fields('ASS_ORDEM').errors('Ordem do assinante já existe na grid!').apply();
          Form.grids('ASSINANTES').fields('ASS_ORDEM').value('').apply();
          Form.grids('ASSINANTES').fields('ASS_ORDEM').focus().apply();
        } else {
          Form.grids('ASSINANTES').fields('ASS_ORDEM').errors('').apply();
        }
      });

      Form.apply();
    });
  }
  );
}

function setFieldsSizeByGroup(group) {
  switch (group) {
    case 'GRP_CABECALHO':
      Form.fields('SOLICITACAO_EMPRESA')?.className?.('col m3');
      break;
    case 'GRP_DADOS':
      Form.fields('CATEGORIA')?.className?.('col m3');
      Form.fields('PROCESSO_NUMERO')?.className?.('col m2');
      Form.fields('TIPO')?.className?.('col m3');
      Form.fields('AREA_DIREITO')?.className?.('col m4');
      Form.fields('QTD_CLAUSULAS')?.className?.('col m3');
      Form.fields('INDIVIDUO_TIPO')?.className?.('col m2');
      Form.fields('INDIVIDUO_CNPJ')?.className?.('col m3');
      Form.fields('INDIVIDUO_RAZAO')?.className?.('col m7');
      Form.fields('INDIVIDUO_CPF')?.className?.('col m3');
      Form.fields('INDIVIDUO_NOME')?.className?.('col m7');
      break;

    case 'GRP_ENCAMINHAR':
      Form.fields('ENC_SOLICITANTE')?.className?.('col m2');
      Form.fields('OBS_SOLICITANTE')?.className?.('col m8');
      Form.fields('ENC_GERENTE_ADM')?.className?.('col m2');
      Form.fields('OBS_GERENTE_ADM')?.className?.('col m8');
      Form.fields('ENC_CEO')?.className?.('col m2');
      Form.fields('OBS_CEO')?.className?.('col m8');
      Form.fields('ENC_GERENTE_COMERCIAL')?.className?.('col m2');
      Form.fields('OBS_GERENTE_COMERCIAL')?.className?.('col m8');
      Form.fields('ENC_GERENTE_OPERACIONAL')?.className?.('col m2');
      Form.fields('OBS_GERENTE_OPERACIONAL')?.className?.('col m8');
      Form.fields('ENC_JURIDICO_EXTERNO')?.className?.('col m2');
      Form.fields('OBS_JURIDICO_EXTERNO')?.className?.('col m8');
      break;
  }
}

function onCNPJBlur() {
  Form.fields('INDIVIDUO_CNPJ').subscribe('BLUR', function () {
    let retorno = JSPadrao.consultarCNPJ(
      'INDIVIDUO_RAZAO', '', '', '', '', '', '', '', '', '', '', 'INDIVIDUO_CNPJ', ''
    );
  });
}

function somenteLeituraTipoPessoa() {
  debugger

  let individuo = Form.fields('INDIVIDUO_TIPO').value();

  if (individuo == "Pessoa Física") {

    Form.fields('INDIVIDUO_CPF').visible(true).readOnly(true);
    Form.fields('INDIVIDUO_NOME').visible(true).readOnly(true);

    Form.fields('INDIVIDUO_CNPJ').visible(false);
    Form.fields('INDIVIDUO_RAZAO').visible(false);

  }
  else {

    Form.fields('INDIVIDUO_CNPJ').visible(true).readOnly(true);
    Form.fields('INDIVIDUO_RAZAO').visible(true).readOnly(true);

    Form.fields('INDIVIDUO_CPF').visible(false);
    Form.fields('INDIVIDUO_NOME').visible(false);

  }
  Form.apply();

}


//segueParaAtividade($ROTEAMENTO_ENVOLVIDOS)

//$FLAG_ASSINAR = 'Assinar Digitalmente'
//$FLAG_APROVAR = 'Aprovar e comunicar'

function botaoGestorAdministrativo() {

  let botaoAcao = Form.fields('ACAO').value();
  let depto = Form.fields('SOL_DEPTO').value();

  if (depto != "COM" && botaoAcao == "ENCAMINHAR para o Solicitante") {
    Form.actions("aprovar").hidden(true);
    Form.actions("rejeitar").hidden(false).label("ENCAMINHAR para o Solicitante");
  }

  else if (depto != "COM" && botaoAcao == "ENCAMINHAR para Assinatura") {

    Form.actions("aprovar").hidden(false).label("ENCAMINHAR para Assinatura");
    Form.actions("rejeitar").hidden(true);

  }

  else {
    Form.actions("aprovar").hidden(false);
    Form.actions("rejeitar").hidden(false);
  }

  Form.apply();

}

function mostrarCheckAssinatura() {
  debugger

  let depto = Form.fields('SOL_DEPTO').value();
  let botaoAcao = Form.fields('ACAO').value();

  if (depto == "COM" && (botaoAcao == undefined || botaoAcao == "")) {
    Form.fields('ASSINAR_DOCUMENTO').visible(false);
  }
  else if ((depto != "COM" && (botaoAcao == undefined || botaoAcao == ""))) {
    Form.fields('ASSINAR_DOCUMENTO').visible(true);
  }
  else {
    Form.fields('ASSINAR_DOCUMENTO').visible(true);

  }
  Form.apply();
}

function mostrarGridAssinantes() {
  debugger

  let checkAssinatura = Form.fields('ASSINAR_DOCUMENTO').value();

  if (checkAssinatura == "OK") {
    Form.grids('ASSINANTES').visible(true);

    Form.grids('ASSINANTES').fields('ASS_TIPO').required(true);
    Form.grids('ASSINANTES').fields('ASS_ORDEM').required(true);
    Form.grids('ASSINANTES').fields('ASS_CPF').required(true);
    Form.grids('ASSINANTES').fields('ASS_NOME').required(true);
    Form.grids('ASSINANTES').fields('ASS_EMAIL').required(true);

  }
  else {
    Form.grids('ASSINANTES').visible(false);

    Form.grids('ASSINANTES').fields('ASS_TIPO').required(false);
    Form.grids('ASSINANTES').fields('ASS_ORDEM').required(false);
    Form.grids('ASSINANTES').fields('ASS_CPF').required(false);
    Form.grids('ASSINANTES').fields('ASS_NOME').required(false);
    Form.grids('ASSINANTES').fields('ASS_EMAIL').required(false);

  }
  Form.apply();

}

function flagsDeliberacaoJuridico() {
  debugger;

  let radioAssinar = Form.fields("FLAG_ASSINAR").value();
  let radioAprovar = Form.fields("FLAG_APROVAR").value();

  // Se clicou em Assinar → força Assinar e limpa Aprovar
  if (radioAssinar === "Assinar Digitalmente") {
    Form.fields("FLAG_ASSINAR").value("Assinar Digitalmente");
    Form.fields("FLAG_APROVAR").value('');
  }

  // Se clicou em Aprovar → força Aprovar e limpa Assinar
  if (radioAprovar === "Aprovar e comunicar") {
    Form.fields("FLAG_APROVAR").value("Aprovar e comunicar");
    Form.fields("FLAG_ASSINAR").value('');
  }

  Form.apply();
}

function marcarAssinarGestorAdm() {
  debugger

  let acao = Form.fields('ACAO').value();

  if (acao == "ENCAMINHAR para o Gestor Administrativo") {
    Form.fields('ASSINAR_DOCUMENTO').value('OK');
    Form.fields('ASSINAR_DOCUMENTO').visible(true).readOnly(true);

  }
  else if (acao == "ENCAMINHAR para o Jurídico Interno") {
    Form.fields('ASSINAR_DOCUMENTO').value('');
    Form.fields('ASSINAR_DOCUMENTO').visible(false).required(false);
  }
  else {
    Form.fields('ASSINAR_DOCUMENTO').visible(false).required(false);

  }

  Form.apply();
}

function obrigarNumeroProcesso() {
  debugger;
  let assinarDocumento = Form.fields('ASSINAR_DOCUMENTO').value();
  let gridContratos = Form.grids('ANEXOS').dataRows();

  // Cenário 1: novos processos (ASSINAR_DOCUMENTO == "OK")
  if (assinarDocumento === "OK") {
    Form.fields('PROCESSO_NUMERO').visible(true).required(true);
    Form.grids('ANEXOS').visible(true);
  }

  // Cenário 2: processos antigos (já possuem anexos)
  if (gridContratos && gridContratos.length > 0) {
    Form.fields('PROCESSO_NUMERO').visible(true).required(false); // visível mas não obrigatório
    Form.grids('ANEXOS').visible(true);
  }

  // Cenário 3: sem assinatura e sem anexos
  if (assinarDocumento !== "OK" && (!gridContratos || gridContratos.length === 0)) {
    Form.fields('PROCESSO_NUMERO').visible(false).required(false);
    Form.grids('ANEXOS').visible(false);
    //Form.fields('ASSINAR_DOCUMENTO').visible(true);
  }

  Form.apply();
}



function somenteLeituraNumeroProcesso() {
  debugger

  let numeroProcesso = Form.fields('PROCESSO_NUMERO').value();

  if (numeroProcesso != undefined || numeroProcesso != "") {

    Form.fields('PROCESSO_NUMERO').visible(true).readOnly(true);
  }

  Form.apply();
}


// //Antes de esconder Grid Contratos
// function obrigarNumeroProcesso() {
//   let assinarDocumento = Form.fields('ASSINAR_DOCUMENTO').value();

//   if (assinarDocumento == "OK") {
//     Form.fields('PROCESSO_NUMERO').visible(true).required(true);
//   }
//   else {
//     Form.fields('PROCESSO_NUMERO').visible(false).required(false);

//   }
//   Form.apply();
// }

// function somenteLeituraNumeroProcesso() {
//   debugger

//   let numeroProcesso = Form.fields('PROCESSO_NUMERO').value();

//   if (numeroProcesso != undefined || numeroProcesso != "") {

//     Form.fields('PROCESSO_NUMERO').visible(true).readOnly(true);
//   }

//   Form.apply();
// }


function zerarValoresGridPorId(gridId) {
  const gridValue = Form.grids(gridId);

  if (!gridValue || gridValue.dataRows().length === 0) return;

  gridValue.dataRows().forEach((data) => gridValue.removeDataRow(data.id));

  Form.apply();
}


// function sanitizaEmail() {
//   debugger;

//   let emailGrid = Form.grids('ASSINANTES').fields('ASS_EMAIL').value();

//   // Se não tiver valor, sai da função
//   if (!emailGrid) return;

//   // Remove espaços e força minúsculas
//   let emailLimpo = emailGrid.trim().toLowerCase();

//   // Atualiza o campo com o e-mail sanitizado
//   Form.grids('ASSINANTES').fields('ASS_EMAIL').value(emailLimpo);

//   Form.apply();
// }

function emailValido(valor) {
  if (!valor) return false;

  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(valor)) return false;

  // ponto no começo, no fim ou repetido passa no regex mas não é endereço válido
  let usuario = valor.split('@')[0];
  if (usuario.startsWith('.') || usuario.endsWith('.')) return false;
  if (valor.indexOf('..') != -1) return false;

  return true;
}

function sanitizaEmail() {
  const campo = Form.grids('ASSINANTES').fields('ASS_EMAIL');
  let email = campo.value();

  if (!email) {
    campo.errors([]);
    Form.apply();
    return true;
  }

  let emailLimpo = email.trim().toLowerCase();

  if (!emailValido(emailLimpo)) {
    // limpar o campo é o que impede a linha de entrar na grid, porque ele é obrigatório
    campo.value('');
    campo.errors(['Informe um e-mail válido, no formato nome@empresa.com.br']);
    Form.apply();
    return false;
  }

  campo.value(emailLimpo);
  campo.errors([]);
  Form.apply();
  return true;
}

function validaEmailsDaGrid(reject) {
  const grid = Form.grids('ASSINANTES');
  let invalidos = [];

  grid.dataRows().forEach(function (linha, indice) {
    let email = linha.ASS_EMAIL ? String(linha.ASS_EMAIL).trim().toLowerCase() : '';
    if (!emailValido(email)) {
      invalidos.push((indice + 1) + 'ª linha' + (email ? ': ' + email : ''));
    }
  });

  if (invalidos.length > 0) {
    grid.errors('Corrija o e-mail dos assinantes antes de enviar. ' + invalidos.join(', '));
    Form.apply();
    reject();
    return false;
  }

  return true;
}

function deptoSolicitante() {
  debugger
  let depto = Form.fields('SOL_DEPTO').value();
  let grupo = Form.fields('GRUPO_SOL').value();

  if (depto == "AEF" || depto == "Financeiro" || grupo == "Grupo Assinaturas") {

    Form.fields('ACAO').visible(true).required(true);
    Form.actions('aprovar').hidden(true);
  }

  else {

    Form.fields('ACAO').visible(false).required(false);

  }

  Form.apply();

}
