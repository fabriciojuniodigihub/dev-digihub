# Treinamento Lecom - módulo 07, Studio 3 (campos)

Transcrito de `07 - Módulo Studio 3.mp4` (1h40). Todo o módulo é sobre **campos**: tipos,
limites, estados por etapa, inicialização e carregamento de dados.

## Agrupadores

Campos se organizam em agrupadores, e agrupador também tem **identificador** (dá para
manipular por JavaScript).

- o **primeiro agrupador** é o principal: deixar **sem** permitir expandir e contrair
- os demais: permitir expandir e contrair
- **boa prática da casa: sempre criar um agrupador "Observações" no fim**

## Tipos de campo e seus limites

| Tipo | Limite / detalhe |
|---|---|
| **Linha de texto** | **255 caracteres**. Vira `varchar` no banco |
| **Caixa de texto** | tamanho em linhas x colunas. **O padrão da casa é 2x80**. Para exibir regulamento ou contrato longo, 9x80 ou 10x80 e bloqueado. Vira `text` no banco |
| **Inteiro** | até **9** dígitos |
| **Decimal** | até **14** casas antes da vírgula, até **6** depois |
| **Monetário** | tem prefixo (R$), mas **não controla casas decimais** |
| **Data** | |
| **Label** | o **único** tipo em que se usa prefixo (`LBL_`). Tamanho **pequeno** (médio fica ruim), alinhado à esquerda, cor de fundo combinando com a marca do cliente |
| **Radio button** | opções separadas por `;` |
| **Checkbox** | **um campo por check**. Se precisa de 10 checks, cria 10 campos |
| **Lista** | opções separadas por `;`. É o `select` do HTML |
| **Template** | anexo, ligado a um template do ECM |
| **Botão gráfico** | mostra um gráfico do módulo analítico, respeitando a permissão de quem olha |
| **Botão de aplicação** | link para sistema externo, montando a URL com parâmetros |

**Por que decimal e monetário coexistem:** logística usa **quatro casas decimais** em valores
(payment, over sales), e monetário não deixa controlar isso.

**Checkbox tem uma pegadinha:** o valor configurado só é gravado quando marcado. Desmarcado
fica **em branco**, não `false`. Então não adianta esperar `true`/`false`.

**Nomes de campo:** sem prefixo de tipo, por causa do limite de caracteres da tabela.
Alguns nomes são **proibidos** pela ferramenta (`decimal`, nomes começando com número), mas ela
avisa na hora.

**Quebra de linha:** sem quebra, simples ou barra separadora.

## Estados do campo por etapa

`normal`, `somente leitura`, `obrigatório`, `invisível`, `oculto`, `bloqueado`,
`bloqueado obrigatório`.

Configura-se **etapa por etapa**, e quando a etapa tem conector de rejeição, dá para
configurar separado para aprovação e rejeição.

O padrão de uso: **oculto** nas etapas anteriores, **obrigatório** na etapa onde é preenchido,
**somente leitura** nas seguintes.

`bloqueado` só faz sentido junto com inicialização automática (select, API), senão é um campo
que ninguém consegue preencher.

## Excluir campo: a janela fecha ao gerar a tabela

Enquanto a tabela **nunca** foi gerada, dá para excluir campo. Depois de gerada, **só dá para
inativar**.

> "Antes de desativar, a gente joga na última posição e depois desativa."

Duplo clique no campo edita posição, tamanho e label. Mover para o fim antes de inativar evita
que a numeração fique furada e o formulário vire uma salada. Campos inativos aparecem em
vermelho e dá para reativá-los.

Por isso o fluxo prático é: **criar todos os campos, configurar tudo, e só então gerar a
tabela**.

O que **não** dá para alterar depois: identificador e tipo (já viraram coluna no banco).
Máscara, exibição na pesquisa e no resultado dá.

## Inicialização

| Opção | Uso |
|---|---|
| Sem valor inicial | padrão |
| **Com valor inicial** | valor fixo; em lista e radio, as opções separadas por `;` |
| **Resultado de select** | query no banco |
| **Resultado de API** | integração de API |
| **Resultado de integração** | integração Java |

### Duas caixinhas que confundem

**"Manter o valor da atividade anterior selecionado"** (lista): quando o processo volta num
novo ciclo, recarrega **as opções** e mantém a que estava marcada. Sem isso, volta só o valor,
sem a lista.

**"Cíclico"**: quando marcado, o campo é **reinicializado com o valor inicial toda vez que a
atividade roda de novo**. Sem marcar, ele volta com o que a pessoa tinha preenchido.

