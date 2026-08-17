# Cookbook de código - Plataforma Lecom 6.0

Gerado das 305 páginas do espaço `PLV6` do Confluence da Lecom.
Só o que tem código: cada seção traz o título da página, o link e os blocos.


---

## Configuração Inicial

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2608037943/Configura+o+Inicial

```
import br.com.lecom.open.api.constant.RotasOpenAPIConfig;

public class ExemplosRotasOpenApi {

 public static void main(String[] args) {
 RotasOpenAPIConfig.setDomain(""); //domínio aplicação
 RotasOpenAPIConfig.setCredentials(""); // chave api key
 RotasOpenAPIConfig.setModoTeste(false); // quando precisar passar true, o false é por padrão
 RotasOpenAPIConfig.setCodigoUsuario(1); //código do usuario do modo teste
 }

}
```


---

## Framework - Serviços de OpenApi

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2608037889/Framework+-+Servi+os+de+OpenApi

```
<dependencies>
<dependency>
<groupId>br.com.lecom.open.api</groupId>
<artifactId>rotasOpenApi</artifactId>
<version>6.0-1.0v1-RELEASE</version>
</dependency>
</dependencies>
```

```
<repository>
 <id>lecom-nexus-services</id>
 <name>Lecom Services</name>
 <url><https://repo-store.lecom.com.br/repository/lecom-services</url>>
 <releases>
 <enabled>true</enabled>
 </releases>
 <snapshots>
 <enabled>false</enabled>
 </snapshots>
 </repository>
```


---

## Novidades da versão 6.0 | Plataforma Lecom

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2386362369/Novidades+da+vers+o+6.0+Plataforma+Lecom

```
Confira a documentação em https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2252210178/v.6.0+-+E-mail?atlOrigin=eyJpIjoiMThiY2Y4OTRhNWZiNGEwMDg4NGNkNWM3MzQ4OTFiY2YiLCJwIjoiYyJ9 

OTIMIZAÇÃO DE PERFORMANCE
Nesta versão, também investimos em aperfeiçoar e dar mais agilidade nas seguintes funcionalidades:

Upload de documento no formulário com campos de metadados​

Gravação e aprovação de processo com documentos​

Pesquisa e exportação de processo

OPENAPI: NOVOS SERVIÇOS E MAIS FLEXIBILIDADE
A OpenAPI permite a integração com nossa plataforma de maneira segura e padronizada, ampliando seu uso por meio da conexão com outras aplicações, como ERP, CRM e Chatbots, além de viabilizar a criação de robôs e soluções complementares.
Nesta nova versão, apresentamos novos serviços que expandem ainda mais as possibilidades de integração.
Além disso, temos mais dinamismo e autonomia para usuários previamente autorizados, mesmo que não tenham permissão de gestor. Agora, eles podem acessar serviços como:
Basta configurar a permissão de gestão para liberar essas funcionalidades e permitir que os usuários consumam os serviços do OpenAPI com mais liberdade.

 Confira a documentação em v.6.0 - Open API 

PESQUISAS SALVAS
Na versão 6.0, você continua salvando e editando as pesquisas de processos, mas agora a edição foi ampliada: além de alterar o nome, qualquer modificação nos filtros, na ordenação ou na paginação também será salva.

 Confira a documentação em v.6.0 - Pesquisas Salvas 

EXPORTAÇÃO DE PESQUISA DE PROCESSO
Mais organização na exportação da sua pesquisa!
Agora você pode selecionar os campos que deseja exportar a partir da seguinte classificação:

Informações gerais do processo

Informações do formulário

Informações do formulário em grid

 Confira a documentação em v.6.0 - Resultados da Pesquisa 

EXPORTAÇÃO DE PESQUISA DE DOCUMENTOS 
Para ampliar e dinamizar as possibilidades de análise e disponibilização dos documentos resultantes das pesquisas realizadas no Módulo Documentos, desenvolvemos a funcionalidade de exportação para o Excel. Nessa exportação você terá como resultado um relatório com informações no qual será possível visualizar o documento ou realizar download, sem a necessidade de retornar para a Plataforma. 

 Confira a documentação em v.6.0 - Pesquisar 

VALIDAÇÃO DE ERROS NO DIAGRAMA 
Há diagramas que envolvem múltiplas regras e interações, o que pode tornar um desafio desenhá-lo, sem nenhum tipo de inconsistência. Por isso, ouvindo nossos consultores, implementamos uma funcionalidade que, com apenas um clique, é possível visualizar e analisar possíveis falhas no desenho do diagrama. Essa melhoria torna o processo de automação ainda mais ágil e produtivo!

 Confira a documentação em v.6.0 - Validação 

MÓDULO ANALYTICS
Mais praticidade no acesso ao módulo Analytics!
Realizamos a integração do acesso ao módulo Analytics, não há mais necessidade de realizar um novo login, basta clicar no menu da Plataforma e acessá-lo.

 Confira a documentação em v.6.0 - Analytics 

RPA: UM MÓDULO COMPLETO PARA AUTOMATIZAR TAREFAS
Nosso módulo de RPA permite a construção de fluxos robotizados de tarefas de uma forma simples e fácil sem precisar contratar equipes de programadores.
Com ele você pode automatizar tarefas manuais e repetitivas feitas por humanos, como emissão de notas fiscais, leitura e manipulação de planilhas, criação de pedidos de compra, cadastro de leads em ferramentas de CRM, entre outras.

 Confira a documentação em v.6.0 - Roberty 

DOWNLOAD MÚLTIPLO DE ARQUIVOS
Agora é possível baixar vários documentos de forma simples e rápida. E mais: essa nova funcionalidade também facilita a busca de documentos dentro de uma atividade de processo!

 Confira a documentação em v.6.0 - Baixar múltiplos arquivos 

Personalização para deixar a plataforma com as cores da sua marca!

Estamos felizes em entregar uma funcionalidade que foi muito solicitada! Agora, é possível personalizar a Plataforma com a identidade visual de cada cliente. Configure as cores do cabeçalho dos módulos, insira o logo do cliente e customize o banner da tela de login. Tudo isso para oferecer mais flexibilidade e identidade à experiência de uso.

 Confira a documentação em v.6.0 - Identidade Visual 

ASSINATURA DIGITAL DE DOCUMENTOS
Você sabe o que é um certificado digital?#DEEBFF
 O certificado digital funciona como uma identidade virtual, tanto para pessoas físicas quanto jurídicas, permitindo a assinatura de documentos de forma autêntica e segura.
```

