# Treinamento Lecom - módulo 06, Studio 2 (diagrama e atividades)

Transcrito de `06 - Módulo Studio 2.mp4` (1h40). O módulo mais denso do treinamento e o
núcleo do trabalho de modelagem.

## Ordem de construção de um processo

```
Propriedades → Diagrama → Configuração das atividades → Campos →
Configuração dos campos por etapa → Regras de tela
```

Tudo isso é no-code. Integração e robô entram depois, plugados na atividade ou no campo.

## Propriedades do modelo

**Título:** a boa prática é **sigla de três letras + traço + nome**.
`RH - Admissão`, `COD - Expedição de notas`, `Benefícios - Abertura de subestipulante`.

**Visualizar campos de pesquisa:** deixar **sempre marcado**. Sem isso, os campos escolhidos
para aparecer na listagem da Workspace simplesmente não aparecem, mesmo estando configurados.

**E-mail para modo teste:** centraliza **todos** os e-mails do processo no endereço do
modelista enquanto está em teste. É o que impede disparo indevido.

**Quem pode abrir:**

| Configuração | O que dá para fazer |
|---|---|
| Departamentos | só liberar abertura |
| Grupos | abertura **e** nível de pesquisa (completa/parcial/não pesquisável) **e** campos especiais |
| Usuários | idem grupos |

Na prática: a maioria dos processos pode ser aberta pela empresa toda, então se libera por
departamento, e criam-se grupos para quem precisa de pesquisa completa.

**Gestor do processo:** por função ou usuário. A boa prática dele é **nome por nome**, porque
facilita a gestão depois.

**Modelistas permitidos:** se preenchido, só esses enxergam o modelo na lista do Studio.
Se vazio, todos os modelistas veem.

**Nome da tabela:** tem **limite curto de caracteres**. É por isso que os nomes de campo da
plataforma não usam o padrão de prefixo por tipo do desenvolvimento web (`txtNome`, `cbxTipo`)
e às vezes nem underline: é para economizar caractere.

Subtítulo, descrição, texto de ajuda e arquivo anexo existem, mas **nenhum modelista usa**.

## Elementos do diagrama

| Elemento | Uso |
|---|---|
| **Raia (piscina)** | uma principal para o processo, e uma por responsável. Duplo clique no nome para renomear |
| **Evento início / fim** | um de cada |
| **Tarefa** | a atividade. Duplo clique renomeia |
| **Gateway exclusivo** | **exatamente 2 saídas**. Mais que isso dá erro ao publicar |
| **Gateway complexo** | quando precisa de **3 ou mais** decisões |
| **Gateway paralelo** | dispara duas atividades ao mesmo tempo |
| **Atividade com script** | roteamento por condicional escrita |
| **Atividade em looping** | volta para a mesma atividade e **incrementa o ciclo** |
| **Subprocesso** | abre outro processo, mas só 1 para 1 |
| **Comentário** | documenta customizações no próprio desenho |

### Paralelismo e a atividade concentradora

Depois de um gateway paralelo, a atividade que recebe as duas pontas **precisa ser marcada
como concentradora** nas configurações da atividade. Isso não aparece no desenho, é
configuração.

Se esquecer: o primeiro que executar libera a atividade seguinte, e quando o segundo executar
**a atividade abre de novo** e a pessoa tem que fazer duas vezes. Com a marcação, quem chegar
antes vê a mensagem de que ainda há atividades pendentes.

Detalhe: a **primeira e a última atividade não podem ser concentradoras**.

E uma limitação importante:

> "Esse conector de paralelismo não conversa com esses gateways."

Quando precisa de condicional junto com paralelismo, a saída é **atividade com script**.

### Subprocesso, e por que quase não se usa

Serve para abrir outro processo ao concluir uma etapa, mas é **um para um**. O caso real que
quebra: uma grid com vários fornecedores, e é preciso abrir **um processo de cotação por
linha**. Aí não dá, e a solução é uma **integração Java** que percorre a grid e abre um
processo por linha, com outra integração no fim do subprocesso devolvendo os dados ao pai.

## Script de roteamento

A sintaxe usa **`$NOME_CAMPO`** para referenciar campo. O botão **Ajuda** lista as variáveis
de ambiente disponíveis, incluindo o **código do ciclo**.

Exemplo real da Alper, em português estruturado:

```
se codigoCiclo == 1 e $PATRIA == 'Nao'
    segue para ASSUMIR_SUBESTIPULANTE, CONFECCAO_LAYOUT_EB     -- paralelo
senão se codigoCiclo == 1
    segue para CONFERENCIA_DOCUMENTOS_CHECKLIST, CONFECCAO_LAYOUT_EB
senão
    segue para CONFERENCIA_DOCUMENTOS_CHECKLIST
    usuário específico: $LOGIN_ANALISTA_SUB
```

Duas coisas aqui:

- o **ciclo** é usado como regra de negócio: no ciclo 1 manda para a fila de analistas
  assumirem; do ciclo 2 em diante manda direto para quem já assumiu
- o login vem de um **campo auxiliar** preenchido por lupa ou query

## Campo auxiliar: invisível x oculto

Distinção que importa:

| Estado | Comportamento |
|---|---|
| **Oculto** | o campo **não existe** na interface, nem por trás |
| **Invisível** | o campo está lá, carregado, dá para manipular por script, só não aparece |

Campo auxiliar de roteamento tem que ser **invisível**, não oculto.

## Tipos de responsável, e o que o time realmente usa

