# Dossiê de trabalho, base para os posts do LinkedIn

Documento de contexto. Não é post, é a matéria prima. Serve para o chat que escreve os posts
saber exatamente quem eu sou, onde trabalho, o que eu faço tecnicamente e quais histórias reais
existem para virar conteúdo.

Atualizado em 20/08/2026.

---

## 1. Quem sou

Fabrício Júnio Almeida Dias, desenvolvedor na área de **Serviços** da **Digihub Tecnologia**,
em Bauru/SP. Entrei em 17/08/2026. Gestor direto: Haislan Lima, Head de Serviços, com passagem
por IBM Brasil, Lecom e Verity, MBA pela FGV.

A área de Serviços é o time que atende os clientes da carteira: recebe chamado, analisa,
desenvolve, homologa e publica em produção. É desenvolvimento de verdade em cima de processos
que já rodam e movimentam dinheiro do cliente, não projeto novo em campo aberto.

## 2. A empresa e o grupo

Digihub Inovação e Tecnologia, aberta em 2020, porte pequeno, entre 13 e 20 pessoas.
Posicionamento: "HUB de empresas que oferecem soluções com foco em inovação e tecnologia".

A Digihub faz parte do ecossistema **Lecom**, um grupo de hiperautomação sediado em Bauru:

| Empresa | Papel |
|---|---|
| Lecom Tecnologia | plataforma BPM, RPA e IA, base técnica de quase tudo |
| Ikatec | integradora |
| Yank Solutions | RPA, adquirida em janeiro de 2025 |
| Roberty Automation | motor de RPA da plataforma |
| Digihub | produtos próprios e serviços sobre a plataforma |

Contexto de mercado que dá peso ao post: em julho de 2024 os sócios da Ikatec compraram 75% da
Lecom por R$ 110 milhões, o grupo passou de R$ 140 milhões de receita, tem meta de R$ 220
milhões até o fim de 2026 e IPO projetado para 2030. Ou seja, é um grupo brasileiro de
automação em consolidação, e eu trabalho no braço de serviços dele.

### Produtos da Digihub

**GOL, Gestão OnLine de Performance.** Software de KPI e planejamento estratégico, com módulos
de BSC, SWOT e Hoshin Kanri. Usa RabbitMQ entre back e front. Clientes citados publicamente:
Grupo Votorantim, Suzano, CBA, Lorenzetti, Bom Peixe.

**Governance.** Desenho e documentação de arquitetura organizacional, áreas, cargos, processos,
sistemas e produtos, com versionamento e controle de acesso. Serve para análise de impacto em
troca de sistema, reestruturação ou fusão.

**Portal de Serviços.** Portal externo white label para cliente e fornecedor abrirem e
acompanharem solicitações. Autenticação por OAuth padrão, OAuth PKCE, GOV.BR e API própria.

**Cadastro Fácil.** Low-code de cadastros, formulário e tabela por drag-and-drop, CRUD,
importação e exportação por planilha, API REST e controle de permissão.

## 3. A plataforma onde eu desenvolvo

Quase tudo que eu entrego roda sobre a **Plataforma Lecom**, um BPMS com BPMN 2.0, RPA, GED,
OCR, analytics e IA na modelagem. Infra em nuvem privada dedicada, acreditação SOC ISAE 3402 e
conformidade LGPD.

Módulos que eu uso: Workspace (onde o usuário executa a atividade), Studio (modelagem do
processo, campos, regras e roteamento), Admin (usuário, grupo, função, departamento),
Documentos (GED), Análises e o RPA do Roberty.

O que isso significa na prática: eu não escrevo um CRUD do zero, eu mexo em processo de negócio
vivo. Um processo de viagem corporativa, por exemplo, tem 14 etapas e 708 campos, e centenas de
instâncias em andamento no momento em que eu altero.

## 4. Stack real