```
#DEEBFF
E isso é só o começo! O Núcleo de IA da Lecom evoluirá com novas funcionalidades nas próximas versões.
```


---

## Prazos da atividade

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2608038308/Prazos+da+atividade

```
Documentação Técnica - Alterar Prazo
Documentação Técnica - Calcular Tempo
```


---

## v.6.0 - Alterações no código-fonte

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220304384/v.6.0+-+Altera+es+no+c+digo-fonte

```
javapackage br.com.lecom.RoboExecutarAtividade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import br.com.lecom.atos.servicos.annotation.Execution;
import br.com.lecom.atos.servicos.annotation.RobotModule;
import br.com.lecom.atos.servicos.annotation.Version;

@Component
@RobotModule("Roboexecutaratividade")
@Version({1,0,0})

public class Roboexecutaratividade {

 private static final Logger LOGGER = LoggerFactory.getLogger(Roboexecutaratividade.class);

 @Execution
 public void execute() {
 LOGGER.debug("Running robot");
 }

}
```

```
javapackage br.com.lecom.RoboExecutarAtividade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RoboexecutaratividadeApplication implements CommandLineRunner {

 @Autowired
 private Roboexecutaratividade RoboExecutarAtividade;

 public static void main(String[] args) {
 SpringApplication.run(RoboexecutaratividadeApplication.class, "--spring.profiles.active=test");
 }

 @Override
 public void run(String...args) throws Exception {
 RoboExecutarAtividade.execute();
 }
}
```

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
 <modelVersion>4.0.0</modelVersion>
 <artifactId>RoboExecutarAtividade</artifactId>
 <version>1.0.0</version>
 <parent>
 <groupId>br.com.lecom</groupId>
 <artifactId>robot-parent</artifactId>
 <version>1.0.1-RELEASE</version>
 <relativePath />
 <!-- lookup parent from repository -->
 </parent>
 <repositories>
 <repository>
 <id>lecom-nexus-snapshots</id>
 <name>Lecom Snapshots</name>
 <url>https://repo-store.lecom.com.br/repository/lecom-snapshots</url>
 <releases>
 <enabled>false</enabled>
 </releases>
 <snapshots>
 <enabled>true</enabled>
 </snapshots>
 </repository>
 <repository>
 <id>lecom-nexus-releases</id>
 <name>Lecom Releases</name>
 <url>https://repo-store.lecom.com.br/repository/lecom-releases</url>
 <releases>
 <enabled>true</enabled>
 </releases>
 <snapshots>
 <enabled>false</enabled>
 </snapshots>
 </repository>
 </repositories>
</project>
```

```
Aplicação externa
O projeto é criado com a estrutura básica de uma aplicação Spring Boot, que utiliza o maven como gerenciador de dependências.
Diferente dos robôs e integrações Java, o projeto de aplicações vem com:
Uma classe com o nome dado ao projeto + a palavra “Application”, que é a classe que executa a aplicação como uma aplicação Spring. No caso de exemploAppexternasimplesApplication fica da seguinte forma:
```

```
Um pacote de Controller, já contendo o HealthRestController, que é um controller com uma rota simples, que pode ser utilizado para verificar se a aplicação está no ar:
```

```
Também é criado o arquivo pom.xml para gerenciamento de dependências através do maven, contendo a dependência da tag parent, que para aplicações é external-application-parent.
IMPORTANTE:  Conforme descrito no Manual do usuário, as aplicações que forem publicadas via DevOps, terão sua URL base definidas a partir da URL do ambiente. Exemplo: https://cliente.com.br/app-ext/minhaaplicacao .
```

```
javapackage br.com.lecom.AppExternaSimples.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Pacotes que vieram da dependência adicionada ao pom.xml
import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;