| Tipo | Uso real |
|---|---|
| **Grupo de usuários** | **o mais usado de todos** |
| **Usuário iniciador** | muito usado, principalmente para rejeição voltar a quem abriu |
| **Usuário específico** | usado, mas ver a regra abaixo |
| **Usuário logado / atual** | a próxima atividade abre na tela de quem acabou de aprovar |
| **Vários usuários** | campo auxiliar com logins separados por vírgula. Casos de alçada |
| Chefe de departamento | pouco usado |
| Função de usuários | "nunca usei, em 12 anos" |
| Líder do usuário iniciador | "nunca usei" |

**A regra de ouro dos responsáveis:**

> "Como boa prática, grava isso: a gente **não chumba** usuário específico. Se for para uma
> pessoa só, a gente cria um grupo no admin e coloca essa pessoa no grupo."

Motivo: quando a pessoa sai ou muda de área, você troca em um lugar (o grupo) em vez de caçar
processo por processo. As duas exceções são **usuário de sistema** e **campo auxiliar**
(`$LOGIN_ANALISTA`).

### Precedência

O **próximo responsável configurado na atividade anterior sobrescreve** o responsável
configurado na própria atividade. Configura-se por padrão na própria atividade; só se usa a
configuração "de trás" quando a mesma atividade precisa de responsáveis diferentes dependendo
de onde veio.

### Usuário de sistema para robô

O padrão da casa é **`tarefa.automatica`**, criado em todo ambiente. E vale o mesmo que para
gente:

> "Mesma coisa robô: se ele não tiver no grupo **acesso BPM**, ele não vai conseguir acessar o
> sistema para a nossa rotina aprovar o processo."

O usuário de sistema também precisa estar liberado no **modelo** para aprovar aquela atividade.

## SLA na atividade

- **Prazo de alerta** (amarelo, ainda não venceu) e **prazo máximo** (vencido)
- Ambos **em horas úteis**, seguindo o calendário do Admin. Um dia = 10 horas se o expediente
  é das 8 às 18
- **Escalonamento**: passou de X horas, joga para outro responsável
- Tempo limite para gestor e **hibernação** quase não se usa

### O padrão para "liberar só quando chegar uma data"

Hibernação é tempo **fixo**, então não serve quando o cliente pede que a próxima atividade só
abra na data preenchida num campo. A solução da casa:

1. rotear para um **usuário de sistema**
2. configurar a atividade como **looping**
3. uma **task** roda de tempos em tempos e, quando a data do campo chegar, aprova
4. aí sim segue para o responsável de verdade

## E-mails

Detalhe contraintuitivo: **o e-mail é configurado na etapa anterior**, não na atividade que
vai recebê-lo. Escolhe-se quais campos aparecem no corpo.

Dá para colocar botão de **aprovar/rejeitar direto no e-mail**, sem entrar na plataforma, mas
só funciona se a opção **"autenticação automática na execução de atividade por e-mail"**
estiver ligada no Admin.

Outras opções: cópia para o iniciador, cópia nas cobranças de atraso, e **anexar as grids em
xlsx** no e-mail.

## Mensagem e labels dos botões

A mensagem após aprovar pode ser padrão, personalizada ou não exibida. E os **labels dos
botões** devem ser personalizados:

> "Tudo fica como Aprovar, aí a gente coloca 'Iniciar processo de expedição'. É definido junto
> com a área."

## Boas práticas de diagrama

O instrutor diz ter "TOC" com fluxograma malfeito, e o motivo é legítimo: qualquer usuário
pode abrir o **fluxo vivo** pelos três pontinhos e ver o desenho.

- **não alterar o tamanho** dos objetos; escolher nomes de atividade que caibam
- evento inicial **próximo** da primeira etapa
- conector de **aprovação sai pela direita, ao centro**
- conector de **rejeição** desloca para baixo ou esquerda, e recebe **nome** (duplo clique)
- legenda do conector **perto da atividade**: em cima quando horizontal, à direita quando
  vertical. Nunca jogada no meio do nada
- **o fluxo caminha para a direita e desce em degraus.** É o que evita conector sobreposto
- **encaixar as atividades para que os conectores não se cruzem**; sobrepor só em último caso,
  e apenas quando várias setas vêm no mesmo sentido para a mesma atividade
- cada tarefa tem direito a **dois conectores**: aprovação e rejeição. Se precisar de mais
  saídas numa delas, usar gateway

Sobre o botão de cancelar: o sistema oferece cancelar na primeira atividade **apenas no
primeiro ciclo**. Depois de uma rejeição que volta para ela, o botão some. Por isso a boa
prática é **criar uma rota de rejeição explícita** que leva a um fim de "cancelado".

**Exportar o desenho:** usar **HTML**. O PNG **está com bug** e corta fluxograma grande.
Útil quando o cliente ainda não tem acesso à ferramenta.

## Formulário público

Permite acessar um formulário **por URL, sem login**. Casos: o portal do aluno da
**Ser Educacional** e o **gov.br**.

Não é assunto de treinamento básico porque exige customização pesada: um REST que descobre
unidade, curso e semestre do aluno para listar o que ele pode abrir, um servlet que chama o
processo, e um usuário de sistema que preenche os dados iniciais.

## Escala dos ambientes citados

- **gov.br**: um dos maiores ambientes Lecom que existem
- **Ser Educacional**: o segundo maior, com **mais de 400 processos em produção**, 200 mil
  alunos e mais de 100 faculdades. O instrutor foi **líder técnico** lá por dois anos
- **PRF** também usa a plataforma

Em ambiente desse tamanho o trabalho muda de natureza:

> "A gente tem que fazer um trabalho de **arquitetura** para fazer as customizações que possam
> ser utilizadas em outros processos."

Ou seja, componente reutilizável em vez de integração isolada por processo. É exatamente a
diferença entre executar chamado e virar referência.
