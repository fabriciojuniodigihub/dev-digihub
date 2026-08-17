package br.com.lecom.workflow.email;

import java.util.List;

/** Stub de teste. */
public class EmailMessage {

	private final String subject;
	private final String message;
	private final String from;
	private final List<String> to;
	private final boolean html;

	public EmailMessage(String subject, String message, String from, List<String> to, boolean html) {
		this.subject = subject;
		this.message = message;
		this.from = from;
		this.to = to;
		this.html = html;
	}

	public String getSubject() { return subject; }
	public String getMessage() { return message; }
	public String getFrom() { return from; }
	public List<String> getTo() { return to; }
	public boolean isHtml() { return html; }
}