@RestController
@RequestMapping("api/v1/cpf")
public class CpfValidatorRestController {

 @PostMapping
 public Map < String, Object > validate(String cpf) {
 try {
 CPFValidator cpfValidator = new CPFValidator(); //Classe da dependência em uso
 cpfValidator.assertValid(cpf);
 return Map.of("status", "VÁLIDO");
 } catch (InvalidStateException e) {
 return Map.of("status", "INVÁLIDO");
 }
 }
}
```

```
Publicando alterações
Para consolidar as alterações feitas, é necessário fazer o commit no repositório.
Através do comando “git status” é possível visualizar os arquivos que foram alterados.
Adicionar os arquivos modificados ao staging do git através do comando “git add [nome do arquivo]” ou “git add .” para adicionar todos os arquivos.
Em seguida, utilize o comando “git commit -m “[mensagem de commit]” para consolidar o commit.
E para finalizar utilizar o comando “git push” para enviar as alterações ao repositório remoto.
Feito isso, as alterações já poderão ser publicadas no Studio, acessando o cadastro do robô e clicando no botão “Publicar”, conforme descrito no manual do usuário.
O processo é o mesmo para robôs, integrações Java e aplicações.
IMPORTANTE:  Observar a branch em que a alteração foi consolidada, pois conforme descrito anteriormente, a publicação será feita na branch correspondente ao tipo de ambiente:

Ambiente de aceite: branch test;

Ambiente de qualidade (QA): branch develop;

Ambiente de produção: branch master.
```


---

## v.6.0 - Clonando Projeto no Git

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220304200/v.6.0+-+Clonando+Projeto+no+Git

```
bashgit clone [endereço copiado]
```

```
bash$ git clone https://repo.lecom.com.br/clientes/devops-bpm/robos/RoboExecutarAtividade.git
Cloning into 'RoboExecutarAtividade'...
remote: Enumerating objects: 71, done.
remote: Counting objects: 100% (44/44), done.
remote: Compressing objects: 100% (26/26), done.
remote: Total 71 (delta 8), reused 44 (delta 8), pack-reused 27R
Receiving objects: 100% (71/71), 51.60 KiB | 1.36 MiB/s, done.
Resolving deltas: 100 % (8/8), done.
```


---

## v.6.0 - Criação inteligente de fluxos de trabalho

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2320171010/v.6.0+-+Cria+o+inteligente+de+fluxos+de+trabalho

```
#F4F5F7
“Descreva em poucas palavras qual o tipo de processo que você precisa”
```

```
E ainda nos lembra que ser objetivo no diálogo é fundamental para o sucesso da criação de processo:  

Para sair da tela de ajuda, clique no ícone Voltar:  

c. Minimizar: esta opção está representada pelo “X” e deixará na tela somente o ícone, afinal você pode reestabelecer   a conversa a qualquer momento, basta clicar no ícone novamente:  

Note que ao lado dos botões, há também a informação de BETA, isso representa que a IA está em evolução. 

Outro item importante que você pode visualizar é o Termo de uso e privacidade . Para acessá-lo, clique no link abaixo da caixa de digitação.
Ao clicar no link, você será direcionado (a) para uma nova página onde poderá visualizar o termo. 
Termos de uso - IA
 
Vamos conversar com a IA!  

Para iniciar uma conversa, clique na caixa de diálogo, digite a solicitação do processo e clique em Gerar novo Diagrama. 

No exemplo abaixo foi solicitado um processo de solicitação de férias: 
Após a IA gerar o diagrama, você pode editá-lo e realizar ajustes, se necessário. 
Verifique todas as funcionalidades disponíveis no Diagrama. v.6.0 - Diagrama 

Caso deseje, você pode apagar o diagrama e iniciar um novo diálogo, basta clicar no botão Apagar diagrama: 

Vale destacar que enquanto você não publicar o diagrama, será possível apagá-lo e solicitar a ajuda da IA para desenhar um novo.  

Importante: Esta funcionalidade está disponível para criação de novos diagramas, portanto, em diagramas já criados e publicados, não será possível utilizar.
```


---

## v.6.0 - Estrutura básica de um robô

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220303687/v.6.0+-+Estrutura+b+sica+de+um+rob

```
<parent>
 <groupId>br.com.lecom</groupId>
 <artifactId>robot-parent</artifactId>
 <version>1.0.1-RELEASE</version>
 <relativePath/>
</parent>
```

```
@Component
@RobotModule("Radarroboenviaemail")
@Version({ 1, 0, 0 })
public class Radarroboenviaemail {

