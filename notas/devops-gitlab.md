# DevOps com GitLab na Plataforma Lecom

Existe desde a **5.60** e continua na 6.0 e 7.0. É a mudança mais importante em relação ao que
está no material antigo da Equipe Técnica: lá os robôs eram `.jar` soltos em
`api/robo/<numero>/`, subidos na mão. Agora a publicação é por **CI/CD a partir do GitLab**.

Documentação (pública, sem login), espaço `VPL` para a 7.0:

| Página | URL |
|---|---|
| DevOps | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991700963 |
| Aplicações com DevOps | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991698367 |
| Clonando Projeto no Git | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701172 |
| Importando Projeto no Eclipse | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701220 |
| Alterações no código-fonte | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701317 |
| Merge Request | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701518 |
| Pré-requisitos técnicos de robôs | https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991699326 |

As mesmas páginas existem em `PLV6` (6.0), `PLV570` (5.70) e `PLV5` (5.60), com os mesmos
títulos e ids diferentes.

## O que a funcionalidade faz

Publica **robôs, integrações Java e aplicações externas** por integração e entrega contínua,
sem upload manual de `.jar`. O motor é o `gitlab-service`, que fala com o repositório por SSH.

**Limitação séria:** a funcionalidade "Aplicações" exige SSH e por isso **não funciona em
servidor Windows**. Ambiente de cliente em Windows fica de fora.

## O repositório

GitLab próprio da Lecom em **`repo.lecom.com.br`**, organizado por cliente:

```
https://repo.lecom.com.br/clientes/devops-bpm/robos/RoboExecutarAtividade.git
```

Clonar é o git normal:

```bash
git clone https://repo.lecom.com.br/clientes/devops-bpm/robos/RoboExecutarAtividade.git
```

## Branches são ambientes

Essa é a parte que não dá para errar:

| Branch | Ambiente |
|---|---|
| `test` | aceite |
| `develop` | qualidade (QA) |
| `master` | **produção** |

Conferir sempre com `git branch` antes de mexer, e trocar com `git checkout <branch>`.

Promover para produção é **merge request de `test` para `master`**, pelo próprio GitLab:
`Create new` (o `+`), `New merge request`, escolher origem e destino, `Compare branches and
continue`, revisar os commits, `Create merge request` e depois `Merge`.

Em **Merge Options**, deixar as **duas opções desmarcadas**. Marcadas, elas apagam a branch de
origem, e você perde a branch de desenvolvimento.

## Estrutura do projeto

Robô e integração são **Spring Boot com Maven**. Duas classes já vêm criadas:

- **classe principal**, anotada com `@RobotModule` (robô) ou `@IntegrationModule` (integração),
  mais `@Version` e `@Component`. O método com `@Execution` é onde entra a lógica, igual ao
  modelo antigo
- **classe Application**, que estende `CommandLineRunner`, chama `SpringApplication.run()` com o
  profile ativo e dispara o `execute()` da classe principal

No `pom.xml` o que muda é o `parent`:

| Tipo | Parent |
|---|---|
| Robô | `robot-parent` |
| Integração Java | `integration-parent` |

O `pom.xml` também aponta para os repositórios **Nexus da Lecom**, um de snapshots e outro de
releases. É de lá que vêm as bibliotecas da plataforma.

**Dependência de biblioteca muda conforme o robô foi migrado ou não:**

| Situação | Onde ficam as bibliotecas |
|---|---|
| Robô **não** migrado | as do `pom.xml` precisam estar na pasta **`custom`** do ambiente |
| Robô migrado e aplicação | não precisa, roda em contexto separado |

## Pré-requisitos

Obrigatório: **Java 20**, Maven, uma IDE Java (IntelliJ, Eclipse ou NetBeans) e Git.
Desejável: JUnit e noção de design patterns.

Atenção ao Java 20: a máquina aqui está com Temurin 21. Conferir se o projeto aceita ou se
precisa instalar a 20 quando pegar o primeiro robô.

## Aplicações externas

Rodam em um **tomcat_app separado**, em contexto isolado dos robôs migrados. A URL segue
o padrão:

```
https://cliente.com.br/app-ext/minhaaplicacao
```

Ao integrar a aplicação com o repositório, dois campos:

- **Identificador**: nome único da integração Java dentro do repositório
- **Repositório**: preenchido sozinho depois da primeira publicação

O botão **Publicar** dispara a pipeline, que consolida no ambiente as alterações mais recentes
do código-fonte. Depois de publicar a plataforma registra data, usuário e status, e mostra um
quadro com o **IP de cada servidor onde publicou com sucesso**, o que importa em cluster.
Se falhar em um nó específico, dá para republicar só naquele nó.

## Fluxo de trabalho, na prática

1. Clonar o repositório do robô ou integração
2. `git checkout test` (ou `develop`)
3. Importar no Eclipse como projeto Maven
4. Alterar, commitar e dar push na branch do ambiente
5. Publicar pela plataforma, que roda a pipeline
6. Validar em aceite
7. Merge request de `test` para `master` para ir a produção

## Cuidado: o treinamento gravado mostra uma versão anterior

O módulo 10 do treinamento (`treinamento-10-integracao-e-robo.md`) ensina o mesmo fluxo, mas num
ambiente mais antigo. Onde os dois divergem, a documentação 6.0/7.0 é que vale para cliente novo:

| | Gravação do treinamento | Doc 6.0 e 7.0 |
|---|---|---|
| Branches | `developer` e `master` | `test`, `develop` e `master` |
| Projeto | Java EE, importado no Eclipse | Spring Boot com Maven |
| Promoção | publicar direto pela branch | merge request de `test` para `master` |
| Java | o do ambiente | **20** |

O que não mudou: a plataforma cria o repositório sozinha ao salvar a integração, o botão
**Publicar** é que dispara a pipeline, o SonarQube pode reprovar, e o acesso ao repositório sai
por chamado na Lecom.

## O que ainda falta confirmar

- Se `repo.lecom.com.br` é acessível só pela VPN e qual credencial usar (a chave SSH é do
  `gitlab-service` ou pessoal?)
- Qual versão cada cliente da Digihub está rodando. O Spec Kit alerta que
  **versão 5.40 ou anterior é risco crítico**, e o DevOps só existe da 5.60 em diante
- Se os clientes atuais (Atlântica, Sodexo, Deloitte, J&J) já migraram para esse modelo ou
  ainda estão no `.jar` manual. Pelo backup da Atlântica, aquele cliente ainda era manual