| Camada | O que eu uso |
|---|---|
| Regra de tela | JavaScript sobre a API JS do formulário da plataforma, jQuery no legado |
| Backend | Java, robôs e integrações, Spring Boot com Maven, Java 20 nas versões novas |
| Banco | SQL direto, análise, diagnóstico, consulta de lupa e relatório |
| RPA | Roberty, catálogo de 466 ações no-code, robô com PDD obrigatório |
| Integração | API REST da plataforma, apikey mais header X-Server |
| DevOps | GitLab da Lecom, branch por ambiente (test, develop, master), build com SonarQube |
| Operação | acesso SSH aos servidores do cliente, publicação de properties, análise de log |
| Monitoramento | Zabbix com alerta no Discord |
| Ferramenta própria | Python, ffmpeg e faster-whisper na GPU para transcrever reunião local |

Ferramentas de trabalho: Jira Service Desk para chamado, Discord para comunicação interna,
Git para versionar o que eu escrevo.

## 5. A carteira de clientes

Treze clientes, cada um com ambientes separados de produção, homologação e às vezes
desenvolvimento: Alper Seguros, Atlântica, Deloitte, Johnson & Johnson, Justiça, Laboratório
Digital, Lecom Administrativo, Novo Tempo, Sicoob São Miguel, Sodexo, Too Seguros, Unimed
Botucatu e a própria Digihub.

Setores: seguros, auditoria e consultoria, saúde farmacêutica, cooperativismo de crédito,
facilities e benefícios, saúde suplementar, hotelaria, judiciário e laboratório.

Isso é o gancho de "quem eu atendo": empresa grande, processo crítico, ambiente com anos de
customização acumulada.

## 6. O que eu entrego, por tipo

**Regra de tela em JavaScript.** Um arquivo por processo, vinculado a todas as atividades, com
o código das etapas no topo em `Object.freeze` e o comportamento separado por etapa. Validação
sempre no evento de submit, com a API rejeitando o envio. Reuso da biblioteca interna de
validação de CPF, CNPJ, PIS, e-mail e data em vez de reescrever.

**Robô e integração em Java.** Integração devolve `0|mensagem` para sucesso e `99|mensagem`
para erro. Integração de campo devolve valores separados por pipe. Robô roda agendado e não tem
o contexto que a integração tem, o que muda o jeito de fazer coisas simples como mandar e-mail.

**Roteamento de processo.** Condição compilada que decide para qual etapa o processo segue.
É onde mora a regra de negócio de aprovação, e onde um erro passa despercebido por meses.

**Automação RPA no Roberty.** Robô que entra em portal externo, autentica, filtra, exporta
planilha e importa na base do cliente, com tratamento de exceção e limpeza do que baixou.

**SQL.** Consulta de lupa, relatório, e principalmente diagnóstico: medir em produção o que
está acontecendo antes de propor qualquer coisa.

**Documentação.** Cada demanda encerrada vira um PDF profissional com capa, o que foi pedido, a
análise e a causa, as soluções avaliadas e a escolhida com o porquê, o que mudou arquivo por
arquivo, os testes com resultado e os pontos em aberto.

## 7. Casos reais, com números

São histórias verdadeiras e recentes. Para post, os números importam mais que o nome do
cliente, que não deve aparecer.

### 7.1 A aprovação que nunca acontecia

Um diretor pediu que as viagens do time comercial passassem por ele antes de ir para Compras.
A hipótese inicial, dentro da empresa, era que bastava trocar o campo Líder no cadastro do
usuário. Já tinham trocado e não resolveu.

O que eu encontrei: a etapa de aprovação não usa a hierarquia do cadastro, ela usa um campo do
formulário preenchido por onze regras diferentes, uma por natureza de viagem. O aprovador
estava certo em 76 dos 77 processos comerciais. O problema não era quem aprovava, era que o
processo nunca chegava na etapa de aprovação.

A causa raiz: uma condição de desvio comparava dois campos que estavam vazios. Vazio igual a
vazio dá verdadeiro, então o processo pulava a aprovação e ia direto para Compras. Um dos dois
campos deveria ser preenchido por uma lupa que não preenche em produção, em 100% dos processos.
O outro é um campo oculto que só aparece para outra área. Por isso uma área funcionava e a
outra não, e ninguém tinha ligado os pontos.