 private static final Logger LOGGER = LoggerFactory.getLogger(Radarroboenviaemail.class);

 @Execution
 public void execute() {
 LOGGER.debug("Running robot");
 }
}
```


---

## v.6.0 - Exemplo configuração Gmail

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2257289217/v.6.0+-+Exemplo+configura+o+Gmail

```
#F4F5F7
 Raiz da url:  https://accounts.google.com/o/oauth2/auth?
```

```
URL de solicitação de token: https://www.googleapis.com/oauth2/v4/token 

Id do cliente: Id do cliente cadastrado nas credenciais no Console de Desenvolvedores do Google Cloud Platform. 

Segredo do cliente: Segredo do cliente cadastrado nas credenciais no Console de Desenvolvedores do Google Cloud Platform. 

Escopo: Não é necessário preencher para configuração de servidor de e-mail Gmail. 
O Gmail não permite redirecionamento para endereços IP fixos e domínios não oficiais. Apenas URLs com domínios oficiais registrados são aceitas para o redirect_uri.
```


---

## v.6.0 - Exemplo configuração Microsoft

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2257551364/v.6.0+-+Exemplo+configura+o+Microsoft

```
#F4F5F7
Raiz da url:   https://login.microsoftonline.com/iddiretorio/oauth2/v2.0/authorize ?
```


---

## v.6.0 - Gerenciamento de saldo IA

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2709585928/v.6.0+-+Gerenciamento+de+saldo+IA

```
Você poderá ainda definir, juntamente com o seu gestor, limites de crédito para o ambiente de desenvolvimento, homologação e produção.#DEEBFF
Caso seus créditos acabem, solicite ao seu gestor uma aquisição.
```


---

## v.6.0 - Inventário BPM

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220305262/v.6.0+-+Invent+rio+BPM

```
#F4F5F7
Atividades Concentradoras
Nas atividades do tipo concentradora, responsáveis por receber e consolidar atividades paralelas, a contagem de ciclos ocorre por atividade paralela concluída. Isso ocorre porque o motor de processo aguarda a chegada de todas as atividades paralelas antes de liberar a atividade concentradora para execução. Cada chegada é tratada como um evento individual, registrada com um novo ciclo e armazenados dados específicos garantindo rastreabilidade do processo de unificação das informações oriundas dos diferentes caminhos do fluxo.
Exemplo: se três atividades paralelas são finalizadas e convergem para uma concentradora, serão contabilizados 3 ciclos nessa atividade.
```


---

## v.6.0 - Login

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220309194/v.6.0+-+Login

```
Neste momento, você receberá um e-mail com o acesso temporário: 

Aguarde o e-mail e não faça uma nova tentativa de redefinir senha, pois será recebida a seguinte mensagem:#DEEBFF
“Você já solicitou a redefinição de senha recentemente. Por favor, aguarde alguns minutos antes de tentar novamente”.
```


---

## v.6.0 - Merge Request

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220304610/v.6.0+-+Merge+Request

```
javapackage br.com.lecom.AppExternaSimples.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.caelum.stella.validation.CNPJValidator;
import br.com.caelum.stella.validation.InvalidStateException;

@RestController
@RequestMapping("api/v1/cnpj")
public class CnpjValidatorController {

 @PostMapping
 public Map < String, Object > validate(String cnpj) {
 try {
 CNPJValidator cnpjValidator = new CNPJValidator();
 cnpjValidator.assertValid(cnpj);
 return Map.of("status", "VÁLIDO");
 } catch (InvalidStateException e) {
 return Map.of("status", "INVÁLIDO");
 }
 }
}
```


---

## v.6.0 - No Módulo Documentos

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2410676237/v.6.0+-+No+M+dulo+Documentos

```
A funcionalidade de resumo de documentos por inteligência artificial encontra-se disponível a partir da versão básica da plataforma.
```


---

## v.6.0 - Recomendação inteligente de fluxos de trabalho

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2319417359/v.6.0+-+Recomenda+o+inteligente+de+fluxos+de+trabalho

```
#F4F5F7
“Descreva em poucas palavras qual o tipo de processo que você precisa”.
```

```
A IA ainda nos lembra que ser objetivo no diálogo é fundamental para o sucesso da sugestão de processo: 

Para sair da tela de ajuda, clique no ícone Voltar: 

c. Minimizar: esta opção está representada pelo “X”, pois ao clicar sobre ela, a janela de conversa ficará oculta, deixando somente o ícone, afinal você pode reestabelecer  a conversa a qualquer momento, basta clicar no ícone novamente: 
Importante: A conversa será mantida enquanto a página do Modelador não for atualizada ou você acessar outra tela (utilizando a mesma guia). 

Conversando com a IA: 
Para iniciar uma conversa, clique na caixa de diálogo e solicite um processo, veja o exemplo abaixo: 
Preciso de ajuda para automatizar meu processo de reembolso de despesa 

