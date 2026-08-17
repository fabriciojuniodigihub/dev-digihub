import com.lecom.workflow.integracao.beneficios.EnviaEmailChecklistOperadora;
import com.lecom.workflow.vo.IntegracaoVO;

/**
 * Banca de teste da integracao, rodando contra stubs das classes da plataforma.
 * Nao substitui o teste no ambiente, serve para provar a logica antes de publicar.
 */
public class TesteEnviaEmailChecklistOperadora {

	private static int passou = 0;
	private static int falhou = 0;

	public static void main(String[] args) {
		casoFeliz();
		casoDoisDestinatarios();
		casoSemEmail();
		casoEmailComEspacoESeparadorSobrando();
		casoFalhaNoEnvio();
		casoCampoFaltando();

		System.out.println("\n" + "-".repeat(50));
		System.out.println("passou: " + passou + "   falhou: " + falhou);
		System.exit(falhou > 0 ? 1 : 0);
	}

	private static void casoFeliz() {
		System.out.println("\nCaso feliz\n");
		IntegracaoVO vo = processoCompleto();

		String retorno = new EnviaEmailChecklistOperadora().executa(vo);

		ok("retorna sucesso", retorno.startsWith("0|"), retorno);
		ok("um destinatario", vo.getUltimaMensagem().getTo().size() == 1, vo.getUltimaMensagem().getTo());
		ok("assunto traz razao social e processo",
				vo.getUltimaMensagem().getSubject().contains("Padaria Central")
						&& vo.getUltimaMensagem().getSubject().contains("4410"),
				vo.getUltimaMensagem().getSubject());
		ok("corpo marcado como HTML", vo.getUltimaMensagem().isHtml(), null);
		ok("corpo traz o CNPJ", vo.getUltimaMensagem().getMessage().contains("71.058.930/0001-44"), null);
		ok("corpo traz a observacao", vo.getUltimaMensagem().getMessage().contains("Urgente"), null);
		ok("remetente e o do ambiente",
				"bpm@empresa.com.br".equals(vo.getUltimaMensagem().getFrom()),
				vo.getUltimaMensagem().getFrom());
	}

	private static void casoDoisDestinatarios() {
		System.out.println("\nDois destinatarios separados por ponto e virgula\n");
		IntegracaoVO vo = processoCompleto();
		vo.setCampo("$EMAIL_OPERADORA", "um@operadora.com.br;dois@operadora.com.br");

		String retorno = new EnviaEmailChecklistOperadora().executa(vo);

		ok("retorna sucesso", retorno.startsWith("0|"), retorno);
		ok("dois destinatarios", vo.getUltimaMensagem().getTo().size() == 2, vo.getUltimaMensagem().getTo());
	}

	private static void casoSemEmail() {
		System.out.println("\nSem e-mail da operadora\n");
		IntegracaoVO vo = processoCompleto();
		vo.setCampo("$EMAIL_OPERADORA", "");

		String retorno = new EnviaEmailChecklistOperadora().executa(vo);

		ok("retorna erro", retorno.startsWith("99|"), retorno);
		ok("nao tenta enviar", vo.getUltimaMensagem() == null, vo.getUltimaMensagem());
	}

	private static void casoEmailComEspacoESeparadorSobrando() {
		System.out.println("\nEntrada suja: espacos e ponto e virgula sobrando\n");
		IntegracaoVO vo = processoCompleto();
		vo.setCampo("$EMAIL_OPERADORA", " um@operadora.com.br ; ; dois@operadora.com.br ;");

		String retorno = new EnviaEmailChecklistOperadora().executa(vo);

		ok("retorna sucesso", retorno.startsWith("0|"), retorno);
		ok("ignora os vazios", vo.getUltimaMensagem().getTo().size() == 2, vo.getUltimaMensagem().getTo());
		ok("remove os espacos",
				"um@operadora.com.br".equals(vo.getUltimaMensagem().getTo().get(0)),
				vo.getUltimaMensagem().getTo().get(0));
	}

	private static void casoFalhaNoEnvio() {
		System.out.println("\nPlataforma recusa o envio\n");
		IntegracaoVO vo = processoCompleto();
		vo.setRetornoEnvio("99|fila indisponivel");

		String retorno = new EnviaEmailChecklistOperadora().executa(vo);

		ok("retorna erro", retorno.startsWith("99|"), retorno);
	}

	private static void casoCampoFaltando() {
		System.out.println("\nCampo opcional ausente nao pode quebrar\n");
		IntegracaoVO vo = new IntegracaoVO();
		vo.setCodProcesso("4410");
		vo.setCampo("$EMAIL_OPERADORA", "operadora@teste.com.br");

		String retorno = new EnviaEmailChecklistOperadora().executa(vo);

		ok("retorna sucesso mesmo sem os demais campos", retorno.startsWith("0|"), retorno);
		ok("nao imprime null no corpo", !vo.getUltimaMensagem().getMessage().contains("null"), null);
		ok("omite o bloco de observacao", !vo.getUltimaMensagem().getMessage().contains("Observacao"), null);
	}

	private static IntegracaoVO processoCompleto() {
		IntegracaoVO vo = new IntegracaoVO();
		vo.setCodProcesso("4410");
		vo.setCampo("$EMAIL_OPERADORA", "operadora@teste.com.br");
		vo.setCampo("$RAZAO_SOCIAL", "Padaria Central Ltda");
		vo.setCampo("$CNPJ_SUBESTIPULANTE", "71.058.930/0001-44");
		vo.setCampo("$TIPO_ABERTURA", "Filial");
		vo.setCampo("$NOME_SOLICITANTE", "Fabricio Junio Almeida Dias");
		vo.setCampo("$OBSERVACAO", "Urgente, vigencia comeca dia 01.");
		return vo;
	}

	private static void ok(String descricao, boolean condicao, Object obtido) {
		if (condicao) {
			passou++;
			System.out.println("  ok   " + descricao);
		} else {
			falhou++;
			System.out.println("  FALHOU " + descricao + (obtido != null ? "  -> obtido: " + obtido : ""));
		}
	}
}
