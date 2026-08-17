# Treinamento Lecom - módulo 09, JavaScript avançado

Transcrito de `09 - Módulo Avançado Javascript.mp4` (1h). É o módulo que mostra **como o time
realmente escreve JavaScript** na plataforma, o que é diferente de saber a API.

## Onde tudo isso mora

**Modelador > Serviços**, com as abas: **JavaScript, Base de dados, Gráficos, Robôs,
Integrações e Integrações API**. É o mesmo lugar de toda a parte avançada.

Para vincular ao processo: **Editar > Campos do processo > Script**, escolher o JS e
**adicionar a todas as atividades**.

## A regra de organização: um JavaScript por processo

Não se cria um script por atividade. **Cria-se um único arquivo por modelo**, vinculado a
todas as atividades, e dentro dele o código se separa por etapa.

O arquivo se chama `<processo>_v1.0.js`, e **versiona junto com o modelo**: quando o modelo vai
para a V2, copia-se o JS, renomeia para v2, sobe e vincula ao modelo novo.

Cadastro: Serviços > JavaScript > Novo, marcar **Personalizado** (sempre), caminho tanto faz,
definir proprietário.

Detalhe de rotina: ele edita num editor local (Notepad++, Sublime) e cola o conteúdo no editor
da plataforma com Ctrl+A / Ctrl+C, em vez de refazer upload. É mais rápido.

## O esqueleto padrão

```javascript
/* variáveis globais: cada atividade e o código da sua etapa */
var SOLICITACAO_COMPRAS = 2;
var ATIVIDADE_2         = 6;
var ATIVIDADE_3         = 4;
var ETAPA_FIM           = 5;

$(document).ready(function () {

    /* regras que valem para todas as atividades ficam aqui */
    caixaTextoVisible();

    if (ProcessData.activityInstanceId == SOLICITACAO_COMPRAS) {
        caixaTextoRequired();
    }

    if (ProcessData.activityInstanceId == ATIVIDADE_2) {
        /* ... */
    }
});

function caixaTextoRequired() {
    Form.fields('CAIXA_DE_TEXTO').setRequired('aprovar', false);
}

function caixaTextoVisible() {
    Form.fields('CAIXA_DE_TEXTO').visible(false);
}
```

O número de cada etapa se pega em **Atividades**, no Studio, passando o mouse sobre a
atividade.

## O erro que ele provocou de propósito, e vale ouro

Ele escreveu uma função e ela não executou. O aluno demorou a achar. A explicação:

> "JavaScript é estrutural e sempre vai executar a partir daqui. Ela vai lendo linha a linha.
> Leu a linha 7, não tem nada. 8, não tem nada. 9, tem... e aqui finalizou o meu script. E aí
> ele **não chega a fazer a function**."

Ou seja: **declarar a função não executa nada**. A chamada precisa estar **dentro do
`$(document).ready`**, e mais: **dentro do `if` da atividade certa**, senão roda onde não devia.

Foi exatamente esse o segundo erro da demonstração — a função foi chamada fora do `if` e
passou a esconder o campo em todas as etapas em vez de só na primeira.

## Isolar código em funções pequenas

O princípio, dito com todas as letras:

> "A gente sempre tem que seguir o princípio do orientado a objeto para tudo que formos fazer,
> mesmo que a linguagem seja estrutural."

E o exemplo é ótimo, porque mostra **por que** isolar:

Separar `caixaTextoRequired()` de `caixaTextoVisible()` em duas funções, e não numa só, porque
**a obrigatoriedade só vale na primeira atividade** mas **a visibilidade vale em todas**.
Juntas, não daria para reaproveitar uma sem arrastar a outra.

Acima dos `if` ficam só as chamadas e os eventos; a lógica fica nas funções.

## Duas regras de convivência com o Studio

**Se você controla a obrigatoriedade pelo JavaScript, tire a obrigatoriedade do Studio.**
Não configurar nos dois lugares.

E um alerta prático:

> "É perigoso, dá erro se você começar a configurar como obrigatório em campo somente leitura."

## Eventos

O evento de campo lista é **`change`**, não `onclick`. Sem ele, a regra só é avaliada quando o
formulário carrega ou quando alguém salva — foi o que aconteceu na demonstração: o campo só
aparecia depois de salvar a atividade.

Padrão: pega-se o trecho de `change` de outro JavaScript do ambiente, apaga o miolo e coloca a
chamada da função.

**Comparação de lista é sempre pelo `value`, nunca por posição ou índice.** Igual às regras de
tela.

## O `setTimeout` de 1000ms, e por que existe

Vários scripts do ambiente começam com um `setTimeout` de mil milissegundos. O motivo:

> "Campos grid demoram para carregar os dados. Esse JavaScript executa no momento da abertura
> do formulário, e na abertura tem alguns milissegundos para carregar a grid."

Sem a espera, `dataRows()` volta vazio.

**Observação minha:** a documentação da 5.70 traz o evento **`GRID_DATA_ROW_LOADED`**, criado
exatamente "para evitar `setTimeout` nos scripts". Então o padrão do ambiente é legado. Em
código novo, usar o evento; em manutenção de script antigo, não sair mexendo sem necessidade.

## Como acessar cada tipo de elemento

| Elemento | Como pegar |
|---|---|
| Campo normal | `Form.fields('CAMPO')` |
| Campo dentro de grid (para evento) | `Form.grids('ID_GRID').fields('CAMPO')` |
| Percorrer as linhas da grid | `Form.grids('ID_GRID').dataRows()` |
| Agrupador | `Form.groups('ID_AGRUPADOR')` |

Uma sacada que apareceu na leitura de um script real: `dataRows()` já devolve todas as linhas
de uma vez, então **não precisa de laço** para coletar valores da grid — dá para tratar o
array direto. O aluno notou isso sozinho e o instrutor confirmou.

Manipulação de grid: `insertDataRow` (recebe um JSON com os campos), `updateDataRow` (primeiro
busca o `dataRow` para pegar o `id`, depois atualiza) e `removeDataRow` (mesma lógica).

## O `apply()`

> "Eu não preciso que todos os meus comandos tenham ele. Eu preciso que ele esteja no final do
> meu raciocínio."

Um `Form.apply()` no fim resolve, em vez de aplicar a cada comando. Bate com o que o manual da
5.70 diz sobre performance.

## O método de trabalho que ele recomenda

Não é decorar a documentação. É:

1. **abrir outro JavaScript já existente no ambiente** e ver como foi feito
2. copiar o trecho, apagar o miolo, adaptar
3. quando não achar, procurar no documento da API JS por um **nome de comando parecido**
   (procurou `required` e achou; procurou `insertDataRow` e o `update` estava logo abaixo)

E o cuidado que vem junto: **tomar cuidado para não estragar o JavaScript que já está
funcionando** ao copiar de um processo em produção.

Para processo que já existe, o conselho é ainda mais direto:

> "Você vai ler a lógica, vai seguindo e implementando conforme a lógica dela. Provavelmente
> você não vai nem mexer no JavaScript. Se pegar outro processo, segue a lógica que está
> implementada lá."

## O exercício que ele passou

Vale como referência do nível esperado:

1. o campo só aparece, **e como obrigatório**, se o valor da compra for acima de R$ 10.000
2. se a pessoa escolher um mês diferente de maio, exibir um alerta na tela

Com a observação de tirar a obrigatoriedade do Studio, já que ela passa a ser controlada pelo
script.