Como eu medi: escrevi um simulador que reproduz as três condições exatamente como estão
gravadas no banco e apliquei aos 331 processos reais da versão em produção. O simulador bateu
com o histórico real em 330 de 331, e o único que destoou era anterior à versão da condição
atual. Só depois de provar que o modelo estava correto é que rodei a correção nos mesmos 331:
mudam 77, todos da natureza pedida, nenhuma outra é afetada.

Números do levantamento: 331 processos na versão ativa, 83 passaram pela aprovação do gestor.
Comercial: 77 processos, zero aprovações. Marketing: 15 processos, zero aprovações.

A correção foi escrita por exclusão, para que o resultado não dependesse da ordem em que os
blocos de roteamento são avaliados, e esse foi o argumento que fechou a discussão técnica.
Três alternativas foram avaliadas e descartadas com motivo escrito, incluindo uma que a
ferramenta simplesmente não permite desenhar.

Detalhe que rende post sozinho: durante o teste em homologação, a correção passava sem
exercitar o bug, porque naquele ambiente a lupa preenchia o campo e a condição já dava falso
por conta própria. Teste que passa pelo motivo errado é teste que não vale. Igualei a consulta
da lupa entre os ambientes e refiz o teste, aí sim valendo. Também descobri nove usuários com
departamento diferente entre produção e homologação, o que estava dando resultado enganoso.

Fecho: dez cenários testados em homologação, todos com o destino previsto batendo com a etapa
real, escopo ampliado duas vezes pelo cliente no mesmo dia e reescrito para atender, e uma
exceção antiga que comparava um campo vazio em 332 de 332 processos, ou seja, nunca tinha
funcionado desde que foi escrita.

### 7.2 O alerta que avisava e deixava passar

Processo de análise e assinatura de documentos, com 30 etapas mapeadas. A validação de e-mail
dos assinantes mostrava o alerta de e-mail inválido e adicionava o e-mail errado na tabela do
mesmo jeito. Alerta sem consequência é pior que alerta nenhum, porque dá a sensação de que o
sistema está protegendo.

Refiz a validação para limpar o campo e barrar a inclusão, acrescentei a checagem também no
envio da etapa, cobri as etapas que não tinham validação nenhuma e escrevi 19 testes
automatizados.

O ponto técnico que interessa: o código roda dentro da plataforma e depende de objetos que só
existem lá. Para testar fora, montei um dublê do objeto de formulário e rodei o arquivo real em
um contexto isolado com o módulo `vm` do Node. Isso permite rodar a suíte inteira na minha
máquina, em segundos, sem subir nada em ambiente de cliente. É uma prática que quase não se vê
em desenvolvimento sobre plataforma low-code.

### 7.3 O robô, o captcha e a tentativa que não repetia

Robô do Roberty que todo dia às 8h entra no portal da prefeitura, autentica com CNPJ e senha,
resolve o captcha, filtra as notas fiscais do dia, exporta a planilha, importa na base auxiliar
e apaga o arquivo baixado.

O problema: o retry do login não funcionava. O laço de repetição envolvia só a leitura do
captcha, e depois de errar uma vez o servidor invalida o captcha e o token da sessão, então
toda nova tentativa nascia morta. O desenho certo é o laço envolver a tentativa inteira, com
recarregamento da página no topo de cada iteração e verificação por um elemento que só existe
depois de logado.

Detalhe de mundo real: portal de governo bloqueia a conta por tentativa repetida, então o
número de tentativas é decisão de risco, não de código. Quatro basta.

Também identifiquei que quatro seções do documento de definição do processo tinham ficado com o
texto de exemplo do modelo, entre elas justamente Tratamento de Exceções e Testes.

### 7.4 A integração que copiava o líder errado

Processo de contratação. Ao marcar "criar login", uma integração em Java cria o usuário
copiando tudo de um perfil modelo: nome, e-mail, login, senha, líder, departamento, grupos e
funções. O efeito colateral é que o líder também vem copiado, então gente nova entra
subordinada à pessoa errada e ninguém percebe até algum fluxo de aprovação sair torto.

