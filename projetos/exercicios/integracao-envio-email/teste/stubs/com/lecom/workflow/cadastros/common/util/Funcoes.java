package com.lecom.workflow.cadastros.common.util;

/** Stub de teste do utilitario da casa. */
public class Funcoes {
	public static String nulo(String valor, String padrao) {
		return (valor == null || valor.trim().isEmpty()) ? padrao : valor;
	}
}