## Lupa: consulta por select

O padrão para buscar dado de outra tabela:

- a query pode trazer **até 10 colunas**, mapeadas para **até 10 campos**, na **mesma ordem**
- cada campo do mapeamento tem três flags: **pesquisável**, **visível** e **retorno**
- para filtrar pelo que a pessoa digitou, usa-se `$NOME_DO_CAMPO` no `WHERE`:

```sql
SELECT NOM_USUARIO, DES_EMAIL FROM USUARIO
WHERE DES_LOGIN LIKE '%$LINHA_DE_TEXTO%'
```

Três coisas que economizam tempo:

1. **a query roda no ambiente, não na sua máquina.** Não precisa estar na VPN para a lupa
   funcionar (a VPN é para você acessar o banco por fora)
2. **tem que salvar em dois lugares**: a query e a configuração da lupa. O instrutor perdeu
   alguns minutos ao vivo por causa disso
3. **escrever SELECT em maiúsculas**, boa prática dele

Além da base `workflow` (a do próprio sistema), dá para configurar conexões com Totvs, RM,
Protheus, sistema legado ou uma tabela criada por um CRUD da própria plataforma.

## Resultado de API

Em **Integrações de API** define-se o parâmetro de entrada e o mapeamento dos retornos para os
campos. Depois, no campo, escolhe-se **resultado de API para lupa**.

Preenche **automaticamente**, sem precisar de botão. E dá para mapear dezenas de campos de
retorno.

Detalhe: existe um **bug** em que é preciso salvar e voltar para o parâmetro ficar pesquisável.

## Carregamento na atividade x no campo

Distinção que muda o desempenho:

- **na atividade** ("informações desta etapa"): carrega **vários campos de uma vez** ao entrar
  na etapa. Uso típico: já tenho o login do usuário e, ao entrar na segunda atividade, quero
  trazer endereço, departamento e o resto
- **no campo**: comportamento de lupa, dispara quando a pessoa interage

> "A vantagem de fazer na página de atividade é que a gente não precisa fazer um por um.
> Faz uma vez e já pega os campos que precisa."

## Campo de histórico: a receita completa

A boa prática do agrupador Observações:

1. criar um campo **caixa de texto** chamado Observação
2. marcar **exibir no histórico**
3. deixar **normal** em todas as atividades
4. marcar **com valor inicial** e deixar o valor **vazio**
5. marcar **cíclico**
6. deixar **obrigatório nas rejeições**

Os passos 4 e 5 são os que quase todo mundo esquece: sem eles, a observação volta preenchida
com o texto anterior e a pessoa acaba reenviando o mesmo comentário. O passo 6 é o que garante
que toda rejeição venha com o motivo escrito.

O histórico acumula embaixo do campo, mostrando o que foi escrito em cada atividade.

## Etapa final define o status do processo

A última etapa alcançada por um conector de **aprovação** encerra o processo como **aprovado**;
alcançada por um conector de **rejeição**, encerra como **rejeitado/cancelado**.

Normalmente se criam **duas etapas fim distintas**, uma para cada caso. Isso é o que permite,
depois, medir quantos processos chegaram ao fim de verdade.

## Usuário logado economiza clique

Configurando a próxima atividade como **usuário logado**, ela abre na hora para quem acabou de
aprovar, sem precisar sair, voltar à área de trabalho e reabrir o processo. Bom para etapas
sequenciais da mesma pessoa e para testar mais rápido.

## Aplicação externa (botão de aplicação)

Cria um botão que abre uma URL externa, montando a query string com **campos do formulário** e
**variáveis de ambiente**.

O exemplo real: um campo com o número do documento no SAP e um botão que abre o
**via SAP** já na página daquele documento. Serve quando o cliente tem sistema legado e não
vale a pena escrever integração.

Não tem estados de obrigatório ou somente leitura: só **normal, invisível e oculto**.

## Alerta sobre o template padrão do ECM

Repetido aqui com um caso real:

> "No ambiente da Congas deu um puta de um problema, porque a maioria dos uploads estava tudo
> em template padrão. Começou a causar lentidão, porque quando precisava baixar um arquivo o
> sistema procurava em milhões de documentos dentro de uma única pasta no servidor."

Cada template vira **uma pasta no servidor**. Jogar tudo no template padrão que a instalação
cria significa uma pasta com milhões de arquivos. **Sempre separar template por tipo de
documento**, nem que seja um por processo.