A solução desenhada mantém a cópia do modelo e permite informar a liderança à parte, com
validação, campo novo, versionamento do processo e bateria de teste grande, porque a integração
escreve direto no banco.

Aqui teve também um trabalho de análise que não é código: alguém tinha ligado esse defeito ao
caso da aprovação de viagens, dizendo que era a mesma causa. Não era. Provei que a aprovação de
viagem usa campo de formulário e não o líder do cadastro, e a ligação foi desfeita na reunião.
Separar dois problemas que parecem um só evita corrigir a coisa errada.

### 7.5 Operação de servidor, dois achados que custaram tempo

**Properties não se edita direto.** O arquivo que a aplicação lê fica em um diretório de
storage, e o de verdade fica em um diretório de customização. Edita na origem e aplica com o
comando de update da plataforma, que copia tudo que estiver pendente. Consequência prática:
deixar um arquivo `.bak` na pasta faz o `.bak` ir junto para produção.

**A senha do SMTP vem criptografada no banco.** Autenticar com o valor cru da coluna devolve
`535 authentication failed`. Tem que passar pela função de criptografia legada da casa, em modo
de decriptação, apesar de estar marcada como deprecated. Isso importa porque robô não tem o
contexto que a integração tem e não consegue usar o método pronto de envio de e-mail. E o jar
oficial de e-mail da versão que está no repositório interno tem o método principal quebrado,
compilado com erro de compilação não resolvido, então não dá para depender dele. As outras três
classes do mesmo jar funcionam.

### 7.6 Planilha virando grid, e o remendo da biblioteca

Carregar dados de uma planilha do usuário direto para dentro de uma grid do formulário. O
caminho é ler o anexo como string binária, interpretar com a SheetJS pedindo que datas venham
como data e não como número serial do Excel, e inserir linha a linha.

A pegadinha: a plataforma usa RequireJS, e a SheetJS se registra como módulo AMD, então a
variável global nunca aparece e nada funciona. O arquivo em uso tem um remendo que zera o
registrador de módulo antes de carregar a biblioteca e devolve depois. Quem baixar o arquivo
original do site da biblioteca precisa refazer isso na mão.

## 8. Como eu trabalho

**O rito de atendimento, sem pular etapa.** Responder o chamado assim que chega avisando que
está em análise. Levantar mais de uma solução quando existir. Apresentar as opções ao cliente em
linguagem de leigo, sem nome de campo e sem termo técnico solto. Esperar o cliente aprovar e
escolher. Só então desenvolver, em homologação. Mandar o cliente validar. Só depois da validação
subir para produção.

**Medir antes de propor.** Nenhuma solução minha vai para o cliente sem número em cima. Quantos
processos são afetados, quantos mudam de comportamento, quantos ficam iguais. Simulação
validada contra o histórico real antes de valer como argumento.

**Provar que a condição dispara.** Não basta a sintaxe estar certa, tem que provar com dado real
que cada pedaço da regra chega a valer alguma coisa. Foi assim que apareceu a exceção que nunca
funcionou em 332 de 332 processos.

**O padrão do repositório vence o meu padrão.** Código novo tem que ficar indistinguível do que
já está lá, mesma nomenclatura, mesma densidade de comentário, mesmo estilo. Em arquivo que já
existe, eu acrescento minha autoria no cabeçalho embaixo das anteriores, sem apagar ninguém. O
cabeçalho é o histórico de quem passou pelo arquivo.

**Não mexer no que não foi pedido.** Se eu encontro outro defeito no caminho, eu registro,
aviso, e deixo a decisão de escopo com quem é de direito. No caso da viagem, o campo que nunca é
preenchido virou observação de chamado próprio, não correção clandestina.

**Não copiar defeito achando que é padrão.** O legado que eu leio tem `debugger` esquecido em
produção, reconfiguração de grid a cada 300 milissegundos para sempre, salvamento automático por
temporizador, condição duplicada comparando a mesma coisa duas vezes, variável morta e um erro
de tipo que lança exceção toda vez que a etapa carrega com linha na grid. Nada disso entra no
que eu escrevo.

**Nunca desenvolver na versão corrente do processo.** Exporta de produção, importa em
homologação, suspende, versiona, e só então mexe.

