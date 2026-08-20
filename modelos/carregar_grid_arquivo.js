

/**
 * @description Valida se a grid foi preenchida
 * @param identificador
 * @param mensagem  a ser exibida
 * @param totalItens necessário na grid
 * @returns
 */
function validaGridPreenchida(identificador, mensagem, totalItens) {
  let errorsForm = Form.errors();
  let grid = Form.grids(identificador);
  let total = grid.dataRows().length;

  if (total == 0 || parseInt(total) < parseInt(totalItens)) {
    errorsForm[grid.id] = [mensagem];
  }

  Form.errors(errorsForm);
  Form.apply();
}

function limpaDadosGrid(gridId) {
  let grid = Form.grids(gridId);
  let dataRows = grid.dataRows();
  dataRows.forEach(function (data) {
    grid.removeDataRow(data.id);
  });
}

function carregaPlanilha(file, campo) {
  //esconde o botao de fechar
  let fileReader = new FileReader();
  let inicio = performance.now();

  fileReader.onload = function (event) {
    let data = event.target.result;
    let workbook = XLSX.read(data, { type: "binary", cellDates: true });

    workbook.SheetNames.forEach(function (sheet) {
      console.log(workbook.Sheets[sheet]);
      let rowObject = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheet]
      );
      //let jsonObject = JSON.stringify(rowObject);
      if (sheet == "PASSAGEM_AREA") {
        PreencheGrid(rowObject, campo, "GRD_PASSAGEM");
      } else if (sheet == "HOTEL") {
        PreencheGrid(rowObject, campo, "GRD_HOSPEDAGEM2");
      } else if (sheet == "PASSAGEM_RODOVIARIA") {
        PreencheGrid(rowObject, campo, "GRD_RODOV");
      }
    });
  };
  fileReader.readAsBinaryString(file);
}

