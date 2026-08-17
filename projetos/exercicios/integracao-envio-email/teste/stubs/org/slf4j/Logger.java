package org.slf4j;

/** Stub de teste: imprime no console e resolve os {} do slf4j. */
public class Logger {

	private static final String MARCADOR = "{}";

	private final String nome;

	Logger(String nome) {
		this.nome = nome;
	}

	private void log(String nivel, String msg, Object... args) {
		StringBuilder saida = new StringBuilder(msg);
		for (Object arg : args) {
			int pos = saida.indexOf(MARCADOR);
			if (pos < 0) {
				break;
			}
			saida.replace(pos, pos + MARCADOR.length(), String.valueOf(arg));
		}
		System.out.println("    [" + nivel + "] " + nome + " - " + saida);
	}

	public void info(String msg, Object... args) {
		log("INFO", msg, args);
	}

	public void warn(String msg, Object... args) {
		log("WARN", msg, args);
	}

	public void error(String msg, Object... args) {
		log("ERROR", msg, args);
	}
}
