const JSPadrao = (function () {
  return Object.freeze({
    nulo,
    adicionaErro,
    removeErro,
    validaCNPJ,
    validarCNPJAlfanumerico,
    validaCPF,
    validaEmail,
    validaPIS,
    somaDiasCorridos,
    somaDiasUteis,
    getDiferencaEntreDatas,
    getDiferencaEntreDataConfig,
    validaDataFinalDeSemana,
    validaDataMaiorQueAtual,
    validaDataMenorQueAtual,
    validaHora,
    calculaIdade,
    somaValorGrid,
    somaValorGridPorCondicao,
    validaPreenchimentoMinimoItensGRID,
    limparOpcoesCampoLista,
    adicionaOpcoesCampoLista,
    validarExtensaoArquivo,
    validarTamanhoArquivo,
    consultarCEP,
    consultarCNPJ,
    getDiferencaEntreDataeDataAtual
  })

  /**
   * Consulta o CEP
   * @param campoCep
   * @param campoLogradouro
   * @param campoBairro
   * @param campoCidade
   * @param campoEstado
   * @param campoComplemento
   * @param campoIbge
   * @param nomeGrid
   */
  function consultarCEP(
    campoCep,
    campoLogradouro,
    campoBairro,
    campoCidade,
    campoEstado,
    campoComplemento,
    campoIbge,
    nomeGrid
  ) {
      let formulario = Form;

      if (nomeGrid !== '')
          formulario = Form.grids(nomeGrid)

      let cep = formulario.fields(campoCep).value();
      cep = cep.replace(/\D/g, '');

      if (cep !== '' && cep !== null) {
        $.ajax({
            dataType: 'jsonp',
            url: 'https://viacep.com.br/ws/' + cep + '/json/?callback=?',
            type: 'GET'
        })
        .done(function (retorno) {
            let json = retorno

            if (campoLogradouro !== '')
                formulario.fields(campoLogradouro).value(json.nome)

            if (campoLogradouro !== '')
                formulario.fields(campoLogradouro).value(json.logradouro)

            if (campoBairro !== '')
                formulario.fields(campoBairro).value(json.bairro)

            if (campoCidade !== '')
                formulario.fields(campoCidade).value(json.localidade)

            if (campoEstado !== '')
                formulario.fields(campoEstado).value(json.uf)

            if (campoComplemento !== '')
                formulario.fields(campoComplemento).value(json.complemento)

            if (campoIbge !== '')
                formulario.fields(campoIbge).value(json.ibge)

            Form.apply()
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            Form.hideLoader()
            console.log(errorThrown)
        })
      }
  }

  function consultarCNPJ(
    campoRazaoSocial,
    campoNomeFantasia,
    campoLogradouro,
    campoNumero,
    campoComplemento,
    campoBairro,
    campoCidade,
    campoEstado,
    campoStatus,
    campoCapitalSocial,
    campoCEP,
    campoCNPJ,
    nomeGrid
  ) {
    let formulario = Form

    if (nomeGrid !== '') {
      formulario = Form.grids(nomeGrid)
    }

    let cnpj = '' + formulario.fields(campoCNPJ).value()
    let auxCNPJ = formulario.fields(campoCNPJ).value()

    cnpj = cnpj.replace(/[.\-\/\s]/g, '');

    if (cnpj !== '' && cnpj !== null) {
      Form.showLoader({
        description: 'Buscando dados na receita federal.',
        icon: true
      })

      $.ajax({
        dataType: 'json',
        url: 'https://api.cnpja.com.br/companies/' + cnpj,
        type: 'GET',
        timeout: 0,
        headers: {
          Authorization:
            'afcce05f-ea75-414a-a80f-d0804dc68a35-0471c316-6c3b-4d8c-9521-c06cb2e1df63'
        },
        async: true
      })
        .done(function (retorno) {
          Form.hideLoader()
          debugger
          let stringJson = JSON.stringify(retorno)

          let json = retorno

          if (campoRazaoSocial !== '') {
            formulario.fields(campoRazaoSocial).value(json.name)
          }

          if (campoNomeFantasia !== '') {
            formulario.fields(campoNomeFantasia).value(json.alias)
          }

          if (campoLogradouro !== '') {
            formulario.fields(campoLogradouro).value(json.address.street)
          }

          if (campoComplemento !== '') {
            formulario.fields(campoComplemento).value(json.address.details)
          }

          if (campoNumero !== '') {
            formulario.fields(campoNumero).value(json.address.number)
          }

          if (campoBairro !== '') {
            formulario.fields(campoBairro).value(json.address.neighborhood)
          }

          if (campoCidade !== '') {
            formulario.fields(campoCidade).value(json.address.city)
          }

          if (campoEstado !== '') {
            formulario.fields(campoEstado).value(json.address.state)
          }

          if (campoStatus !== '') {
            formulario.fields(campoStatus).value(json.registration.status)
          }

          if (campoCEP !== '') {
            formulario.fields(campoCEP).value(json.address.zip)
          }

          if (campoCapitalSocial !== '') {
            formulario.fields(campoCapitalSocial).value(json.capital)
          }

          formulario.fields(campoCNPJ).value(auxCNPJ)

          Form.apply()
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          Form.hideLoader()
          console.log(errorThrown)
        })
    }
  }

  /**
   * Função que retorna valor do campo, caso seja válido.
   * Caso não seja, retorna <retorno>
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 	}
   * @param retorno <string>
   */
  function nulo(config, retorno) {
    if (!config || !config.campo) {
      return ''
    }

    let grid = config.grid || ''
    let campo = config.campo

    let oCampo
    try {
      if (grid != '') {
        oCampo = Form.grids(grid).fields(campo)
      } else {
        oCampo = Form.fields(campo)
      }
    } catch (e) {
      oCampo = null
    }

    if (oCampo) {
      try {
        if (oCampo.value() == undefined) {
          return retorno
        }

        if (oCampo.value() instanceof Array) {
          if (oCampo.value()[0] == undefined) {
            return retorno
          }

          if (isNaN(oCampo.value()[0])) {
            return oCampo.value()[0].trim()
          } else {
            return oCampo.value()[0]
          }
        } else {
          if (isNaN(oCampo.value())) {
            return oCampo.value().trim()
          } else {
            return oCampo.value()
          }
        }
      } catch (e) {
        return retorno
      }
    } else {
      return retorno
    }
  }

  /**
   * Adiciona mensagem de erro a um campo do formulário
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo (opcional)
   * 	}
   * @param mensagem <string> - mensagem a ser exibida
   * @param apply <boolean> - flag que indica se o apply deve ser chamado imediatamente (default false)
   */
  function adicionaErro(config, mensagem, apply) {
    if (apply == undefined) {
      apply = false
    }

    if (config) {
      let grid = config.grid
      let campo = config.campo
      let errorsForm = Form.errors()

      if (campo && campo != '') {
        errorsForm[campo] = ['' + mensagem]
      } else if (grid && grid != '') {
        errorsForm[grid] = ['' + mensagem]
      }

      Form.errors(errorsForm)

      if (apply) {
        Form.apply()
      }
    }
  }

  /**
   * Remove mensagens de erro de um campo do formulário
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo (opcional)
   * 	}
   * @param apply <boolean> - flag que indica se o apply deve ser chamado imediatamente (default false)
   */
  function removeErro(config, apply) {
    if (apply == undefined) {
      apply = false
    }

    if (config) {
      let grid = config.grid
      let campo = config.campo
      let errorsForm = Form.errors()

      if (campo && campo != '') {
        if (Form.fields(campo)) {
          Form.fields(campo).errors([])
        }
        delete errorsForm[campo]
      } else if (grid && grid != '') {
        delete errorsForm[grid]
      }

      if (grid && grid != '' && campo && campo != '') {
        if (Form.grids(grid)) {
          if (Form.grids(grid).fields(campo)) {
            Form.grids(grid).fields(campo).errors([])
          }
        }
      }

      Form.errors(errorsForm)

      if (apply) {
        Form.apply()
      }
    }
  }

  /**
   * Função para a validação de CNPJ
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'CNPJ inválido!')
   * 	}
   * @return <boolean> - false, caso o CNPJ seja inválido
   */
  function validaCNPJ(config) {
    if (config) {
      let grid = config.grid;
      let campo = config.campo;
      let mensagem = config.mensagem && config.mensagem != '' ? config.mensagem : 'CNPJ Inválido';

      if (campo && campo != '') {
        let valor = nulo(config, '');
        let erro = false

        if (valor != '') {
          valor = valor.replace(/\./g, '')
          valor = valor.replace(/-/g, '')
          valor = valor.replace(/\//g, '')

          if (isNaN(valor)) {
            erro = true
          } else {
            let c = valor.substr(0, 12)
            let dv = valor.substr(12, 2)
            let d1 = 0

            for (let i = 0; i < 12; i++) {
              d1 += c.charAt(11 - i) * (2 + (i % 8))
            }

            if (d1 == 0) {
              erro = true
            } else {
              d1 = 11 - (d1 % 11)

              if (d1 > 9) {
                d1 = 0
              }

              if (dv.charAt(0) != d1) {
                erro = true
              } else {
                d1 *= 2

                for (let i = 0; i < 12; i++) {
                  d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8))
                }

                d1 = 11 - (d1 % 11)

                if (d1 > 9) {
                  d1 = 0
                }

                if (dv.charAt(1) != d1) {
                  erro = true
                }
              }
            }
          }
          if (erro) {
            let oCampo

            if (grid && grid != '') {
              oCampo = Form.grids(grid).fields(campo)
            } else {
              oCampo = Form.fields(campo)
            }

            oCampo.value('')
            adicionaErro(config, mensagem, true)

            return false
          } else {
            removeErro(config, true)
            return true
          }
        } else {
          removeErro(config, true)
          return true
        }
      }
    }
  }
  
  function validarCNPJAlfanumerico(config) {
	if ( config ) {
		var grid 		= config.grid;
		var campo 		= config.campo;
		var mensagem 	= ( config.mensagem && config.mensagem != "" ) ? config.mensagem : "CNPJ Inválido";
		
		var cnpj = nulo(config, "");
		var erro = false;
		
		// 1. Verifica se o campo foi preenchido 
	    if ( cnpj == "" ) {
			erro = true;
			mensagem = "CNPJ não informado";
	    } else {
			// 2. Remove apenas caracteres de máscara 
		    const cnpjLimpo = cnpj.replace(/[.\-\/\s]/g, ''); 
		     
		    // 3. Deve ter 14 caracteres 
		    if (cnpjLimpo.length !== 14) {
				erro = true;
				mensagem = "CNPJ deve conter 14 caracteres. Informado: " + cnpjLimpo.length;
		    } else {
				// 4. Converte caractere para valor (ASCII - 48) 
			    const valorDV = (char) => { 
			        const code = char.toUpperCase().charCodeAt(0); 
			        // Números 0-9: ASCII 48-57 
			        if (code >= 48 && code <= 57) return code - 48; 
			        // Letras A-Z: ASCII 65-90 
			        if (code >= 65 && code <= 90) return code - 48; 
			        
			        return NaN; 
			    }; 
			     
			    // 5. Cálculo do dígito verificador 
			    const calcularDV = (texto, pesoInicial) => { 
			        let soma = 0; 
			        let peso = pesoInicial; 
			         
			        // Multiplica da ESQUERDA para DIREITA 
			        for (let i = 0; i < texto.length; i++) { 
			            const v = valorDV(texto[i]); 
			            
			            if (isNaN(v)) { 
			                 return { 
                    			erro: `Caractere inválido na posição ${i + 1}: '${texto[i]}'` 
                			}; 
			            } 
			             
			            soma += v * peso; 
			             
			            // Decrementa peso: se chegar a 2, volta para 9 
			            peso = (peso === 2) ? 9 : peso - 1; 
			        } 
			         
			        const resto = soma % 11; 
			        return { valor: (resto === 0 || resto === 1) ? 0 : (11 - resto) }; 
			    }; 
			     
			    const base = cnpjLimpo.substring(0, 12); 
			     
			    // 6. Calcula primeiro DV (peso inicial 5) 
			    const resultDv1 = calcularDV(base, 5); 
			    
			    if (resultDv1.erro) { 
					erro = true;
					mensagem = resultDv1.erro;
			    } else {
					const dv1Informado = valorDV(cnpjLimpo[12]); 

				    if (isNaN(dv1Informado)) {
						erro = true;
						mensagem = "Primeiro dígito verificador inválido: " + cnpjLimpo[12];
				    } else if (resultDv1.valor !== dv1Informado) {
						erro = true;
						//mensagem = "Primeiro dígito verificador incorreto. Esperado: " + resultDv1.valor + ", Informado: " + dv1Informado;
						mensagem = "Primeiro dígito verificador incorreto.";
				    } else {
						// 7. Calcula segundo DV (peso inicial 6, incluindo DV1) 
					    const resultDv2 = calcularDV(base + cnpjLimpo[12], 6);
					    
					    if (resultDv2.erro) {
							erro = true;
							mensagem = resultDv2.erro;
					    } else {
							const dv2Informado = valorDV(cnpjLimpo[13]); 
						    
						    if (isNaN(dv2Informado)) {
								erro = true;
								mensagem = "Segundo dígito verificador inválido: " + cnpjLimpo[13];
						    } else if (resultDv2.valor !== dv2Informado) {
								erro = true;
								mensagem = "Segundo dígito verificador incorreto.";
//								mensagem = "Segundo dígito verificador incorreto. Esperado: " + resultDv2.valor + ", Informado: " + dv2Informado;
						    } 
						}
					}
				}
			}
		}
	     
	    if ( erro ) {
			var oCampo;
			
			if ( grid && grid != "" ) {
				oCampo = Form.grids(grid).fields(campo);
			} else {
				oCampo = Form.fields(campo);
			}
			
			oCampo.value("");
			adicionaErro(config, mensagem, true);
			
			return false;
		} else {
			removeErro(config, true);
			return true;
		}
	}	
} 
 
  /**
   * Função para a validação de CPF
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'CPF inválido!')
   * 	}
   * @return <boolean> - false, caso o CPF seja inválido
   */
  function validaCPF(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'CPF Inválido'

      if (campo && campo != '') {
        let valor = nulo(config, '')
        let erro = false

        if (valor != '') {
          valor = valor.replace(/\./g, '')
          valor = valor.replace(/-/g, '')

          if (
            isNaN(valor) ||
            valor.length != 11 ||
            valor == '00000000000' ||
            valor == '11111111111' ||
            valor == '22222222222' ||
            valor == '33333333333' ||
            valor == '44444444444' ||
            valor == '55555555555' ||
            valor == '66666666666' ||
            valor == '77777777777' ||
            valor == '88888888888' ||
            valor == '99999999999'
          ) {
            erro = true
          } else {
            let a = []
            let b = new Number()
            let c = 11
            let x

            for (let i = 0; i < 11; i++) {
              a[i] = valor.charAt(i)
              if (i < 9) b += a[i] * --c
            }

            if ((x = b % 11) < 2) {
              a[9] = 0
            } else {
              a[9] = 11 - x
            }

            b = 0
            c = 11

            for (let y = 0; y < 10; y++) {
              b += a[y] * c--
            }

            if ((x = b % 11) < 2) {
              a[10] = 0
            } else {
              a[10] = 11 - x
            }

            if (valor.charAt(9) != a[9] || valor.charAt(10) != a[10]) {
              erro = true
            }
          }

          if (erro) {
            let oCampo

            if (grid && grid != '') {
              oCampo = Form.grids(grid).fields(campo)
            } else {
              oCampo = Form.fields(campo)
            }

            oCampo.value('')
            adicionaErro(config, mensagem, true)

            return false
          } else {
            removeErro(config, true)
            return true
          }
        } else {
          removeErro(config, true)
          return true
        }
      }
    }
  }

  /**
   * Função para a validação de E-mail
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'Email inválido!')
   * 	}
   * @return <boolean> - false, caso o E-mail seja inválido
   */
  function validaEmail(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'Email inválido!'

      if (campo && campo != '') {
        let erro = false
        let valor = nulo(config, '')

        if (valor != '') {
          usuario = valor.substring(0, valor.indexOf('@'))
          dominio = valor.substring(valor.indexOf('@') + 1, valor.length)

          if (
            !(
              usuario.length >= 1 &&
              dominio.length >= 3 &&
              usuario.search('@') == -1 &&
              dominio.search('@') == -1 &&
              usuario.search(' ') == -1 &&
              dominio.search(' ') == -1 &&
              dominio.search('.') != -1 &&
              dominio.indexOf('.') >= 1 &&
              dominio.lastIndexOf('.') < dominio.length - 1
            )
          ) {
            erro = true
          }

          if (erro) {
            let oCampo
            if (grid && grid != '') {
              oCampo = Form.grids(grid).fields(campo)
            } else {
              oCampo = Form.fields(campo)
            }

            oCampo.value('')
            adicionaErro(config, mensagem, true)

            return false
          } else {
            removeErro(config, true)
            return true
          }
        } else {
          removeErro(config, true)
          return true
        }
      }
    }
  }

  /**
   * Adiciona X dias à data
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, campoNovaData : <string> - identificador campo Nova data
   * 		, dias : <string> - X dias a ser adicionado a data
   * 	}
   */
  function somaDiasCorridos(config) {
    if (config) {
      let dias = config.dias
      let grid = config.grid || ''
      let campo = config.campo
      let campoNovaData = config.campoNovaData

      if (campo && campo != '' && dias && dias != '') {
        let data = nulo(config, '')

        // Tratamento das Variaveis.
        let dataSplitada = data.split('/')
        let d

        if (dataSplitada.length > 1) {
          d = new Date(
            dataSplitada[1] + '/' + dataSplitada[0] + '/' + dataSplitada[2]
          ) //Formato mm/dd/yyyy
        } else {
          dataSplitada = data.split('-')

          d = new Date(
            dataSplitada[1] + '/' + dataSplitada[2] + '/' + dataSplitada[0]
          ) //Formato mm/dd/yyyy
        }

        Date.prototype.addDays = function (days) {
          let date = new Date(this.valueOf())
          date.setDate(date.getDate() + days)
          return date
        }

        // Crio a let da dataFinal
        d.setDate(d.getDate() + parseInt(dias))

        let day = d.getDate()
        let month = d.getMonth() + 1
        let year = d.getFullYear()

        if (parseInt(day) < 10) {
          day = '0' + day
        }

        if (parseInt(month) < 10) {
          month = '0' + month
        }

        let dataFinal = day + '/' + month + '/' + year

        if (campoNovaData && campoNovaData != '') {
          let oCampo

          if (grid && grid != '') {
            oCampo = Form.grids(grid).fields(campoNovaData)
          } else {
            oCampo = Form.fields(campoNovaData)
          }

          oCampo.value(dataFinal).apply()
        }

        return dataFinal
      }
    }
  }

  /**
   * Transforma data formatada como dd/MM/yyyy em um Date()
   * @param data - Valor Data preenchida no formato - dd/MM/yyyy ou ou yyyy-MM-dd
   * @returns {Date}
   */
  function converteDataBrEmDate(data) {
    let retorno = null

    let day
    let month
    let year

    let dateArray = data.split('/')

    if (dateArray.length > 1) {
      day = Number(dateArray[0])
      month = Number(dateArray[1]) - 1
      year = Number(dateArray[2])
    } else {
      dateArray = data.split('-')

      if (dateArray.length > 1) {
        day = Number(dateArray[2])
        month = Number(dateArray[1]) - 1
        year = Number(dateArray[0])
      }
    }

    if (dateArray.length > 1) {
      let date = new Date()
      date.setFullYear(year, month, day)

      if (
        date.getFullYear() == year &&
        date.getMonth() == month &&
        date.getDate() == day
      ) {
        retorno = new Date(year, month, day, 0, 0, 0)
      }
    }

    return retorno
  }

  /**
   * Pega um Date() e retorna formatado como dd/MM/yyyy ou yyyy-MM-dd
   * @param date - Formata a data para ser inserida no formulário
   * @returns {String}
   */
  function getDataFormatada(date) {
    let dia = date.getDate()
    dia = dia < 10 ? '0' + dia : '' + dia

    let mes = date.getMonth() + 1
    mes = mes < 10 ? '0' + mes : '' + mes

    let ano = date.getFullYear()

    let dataFormatada = dia + '/' + mes + '/' + ano

    return dataFormatada
  }

  /**
   *
   * @param dataInicial - Valor Data inicial
   * @param qtdDias - Dias a somar
   * @returns {String} - Data
   */

  /**
   *  Função que soma dias a uma data desconsiderando finais de semana
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, campoNovaData : <string> - identificador campo Nova data
   * 		, dias : <string> - X dias a ser adicionado a data
   * 	}
   * return <date> - Retorna nova data
   */
  function somaDiasUteis(config) {
    if (config) {
      let dias = config.dias
      let grid = config.grid || ''
      let campo = config.campo
      let campoNovaData = config.campoNovaData

      let dataInicial = nulo(config, '')

      let date = converteDataBrEmDate(dataInicial)

      for (let i = 1; i <= dias; i++) {
        date.setDate(date.getDate() + 1)

        // Sábado ou Domingo - adiciona dias sem incrementar o contador
        while (date.getDay() == 0 || date.getDay() == 6) {
          date.setDate(date.getDate() + 1)
        }
      }

      let dataFormatada = getDataFormatada(date)

      if (campoNovaData && campoNovaData != '') {
        let oCampo

        if (grid && grid != '') {
          oCampo = Form.grids(grid).fields(campoNovaData)
        } else {
          oCampo = Form.fields(campoNovaData)
        }

        oCampo.value(dataFormatada).apply()
      }

      return dataFormatada
    }
  }

  /**
   * Funcao que calcula diferenca em dias entre duas datas no formato dd/MM/yyyy ou yyyy-MM-dd
   * @param dataInicial - Valor Data Inicial
   * @param dataFinal - Valor Data Final
   * @returns Retorna a diferença de dias entre uma data e outra
   */
  function getDiferencaEntreDatas(dataInicial, dataFinal) {
    let datini = converteDataBrEmDate(dataInicial)
    let datfim = converteDataBrEmDate(dataFinal)

    if (datini == null || datfim == null) {
      return null
    } else {
      let millisDiff = datfim.getTime() - datini.getTime()
      let secDiff = Math.round(millisDiff / 1000)
      let minDiff = Math.round(secDiff / 60)
      let hourDiff = Math.round(minDiff / 60)
      let daysDiff = Math.round(hourDiff / 24)

      return daysDiff
    }
  }

  /**
   *
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campoDataInicial : <string> - identificador campo
   * 		, campoDataFinal : <string> - identificador campo
   * 	}
   * @returns {string} quantidade de dias entre uma data e outra
   */
  function getDiferencaEntreDataConfig(config) {
    if (config) {
      let grid = config.grid || ''
      let campoDataInicial = config.campoDataInicial || ''
      let campoDataFinal = config.campoDataFinal || ''

      let dataInicial, dataFinal

      if (grid != '') {
        dataInicial = Form.grids(grid).fields(campoDataInicial).value()
        dataFinal = Form.grids(grid).fields(campoDataFinal).value()
      } else {
        dataInicial = Form.fields(campoDataInicial).value()
        dataFinal = Form.fields(campoDataFinal).value()
      }

      if (dataInicial != null && dataFinal != null) {
        let datini = converteDataBrEmDate(dataInicial)
        let datfim = converteDataBrEmDate(dataFinal)

        let millisDiff = datfim.getTime() - datini.getTime()
        let secDiff = Math.round(millisDiff / 1000)
        let minDiff = Math.round(secDiff / 60)
        let hourDiff = Math.round(minDiff / 60)
        let daysDiff = Math.round(hourDiff / 24)

        return daysDiff
      }
    }
  }

  /**
   * Função para a validação de PIS
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'Número PIS inválido!')
   * 	}
   * @returns {boolean} false = PIS Válido, true = PIS Inválido
   */
  function validaPIS(config) {
    if (config) {
      let valor = nulo(config, '')

      let erro = false

      if (valor != '') {
        let mensagem =
          config.mensagem && config.mensagem != ''
            ? config.mensagem
            : 'Número PIS Inválido'

        valor = valor.replace(/[^\d]+/g, '')
        valor = valor.replace(/\./g, '')
        valor = valor.replace(/-/g, '')
        valor = valor.replace(/\//g, '')

        if (valor == '') {
          return true
        }

        if (
          isNaN(valor) ||
          valor.length != 11 ||
          valor == '00000000000' ||
          valor == '11111111111' ||
          valor == '22222222222' ||
          valor == '33333333333' ||
          valor == '44444444444' ||
          valor == '55555555555' ||
          valor == '66666666666' ||
          valor == '77777777777' ||
          valor == '88888888888' ||
          valor == '99999999999'
        ) {
          erro = true
        } else {
          let a = []
          let b = new Number()
          let pesos = '3298765432'

          for (let i = 0; i < 11; i++) {
            a[i] = valor.charAt(i)
            b += a[i] * pesos.charAt(i)
          }

          let x = b % 11
          let digitoVerificador = 11 - x

          if (digitoVerificador > 9) digitoVerificador = 0

          if (valor.charAt(10) != digitoVerificador) {
            erro = true
          }
        }

        if (erro) {
          let grid = config.grid || ''
          let campo = config.campo

          let oCampo

          if (grid && grid != '') {
            oCampo = Form.grids(grid).fields(campo)
          } else {
            oCampo = Form.fields(campo)
          }

          oCampo.value('')
          adicionaErro(config, mensagem, true)
        } else {
          erro = false
          removeErro(config, true)
        }
      }

      return !erro
    }

    return !erro
  }

  /**
   * Valida se o arquivo a ser anexado esta na extensão desejada
   * @param config <object> {
   * 		file : <file> - parametro do evento DOCUMENT_IMPORT_FILE_SUBMITTED
   * 		, extensoes : <string> - iextensões permitidas (opcional - podem ser várias, separadas por ',', ';', ou passadas em um array)
   * 	}
   */
  function validarExtensaoArquivo(config) {
    if (config) {
      let nomeArquivo = config.file.name
      let splitArquivo = nomeArquivo.split('.')
      let extensaoArquivo = splitArquivo[splitArquivo.length - 1]

      // converte para uppercase a extensao do arquivo
      extensaoArquivo = extensaoArquivo.toLocaleUpperCase().trim()

      let auxExtensoes = []
      let extensoes = config.extensoes

      if (extensoes instanceof Array) {
        auxExtensoes = extensoes
      } else if (extensoes.indexOf(';') != -1) {
        auxExtensoes = extensoes.split(';')
      } else {
        auxExtensoes = extensoes.split(',')
      }

      // converte para uppercase as extensoes permitidas
      auxExtensoes = auxExtensoes.map(function (ext) {
        return ext.toLocaleUpperCase()
      })

      if (auxExtensoes.indexOf(extensaoArquivo) == -1) {
        Form.addCustomModal({
          title: 'AVISO - A EXTENSÃO DO ARQUIVO NÃO É PERMITIDA',
          description:
            'Extensão do arquivo não permitida, favor anexar no(s) formato(s) ' +
            JSON.stringify(auxExtensoes),
          buttons: []
        })
        throw new Error('')
      }
    }
  }

  /**
   *
   * @param file - parametro do evento DOCUMENT_IMPORT_FILE_SUBMITTED
   * @param tamanho - Tamanho do Arquivo em Megabyte
   */
  /**
   * Valida se o arquivo a ser anexado esta na extensão desejada
   * @param config <object> {
   * 		file : <file> - parametro do evento DOCUMENT_IMPORT_FILE_SUBMITTED
   * 		, tamanho : <integer> -  Tamanho do Arquivo em Megabyte
   * 	}
   */
  function validarTamanhoArquivo(config) {
    if (config) {
      let tamanho = config.tamanho
      let file = config.file
      let tamanhoArquivo = file.size

      let tamanhoEmBytes = tamanho * Math.pow(10, 6)

      if (file.size > tamanhoEmBytes) {
        Form.addCustomModal({
          title: 'AVISO - ARQUIVO MAIOR QUE O PERMITIDO',
          description:
            'O tamanho máximo permitido é ' +
            tamanho +
            'MB, porém o arquivo anexado foi de ' +
            (file.size / Math.pow(10, 6)).toFixed(2) +
            'MB',
          buttons: []
        })
        throw new Error('')
      }
    }
  }

  /**
   * Valida se a data informada é maior que a atual
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'A data informada não pode ser menor que a atual!')
   * 	}
   * @return <boolean> - false = Data inválida, true = Data válida
   */
  function validaDataMaiorQueAtual(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'A data informada não pode ser menor que a atual!'

      if (campo && campo != '') {
        let dataParam = nulo(config, '')

        let dataAtual = getDataFormatada(new Date())

        let daysDiff = getDiferencaEntreDatas(dataParam, dataAtual)

        if (daysDiff == null || daysDiff > 0) {
          let oCampo

          if (grid && grid != '') {
            oCampo = Form.grids(grid).fields(campo)
          } else {
            oCampo = Form.fields(campo)
          }

          oCampo.value('')
          adicionaErro(config, mensagem, true)
          return false
        } else {
          removeErro(config, true)
          return true
        }
      }
    }
  }
  
   /**
   * Valida se a data informada é maior que a atual
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'A data informada não pode ser menor que a atual!')
   * 	}
   * @return <boolean> - false = Data inválida, true = Data válida
   */
  function getDiferencaEntreDataeDataAtual(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'Não foi possível calcular os dias!'

      if (campo && campo != '') {
        let dataParam = nulo(config, '')

        let dataAtual = getDataFormatada(new Date())

        let daysDiff = getDiferencaEntreDatas(dataAtual, dataParam )
		console.log(daysDiff)
		
		return daysDiff
		
      }
    }
  }
  
  
  

  /**
   * Valida se a data informada é menor que a atual
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'A data informada não pode ser maior que a atual!')
   * 	}
   * @return <boolean> - false = Data inválida, true = Data válida
   */
  function validaDataMenorQueAtual(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'A data informada não pode ser maior que a atual!'

      if (campo && campo != '') {
        let dataParam = nulo(config, '')

        let dataAtual = getDataFormatada(new Date())

        let daysDiff = getDiferencaEntreDatas(dataParam, dataAtual)

        if (daysDiff == null || daysDiff < 0) {
          let oCampo

          if (grid && grid != '') {
            oCampo = Form.grids(grid).fields(campo)
          } else {
            oCampo = Form.fields(campo)
          }

          oCampo.value('')
          adicionaErro(config, mensagem, true)
          return false
        } else {
          removeErro(config, true)
          return true
        }
      }
    }
  }

  /**
   * Soma o valor da coluna da grid e insere o resultado em outro campo
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo a ser somado
   * 		, campoTotal : <string> - identificador do campo que receberá a soma da GRID
   * 	}
   * @return <string> - retorna NULL caso não consiga realizar a soma
   */
  function somaValorGrid(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let campoTotal = config.campoTotal

      if (
        grid &&
        grid != '' &&
        campo &&
        campo != '' &&
        campoTotal &&
        campoTotal != ''
      ) {
        let gridItem = Form.grids(grid)

        let totalItens = gridItem.columns(campo).sum();
        
        if (Number.isNaN(totalItens)) {
	        totalItens = 0;
	    }
	     
        Form.fields(campoTotal).value(totalItens).apply()
      }
    }

    return null
  }

  /**
   * Soma o valor da coluna da grid por tipo e insere o resultado em outro campo
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo a ser somado
   * 		, campoTotal : <string> - identificador do campo que receberá a soma da GRID
   * 	}
   * @return <string> - retorna NULL caso não consiga realizar a soma
   */
  function somaValorGridPorCondicao(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let campoTotal = config.campoTotal
      let campoCondicao = config.campoCondicao
      let condicao = config.condicao

      if (
        grid &&
        grid != '' &&
        campo &&
        campo != '' &&
        campoTotal &&
        campoTotal != '' &&
        campoCondicao &&
        campoCondicao != '' &&
        condicao &&
        condicao != ''
      ) {
        let gridItem = Form.grids(grid)
        let valorTotal = 0

        // Retorna os dataRows do campo grid cujo campo [campoCondicao] possui o valor igual a [condicao]
        let expensiveDataRows = gridItem.dataRows(function (dataRow) {
          return dataRow[campoCondicao] == condicao
        })

        expensiveDataRows.forEach(function (dataRow) {
          valorTotal = valorTotal + dataRow[campo]
        })

		if (Number.isNaN(valorTotal)) {
	        valorTotal = 0;
	    }
	    
        Form.fields(campoTotal).value(valorTotal).apply()
      }
    }

    return null
  }

  /**
   * Valida se a GRID foi preenchida com a quantidade minima
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo
   * @param config <object> {
   * 		grid : <string> - identificador grid (obrigatorio)
   * 		, quantidade : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'Favor inserir ao menos X itens na GRID!')
   * 	}
   */
  function validaPreenchimentoMinimoItensGRID(config) {
    if (config) {
      let grid = config.grid
      let quantidade = config.quantidade
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'Favor inserir ao menos ' + quantidade + ' itens na GRID!'

      if (grid && grid != '') {
        Form.subscribe('SUBMIT', function (formId, actionId, reject) {
          let tamanhoGrid = Form.grids(grid).dataRows().length

          console.log('tamanhoGrid: ' + tamanhoGrid)
          console.log('quantidade: ' + quantidade)
          if (tamanhoGrid < parseInt(quantidade)) {
            Form.grids(grid).errors([mensagem]).apply()
            reject()
          }
        })
      }
    }
  }

  /**
   *  Limpar as opções do campo lista
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 	}
   * @return <boolean> - false = caso houver algum erro, true = sucesso ao limpar lista
   */
  function limparOpcoesCampoLista(config) {
    if (config) {
      let grid = config.grid || ''
      let campo = config.campo

      if (campo && campo != '') {
        let formulario = Form

        if (grid != '') {
          formulario = Form.grids(grid)
        }

        formulario.fields(campo).clear().apply()

        return true
      }
    }

    return false
  }

  /**
   * Adiciona opcoes nos campos lista
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo lista
   * 		, opcoesLista : <string> - Opçoes que serão adicionadas separadas por ponto e virgula(;)
   * 	}
   * @return <boolean> - false = caso houver algum erro, true = sucesso ao adicionar na lista
   */
  function adicionaOpcoesCampoLista(config) {
    if (config) {
      let grid = config.grid || ''
      let campo = config.campo
      let opcoesLista = config.opcoesLista

      Form.apply().then(function () {
        let formulario = Form

        if (grid != '') {
          formulario = Form.grids(grid)
        }

        opcoesLista = '' + opcoesLista

        let splitOpcoesLista = opcoesLista.split(';')

        formulario.fields(campo).addOptions(splitOpcoesLista).apply()

        return true
      })
    }

    return false
  }

  /**
   *
   * @param nomeCampo -  Nome do campo
   * @param nomeGrid - Identificador da GRID
   * @returns {Boolean}
   */
  /**
   * Valida se a data informada é um dia de final de semana
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'A data informada não pode ser um final de semana!')
   * 	}
   * @return <boolean> - false = Data Inválida, true = Data Válida
   */
  function validaDataFinalDeSemana(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'A data informada não pode ser um final de semana!'

      if (campo && campo != '') {
        let dataParam = nulo(config, '')

        if (dataParam != '') {
          let curdate = converteDataBrEmDate(dataParam)

          if (curdate.getDay() == 0 || curdate.getDay() == 6) {
            let oCampo

            if (grid && grid != '') {
              oCampo = Form.grids(grid).fields(campo)
            } else {
              oCampo = Form.fields(campo)
            }

            oCampo.value('')

            adicionaErro(config, mensagem, true)
            return false
          } else {
            removeErro(config, true)
            return true
          }
        }
      }
    }
  }

  /**
   * Função que calcula idade a partir de uma data de nascimento informada
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo data de nascimento
   * 		, campoIdade : <integer> - identificador campo idade
   * 	}
   */
  function calculaIdade(config) {
    if (config) {
      let grid = config.grid || ''
      let campo = config.campo
      let campoIdade = config.campoIdade
      let dataNascimento = nulo(config, '')

      let dateArray = dataNascimento.split('/')
      let diaNascimento, mesNascimento, anoNascimento

      if (dateArray.length > 1) {
        diaNascimento = Number(dateArray[0])
        mesNascimento = Number(dateArray[1]) - 1
        anoNascimento = Number(dateArray[2])
      } else {
        dateArray = dataNascimento.split('-')
        diaNascimento = Number(dateArray[2])
        mesNascimento = Number(dateArray[1]) - 1
        anoNascimento = Number(dateArray[0])
      }

      let anoAtual = new Date().getFullYear()

      let dataAniversario = diaNascimento + '/' + mesNascimento + '/' + anoAtual
      let anoCompleto =
        getDiferencaEntreDatas(dataAniversario, getDataFormatada(new Date())) >=
        0
      let idade = anoAtual - Number(anoNascimento)

      if (!anoCompleto) idade--

      let formulario = Form

      if (grid != '') {
        formulario = Form.grids(grid)
      }

      formulario.fields(campoIdade).value(idade).apply()

      return idade
    }
  }

  /**
   * Verifica se a hora informada é uma hora válida
   * Sempre executará um apply() ao final do método, de forma a limpar o valor do campo e exibir a mensagem.
   * @param config <object> {
   * 		grid : <string> - identificador grid (opcional)
   * 		, campo : <string> - identificador campo
   * 		, mensagem : <string> - mensagem a ser exibida no campo (opcional - default 'A hora informada é inválida! Verifique.')
   * 	}
   * @return <boolean> - Hora Inválida, true = Hora Válida
   */
  function validaHora(config) {
    if (config) {
      let grid = config.grid
      let campo = config.campo
      let mensagem =
        config.mensagem && config.mensagem != ''
          ? config.mensagem
          : 'A hora informada é inválida! Verifique.'

      if (campo && campo != '') {
        let hora = nulo(config, '')

        if (hora != '') {
          let aHora = hora.split(':')

          let hora = Number(aHora[0])
          let minuto = Number(aHora[1])

          if (hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
            let oCampo

            if (grid && grid != '') {
              oCampo = Form.grids(grid).fields(campo)
            } else {
              oCampo = Form.fields(campo)
            }

            oCampo.value('')

            adicionaErro(config, mensagem, true)
            return false
          } else {
            removeErro(config, true)
            return true
          }
        }
      }
    }

    return false
  }
})()
