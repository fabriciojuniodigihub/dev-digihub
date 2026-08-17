# Automatização de criação de campos

Transcrito de `overview_automatizacao_campos.mp4` (20 min). É uma apresentação interna da
equipe de serviços mostrando uma ferramenta feita em casa. **Fecha o círculo** com a skill e o
`automatizar_campos.py` que estão no material de treinamento.

## O problema

> "A gente demora muito para criar campo lá no Lecom, configurar nas etapas e tudo mais."

Criar campo a campo pela tela e depois configurar cada um em cada etapa é o gargalo real da
modelagem.

## A solução, e o detalhe que a torna valiosa

O produto vai resolver isso **nativamente na versão 7**, com o Studio novo, permitindo subir
uma planilha de configuração de campos. Enquanto isso não chega a todos os clientes, a equipe
construiu uma automação que funciona em **qualquer versão**.

E aqui está o ponto que mais importa:

> "Essa planilha é **exatamente a mesma** que o produto vai disponibilizar na versão 7. Foi
> baseada exatamente na mesma que o produto usou."

Ou seja, quem aprender esse formato agora já está aprendendo o formato oficial da 7.0.
Não é trabalho descartável.

## Como funciona

Duas planilhas:

| Planilha | Conteúdo |
|---|---|
| **Especificação** | tipo do campo, identificador, label, agrupador e seu label, grid, campo sensível |
| **Mapeamento** | a configuração de cada campo **por etapa**: somente leitura, obrigatório, com valor inicial, as opções da lista |

Ambas têm **legenda** dentro do arquivo com os códigos aceitos.

Um script em **Python** recebe quatro coisas: o Excel de especificação, o Excel de mapeamento,
o **`.atos` do processo** e a pasta de saída. Ele manipula o XML de dentro do `.atos` e devolve:

- um **`.atos` novo**, pronto para importar
- um **relatório** com quantas etapas encontrou, quantos campos criou e como ficou o mapeamento

Detalhes de uso:

- o processo **precisa já existir** na plataforma, com as etapas criadas, e os **identificadores
  das etapas na planilha têm que bater** com os do `.atos`
- dá para usar **só a especificação**, **só o mapeamento**, ou os dois
- serve tanto para criar do zero quanto para **acrescentar campos** a um processo existente
- quando há campo do tipo template e a coluna de template não foi preenchida, o script
  **pergunta o código do template** a usar (o padrão é `1`). Isso acontece porque o XML associa
  campo a template **por código**, e essa informação só existe no `.atos` se já estiver
  vinculada
- testado em **5.70, 6 e 7**

Uma limitação honesta apontada na apresentação: campo lista não vem com a **primeira opção
vazia** que o time costuma colocar, porque isso não está na planilha.

## A skill de linguagem natural

A segunda forma de gerar a planilha é por conversa:

> "A gente fez uma **skill** ali no Claude que consegue ajudar por linguagem natural. Ele vai
> gerar essa planilha para você."

A skill é registrada como **global** no Claude, então ele a aciona sozinho quando o assunto
aparece. Ela pergunta as etapas do processo e seus **aliases**, aceita nomes quando a pessoa
não sabe o alias, sugere campos, e pergunta as opções de lista e radio button.

Também testaram no **Gemini** e funcionou.

Isso confirma que a `lecom-excel-skill (Criação de campos via Claude).zip` e o
`automatizar_campos.py` que estão no pacote da Equipe Técnica são **exatamente** essa
ferramenta — e a nota `metodologia-e-ia.md` já detalha o formato das duas planilhas, os códigos
de status (`N`, `SL`, `O:A`, `O:R`, `O:T`, `I`, `C`) e os de inicialização (`S`, `C`, `R`,
`J`, `A`).

## Outra automação da mesma linha

Existe também um script que faz a **conversão de formulário antigo para o novo**, gerando as
grids automaticamente a partir dos campos de repetição do formato antigo. Era um trabalho
manual pesado em migração.

## Status e melhoria já encaminhada

A ferramenta está em **fase de teste**, com o time coletando feedback, e roda **só na máquina
de quem a criou** por enquanto. A distribuição é pelo **Drive do grupo de serviços** — que é
justamente onde o pacote da Equipe Técnica veio.

Na própria reunião alguém levantou um ponto bom:

> "O Excel às vezes muda o formato dos campos. Existe a ideia de usar um XML ou um JSON em vez
> da planilha, que seria mais seguro?"

E a resposta foi que **já estão alterando para aceitar JSON**, junto com a equipe de produto.

Vale registrar porque é exatamente o tipo de contribuição que se espera de alguém técnico numa
apresentação: apontar um risco concreto (Excel reformatando dado) e propor a alternativa.

## Clientes onde ia ser usada

Alper e Johnson foram citados como os próximos candidatos, com a proposta de rodar em conjunto
na primeira vez.
