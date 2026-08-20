# Documentações

## finalizacao-de-demandas

Um PDF por demanda encerrada, nomeado pelo identificador do chamado (`SD-2606.pdf`). Só é
gerado quando a demanda é dada como finalizada, não a cada entrega parcial.

O conteúdo sai da nota do chamado em `clientes/<cliente>/chamados/`. A nota é o rascunho vivo,
o PDF é o fecho.

### O que o documento tem

Capa com o identificador, o cliente, o processo, a data e o autor. Depois, nesta ordem: o que
foi solicitado, a análise e a causa, a solução avaliada e a escolhida com o porquê, o que foi
alterado arquivo por arquivo, os testes com o resultado de cada um, o impacto, e os pontos em
aberto.

### Padrão visual

Sem emoji e sem cor de destaque. Preto no texto, cinza nos apoios e o azul da Digihub só em
título e filete. Fonte serifada no corpo. Rodapé com o nome do autor e a numeração.

Gerado por [gerar_pdf.py](gerar_pdf.py), que recebe um markdown e devolve o PDF.
