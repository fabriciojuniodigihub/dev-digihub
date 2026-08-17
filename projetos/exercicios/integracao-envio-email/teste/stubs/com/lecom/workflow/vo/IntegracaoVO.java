package com.lecom.workflow.vo;

import java.util.HashMap;
import java.util.Map;

import br.com.lecom.workflow.email.EmailMessage;

/** Stub de teste. Nao e a classe da plataforma. */
public class IntegracaoVO {

	private final Map<String, String> campos = new HashMap<String, String>();
	private String codProcesso = "0";
	private String desFrom = "bpm@empresa.com.br";
	private String retornoEnvio = "0";
	private EmailMessage ultimaMensagem;

	public Map<String, String> getMapCamposFormulario() { return campos; }
	public void setCampo(String nome, String valor) { campos.put(nome, valor); }

	public String getCodProcesso() { return codProcesso; }
	public void setCodProcesso(String v) { codProcesso = v; }

	public String getDesFrom() { return desFrom; }

	public void setRetornoEnvio(String v) { retornoEnvio = v; }
	public EmailMessage getUltimaMensagem() { return ultimaMensagem; }

	public String enviaEmailMessage(EmailMessage mensagem) {
		ultimaMensagem = mensagem;
		return retornoEnvio;
	}
}