Em seguida a IA retornará com a apresentação de um processo para você Visualizar ou Importar: 
E perguntará: “Esta sugestão está de acordo com sua necessidade?” 

Ao clicar em Visualizar uma nova aba será aberta com o diagrama do processo sugerido: 

Visualize o diagrama apresentado e em seguida, retorne a tela do Modelador e clique em Importar: 

Caso não seja identificada necessidade de preenchimento de informações ou alguma inconsistência na importação, a mesma acontecerá automaticamente e você terá um retorno na janela de conversa: 

Por outro lado, se houver alguma necessidade, será apresentado um pop-up para que você complemente/ ajuste informações e em seguida, clique em Importar: 
:warning:atlassian-warning#FFFAE6
Importante: Todo processo importado através da IA irá gerar um novo UUID para evitar sobrescrever processos já existentes no ambiente.
```


---

## v.6.0 - Resultados da Pesquisa

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2389147649/v.6.0+-+Resultados+da+Pesquisa

```
Vamos conhecer cada item abaixo:
I) Extensão do arquivo: As extensões disponíveis para exportação são: XLSX, CVS, XML e PDF. 
Clique no ícone desejado para iniciar a exportação:
Para cada extensão você terá informações e funcionalidades específicas para orientar a exportação:

Extensão XLSX
Para realizar a exportação na extensão XLSX, clique no ícone indicado:

 Observe as informações sobre a exportação dessa extensão:#DEEBFF
A geração da planilha para download imediato pode levar alguns minutos. 
Se o texto no campo exceder 32.767 caracteres, o valor excedido será substituído por [...].
```

```
Apesar desta condicional, você poderá receber a exportação por e-mail ativando a opção abaixo: 

Extensão CVS
Para realizar a exportação na extensão CVS, clique no ícone indicado:

Observe as informações sobre a exportação dessa extensão:#DEEBFF
A geração do CVS para download imediato pode levar alguns minutos.
Se o texto no campo exceder 32.767 caracteres, o valor excedido será substituído por [...].
No formato selecionado os dados de grid não serão exportados.
```

```
Na extensão XML você pode inserir observações e em seguida selecionar os campos que deseja que apareça na exportação.

Caso haja muitos campos para selecionar, você pode digitar o nome do campo para em seguida selecioná-lo:

Após escolher os campos, clique em Gerar:

Extensão PDF
Para realizar a exportação na extensão PDF, clique no ícone indicado:

Observe as informações sobre a exportação dessa extensão:#DEEBFF
A geração do pdf para download imediato pode levar alguns minutos.
Campos com mais de 10.000 caracteres serão truncados.
```


---

## v.6.0 - Robô para abertura de processos

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2432303160/v.6.0+-+Rob+para+abertura+de+processos

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("NAME", "VALOR")
 .build();
```

```
ResponseOpenApi<RetornoProcessoAberto> response = RotasOpenApi
 .processo()
 .abrirInstancia()
 .setCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .setVersao(Integer.valueOf(config.getVersaoProcesso()))
 .setFormulario(formulario)
 .executar(TipoAcao.APROVAR);
```


---

## v.6.0 - Robô para alterar SLA

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2432401481/v.6.0+-+Rob+para+alterar+SLA

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
STATUS_ATIVIDADE=<STATUS DA ATIVIDADE PARA CONSULTA
ALERTA_HORAS=<HORAS PARA CONFIGURACAO DE ALERTA>
ALERTA_MINUTOS=<MINUTOS PARA CONFIGURACAO DE ALERTA>
ALERTA_SEGUNDOS=<SEGUNDOS PARA CONFIGURACAO DE ALERTA>
LIMITE_HORAS=<HORAS PARA CONFIGURACAO DE LIMITE>
LIMITE_MINUTOS=<MINUTOS PARA CONFIGURACAO DE LIMITE>
LIMITE_SEGUNDOS=<SEGUNDOS PARA CONFIGURACAO DE LIMITE>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .porStatus(config.getStatusAtividade())
 .executar();
```

```
for(ProcessosPendentesUser processo : processosPendentes.getContent()){

 ResponseOpenApi<RetornoAlteraSla> response = RotasOpenApi
 .processo()
 .alteraSla()
 .setAlerta(Integer.valueOf(config.getAlertaHoras()),Integer.valueOf(config.getAlertaMinutos()),Integer.valueOf(config.getAlertaSegundos()))
 .setLimite(Integer.valueOf(config.getLimiteHoras()),Integer.valueOf(config.getLimiteMinutos()),Integer.valueOf(config.getLimiteSegundos()))
 .setCodigoInstancia(processo.getProcessInstanceId())
 .setCodigoAtividade(processo.getActivityInstanceId())
 .setCodigoCiclo(processo.getCycle())
 .executar();

 if (response.getStatus() != 200) {
 LOGGER.error("Erro executar UPPER_CAMEL. Erros: {}", response.getErros());
 return;
 }

 LOGGER.info("SLA atualizado com sucesso. ID da instância: {}", processo.getProcessInstanceId());

}
```


---

## v.6.0 - Robô para aprovação automática

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2431975532/v.6.0+-+Rob+para+aprova+o+autom+tica

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .executar();
```

