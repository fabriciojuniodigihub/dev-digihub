# -*- coding: utf-8 -*-
r"""Gera o PDF de finalizacao de demanda a partir de um markdown.

    python gerar_pdf.py ..\clientes\lecom\chamados\SD-2606.md finalizacao-de-demandas\SD-2606.pdf

O markdown aceita titulo com #, subtitulo com ##, texto corrido, lista com - e tabela com |.
O cabecalho do documento vem de um bloco de metadados no topo, no formato `chave: valor`.
"""
import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph,
                                Spacer, Table, TableStyle)

AZUL = colors.HexColor("#0B4F8A")
CINZA = colors.HexColor("#666666")
LINHA = colors.HexColor("#CCCCCC")

AUTOR = "Fabrício Júnio Almeida Dias"
EMPRESA = "Digihub Tecnologia"


def estilos():
    base = getSampleStyleSheet()
    return {
        "titulo": ParagraphStyle("titulo", parent=base["Title"], fontName="Times-Bold",
                                 fontSize=20, leading=24, textColor=AZUL, spaceAfter=2 * mm,
                                 alignment=0),
        "meta": ParagraphStyle("meta", parent=base["Normal"], fontName="Helvetica",
                               fontSize=9, leading=13, textColor=CINZA),
        "secao": ParagraphStyle("secao", parent=base["Heading1"], fontName="Times-Bold",
                                fontSize=13, leading=16, textColor=AZUL,
                                spaceBefore=7 * mm, spaceAfter=2 * mm),
        "sub": ParagraphStyle("sub", parent=base["Heading2"], fontName="Times-Bold",
                              fontSize=11, leading=14, textColor=colors.black,
                              spaceBefore=4 * mm, spaceAfter=1.5 * mm),
        "corpo": ParagraphStyle("corpo", parent=base["Normal"], fontName="Times-Roman",
                                fontSize=10.5, leading=15, alignment=TA_JUSTIFY,
                                spaceAfter=2.5 * mm),
        "item": ParagraphStyle("item", parent=base["Normal"], fontName="Times-Roman",
                               fontSize=10.5, leading=15, leftIndent=6 * mm,
                               bulletIndent=2 * mm, spaceAfter=1.2 * mm),
        "celula": ParagraphStyle("celula", parent=base["Normal"], fontName="Helvetica",
                                 fontSize=8.5, leading=11.5),
        "celulacab": ParagraphStyle("celulacab", parent=base["Normal"], fontName="Helvetica-Bold",
                                    fontSize=8.5, leading=11.5, textColor=colors.white),
    }


def inline(texto):
    """Converte a marcacao de negrito e de codigo do markdown para as tags do reportlab."""
    texto = (texto.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
    texto = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", texto)
    texto = re.sub(r"`(.+?)`", r'<font face="Courier" size="9">\1</font>', texto)
    return texto


def le_markdown(caminho):
    linhas = Path(caminho).read_text(encoding="utf-8").splitlines()
    meta, corpo, i = {}, [], 0
    while i < len(linhas) and (linhas[i].strip() == "" or re.match(r"^\w[\w ]*:", linhas[i])):
        if ":" in linhas[i]:
            chave, valor = linhas[i].split(":", 1)
            meta[chave.strip().lower()] = valor.strip()
        i += 1
    corpo = linhas[i:]
    return meta, corpo


def junta_paragrafos(corpo):
    """Linha quebrada no meio do paragrafo e continuacao, nao paragrafo novo."""
    saida, acumulado = [], []

    def descarrega():
        if acumulado:
            saida.append(" ".join(acumulado))
            acumulado.clear()

    for linha in corpo:
        texto = linha.strip()
        especial = (not texto or texto.startswith(("#", "|", "- ", "* ", "> "))
                    or re.match(r"^\d+\. ", texto))
        if especial:
            descarrega()
            saida.append(linha)
        else:
            acumulado.append(texto)

    descarrega()
    return saida


def monta(corpo, est):
    corpo = junta_paragrafos(corpo)
    fluxo, tabela = [], []

    def fecha_tabela():
        if not tabela:
            return
        dados = [[Paragraph(inline(c), est["celulacab" if n == 0 else "celula"])
                  for c in linha] for n, linha in enumerate(tabela)]
        largura = (A4[0] - 50 * mm) / len(tabela[0])
        t = Table(dados, colWidths=[largura] * len(tabela[0]), repeatRows=1)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), AZUL),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("GRID", (0, 0), (-1, -1), 0.4, LINHA),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ]))
        fluxo.extend([t, Spacer(1, 4 * mm)])
        tabela.clear()

    for linha in corpo:
        crua = linha.rstrip()
        texto = crua.strip()

        if texto.startswith("|"):
            celulas = [c.strip() for c in texto.strip("|").split("|")]
            if all(re.fullmatch(r":?-{2,}:?", c) for c in celulas):
                continue
            tabela.append(celulas)
            continue
        fecha_tabela()

        if not texto:
            continue
        if texto.startswith("### "):
            fluxo.append(Paragraph(inline(texto[4:]), est["sub"]))
        elif texto.startswith("## "):
            fluxo.append(Paragraph(inline(texto[3:]), est["secao"]))
        elif texto.startswith("# "):
            fluxo.append(Paragraph(inline(texto[2:]), est["secao"]))
        elif texto.startswith(("- ", "* ")):
            fluxo.append(Paragraph(inline(texto[2:]), est["item"], bulletText="\u2013"))
        elif re.match(r"^\d+\. ", texto):
            n, resto = texto.split(". ", 1)
            fluxo.append(Paragraph(inline(resto), est["item"], bulletText=n + "."))
        else:
            fluxo.append(Paragraph(inline(texto), est["corpo"]))

    fecha_tabela()
    return fluxo


def capa(meta, est):
    fluxo = [Paragraph(meta.get("titulo", "Documentação de finalização"), est["titulo"])]
    campos = [("Chamado", "chamado"), ("Cliente", "cliente"), ("Processo", "processo"),
              ("Data", "data"), ("Autor", "autor")]
    linhas = []
    for rotulo, chave in campos:
        valor = meta.get(chave) or (AUTOR if chave == "autor" else None)
        if valor:
            linhas.append(f"<b>{rotulo}:</b> {valor}")
    fluxo.append(Paragraph("&nbsp;&nbsp;|&nbsp;&nbsp;".join(linhas), est["meta"]))
    fluxo.append(Spacer(1, 2 * mm))
    return fluxo


def rodape(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINHA)
    canvas.setLineWidth(0.4)
    canvas.line(25 * mm, 17 * mm, A4[0] - 25 * mm, 17 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(CINZA)
    canvas.drawString(25 * mm, 12 * mm, f"{AUTOR} | {EMPRESA}")
    canvas.drawRightString(A4[0] - 25 * mm, 12 * mm, f"Página {doc.page}")
    canvas.restoreState()


def gera(entrada, saida):
    meta, corpo = le_markdown(entrada)
    est = estilos()
    doc = BaseDocTemplate(str(saida), pagesize=A4, leftMargin=25 * mm, rightMargin=25 * mm,
                          topMargin=22 * mm, bottomMargin=25 * mm,
                          title=meta.get("titulo", "Documentação"), author=AUTOR)
    quadro = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="corpo")
    doc.addPageTemplates([PageTemplate(id="padrao", frames=[quadro], onPage=rodape)])
    doc.build(capa(meta, est) + monta(corpo, est))
    return saida


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    print("gerado:", gera(sys.argv[1], Path(sys.argv[2])))
