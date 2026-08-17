# Treinamento Lecom - módulo 01, Introdução a BPMs e Lecom

Transcrito de `01 - Introdução BPMs e Lecom.mp4` (1h10). É uma sessão de onboarding um a um,
gravada. Quem ensina tem **12 anos de Lecom, entrou em 2013 quando só havia quatro consultores
no Brasil todo**, é formado em 2009, fez curso de Java pela Caelum e gestão empresarial na FGV,
os dois pagos pela empresa, e hoje faz papel de **arquiteto**: "olhar o cenário e propor
ideias". **Não é o Haislan**: no módulo 04 o Haislan é citado em terceira pessoa, como alguém
acima na hierarquia que pediu para lembrarem o instrutor de uma reunião. É outra pessoa
sênior, ainda não identificada pelo nome. O aluno é o **Luiz**, que veio de RPA
(Automation Anywhere) e Power Platform.

O ambiente usado é o comercial da **Verity**, parceira oficial da Lecom, e o cliente do
projeto é a **Alper Seguros**.

## O conceito que organiza tudo

**BPMS é o processo de ponta a ponta. RPA é uma caixinha dentro dele.**

> "O BPMS vê o contexto e o RPA só vê um pequeno pedaço do processo."

CSC (Centro de Serviços Compartilhados) é o nome dos processos internos: férias, viagem,
desligamento, admissão, suporte de TI, jurídico. É o pão com manteiga da plataforma.

A ordem certa, no mundo ideal: digitalizar e medir o processo primeiro (BPMS), e só então
automatizar o gargalo com RPA, IA, chatbot ou integração. Hiperautomação não é RPA sozinho.

> "RPA teve o boom, BPMS teve o boom, IA está tendo o boom. Uma coisa complementa a outra e
> não substitui."

## Fluxograma de negócio x fluxograma de automação

Essa é a habilidade central do cargo.

O fluxograma de negócio que o analista entrega é **detalhado, caixinha por caixinha**:
"acessa o EB, gera relatório do dia, consulta protocolos abertos, filtra pela categoria,
exporta relatório, pede checklist". Seis caixas.

No BPMS aquilo vira **uma única atividade**, e todo o detalhe passa a viver dentro do
formulário, em campos, regras e integrações.

> "A gente não detalha. A gente comprime em uma tarefa só, onde dentro dessa tarefa vai ter
> campos e funcionalidades que englobam todas aquelas atividades."

**Cada tarefa do fluxograma é um formulário** que alguém vai receber e preencher.
Quem faz isso bem é quem conhece os recursos da plataforma a ponto de saber o que dá para
resolver sem código.

## A sequência de construção de um processo

1. Configurar as informações principais do modelo
2. Desenhar o fluxograma de automação a partir do fluxograma de negócio ou das entrevistas
3. Configurar **responsáveis e SLA** de cada atividade
4. Criar os campos e configurar campo por campo **em cada etapa** (somente leitura,
   obrigatório, oculto)
5. Criar as **regras de negócio**
6. Só então plugar integrações

Exemplo real de regra citado: campo "existe menor aprendiz". Se for `Sim`, o campo
"cópia do contrato assinada" fica visível e obrigatório; senão, some e perde a
obrigatoriedade. Dispara na abertura do formulário e na alteração do campo.

Outro detalhe de modelagem: um evento condicional pode mandar a atividade direto para o
analista certo em vez de cair numa fila onde alguém precisa clicar em "assumir". No exemplo,
se o tipo é "Pátria", vai direto para o analista que só cuida disso.

## Modo teste: o recurso que evita estrago

Existe um **"ativar modo teste"** na plataforma. Dentro dele:

- dá para **trocar de área de trabalho** e percorrer todas as etapas sozinho, sem depender
  das pessoas reais aprovarem
- **os e-mails não vão para os destinatários cadastrados**, vão para um endereço definido na
  modelagem do processo, para não incomodar a organização

Isso é o que permite validar um processo inteiro antes de soltar. Usar sempre.

## Vocabulário da casa

| Eles falam | Significa |
|---|---|
| **aceite** | ambiente de homologação. É o termo que o pessoal usa |
| tarefa / atividade / formulário | a mesma coisa, cada um chama de um jeito |
| instância de processo | uma execução, com número sequencial (o rastreamento) |
| modelo de processo | o desenho, o template do fluxo |
| campo lista | o `select` do HTML |
| template (no ECM) | estrutura de documentos, não é o campo |

Todo cliente tem ambiente próprio, com homologação e produção separados.

## ECM e template de documento

O módulo de documentos (Enterprise Content Management) trabalha com **template**, que é a
estrutura do documento. Dá para:

- deixar um **documento padrão** que a pessoa baixa, edita e reenvia, em vez de partir do zero
- limitar **extensão** permitida (só PDF, só DOCX) e **tamanho**
- vincular obrigatoriamente uma chave do processo (ex.: o CNPJ) ao documento, virando
  **metadado**

## Onde entra Java

Pouco, e isso é importante para calibrar expectativa: o grosso do trabalho é no-code.
Java entra só nos **plugins e integrações sistêmicas**, para levar informação do Lecom para
ERP e sistemas do cliente: SAP, Protheus, RM, Quiver (o caso da Alper), consumindo REST ou
WSDL.

> "Você foca em um negócio pequeno, porque a parte toda você faz no code."

Mais para frente também dá para criar CRUD hospedado junto com o produto, quando o cliente
não tem sistema.

## Roteiro do treinamento

Dividido em duas partes na semana:

| Dias | Conteúdo |
|---|---|
| segunda, terça, quarta | no-code: área de trabalho, Admin, Studio/modelista, campos, regras, documentos/ECM, permissionamento, análises |
| quinta, sexta | codificação: integrações em Java, com Eclipse instalado, montando um "Hello World" de integração |

Ordem lógica que ele segue: **área de trabalho** (o que todo mundo usa) → **Admin**
(usuários, grupos, funções, departamentos, que é o que define quem recebe cada atividade) →
**Studio** (fluxograma, campos, regras) → **Documentos** → **permissionamento de módulos** →
**análises** → **Roberty** (RPA, só depois de dominar BPMS).

## Rotina do projeto Alper

- expediente das **8h30 às 17h30**, 8 horas, 1 hora de intervalo
- **daily todo dia às 9h20**, dura até por volta de 9h35
- squad com pessoas de formações diferentes, que se complementam

## Clientes da plataforma citados

Honda, Asics, gov.br, Ser Educacional (rede com mais de 300 mil alunos, dona da Uninassau e
Unifavip), Melitta, Alper Seguros, Peridot, além dos que já apareceram no material.

## Conselho de carreira que veio de graça

Perguntado sobre fazer pós em IA, a resposta foi que todo conhecimento vale, mas que se
fosse escolher uma pós técnica, escolheria **arquitetura**:

> "Onde você consegue ver o ambiente como um todo e entender melhor qual das soluções se
> casaria melhor com aquilo que a empresa necessita. É o que eu faço."

E sobre o que ele avalia numa pessoa: **raciocínio lógico** e **saber trabalhar com cliente**.
As perguntas da entrevista dele eram todas para medir se a pessoa se daria bem como analista
BPMS.

Também: a empresa tem parceria com a **Alura**, então curso é benefício disponível.

E uma frase que vale guardar sobre pedir ajuda:

> "Não tente ficar quebrando muita cabeça, eu estou aqui, eu respondo rápido pelo Teams."