function PreencheGrid(dadosJson, campo, gridDestino) {
  //let dadosJson = JSON.parse(dados)
  let grid = Form.grids(gridDestino);
  for (i in dadosJson) {
    let item = dadosJson[i];

    switch (gridDestino) {
      case "GRD_PASSAGEM": {
        let ciaOriginal = "";
        let ciaCodeShare = "";
        let voo = "";
        let dataChegada = "";
        let dataSaida = "";
        let horaChegada = "";
        let horaSaida = "";
        let destino = "";
        let origem = "";
        let escala = "";
        let bagagem = "";
        let adt = "";
        let totais = "";
        let conexao = "";

        /*
         *  Valida se tem vôo porque tem linhas que só tem o origem e destino pois no excel essa informação fica em duas linhas
         */
        if (item.Voo) {
          if (item.Voo.toString().indexOf("operado") > -1) {
            let vooArray = item.Voo.toString().split("(operado");
            voo = vooArray[0].replace(/\s/g, "");
            // Busca nome da companhia original pelo número do voo
            ciaOriginal = buscaNomeCompanhiaVoo(voo);

            // Pega no da companhia que relamente irá realizar o voo
            ciaCodeShare = vooArray[1].substring(1, vooArray[1].length - 1);
          } else {
            voo = item.Voo.toString();
            ciaOriginal = buscaNomeCompanhiaVoo(voo);
            ciaCodeShare = ciaOriginal;
          }

          if (item.Chegada) {
            dataChegada = item.Chegada;
          }
          if (item.Saida) {
            dataSaida = item.Saida;
          }

          if (item.Chegada && item.Saida) {
            let dataChegada = new Date(item.Chegada);
            let dataSaida = new Date(item.Saida);
            let hrChegada = "00";
            let minChegada = "00";
            let hrSaida = "00";
            let minSaida = "00";
            if (dataChegada.getHours() < 10) {
              hrChegada = "0" + dataChegada.getHours();
            } else {
              hrChegada = dataChegada.getHours();
            }
            if (dataChegada.getMinutes() < 10) {
              minChegada = "0" + dataChegada.getMinutes();
            } else {
              minChegada = dataChegada.getMinutes();
            }
            if (dataSaida.getHours() < 10) {
              hrSaida = "0" + dataSaida.getHours();
            } else {
              hrSaida = dataSaida.getHours();
            }
            if (dataSaida.getMinutes() < 10) {
              minSaida = "0" + dataSaida.getMinutes();
            } else {
              minSaida = dataSaida.getMinutes();
            }

            horaChegada = hrChegada + ":" + minChegada;
            horaSaida = hrSaida + ":" + minSaida;
          }

          if (item.Destino) {
            destino = item.Destino;
            let indiceProximo = parseInt(i) + 1;
            if (dadosJson[indiceProximo]) {
              destino += " - " + dadosJson[indiceProximo].Destino;
            }
          }
          if (item.Origem) {
            origem = item.Origem;
            let indiceProximo = parseInt(i) + 1;
            if (dadosJson[indiceProximo]) {
              origem += " - " + dadosJson[indiceProximo].Origem;
            }
          }
          if (item.Bagagem) {
            bagagem = item.Bagagem;
          }
          if (item.Totais) {
            if (item.Totais.indexOf("R$") > -1) {
              let totalFormatado = item.Totais.substring(3, item.Totais.length);
              if (totalFormatado) {
                totais = parseFloat(totalFormatado.replace(",", "."));
              }
            } else {
              totais = item.Totais;
            }
          }
          if (item.ADT) {
            adt = item.ADT.toString();
          }

          if (item.Escala) {
            escala = item.Escala.toString();
          }
          if (item.Conexao) {
            conexao = item.Conexao.toString();
          }

          grid.insertDataRow({
            CIA: ciaOriginal,
            CIA_VOO: ciaCodeShare,
            NUMERO_VOO: voo,
            DATA_CHEGADA: dataChegada.toLocaleDateString(),
            DATA_SAIDA: dataSaida.toLocaleDateString(),
            HORA_CHEGADA: horaChegada,
            HORA_SAIDA: horaSaida,
            DESTINO_PASSAGEM: destino,
            ORIGEM_PASSAGEM: origem,
            ADT: adt,
            ESCALA: escala,
            BAGAGEM: bagagem,
            TOTAIS: totais,
            CONEXAO: conexao,
          });
        }

        break;
      }
      case "GRD_HOSPEDAGEM2": {
        let periodoData = "";
        let hotel = "";
        let endereco = "";
        let acomodacao = "";
        let tipoQuarto = "";
        let regime = "";
        let diaria = "";
        let periodoVlr = "";
        let totalComTaxas = "";
        /*let destino = "";
          let periodo = "";
          let acomodacoes = "";
          let viajantes = "";*/

        if (item.Periodo) {
          periodoData = item.Periodo;
        }
        if (item.Hotel) {
          hotel = item.Hotel;
        }
        if (item.Endereco) {
          endereco = item.Endereco;
        }
        if (item.Acomodacao) {
          acomodacao = item.Acomodacao;
        }
        if (item.Tipo_Quarto) {
          tipoQuarto = item.Tipo_Quarto;
        }
        if (item.Regime) {
          regime = item.Regime;
        }
        if (item.Diaria) {
          diaria = item.Diaria;
        }
        if (item.Periodo_VLR) {
          periodoVlr = item.Periodo_VLR;
        }
        if (item.Total_Com_Taxas) {
          totalComTaxas = item.Total_Com_Taxas;
        }

        /*
            if (item.Diaria_Media) { 
                if (item.Diaria_Media.indexOf("BRL ") > -1){
                  let diariaMediaFormatada = item.Diaria_Media.substring(3, item.Diaria_Media.length);
                  if (diariaMediaFormatada){
                    diariaMedia = parseFloat(diariaMediaFormatada.replace(",", "."));
                  }
                } else {
                  diariaMedia = item.Diaria_Media;
                }
              }
              if (item.Valor_Total) {
                if (item.Valor_Total.indexOf("BRL ") > -1){
                  let totalFormatado = item.Valor_Total.substring(3, item.Valor_Total.length);
                  if (totalFormatado){
                    valorTotal = parseFloat(totalFormatado.replace(",", "."));
                  }
                } else {
                  valorTotal = item.Valor_Total;
                }  
            }
            if (item.Destino) { destino = item.Destino; }
            if (item.Periodo) { periodo = item.Periodo; }
            if (item.Acomodacoes) { acomodacoes = item.Acomodacoes; }
            if (item.Viajantes) { viajantes = item.Viajantes; }


            if (destino){ Form.fields('DESTINO_COTACAO2').value(destino); }
            if (periodo){ Form.fields('PERIODO_VIAGEM2').value(periodo); }
            if (acomodacoes){ Form.fields('ACOMODACOES_COTACAO2').value(acomodacoes); }
            if (viajantes){ Form.fields('VIAJANTES2').value(viajantes); }
          */

        grid.insertDataRow({
          PERIODO_DT: periodoData,
          HOTEL2: hotel,
          ENDERECO: endereco,
          ACOMODACAO: acomodacao,
          TIPO_QUARTO: tipoQuarto,
          REGIME: regime,
          DIARIA: diaria,
          PERIODO: periodoVlr,
          TOTAL_COM_TAXA: totalComTaxas,
        });

        break;
      }

      case "GRD_RODOV": {
        let cia = "";
        let embarque = "";
        let desembarque = "";
        let dataEmbarque = "";
        let dataDesembarque = "";
        let duracao = "";
        let classe = "";
        let total = "";

        if (item.Cia) {
          cia = item.Cia;
        }
        if (item.Embarque) {
          embarque = item.Embarque;
        }
        if (item.Desembarque) {
          desembarque = item.Desembarque;
        }
        if (item.Data_Embarque) {
          dataEmbarque = item.Data_Embarque;
        }
        if (item.Data_Desembarque) {
          dataDesembarque = item.Data_Desembarque;
        }
        if (item.Duracao) {
          duracao = item.Duracao;
        }
        if (item.Classe) {
          classe = item.Classe;
        }
        if (item.Total) {
          total = item.Total;
        }

        grid.insertDataRow({
          CIA_ROD: cia,
          EMBARQUE: embarque,
          DESEMBARQUE: desembarque,
          DT_EMBARQUE: dataEmbarque
            .toLocaleString()
            .substring(0, dataEmbarque.toLocaleString().length - 3),
          DT_DESEMBARQUE: dataDesembarque
            .toLocaleString()
            .substring(0, dataDesembarque.toLocaleString().length - 3),
          DURACAO: duracao
            .toLocaleTimeString()
            .substring(0, duracao.toLocaleTimeString().length - 3),
          CLASSE: classe,
          TOTAL_PASSAG: total,
        });

        break;
      }

      default: {
      }
    }
  }
  Form.hideLoader();
  documentStore.store[campo].flashMessage = {
    type: "notice",
    message:
      "As informações da planilha foram carregadas na solicitação, clique em importar para continuar",
  };
  $($("#documentModal .modal-footer-container .button-group a")[0]).hide();
  Form.apply();
}