```
for(ProcessosPendentesUser processo : processosPendentes.getContent()){

 FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("NAME", "VALOR")
 .build();

 ResponseOpenApi<RetornoProcessoExecutado> response = RotasOpenApi
 .processo()
 .executarInstancia()
 .setCodigoInstancia(processo.getProcessInstanceId())
 .setCodAtividade(processo.getActivityInstanceId())
 .setCodCiclo(processo.getCycle())
 .setFormulario(formulario)
 .setTipoAcao(TipoAcao.APROVAR)
 .executar();

 if (response.getStatus() != 200) {
 LOGGER.error("Erro executar UPPER_CAMEL. Erros: {}", response.getErros());
 return;
 }

 LOGGER.info("Processo aprovado com sucesso. ID da instância: {}", response.getContent().getProcessInstanceId());

}
```


---

## v.6.0 - Robô para cancelamento

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2432335950/v.6.0+-+Rob+para+cancelamento

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
ATIVIDADES_PERIODO_INICIO=<DATA DE INÍCIO DO PERÍODO PARA CONSULTA>
ATIVIDADES_PERIODO_FIM=<DATA DE TÉRMINO DO PERÍODO PARA CONSULTA>
CAUSA=<MOTIVO DO CANCELAMENTO>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .porDataInicioAtividade(config.getAtividadePeriodoInicio(), config.getAtividadePeriodoFim())
 .executar();
```

```
for(ProcessosPendentesUser processo : processosPendentes.getContent()){
 ResponseOpenApi<Object> response = RotasOpenApi
 .processo()
 .cancelarProcesso()
 .setCodigoInstancia(processo.getProcessInstanceId())
 .setMotivoCancelamento(config.getCausa())
 .executar();

 if (response.getStatus() != 204) {
 LOGGER.error("Erro executar UPPER_CAMEL. Erros: {}", response.getErros());
 return;
 }

 LOGGER.info("Processo cancelado com sucesso. ID da instância: {}", processo.getProcessInstanceId());

}
```


---

## v.6.0 - Robô para conexão com banco de dados

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220303738/v.6.0+-+Rob+para+conex+o+com+banco+de+dados

```
@Component
@RobotModule("Radarroboenviaemail")
@Version({ 1, 0, 0 })
public class Radarroboconexaobanco {

 private static final Logger LOGGER = LoggerFactory.getLogger(Radarroboconexaobanco.class);
 private static final String DB_NAME = "dbTesteRadar";

 @Execution
 public void execute() {
 try (Connection connection = DBUtils.getConnection(DB_NAME);) {
 
 } catch (SQLException e) {
 LOGGER.error("Erro ao realizar conexão com o banco de dados", e);
 }
 }
```

```
@Component
@RobotModule("Radarroboenviaemail")
@Version({ 1, 0, 0 })
public class Radarroboconexaobanco {

 private static final Logger LOGGER = LoggerFactory.getLogger(Radarroboconexaobanco.class);
 private static final String DB_NAME = "dbTesteRadar";
 private static final String SQL_SELECT_QUERY = "select usuario from tabela";

