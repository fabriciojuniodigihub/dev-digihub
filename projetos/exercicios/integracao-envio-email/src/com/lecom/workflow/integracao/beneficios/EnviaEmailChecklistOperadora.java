package com.lecom.workflow.integracao.beneficios;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lecom.workflow.cadastros.common.util.Funcoes;
import com.lecom.workflow.face.IntegracaoFace;
import com.lecom.workflow.vo.IntegracaoVO;

import br.com.lecom.atos.servicos.annotation.Execution;
import br.com.lecom.atos.servicos.annotation.IntegrationModule;
import br.com.lecom.atos.servicos.annotation.Version;
import br.com.lecom.workflow.email.EmailMessage;

/**
 * Envia o checklist de documentos para a operadora na aprovacao da atividade
 * de conferencia. Os destinatarios vem do campo auxiliar EMAIL_OPERADORA,
 * separados por ponto e virgula.
 */
@IntegrationModule(value = "EnviaEmailChecklistOperadora")
@Version(value = { 1, 0, 0 })
public class EnviaEmailChecklistOperadora implements IntegracaoFace {

	private static final Logger logger = LoggerFactory.getLogger(EnviaEmailChecklistOperadora.class);

	private static final String RETORNO_SUCESSO = "0";
	private static final String RETORNO_ERRO = "99";
	private static final String SEPARADOR_EMAIL = ";";

	@Override
	@Execution
	public String executa(IntegracaoVO integracaoVO) {
		try {
			logger.info("Inicio do envio do checklist, processo {}", integracaoVO.getCodProcesso());

			Map<String, String> formulario = integracaoVO.getMapCamposFormulario();

			List<String> destinatarios = montaDestinatarios(formulario);
			if (destinatarios.isEmpty()) {
				logger.warn("Nenhum e-mail de operadora informado no processo {}", integracaoVO.getCodProcesso());
				return RETORNO_ERRO + "|Informe ao menos um e-mail da operadora.";
			}

			String assunto = montaAssunto(formulario, integracaoVO.getCodProcesso());
			String corpo = montaCorpo(formulario, integracaoVO.getCodProcesso());

			EmailMessage mensagem = new EmailMessage(assunto, corpo, integracaoVO.getDesFrom(), destinatarios, true);
			String retornoEnvio = integracaoVO.enviaEmailMessage(mensagem);

			if (retornoEnvio.charAt(0) != '0') {
				logger.error("Falha no envio do checklist: {}", retornoEnvio);
				return RETORNO_ERRO + "|Nao foi possivel enviar o e-mail para a operadora.";
			}

			logger.info("Checklist enviado para {} destinatario(s)", destinatarios.size());
			return RETORNO_SUCESSO + "|Checklist encaminhado para a operadora.";

		} catch (Exception e) {
			logger.error("Erro no envio do checklist", e);
			return RETORNO_ERRO + "|" + e.getMessage();
		}
	}

	private List<String> montaDestinatarios(Map<String, String> formulario) {
		List<String> destinatarios = new ArrayList<String>();
		String campo = Funcoes.nulo(formulario.get("$EMAIL_OPERADORA"), "").trim();

		for (String email : campo.split(SEPARADOR_EMAIL)) {
			String limpo = email.trim();
			if (!limpo.isEmpty()) {
				destinatarios.add(limpo);
			}
		}
		return destinatarios;
	}

	private String montaAssunto(Map<String, String> formulario, String codProcesso) {
		String razaoSocial = Funcoes.nulo(formulario.get("$RAZAO_SOCIAL"), "").trim();
		return "Checklist de abertura - " + razaoSocial + " - Solicitacao " + codProcesso;
	}

	private String montaCorpo(Map<String, String> formulario, String codProcesso) {
		String razaoSocial = Funcoes.nulo(formulario.get("$RAZAO_SOCIAL"), "").trim();
		String cnpj = Funcoes.nulo(formulario.get("$CNPJ_SUBESTIPULANTE"), "").trim();
		String tipoAbertura = Funcoes.nulo(formulario.get("$TIPO_ABERTURA"), "").trim();
		String responsavel = Funcoes.nulo(formulario.get("$NOME_SOLICITANTE"), "").trim();
		String observacao = Funcoes.nulo(formulario.get("$OBSERVACAO"), "").trim();

		StringBuilder corpo = new StringBuilder();
		corpo.append("<html>");
		corpo.append("<head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/></head>");
		corpo.append("<body style=\"font-family: Arial, sans-serif; font-size: 14px; color: #333;\">");
		corpo.append("<p>Prezados,</p>");
		corpo.append("<p>Segue o checklist de documentos para abertura do subestipulante abaixo.</p>");
		corpo.append("<table cellpadding='6' cellspacing='0' style=\"border-collapse: collapse;\">");
		corpo.append(montaLinha("Solicitacao", codProcesso));
		corpo.append(montaLinha("Razao social", razaoSocial));
		corpo.append(montaLinha("CNPJ", cnpj));
		corpo.append(montaLinha("Tipo de abertura", tipoAbertura));
		corpo.append(montaLinha("Responsavel", responsavel));
		corpo.append("</table>");

		if (!observacao.isEmpty()) {
			corpo.append("<p><b>Observacao:</b> ").append(observacao).append("</p>");
		}

		corpo.append("<p>Os documentos estao anexos a solicitacao na plataforma.</p>");
		corpo.append("<p>Atenciosamente,<br/>Equipe de Beneficios</p>");
		corpo.append("<p style=\"font-size: 11px; color: #888;\">Mensagem automatica, nao responder.</p>");
		corpo.append("</body></html>");

		return corpo.toString();
	}

	private String montaLinha(String rotulo, String valor) {
		StringBuilder linha = new StringBuilder();
		linha.append("<tr>");
		linha.append("<td style=\"border: 1px solid #ddd;\"><b>").append(rotulo).append("</b></td>");
		linha.append("<td style=\"border: 1px solid #ddd;\">").append(valor).append("</td>");
		linha.append("</tr>");
		return linha.toString();
	}
}
