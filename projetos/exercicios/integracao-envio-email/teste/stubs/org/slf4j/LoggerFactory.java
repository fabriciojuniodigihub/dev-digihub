package org.slf4j;

public class LoggerFactory {
	public static Logger getLogger(Class<?> classe) { return new Logger(classe.getSimpleName()); }
}