 @Execution
 public void execute() {
 try (Connection connection = DBUtils.getConnection(DB_NAME);
 PreparedStatement preparedStatement = connection.prepareStatement(SQL_SELECT_QUERY);
 ResultSet resultSet = preparedStatement.executeQuery();) {
 while (resultSet.next()) {
 LOGGER.info("Select encontrou o usuário: {}", resultSet.getString("usuario"));
 }
 } catch (SQLException e) {
 LOGGER.error("Erro ao realizar conexão com o banco de dados", e);
 }
 }

}
```


---

## v.6.0 - Robô para edição de metadados

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2431877179/v.6.0+-+Rob+para+edi+o+de+metadados

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
CAMPO_DOCUMENTO=<NOME DO CAMPO TIPO DOCUMENTO>
CODIGO_TEMPLATE=<CODIGO DO TEMPLATE UTILIZADO NO CAMPO DOCUMENTO>
CAMPO_METADADO=<NOME DO CAMPO METADADO A SER ALTERADO>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .executar();
```

```
for(ProcessosPendentesUser processo : processosPendentes.getContent()){

 // Recupera dados do campo e documento para atualização
 InfoCampoTemplate campoTemplate = recuperaDadosDocumento(processo, config.getCampoDocumento());

 if (campoTemplate == null) {
 return;
 }

 ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response = RotasOpenApi
 .documento()
 .substituirDocumento()
 .setTipoSubstituicao(TipoSubstituicaoDocumento.REVISAO)
 .setDocumentId(Integer.valueOf(campoTemplate.getDocumentId()))
 .setIdTemplate(Integer.valueOf(config.getCodigoTemplate()))
 .addMetadados(config.getCampoMetadado(),"Valor a ser inserido no campo metadado")
 .executar();

 if (response.getStatus() < 200 || response.getStatus() >= 300) {
 LOGGER.error("Erro ae executar UPPER_CAMEL. Erros: {}", response.getErros());
 return;
 }

 LOGGER.debug("Metadado do documento atualizado com sucesso. ID da instância: {}", processo.getProcessInstanceId());

}
```


---

## v.6.0 - Robô para encaminhar processo

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2432237625/v.6.0+-+Rob+para+encaminhar+processo

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
STATUS_ATIVIDADE=<STATUS DA ATIVIDADE PARA CONSULTA>
TIPO_ENCAMINHAMENTO=<MODO DE ENCAMINHAMENTO (USER, FUNCTION, GROUP, DEPARTAMENT)>
DESTINO_ENCAMINHAMENTO=<DESTINO DO PROCESSO ENCAMINHADO (LOGIN USUARIO, IDENTIFICADOR PARA DEMAIS CASOS)>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .porStatus(config.getStatusAtividade())
 .executar();
```

```
for(ProcessosPendentesUser processo : processosPendentes.getContent()){

 ResponseOpenApi<Object> response = RotasOpenApi
 .processo()
 .encaminharProcesso()
 .setProcesso(processo.getProcessInstanceId(), processo.getActivityInstanceId(), processo.getCycle())
 .setTipoEncaminhamento(config.getTipoEncaminhamento())
 .addTarget(config.getDestinoEncaminhamento())
 .executar();

 if (response.getStatus() != 204) {
 LOGGER.error("Erro executar UPPER_CAMEL. Erros: {}", response.getErros());
 return;
 }

 LOGGER.info("Processo encaminhado com sucesso. ID da instância: {}", processo.getProcessInstanceId());

}
```


---

## v.6.0 - Robô para envio de e-mail

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2220303719/v.6.0+-+Rob+para+envio+de+e-mail

```
javaprivate static final WFMail WFMAIL = new WFMail();
```

```
javaprivate static final String SUBJECT = "Demonstração - Envio de e-mail";
private static final String MESSAGE = "Esta é uma demonstração de envio de e-mail para o projeto Radar.";
private static final String FROM = "vinicius.henrique@lecom.com.br";
private static final String TO = "vinicius.henrique@lecom.com.br";
private static final boolean IS_EMAIL_HTML = true;
```

```
javaEmailMessage emailMessage = new EmailMessage(SUBJECT, MESSAGE, FROM, TO, IS_EMAIL_HTML);
```

```
javaWFMAIL.enviaEmailMessage(emailMessage);
```

```
javatry {
 EmailMessage emailMessage = new EmailMessage(SUBJECT, MESSAGE, FROM, TO, IS_EMAIL_HTML);
 WFMAIL.enviaEmailMessage(emailMessage);
} catch (EmailMessageException e) {
 LOGGER.error("Erro ao enviar o e-mail", e);
}
```


---

## v.6.0 - Robô para envio de email

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2432204863/v.6.0+-+Rob+para+envio+de+email

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
ASSUNTO=<ASSUNTO PARA PREENCHIMENTO NO EMAIL>
DESTINATARIO=<EMAIL DE DESTINO>
ORIGEM=<EMAIL DE ORIGEM>
EMAIL_HTML=<DEFINE SE EMAIL SERA FORMATADO EM HTML (true/false). TRUE PARA EXEMPLO DESTE TEMPLATE>
MENSAGEM_PADRAO=<MENSAGEM A SER ADICIONADO AO INICIO DO EMAIL POR PADRAO>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
// Busca processos pendentes para envio de email
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .executar();
```

```
private ResponseOpenApi<RetornoDadosInstancia> recuperaDadosProcesso(Integer codigoInstanciaProcesso){
 return RotasOpenApi
 .processo()
 .retornaDadosAtividadesInstancia()
 .setCodigoInstancia(codigoInstanciaProcesso)
 .executar();
}
```

```
private ResponseOpenApi<RetornoProcessoAtividade> recuperaDadosAtividade(ProcessosPendentesUser processo){
 return RotasOpenApi
 .processo()
 .buscarDadosAtividade()
 .setCodigoInstancia(processo.getProcessInstanceId())
 .setCodigoAtividade(processo.getActivityInstanceId())
 .setCodigoCiclo(processo.getCycle())
 .executar();
}
```

```
public String criaConteudoEmail(String titulo, ProcessosPendentesUser processo, ResponseOpenApi<RetornoProcessoAtividade> dadosAtividade, String mensagemPadrao) throws IOException {
 InputStream inputStream = getClass().getClassLoader().getResourceAsStream("email_template.html");
 if (inputStream == null) {
 throw new IOException("Template de e-mail não encontrado.");
 }

 String templateEmail = new BufferedReader(new InputStreamReader(inputStream)).lines().collect(Collectors.joining("\n"));

 String atividadeDetalhes = dadosAtividade.getContent().getContent().stream()
 .map(campoAtividade -> String.format("<p><strong>%s</strong>: %s</p>", campoAtividade.getField(), campoAtividade.getValue()))
 .reduce("", String::concat);

 return templateEmail
 .replace("{{titulo}}", titulo)
 .replace("{{mensagemPadrao}}", mensagemPadrao)
 .replace("{{instancia}}", String.valueOf(processo.getProcessInstanceId()))
 .replace("{{atividadeDetalhes}}", atividadeDetalhes);
}
```

```
public void enviaEmail(TemplateConfig config, String mensagem){
 try {
 EmailMessage emailMessage = new EmailMessage(
 config.getAssunto(),
 mensagem,
 config.getOrigem(),
 config.getDestinatario(),
 config.getEmailHtml()
 );
 WFMAIL.enviaEmailMessage(emailMessage);
 } catch (EmailMessageException e) {
 LOGGER.error("Erro ao enviar o e-mail", e);
 }
 }
```


---

## v.6.0 - Robô para inclusão de documento

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2432041014/v.6.0+-+Rob+para+inclus+o+de+documento

```
DOMAIN=<DOMINIO DA PLATAFORMA>
API_KEY=<CHAVE OPEN API DO USUAIRO>
CODIGO_PROCESSO=<CODIGO DO PROCESSO>
VERSAO_PROCESSO=<VERSAO DO PROCESSO>
NOME_ATIVIDADE=<NOME DA ATIVIDADE PARA CONSULTA>
CAMPO_DOCUMENTO=<NOME DO CAMPO TIPO DOCUMENTO>
CODIGO_TEMPLATE=<CODIGO DO TEMPLATE UTILIZADO NO CAMPO DOCUMENTO>
```

```
RotasOpenAPIConfig.setDomain(config.getDomain());
RotasOpenAPIConfig.setCredentials(config.getApiKey());
```

```
ResponseOpenApi<List<ProcessosPendentesUser>> processosPendentes = RotasOpenApi
 .processo()
 .buscarProcessosPendentes()
 .porCodigoProcesso(Integer.valueOf(config.getCodigoProcesso()))
 .porVersaoProcesso(Integer.valueOf(config.getVersaoProcesso()))
 .porNomeAtividade(config.getNomeAtividade())
 .executar();
```

```
for(ProcessosPendentesUser processo : processosPendentes.getContent()){
 Path tempFilePath = null;
 try {

 // Cria e preenche arquivo temporario para exemplo
 tempFilePath = Files.createTempFile("temp-documento", ".docx");
 String conteudo = "Texto para exemplo";
 Files.write(tempFilePath, conteudo.getBytes(), StandardOpenOption.WRITE);

 ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response = RotasOpenApi
 .processo()
 .incluirDocumento()
 .setAcao(TipoAcaoDocumento.IMPORTAR)
 .setCodigoInstancia(processo.getProcessInstanceId())
 .setCodigoAtividade(processo.getActivityInstanceId())
 .setCodigoCiclo(processo.getCycle())
 .setNomeCampo(config.getCampoDocumento())
 .setIdTemplate(Integer.valueOf(config.getCodigoTemplate()))
 .setFile(tempFilePath.toFile())
 .executar(true);

 if (response.getStatus() < 200 || response.getStatus() >= 300) {
 LOGGER.error("Erro executar UPPER_CAMEL. Erros: {}", response.getErros());
 return;
 }

 LOGGER.debug("Documento incluido com sucesso. ID da instância: {}", processo.getProcessInstanceId());

 } catch (IOException e) {
 LOGGER.error("Erro ao criar ou manipular arquivo temporário", e);
 } finally {
 if (tempFilePath != null) {
 try {
 Files.deleteIfExists(tempFilePath);
 } catch (IOException e) {
 LOGGER.error("Falha ao deletar arquivo temporário", e);
 }
 }
 }
}
```


---

## v.6.0 - Uso da funcionalidade

https://lecomsa.atlassian.net/wiki/spaces/PLV6/pages/2410250247/v.6.0+-+Uso+da+funcionalidade

```
Para copiar o resumo apresentado, basta clicar no ícone indicado: 
#DEEBFF
Também é possível utilizar a funcionalidade ao abrir um novo processo que contenha um campo template habilitado com resumo de documentos. 
Para isso, basta inserir um arquivo no campo template e em seguida, visualizar a funcionalidade de resumo.
```

```
A IA ainda nos lembra que apenas o documento selecionado será resumido! 

b. Expandir: Permite aumentar o tamanho da janela de conversa: 

c. Fechar: Clicando no “X”a conversa será encerrada. 

A funcionalidade de resumo de documentos por inteligência artificial encontra-se disponível a partir da versão básica da plataforma.
```