**Apontamento diário.** Registro do que fiz por dia, em texto direto: o problema que tinha e
como resolvi.

## 9. Estudo e formação contínua

Nas primeiras semanas eu destilei o material técnico inteiro em notas próprias: os dez módulos
do treinamento oficial da plataforma, 1.123 páginas de documentação da Lecom, 210 páginas de
referência de API, 720 páginas da documentação do Roberty e 14 vídeos transcritos.

Resolvi a certificação Roberty Professional, o exercício de regra de tela com 23 testes
passando e a integração Java de envio de e-mail com 18 testes passando.

Fila de estudo atual: a estrutura interna do arquivo de exportação de processo, tuning de
memória e full GC no servidor de aplicação, e banco de dados a fundo.

Sobre IA no meu trabalho: eu uso, e uso do jeito que dá resultado. Documentação virando nota
consultável, simulador de regra escrito em minutos, suíte de teste para código que a plataforma
não deixa testar, transcrição de reunião rodando na GPU da minha própria máquina para que áudio
de cliente não saia daqui. O que não muda é quem responde pelo resultado.

## 10. Ganchos prontos para post

Ordenados por potencial. Cada um dá um post inteiro.

1. Trocar o campo no cadastro não resolveu porque o sistema nem olhava aquele campo. A diferença
   entre onde a informação está e de onde o processo realmente lê.
2. Vazio igual a vazio dá verdadeiro. Uma comparação sem proteção desviou 77 processos de uma
   aprovação por meses.
3. Antes de corrigir, eu simulo a regra atual contra o histórico real. Se a simulação não bate
   com o passado, ela não serve para prever o futuro. 330 de 331.
4. O teste passou pelo motivo errado. Diferença de configuração entre homologação e produção
   fazendo o bug não aparecer no teste.
5. Escrever a condição por exclusão para que o resultado não dependa da ordem de avaliação.
6. Três soluções avaliadas, duas descartadas com motivo escrito. Documentar o que você não fez
   vale tanto quanto documentar o que fez.
7. A exceção que nunca funcionou. Zero disparos em 332 processos, e ninguém sabia.
8. Alerta que avisa e deixa passar é pior que alerta nenhum.
9. Como testar JavaScript de plataforma low-code fora da plataforma, com dublê de objeto e
   contexto isolado. 19 testes rodando na minha máquina.
10. O retry que nunca ia funcionar: repetir só o pedaço errado do processo de login.
11. Automação em portal de governo, onde tentar de novo pode bloquear a conta.
12. Ler o legado sem copiar o defeito dele.
13. O cabeçalho do arquivo como histórico de autoria, e por que eu não apago o nome de quem veio
    antes.
14. Falar com o cliente em linguagem de leigo é parte do trabalho técnico, não um extra.
15. Separar dois problemas que todo mundo achava que eram um só.
16. A senha criptografada no banco e o jar oficial quebrado: o dia a dia de quem mantém sistema
    de verdade.
17. Encontrar o defeito e não corrigir, porque não foi pedido. Registrar e devolver a decisão.

## 11. Regras para os posts

**Nunca publicar:** nome de cliente ligado a defeito, nome de pessoa de cliente, número de
chamado, número de processo, nome de campo interno, credencial, endereço de servidor, print de
tela de sistema de cliente.

**Pode publicar:** o padrão do problema, o raciocínio, o método, os números em termos relativos
("77 processos de um fluxo de viagens corporativas", sem dizer de quem), e a lição.

**Tom:** primeira pessoa, direto, frase de tamanho irregular, sem buzzword, sem emoji em
contexto formal, sem travessão, sem abrir com saudação genérica e sem fechar com resumo do que
acabou de ser dito. Português correto e acentuação sempre certa. Nada pode parecer escrito por
máquina.

**O que me diferencia e deve aparecer no subtexto:** eu não chuto. Eu meço, simulo, provo com
dado real, escrevo o porquê da escolha e documento o que ficou em aberto. Em ambiente onde
qualquer alteração pega processo em andamento de empresa grande, isso não é preciosismo, é o
mínimo.
