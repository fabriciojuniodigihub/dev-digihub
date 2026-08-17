# Certificação Roberty Professional - solução

Enunciado em `material/EquipeTecnica/Equipe Técnica/Roberty/Certificação/`.
Robô que consulta a cotação do dólar no PTAX do Banco Central e preenche o `output.xlsx`.

## O que a prova cobra

| Item | Exigência |
|---|---|
| Fonte | `https://ptax.bcb.gov.br/ptax_internet/consultaBoletim.do?method=exibeFormularioConsultaBoletim` |
| Período | 01/11/2024 a 30/11/2024 |
| Saída | `output.xlsx` com Data, Valor de compra, Valor de venda |
| Tempo da prova | 2 horas |
| Tempo do robô | até 10 minutos |
| Consulta ao site | **uma vez só**, informando data inicial e final |
| Ações obrigatórias | `Obter vários elementos`, `Obter elemento` dentro de `Loop`, `Obter texto do elemento` com "Elemento já selecionado", `Definir valor de uma linha` com "Preencher última linha" |
| Entrega | `crp2025_meu_nome.zip` com `output.xlsx` e `robo.json`, para certificacao@roberty.app |

Banca por videoconferência, tela compartilhada o tempo todo, sem consulta ao material, sem
celular. Qualquer um desses pontos desqualifica na hora.

## Resposta conferida

Rodei a extração aqui, com os mesmos seletores do enunciado, e conferi contra a API oficial
do BCB (Olinda). Script em `valida_ptax.py`, planilha em `output.xlsx`.

```
linhas capturadas pelos seletores da prova: 19
primeira: 01/11/2024  compra 5,8067  venda 5,8073
ultima:   29/11/2024  compra 6,0529  venda 6,0535
OK: todas as linhas batem com a API oficial
dados nas linhas 2 a 20 (19 cotacoes)
```

**São 19 cotações, não 30.** Novembro de 2024 teve 21 dias úteis, e o PTAX não publicou em
15/11 (Proclamação da República) nem em 20/11 (Consciência Negra). O dia 30 caiu num sábado,
então a última linha é 29/11.

Detalhe que confirma o gabarito: o `output.xlsx` original já vem com **20 linhas formatadas**,
uma de cabeçalho e 19 de dados. Bate exatamente com o resultado.

## Desenho do robô

Os nomes abaixo são os das ações no Studio, conforme a documentação oficial.

```
1.  Navegador > Abrir navegador
      URL: https://ptax.bcb.gov.br/ptax_internet/consultaBoletim.do?method=exibeFormularioConsultaBoletim

2.  Navegador > Preencher campo          seletor: #DATAINI      valor: 01/11/2024
3.  Navegador > Preencher campo          seletor: #DATAFIM      valor: 30/11/2024
4.  Navegador > Selecionar opção         seletor: select[name="ChkMoeda"]   valor: 61
5.  Navegador > Clicar                   seletor: input[type="submit"]
6.  Navegador > Aguardar navegação

7.  Navegador > Obter vários elementos
      Selecione a ação: Por navegador
      Seletor: tr[class*="fundoPadraoBClaro"]
      -> devolve .elements (lista) e .size (19)

8.  Meu Robô > Loop
      Repetir quantas vezes: {{ acao7.size }}

      8.1  Navegador > Obter elemento     (Data)
             Selecione a ação: Por lista de elementos
             ID da lista: acao7
             Índice: {{ acao8.count - 1 }}
             Seletor: td:nth-of-type(1)
      8.2  Navegador > Obter texto do elemento
             Selecione a ação: Por elemento   (é a opção "Elemento já selecionado")
             ID do elemento: acao8.1

      8.3  Obter elemento  ->  td:nth-of-type(3)   (Compra)
      8.4  Obter texto do elemento  ->  por elemento, acao8.3

      8.5  Obter elemento  ->  td:nth-of-type(4)   (Venda)
      8.6  Obter texto do elemento  ->  por elemento, acao8.5

      8.7  Office > Excel > Definir valor de uma linha
             Aba: Página1
             Coluna: A
             Preencher na: Última linha
             Valores: {{ acao8.2 }} , {{ acao8.4 }} , {{ acao8.6 }}

9.  Office > Excel > Salvar arquivo
10. Navegador > Fechar navegador
```

Antes do passo 8 é preciso abrir a planilha com **Excel > Abrir arquivo**, apontando para o
`output.xlsx` do enunciado.

## As três armadilhas

**O `Loop` começa em 1 e a lista começa em 0.** A documentação do `Obter vários elementos` diz
"A lista é indexada a partir de 0" e a do `Loop` diz "count começa em 1". Passar o `count`
direto como índice pula a primeira linha e estoura na última. Tem que ser `count - 1`.

**"Elemento já selecionado" é o modo `Por elemento`.** No `Obter texto do elemento` existem três
modos, e a prova exige o que lê de um elemento já capturado, não o que busca por seletor. Usar
o modo `Por navegador` reprova mesmo com o valor certo na planilha.

**"Preencher última linha" x "Última linha da coluna".** São opções diferentes. O enunciado pede
a primeira. E `Definir valor de uma linha` não persiste nada sozinho: sem o **Salvar arquivo** no
fim, o `output.xlsx` sai vazio.

Uma quarta, que peguei rodando aqui: se a leitura da última linha considerar linha formatada
como preenchida, a gravação começa na 21 e deixa as linhas 2 a 20 em branco. No Roberty a opção
"Última linha" olha conteúdo, mas vale conferir a planilha antes de zipar.

## Checklist antes de enviar

- [ ] uma requisição só ao site, com as duas datas preenchidas
- [ ] 19 linhas, de 01/11 a 29/11, sem buraco e sem cabeçalho duplicado
- [ ] valores conferidos com `valida_ptax.py`
- [ ] robô roda em menos de 10 minutos
- [ ] `robo.json` exportado pelo Studio
- [ ] zip nomeado `crp2025_fabricio_junio_almeida_dias.zip`
- [ ] e-mail para certificacao@roberty.app, assunto `Certificação Roberty - FABRICIO JUNIO ALMEIDA DIAS`

## O que não dá para fazer daqui

O robô em si tem que ser montado no Roberty Studio (`studio.roberty.app`), que é SaaS e precisa
do seu login. O que está resolvido aqui é a lógica, os seletores, o gabarito conferido e a
planilha pronta. Na hora da prova é transcrever o desenho acima para a tela.
