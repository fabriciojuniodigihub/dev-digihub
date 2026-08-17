# Governance - overview do produto

Transcrito de `Overview Governance - 2026-02-11-002.mkv` (1h51). Áudio ruim, transcrição com
falhas, mas o conceito ficou claro. É uma apresentação interna do produto para o time, com
Diego, Rodrigo e outros participando.

## O que é, em uma frase

Um **documentador da empresa**. Enquanto o BPM executa processo, o Governance documenta tudo
que existe em volta dele e mostra como as coisas se relacionam.

> "Aqui não executa nada. Quem executa o processo de negócio é o BPM. Aqui é um passo antes,
> aqui você documenta tudo."

## Os pilares (arquiteturas)

O produto organiza a empresa em **arquiteturas**, também chamadas de pilares:

| Pilar | O que guarda |
|---|---|
| **Estrutura organizacional** | o organograma: diretorias, gerências, departamentos, hierarquia |
| **Produtos e serviços** | o que a empresa oferece ao mercado |
| **Serviços internos** | o que uma área presta para as outras |
| **Sistemas** | SAP, sistemas legados, e até macro de planilha |
| **Processos** | os diagramas de processo da empresa |

A ordem sugerida de preenchimento é essa: estrutura organizacional primeiro, depois produtos e
serviços, serviços internos, sistemas, e por fim processos.

Os pilares e os nomes são **configuráveis por cliente**: dá para tirar um pilar, criar outro e
renomear.

## Tudo é elemento

Esse é o conceito central e explica o comportamento do produto inteiro.

Cada caixinha, em qualquer pilar, é um **elemento**. Todo elemento tem:

- **campos** (atributos)
- **relacionamentos** com elementos de **outras** arquiteturas

Um cargo do organograma pode estar relacionado a um processo, a um sistema e a um serviço
interno ao mesmo tempo. É isso que permite a visão completa:

> "Aquele diagrama está relacionado a qual estrutura, a quais produtos e serviços, a qual
> serviço interno, a qual sistema. Você vê tudo de tudo, um relacionado com o outro."

No banco isso vira **modelo dinâmico**: não existe tabela por tipo de elemento. Tudo é elemento
mais **metadata** descrevendo os campos.

## Setup por JSON

Os campos de cada tipo de elemento **não** se configuram pela interface. Monta-se um **JSON**
com os campos que aquele cliente quer, e esse JSON é subido gerando o setup do ambiente.

Alguns campos são **core** e não podem ser removidos, porque têm regra de negócio associada
(o exemplo dado foi "gestor de produtos"). Os demais são opcionais.

> "Não é dinâmico ainda isso. Você pega o JSON, mexe no JSON, esse JSON sobe e ele gera setup."

Isso é trabalho de implantação e provavelmente vai aparecer em chamado.

## Estrutura organizacional

Dois tipos de elemento mudam o desenho:

- **subordinado**: fica **abaixo** do elemento pai
- **assessoria**: fica **ao lado, entre o pai e os filhos**. É o braço direito, o assistente de
  diretoria. Tem desenho diferente no gráfico

Recursos:

- **importação de cargos por planilha**, feita a partir de uma planilha do cliente
- **contagem de pessoas que soma de baixo para cima**: cada departamento tem sua quantidade por
  cargo, e a hierarquia vai consolidando até o topo dar o total da empresa
- **links e anexos** por elemento: normas, manuais e PDFs. Quando existe, aparece um clipe na
  caixinha
- exportar o organograma como **imagem**
- zoom e navegação por botão direito

## Movimentação e inconsistências

Dá para **mover** um departamento de uma gerência para outra, e tudo que está abaixo vai junto.

Como a base é toda relacionada, mover pode gerar conflito. Existe uma **tela de
inconsistências** que aponta o que quebrou depois da movimentação e deixa a pessoa decidir como
resolver. É um recurso que exige explicação com cenário real, e o próprio apresentador não
detalhou.

## Hierarquia de processos

O pilar de processos não começa no diagrama. Tem uma escada:

```
Nível 1: classificação de macro processos
   └── macro processo
         └── hierarquia de processo  ou  diagrama de processo
               └── (dentro do diagrama) atividades
```

Exemplo dado: classificação → `Processo de vendas` → diagrama `Cadastro de cliente` →
atividades dentro dele.

O diagrama é um elemento e **a atividade também é um elemento**, com campos e relacionamentos
próprios. Abaixo do diagrama a árvore **termina**: não dá para pendurar mais elementos ali, o
conteúdo vive dentro dele.

## Perfis de acesso

- **leitor / visualizador**: só leitura, e enxerga apenas a parte que lhe cabe. Um funcionário
  novo vê a caixinha do seu departamento, os manuais dela, e não o diagrama estratégico da
  diretoria
- **facilitador**: edita e alimenta o sistema

Quem preenche são as **pessoas-chave de cada área**, não uma pessoa só.

## Uma oportunidade que ficou registrada

Houve um experimento, por volta de 2023 ou 2024, de **exportar o diagrama do Governance e
importar no BPM** para executar o processo lá. Chegou a funcionar uma vez, mas **não está na
versão atual**.

> "Precisamos retomar isso aí, não está na nossa versão. O modelador dele é igual ao modelador
> da Lecom."

Isso é uma ponte natural entre os dois produtos: documenta no Governance, exporta, executa no
BPM. Como o modelador é o mesmo, é tecnicamente viável. Vale guardar como assunto para quando
houver espaço para propor melhoria — é o tipo de coisa que dá visibilidade.

## Pessoas citadas

Diego (aparece como responsável por área no organograma de exemplo, provavelmente Diego
Nassula), Rodrigo, Mário e Mateus Santos, além do apresentador.
