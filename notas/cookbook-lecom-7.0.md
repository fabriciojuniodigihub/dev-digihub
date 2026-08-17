# Cookbook de código - Plataforma Lecom 7.0

Gerado das 341 páginas do espaço `VPL` do Confluence da Lecom.
Só o que tem código: cada seção traz o título da página, o link e os blocos.


---

## Framework: rotas-open-api

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991699618/Framework+rotas-open-api

```
<dependency>
 <groupId>br.com.lecom.open.api</groupId>
 <artifactId>rotasOpenApi</artifactId>
 <version>7.0.0v1</version>
</dependency>
```

```
wide760ApiConfig config = ApiConfig.builder()
 .domain("empresa.lecom.com.br")
 .credentials("sua-api-key")
 .build();

RotasOpenApi api = new RotasOpenApi(config);
```

```
// Buscar usuários
List<Usuario> usuarios = api.usuario().buscar().porNome("Maria").executarTodos();

// Abrir processo
ResponseOpenApi<RetornoProcessoAberto> resp = api.processo().abrirInstancia()
 .setCodigoProcesso(42).executar();

// Tratar o retorno
if (resp.getStatus() == 200) {
 System.out.println(resp.getContent().getProcessInstanceId());
}
```


---

## Novidades da versão 7.0 | Plataforma Lecom

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991259692/Novidades+da+vers+o+7.0+Plataforma+Lecom

```
Com a nova arquitetura, a comunicação entre a plataforma e as aplicações dos clientes é feita por meios mais seguros e compatíveis, eliminando o uso da Porta 22 e garantindo mais estabilidade e conformidade.
Essa atualização reforça o compromisso da Lecom com a segurança e a confiabilidade da infraestrutura, reduzindo atritos e fortalecendo a integração entre ambientes.

Evolução de Stack Tecnológica - Atualização do Node.js e Adoção do Vite
Front-end mais moderno, seguro e preparado para o futuro
A versão 7.0 marca uma importante atualização na base tecnológica da Plataforma, com melhorias que fortalecem a performance e a estabilidade dos sistemas front-end.
Principais avanços:

Atualização do Node.js (v12 → v22): ganhos em segurança, desempenho e estabilidade, preparando o ecossistema para futuras evoluções;

Adoção do Vite como ferramenta de build: tecnologia moderna que acelera a experiência de desenvolvimento e otimiza o ambiente de produção;

Hot Module Replacement (HMR) instantâneo: alterações de código refletidas em milissegundos;

Build otimizado: bundles menores e mais eficientes;

Inicialização até 10x mais rápida no servidor de desenvolvimento.

Essa modernização garante uma plataforma mais robusta, ágil e alinhada às melhores práticas do mercado, fortalecendo a base para novas entregas e inovações.

Estabilidade - Tratamento de Time-out para Envio de E-mails
Envios mais estáveis e controle automático de tentativas
A versão 7.0 traz uma melhoria que reforça a estabilidade e o controle das comunicações da Plataforma.
Com o novo gerenciamento de time-out no envio de e-mails, o sistema passa a encerrar automaticamente as tentativas de envio quando o servidor demora a responder.
Essa atualização evita que sessões fiquem presas na memória e reduz o consumo de recursos do servidor, mantendo o ambiente estável e performático.
Além disso, a geração de logs de erro detalhados permite identificar e corrigir eventuais falhas com mais agilidade.
Essa evolução garante maior confiabilidade e eficiência na gestão dos envios de e-mails dentro da plataforma.

Essas entregas refletem o nosso compromisso em oferecer uma experiência cada vez mais fluida, segura e inteligente para quem confia na Lecom.
Seguiremos evoluindo lado a lado com nossos clientes, sempre com o mesmo propósito: simplificar processos, potencializar resultados e transformar a forma como as empresas trabalham.

Correções Implementadas

ADMIN

Corrigimos a persistência da opção “Enviar e-mail de cobrança” na tela de configuração de e-mail, pois o valor selecionado não era salvo no banco de dados ao gravar as configurações. Agora a opção é armazenada corretamente, garantindo a configuração esperada (PLT-7765). 

Adicionamos um valor padrão às colunas de permissão de gestão da tabela usuário, assim evitando quebras com robôs e integrações legado (PLT-7892). 

Corrigimos o nome do departamento padrão para refletir as alterações realizadas no nome do mesmo, pois o sistema não atualizava no cadastro de usuários após a renomeação. Garantimos que todos os usuários, inclusive os que utilizam a borracha, tenham o departamento padrão atualizado automaticamente com o novo nome (PLT-7034). 

Corrigimos as mensagens de erro para dados inconsistentes no processo de importação de usuários por planilha do Excel, pois o sistema exibia mensagens sem contexto e agora as mensagens descrevem corretamente as restrições e orientam o que pode ou não ser inserido em cada campo (PLT-7513). 

Implementamos uma melhoria no sistema de tratamento de erros internos durante a geração de chaves do Open API, pois ocorria exceção não tratada nesse processo. Agora adicionamos mensagem de erro em todos os idiomas suportados (pt_BR, en_US, es_ES), garantindo retorno adequado ao usuário em caso de falha interna (PLT-5788). 

Adicionamos uma validação para que não seja possível adicionar mais de um mesmo grupo ou função para o usuário (PLT-7625). 

ESTATÍSTICAS

Adicionamos auditoria de logs nas alterações referente a jornada de trabalho (criação, atualização, remoção de feriado e dias não trabalhados). Agora essas alterações são registradas e podem ser pesquisadas (PLT-7146).  

Corrigimos a descrição do módulo Studio em Análises e Documentos, substituindo o termo "modelo" por "processo" para manter consistência com o glossário padrão do sistema (PLT-6718). 

Ajustamos o processo de building da funcionalidade de Identidade visual, pois estava apresentando incompatibilidade durante as alterações (PLT-8001). 
 
DOCUMENTOS

Realizamos uma correção no módulo ECM para garantir compatibilidade com versões anteriores à 5.30_v1.27.1, pois as migrações geravam falhas durante o processo. Agora a migração é executada corretamente, sem apresentar erros (PLT-7750). 

Corrigimos a legenda "Listar XLS" para "Listar XLSX" na pesquisa de documentos, refletindo corretamente o formato do arquivo gerado para download. Esta mudança garante maior clareza sobre o tipo de arquivo que será baixado (PLT-6514). 

Realizamos a correção do salvamento de metadados do tipo inteiro, pois o valor inserido não era armazenado corretamente. Agora, o campo inteiro é persistido de forma adequada (PLT-8374). 

Ajustamos o fluxo de pesquisa de documentos para remover corretamente os separadores de milhar do número de processo, pois a limpeza desse campo deixou de ocorrer após a migração para a API 6.0. Agora, o sistema interpreta o número informado com ou sem separador e retorna os documentos correspondentes sem erro de execução (PLT-8817). 

Corrigimos a busca de documentos por número de processos adicionando delimitadores na pesquisa, pois estava retornando registros de processos semelhantes. Agora, a plataforma exibe apenas documentos do processo informado (PLT-8789). 

Reimplementamos a lógica de filtros por perfil de usuário na pesquisa de documentos, pois estava gerando inconsistência durante as alterações da versão 6.0_v1.00. Agora, os resultados de busca respeitam as permissões e restrições definidas nos templates de cada usuário (PLT-8578). 

Otimizamos a pesquisa de documentos e aprimorando a forma como os metadados são recuperados, pois antes era feita uma consulta individual para cada item retornado. Agora, a busca realiza uma única consulta por página. Também removemos o registro de auditoria “visualizou documento com id...”, reduzindo a lentidão na pesquisa de documentos no ECM, pois anteriormente era criado um registro sobre essa ação para cada item retornado na pesquisa (PLT-7551). 

Ajustamos a forma como a versão é identificada, evitando conflitos entre o formato recebido da consulta e o utilizado internamente pelo sistema. Isso garante que as versões sejam comparadas corretamente e elimina inconsistências que poderiam ocorrer durante a validação (PLT-7532). 

Corrigimos a pesquisa de documentos com usuário que possui acesso concedido no template por meio de grupo de produto, pois o erro impedia o retorno de dados quando a permissão de leitura era concedida via grupo. Agora, a pesquisa retorna corretamente conforme as permissões (PLT-8878). 
 
FORMULÁRIO

Removemos a funcionalidade antiga de envio de e-mail no desenvolvimento de Integrações que expunha senhas e informações de autenticação desnecessariamente. O envio de e-mail continua funcionando normalmente com mais segurança, sem impacto nas integrações utilizadas atualmente (PLT-7919). 

Ajustamos o campo Template para exibir corretamente a versão do documento, pois o form-app não recuperava os metadados correspondentes à versão vinculada à atividade. Agora, a recuperação de dados e metadados é feita por rotas específicas que retornam as informações da versão correta, garantindo que o campo apresente exatamente a versão do arquivo associada à atividade (PLT-8441). 

LOGIN

Ajustada a tradução para o inglês do campo "Nosso XML de metadados" na tela de configuração da autenticação SAML (PLT-7452). 

Implementamos o suporte ao Single Logout (SLO) no processo de logout da plataforma Lecom para usuários autenticados via SAML. Agora, ao realizar logout na plataforma, o usuário será deslogado automaticamente no SAML, garantindo que a próxima tentativa de login exija uma nova autenticação (PLT-4540). 

Ajustamos a maneira de recuperação das configurações de conexão LDAP no startup da Plataforma, pois após o restart a conexão deixava de funcionar devido ao uso de registros inválidos. Agora, utilizamos sempre a última configuração de conexão (PLT-7137). 

Corrigimos as traduções das telas do módulo Login  para o idioma espanhol, pois não estava apresentando o idioma correto. Agora, as traduções são exibidas corretamente em espanhol conforme o conteúdo (PLT-662). 

INTELIGÊNCIA ARTIFICIAL

Realizamos ajustes no prompt para que o chat respondesse em inglês, corrigindo o comportamento anterior em que as respostas eram geradas em francês. Agora, o sistema retorna corretamente as mensagens no idioma configurado (PLT-8020). 
 
MARKETPLACE

Adicionamos um ponto de acesso para retornar as URLs bloqueadas, pois antes não havia controle sobre os endereços restritos. Agora, as URLs direcionam corretamente para a página de bloqueio, impedindo o acesso à plataforma (PLT-7980). 

Ajustamos a tradução da palavra version para português e espanhol, pois o rótulo de versão da plataforma não estava aplicando a internacionalização. Agora, o label exibe corretamente o termo traduzido conforme o idioma selecionado (PLT-7949). 

Ajustamos a rota para adicionar mais uma camada de segurança para as informações sensíveis. Agora, os dados do usuário são retornados com mais segurança (PLT-7948). 

WORKSPACE 

Corrigimos a legenda do menu de módulos para Plataforma Lecom – Versão 6.0 – RTM 1.00, pois a informação exibida não estava correta (PLT-6748). 

Corrigimos o problema que permitia salvar filtros com nomes contendo apenas espaços em branco. O sistema agora valida e rejeita nomes inválidos, garantindo melhor organização dos filtros salvos (PLT-7410). 

Ajustamos a listagem por status na aba “Abertos por mim“, pois o agrupamento estava exibindo processos hibernados como “Em andamento”. Agora o agrupamento ocorre adequadamente (PLT-7246). 

Corrigimos uma situação nas telas do Workspace onde aparecia o número “0” mesmo quando não existiam informações para mostrar. Agora o sistema exibe os dados corretos e, quando não houver nada disponível, será mostrada uma mensagem informando que não há dados no momento (PLT-7987). 

Corrigimos um problema na janela de filtros das telas: Minhas Atividade, Caixa de Entrada, Em Alerta, Em Atraso, Abertos por Mim e Gerados por Mim. Ao trocar o processo no filtro, os dados exibidos podiam ficar incorretos. Agora, quando você altera o processo na janela de filtros, as informações são atualizadas corretamente e tudo aparece como deveria (PLT-7955). 

Corrigimos a exibição da coluna “Aberto por” nas visualizações do Workspace, quando o processo contém nome extenso e com instâncias em aberto. Antes, a largura da coluna era cortada (PLT-7917). 

Corrigimos um problema que impedia o envio de e-mails de exportação de atividades quando a autenticação de envio de e-mail estava configurada com OAuth (PLT-8177). 

Alteramos o nome incorreto do status na exportação em PDF no idioma inglês, pois havia um erro de digitação na label, onde constava “In porgress” em vez de “In progress”. Agora, o Status da atividade é exibido corretamente como “In progress”, refletindo a correção ortográfica na exportação (PLT-9168). 

Solucionamos o problema ao filtrar por processos com atividades em paralelo, após ordenar por status na área “Geridos por mim”, pois a propriedade type da coluna de status estava incorreta. Agora com o valor ajustado o tipo está corretamente identificado em operações de pesquisa e ordenação (PLT-9227). 

Corrigimos o erro que fazia com que o sistema apresentasse versões diferentes após uma falha na publicação de aplicações em ambientes cluster pois os nós da Plataforma não estavam comunicando corretamente qual era o código de identificação da mudança em caso de falha. Agora se houver uma falha, as ferramentas de atualização informam qual nó foi publicado com sucesso e qual falhou, permitindo que a função de refazer a publicação da aplicação funcione e garantindo que tudo fique na mesma versão (PLT-8606). 

SERVIÇOS
DevOps 

Alteramos o serviço do DevOps responsável pela criação de projetos para garantir a criação de versão quando ainda não existir, pois, ao recriar um projeto com o mesmo identificador em outro ambiente, não gerava a versão. Agora a branch é criada corretamente mesmo quando o projeto já existe, assegurando o funcionamento esperado (PLT-5263). 

Corrigimos erro de escrita ao realizar a ativação múltipla de robôs não publicados, pois havia inconsistências nas mensagens exibidas. Além dos ajustes de internacionalização para os idiomas Inglês e Espanhol (PLT-7504). 

Foi corrigido um problema na rota /bpm/api/v1/templates/{idTemplate}, onde a chamada sem o parâmetro format resultava em erro do tipo NullPointerException, mesmo quando o idTemplate informado era válido. A partir desta correção, o parâmetro format passa a ser opcional, permitindo que a rota seja utilizada normalmente sem sua definição. O comportamento atual assegura que a chamada funcione tanto com quanto sem o parâmetro, mantendo compatibilidade com integrações existentes que já utilizam format=bpm (PLT-7782).

Corrigimos a nomenclatura da configuração padrão do driver e dialeto do banco de dados do Job Runner para o Oracle, pois as variáveis de ambiente apontavam incorretamente para o serviço Behavior. Agora as variáveis estão nomeadas e configuradas corretamente, garantindo o funcionamento adequado no isolamento de robôs (PLT-8509). 

OPENAPI 

Corrigimos o salvamento de campos com valor inicial na aprovação via Open API a partir do serviço “Aprovar ou rejeitar atividades”, pois esses dados não eram mantidos. Agora o comportamento de salvar está adequado (PLT-7358). 

Realizamos ajuste no serviço "Aprovar ou rejeitar atividade" para permitir a abertura de atividades de sub-processos, tanto síncronos quanto assíncronos. Funcionalidade que anteriormente não estava tratada corretamente. Com essa correção, ao executar o serviço, o sistema agora consegue iniciar sub-processos em todos os modos e versões testadas (PLT-7839). 

Realizamos um ajuste no serviço Aprovar ou Rejeitar atividade em todas as versões, corrigindo a nomenclatura do campo de versão do processo. O campo foi padronizado como versionId, melhorando a performance e garantindo mais consistência nas integrações (PLT-6059). 

Corrigimos o serviço “Criar usuários”. Os novos cadastros estavam sendo inseridos sem o registro da data de criação no banco de dados, pois o sistema não preenchia esta informação corretamente. Agora, a plataforma preenche a informação garantindo que todo novo usuário seja criado com a sua respectiva data de criação registrada (PLT-8195).  

Ajustamos o serviço de Substituir documento da grid e na linha da grid. Agora, garantimos que os metadados no campo template mantenham seus valores existentes caso não sejam declarados na requisição (PLT-8401 - PLT-8399). 

Ajustamos o serviço “Substituir documento” que apagava metadados, pois a operação estava gerando uma nova versão do documento e novos metadados. Agora, garantimos que os campos de metadados não declarados na requisição mantenham seus valores que já tinham anteriormente, preservando os dados (PLT-8398). 

Ajustamos o serviço “Alterar prazos (SLA) de uma atividade” para para corrigir o valor de exemplo do campo hours nos objetos alert e limit. Anteriormente, o exemplo indicava incorretamente o valor de 9999 horas. Agora, o exemplo reflete corretamente o limite real de 999 horas, conforme as regras do serviço (PLT-8129). 

Corrigimos o comportamento do serviço de “Substituição de Documentos” ao lidar com informações inválidas na requisição, seja em relação ao documento ou ao template. Antes, a rota tentava realizar o checkout sem validar esses dados, o que gerava locks indevidos. Agora, toda a validação é feita previamente, garantindo erros consistentes e evitando bloqueios desnecessários (PLT-8590 - PLT-8587 – PLT-8565). 

Ajustamos a lógica de criação e versionamento de documentos para evitar duplicação de metadados. Agora, os metadados são criados de forma mais controlada, evitando registros repetidos em ações como assinatura, upload e sobrescrita de documentos (PLT-8172). 

Ajustamos o serviço Listar definições de campos do processo foi ajustado para garantir que usuários com permissões de acesso administrador e sendo modelista possam visualizar todos os processos e as respectivas definições de campos. Antes da correção, esses usuários não conseguiam acessar essas informações ao consumir o serviço, mesmo tendo as permissões adequadas (PLT-7940). 

Ajustamos a descrição do serviço Listar definições de campos para tornar seu funcionamento mais claro. A documentação não deixava evidente o propósito e o comportamento do filtro, o que dificultava o entendimento por parte dos usuários. Agora, com a atualização, a documentação agora descreve de forma precisa como o filtro deve ser utilizado (PLT-7933). 

Corrigimos o problema no serviço de listagem de atividades dos processos abertos pelo usuário, que ocorria ao ordenar os resultados por um campo específico. Agora, a ordenação funciona corretamente, tanto em ordem crescente quanto decrescente (PLT-7932). 

Corrigimos o serviço que lista atividades abertas por outros usuários. A consulta foi ajustada para evitar a duplicação de informações quando há mais de um responsável pela atividade. Além disso, padronizamos a nomenclatura no response, alterando o nome do campo de “openedBy” para “activityResponsible”, refletindo corretamente o responsável pela atividade (PLT-7928). 

Corrigimos no serviço "Consultar atividades pendentes por usuário" que impedia a busca por código de processo e de atividade. Antes, mesmo existindo registros, o sistema retornava resultados vazios. Agora, a busca por códigos funciona corretamente, exibindo as informações esperadas (PLT-7918). 

Corrigimos um problema na plataforma que causava erro colateral durante a execução do serviço "Listar definições de campos do processo". O sistema tentava acessar valores de campos que não eram do tipo template, resultando em falhas (PLT-7811).
```


---

## Prazos da atividade

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991700010/Prazos+da+atividade

```
Documentação Técnica - Alterar Prazo
Documentação Técnica - Calcular Tempo
```


---

## Sugestão de Melhoria

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991706955/Sugest+o+de+Melhoria

```
E você sabe a diferença de um bug para melhoria?#DEEBFF
Bug é quando uma funcionalidade, já existente na nossa Plataforma, apresenta alguma falha.
```


---

## v.7.0 - Alterações no código-fonte

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701317/v.7.0+-+Altera+es+no+c+digo-fonte

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

## v.7.0 - Clonando Projeto no Git

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701172/v.7.0+-+Clonando+Projeto+no+Git

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

## v.7.0 - Configuração - ApiConfig e RotasOpenApi

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991699656/v.7.0+-+Configura+o+-+ApiConfig+e+RotasOpenApi

```
wide760import br.com.lecom.open.api.util.ApiConfig;
import br.com.lecom.open.api.util.RotasOpenApi;

// Configuração obrigatória — domain e credentials são SEMPRE exigidos
ApiConfig config = ApiConfig.builder()
 .domain("empresa.lecom.com.br") // OBRIGATÓRIO
 .credentials("sua-api-key-aqui") // OBRIGATÓRIO
 .build();

RotasOpenApi api = new RotasOpenApi(config);
```

```
wide760ApiConfig config = ApiConfig.builder()
 .domain("empresa.lecom.com.br")
 .credentials("chave-padrao")
 .build();

RotasOpenApi api = new RotasOpenApi(config);

// Override: usa chave-admin apenas nesta operação
// domain não informado → herda "empresa.lecom.com.br"
ApiConfig adminOverride = ApiConfig.builder()
 .credentials("chave-admin")
 .build();

ResponseOpenApi<RetornoDadosUsuario> resp = api.usuario().criar()
 .setNome("Admin")
 .setLogin("admin")
 .setEmail("admin@empresa.com")
 .executar(adminOverride);
```

```
// Tenant A
RotasOpenApi apiTenantA = new RotasOpenApi(
 ApiConfig.builder().domain("clienteA.lecom.com.br").credentials("key-a").build());

// Tenant B
RotasOpenApi apiTenantB = new RotasOpenApi(
 ApiConfig.builder().domain("clienteB.lecom.com.br").credentials("key-b").build());
```

```
@Service
public class LecomApiService {

 private final RotasOpenApi api;

 public LecomApiService(
 @Value("${lecom.domain}") String domain,
 @Value("${lecom.api-key}") String apiKey) {
 ApiConfig config = ApiConfig.builder()
 .domain(domain)
 .credentials(apiKey)
 .build();
 this.api = new RotasOpenApi(config);
 }

 public ResponseOpenApi<RetornoProcessoAberto> abrirProcesso(int codigoProcesso) {
 return api.processo().abrirInstancia()
 .setCodigoProcesso(codigoProcesso)
 .executar();
 }
}
```


---

## v.7.0 - Criação inteligente de fluxos de trabalho

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991686101/v.7.0+-+Cria+o+inteligente+de+fluxos+de+trabalho

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

## v.7.0 - Documento > ECM

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595960325/v.7.0+-+Documento+ECM

```
// Listar todos os templates disponíveis
ResponseOpenApi<List<Template>> templates = api.documento().listarTemplates().executar();

// Obter template por ID
ResponseOpenApi<RetornaInfoTemplate> info = api.documento().buscarTemplate()
 .setCodigoTemplate(10).executar();

// Metadados do template
ResponseOpenApi<RetornaMetadadosTemplate> meta = api.documento().metadadosTemplate()
 .setCodigoTemplate(10).executar();
```

```
// Incluir documento no repositório ECM
ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> inclEcm =
 api.documento().incluirDocumentoEcm()
 .setIdTemplate(10)
 .setFile(new File("doc.pdf"))
 .addMetadados("AUTOR", "João Silva") // opcional
 .executar();

// Download do ECM
ResponseOpenApi<Response> dlEcm = api.documento().downloadDocumentoEcm()
 .setDocumentId(555).executar();

// Substituir no ECM
ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> substEcm =
 api.documento().substituirDocumentoEcm()
 .setDocumentId(555)
 .setIdTemplate(10)
 .setFile(new File("doc-v2.pdf"))
 .executar();

// Excluir do ECM — status 204 = sucesso
ResponseOpenApi<Void> exclEcm = api.documento().excluirDocumentoEcm()
 .setIdTemplate(10)
 .setDocumentId(555)
 .executar();

// Dados do documento ECM
ResponseOpenApi<RetornoInfoDocumento> dadosEcm = api.documento().dadosDocumentoEcm()
 .setIdTemplate(10)
 .setDocumentId(555).executar();

// Metadados do documento ECM
ResponseOpenApi<List<MetadadosDocumento>> metaEcm = api.documento().metadadosDocumentoEcm()
 .setDocumentId(555).executar();

// Versões do documento ECM
ResponseOpenApi<List<InfoVersaoDocumento>> versoes = api.documento().versoesDocumentoEcm()
 .setIdTemplate(10)
 .setDocumentId(555).executar();

// Listar dossiês — filtros opcionais
ResponseOpenApi<List<Dossie>> dossies = api.documento().listarDossies()
 .porNome("Contratos")
 .setPage(0).setSize(20)
 .executar();
```


---

## v.7.0 - Documento > Processo

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595534351/v.7.0+-+Documento+Processo

```
// Informações do template na instância
ResponseOpenApi<RetornoDadosTemplate> dadosTemplate = api.processo().retornaInformacoesTemplate()
 .setProcessInstanceId(1001)
 .setCodigoTemplate(10)
 .executar();
```

```
wide760import br.com.lecom.open.api.constant.TipoAcaoDocumento;

ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO") // alias do campo no formulário
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("contrato.pdf"))
 .executar(true); // true = vincula ao campo automaticamente
// status 200 = sucesso
```

```
wide760ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setAcao(TipoAcaoDocumento.IMPORTAR)
 .setIdTemplate(10)
 .setFile(new File("contrato.pdf"))
 .addMetadados("AUTOR", "João Silva") // metadados opcionais
 .addMetadados("VERSAO", "1.0")
 .executar(true);
```

```
wide760ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumentoGrid()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setIdentificadorGrid("GRID_ANEXOS") // alias do grid
 .setNomeCampo("CAMPO_ANEXO")
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("anexo.pdf"))
 .executar();
```

```
wide760ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumentoEmLinhaGrid()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setIdentificadorGrid("GRID_ANEXOS")
 .setLinhaGrid(0) // índice da linha (0-based)
 .setNomeCampo("CAMPO_ANEXO")
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("anexo.pdf"))
 .executar(true);
```

```
wide760import br.com.lecom.open.api.receive.dto.InfoCampoTemplate;
import br.com.lecom.open.api.receive.dto.ProcessoAtividade;
import br.com.lecom.open.api.receive.dto.RetornoProcessoAtividade;
import java.util.List;
import java.util.stream.Collectors;

// 1. Buscar os dados da atividade para obter o valor do campo de documento
ResponseOpenApi<RetornoProcessoAtividade> retorno = api.processo().buscarDadosAtividade()
 .setCodigoInstancia(1883)
 .setCodigoAtividade(1)
 .setCodigoCiclo(1)
 .executar();

// 2. Filtrar o campo de documento pelo alias
List<ProcessoAtividade> campoAnexo = retorno.getContent().getContent().stream()
 .filter(k -> k.getField().equals("ANX_DADOS_PACIENTE"))
 .collect(Collectors.toList());

// 3. Converter o valor para InfoCampoTemplate — expõe documentId, fileUniqueId e fileName
InfoCampoTemplate infoCampo = new InfoCampoTemplate(campoAnexo.get(0).getValue());

// infoCampo.getDocumentId() → String (ex: "555")
// infoCampo.getFileUniqueId() → String UUID (ex: "abc-123-uuid")
// infoCampo.getFileName() → String (ex: "laudo.pdf")

// 4. Fazer o download passando ambos os identificadores
ResponseOpenApi<Response> fileDownload = api.processo().downloadDocumento()
 .setCodigoInstancia(1883)
 .setCodigoAtividade(1)
 .setCodigoCiclo(1)
 .setNomeCampo("ANX_DADOS_PACIENTE")
 .setDocumentId(Integer.parseInt(infoCampo.getDocumentId())) // String → Integer
 .setFileUniqueId(infoCampo.getFileUniqueId())
 .executar();

// fileDownload.getStatus() == 200 → fileDownload.getContent() é o feign.Response com o stream
```

```
// Download de campo simples
ResponseOpenApi<Response> download = api.processo().downloadDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentId(555)
 .setFileUniqueId("abc-123-uuid")
 .executar();

// Download de campo de grid
ResponseOpenApi<Response> dlGrid = api.processo().downloadDocumentoGrid()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setIdentificadorGrid("GRID_ANEXOS")
 .setNomeCampo("CAMPO_ANEXO")
 .setDocumentId(555)
 .setFileUniqueId("abc-123-uuid")
 .executar();

// Download de linha específica de grid
ResponseOpenApi<Response> dlLinha = api.processo().downloadDocumentoEmLinhaGrid()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setIdentificadorGrid("GRID_ANEXOS")
 .setLinhaGrid(0)
 .setNomeCampo("CAMPO_ANEXO")
 .setDocumentId(555)
 .setFileUniqueId("abc-123-uuid")
 .executar();

// Substituir documento — setDocumentoId (com 'o')
ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> subst =
 api.processo().substituirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentoId(555)
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("contrato-v2.pdf"))
 .executar();

// Excluir documento da instância — status 204 = sucesso
ResponseOpenApi<Void> excluir = api.processo().excluirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentId(555)
 .executar();

// Desvincular documento — mantém no ECM, status 204 = sucesso
ResponseOpenApi<Void> desvincular = api.processo().desvincularDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentId(555)
 .executar();
```


---

## v.7.0 - Domínio > Departamento

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991700651/v.7.0+-+Dom+nio+Departamento

```
wide760import br.com.lecom.open.api.receive.dto.Departamento;

// Com filtro
ResponseOpenApi<List<Departamento>> response = api.departamento().buscar()
 .porNome("TI")
 .porIdentificador("depto-ti")
 .setPage(0)
 .executar();

// Todos os departamentos
List<Departamento> todos = api.departamento().buscar().executarTodos();

// Por ID
import br.com.lecom.open.api.receive.dto.RetornoDadosDepartamento;
ResponseOpenApi<RetornoDadosDepartamento> depto = api.departamento()
 .buscarPorId(10)
 .executar();
```

```
wide760ResponseOpenApi<RetornoDadosDepartamento> response = api.departamento().criar()
 .setNome("Financeiro")
 .setIdentificador("financeiro") // alias único — sem espaços/acentos
 .setIdLider(123) // OBRIGATÓRIO — ID do usuário líder
 .setDescricao("Setor financeiro")
 .executar();
```

```
wide760api.departamento().editar()
 .setCodigo(10)
 .setNome("Financeiro Atualizado")
 .setDescricao("Nova descrição")
 .executar();
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoUsuariosDepartamento;

// Listar usuários do departamento
ResponseOpenApi<List<RetornoUsuariosDepartamento>> usuarios =
 api.departamento().retornarUsuarios()
 .setCodigo(10)
 .executar();

// Incluir usuário no departamento (status 204 = sucesso)
api.departamento().incluirUsuario()
 .setCodigoDepartamento(10)
 .setCodigoUsuario(123)
 .executar();

// Remover usuário do departamento
api.departamento().excluirUsuario()
 .setCodigoDepartamento(10)
 .setCodigoUsuario(123)
 .executar();
```


---

## v.7.0 - Domínio > Documento

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595698183/v.7.0+-+Dom+nio+Documento

```
// Listar todos os templates disponíveis
ResponseOpenApi<List<Template>> templates = api.documento().listarTemplates().executar();

// Obter template por ID
ResponseOpenApi<RetornaInfoTemplate> info = api.documento().buscarTemplate()
 .setCodigoTemplate(10).executar();

// Metadados do template
ResponseOpenApi<RetornaMetadadosTemplate> meta = api.documento().metadadosTemplate()
 .setCodigoTemplate(10).executar();

// Informações do template na instância
ResponseOpenApi<RetornoDadosTemplate> dadosTemplate = api.processo().retornaInformacoesTemplate()
 .setProcessInstanceId(1001)
 .setCodigoTemplate(10)
 .executar();
```

```
wide760import br.com.lecom.open.api.constant.TipoAcaoDocumento;

ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO") // alias do campo no formulário
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("contrato.pdf"))
 .executar(true); // true = vincula ao campo automaticamente
// status 200 = sucesso
```

```
wide760ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setAcao(TipoAcaoDocumento.IMPORTAR)
 .setIdTemplate(10)
 .setFile(new File("contrato.pdf"))
 .addMetadados("AUTOR", "João Silva") // metadados opcionais
 .addMetadados("VERSAO", "1.0")
 .executar(true);
```

```
wide760ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumentoGrid()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setIdentificadorGrid("GRID_ANEXOS") // alias do grid
 .setNomeCampo("CAMPO_ANEXO")
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("anexo.pdf"))
 .executar(true);
```

```
wide760ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> response =
 api.processo().incluirDocumentoEmLinhaGrid()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setIdentificadorGrid("GRID_ANEXOS")
 .setLinhaGrid(0) // índice da linha (0-based)
 .setNomeCampo("CAMPO_ANEXO")
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("anexo.pdf"))
 .executar(true);
```

```
// Download simples
ResponseOpenApi<Response> download = api.processo().downloadDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentId(555)
 .executar();

// Download de grid
ResponseOpenApi<Response> dlGrid = api.processo().downloadDocumentoGrid()
 .setCodigoInstancia(1001)
 .setDocumentId(555).executar();

// Download de linha de grid
ResponseOpenApi<Response> dlLinha = api.processo().downloadDocumentoEmLinhaGrid()
 .setCodigoInstancia(1001)
 .setDocumentId(555).executar();

// Substituir documento
ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> subst =
 api.processo().substituirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentoId(555)
 .setAcao(TipoAcaoDocumento.CRIAR)
 .setIdTemplate(10)
 .setFile(new File("contrato-v2.pdf"))
 .executar();

// Excluir documento da instância — status 204 = sucesso
ResponseOpenApi<Void> excluir = api.processo().excluirDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentId(555)
 .executar();

// Desvincular documento — mantém no ECM, status 204 = sucesso
ResponseOpenApi<Void> desvincular = api.processo().desvincularDocumento()
 .setCodigoInstancia(1001)
 .setCodigoAtividade(5)
 .setCodigoCiclo(1)
 .setNomeCampo("CAMPO_CONTRATO")
 .setDocumentId(555)
 .executar();
```

```
// Incluir documento no repositório ECM
ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> inclEcm =
 api.documento().incluirDocumentoEcm()
 .setIdTemplate(10)
 .setFile(new File("doc.pdf"))
 .addMetadados("AUTOR", "João Silva") // opcional
 .executar();

// Download do ECM
ResponseOpenApi<Response> dlEcm = api.documento().downloadDocumentoEcm()
 .setDocumentId(555).executar();

// Substituir no ECM
ResponseOpenApi<RetornoInclusaoSubstituicaoDocumento> substEcm =
 api.documento().substituirDocumentoEcm()
 .setDocumentId(555)
 .setIdTemplate(10)
 .setFile(new File("doc-v2.pdf"))
 .executar();

// Excluir do ECM — status 204 = sucesso
ResponseOpenApi<Void> exclEcm = api.documento().excluirDocumentoEcm()
 .setIdTemplate(10)
 .setDocumentId(555)
 .executar();

// Dados do documento ECM
ResponseOpenApi<RetornoInfoDocumento> dadosEcm = api.documento().dadosDocumentoEcm()
 .setIdTemplate(10)
 .setDocumentId(555).executar();

// Metadados do documento ECM
ResponseOpenApi<List<MetadadosDocumento>> metaEcm = api.documento().metadadosDocumentoEcm()
 .setDocumentId(555).executar();

// Versões do documento ECM
ResponseOpenApi<List<InfoVersaoDocumento>> versoes = api.documento().versoesDocumentoEcm()
 .setIdTemplate(10)
 .setDocumentId(555).executar();

// Listar dossiês — filtros opcionais
ResponseOpenApi<List<Dossie>> dossies = api.documento().listarDossies()
 .porNome("Contratos")
 .setPage(0).setSize(20)
 .executar();
```


---

## v.7.0 - Domínio > Função

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3596320776/v.7.0+-+Dom+nio+Fun+o

```
wide760import br.com.lecom.open.api.receive.dto.Funcao;

// Com filtro
ResponseOpenApi<List<Funcao>> response = api.funcao().buscar()
 .porNome("Gerente")
 .setPage(0)
 .executar();

// Todas as funções
List<Funcao> todas = api.funcao().buscar().executarTodos();

// Por ID
import br.com.lecom.open.api.receive.dto.RetornoDadosFuncao;
ResponseOpenApi<RetornoDadosFuncao> funcao = api.funcao()
 .buscarPorId(5)
 .executar();
```

```
wide760ResponseOpenApi<RetornoDadosFuncao> response = api.funcao().criar()
 .setNome("Analista Sênior")
 .setIdentificador("analista-sr") // alias único — sem espaços/acentos
 .setDescricao("Analista de nível sênior")
 .executar();
```

```
wide760api.funcao().editar()
 .setCodigo(5)
 .setNome("Analista Pleno")
 .executar();
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoUsuariosFuncao;

// Listar usuários da função
ResponseOpenApi<List<RetornoUsuariosFuncao>> usuarios =
 api.funcao().retornarUsuarios()
 .setCodigo(5)
 .executar();

// Incluir usuário na função (status 204 = sucesso)
api.funcao().incluirUsuario()
 .setCodigoFuncao(5)
 .setCodigoUsuario(123)
 .executar();

// Remover usuário da função
api.funcao().excluirUsuario()
 .setCodigoFuncao(5)
 .setCodigoUsuario(123)
 .executar();
```


---

## v.7.0 - Domínio > Grupo

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595304964/v.7.0+-+Dom+nio+Grupo

```
wide760import br.com.lecom.open.api.receive.dto.Grupo;

// Com filtro
ResponseOpenApi<List<Grupo>> response = api.grupo().buscar()
 .porNome("Aprovadores")
 .setPage(0)
 .executar();

// Todos os grupos
List<Grupo> todos = api.grupo().buscar().executarTodos();

// Por ID
import br.com.lecom.open.api.receive.dto.RetornoDadosGrupo;
ResponseOpenApi<RetornoDadosGrupo> grupo = api.grupo()
 .buscarPorId(7)
 .executar();
```

```
wide760ResponseOpenApi<RetornoDadosGrupo> response = api.grupo().criar()
 .setNome("Aprovadores RH")
 .setIdentificador("aprov-rh") // alias único — sem espaços/acentos
 .setIdLider(123) // OBRIGATÓRIO — ID do usuário líder
 .setDescricao("Grupo de aprovadores do RH")
 .executar();
```

```
wide760api.grupo().editar()
 .setCodigo(7)
 .setNome("Aprovadores RH 2026")
 .executar();
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoUsuariosGrupo;

// Listar usuários do grupo
ResponseOpenApi<List<RetornoUsuariosGrupo>> usuarios =
 api.grupo().retornarUsuarios()
 .setCodigo(7)
 .executar();

// Incluir usuário no grupo (status 204 = sucesso)
api.grupo().incluirUsuario()
 .setCodigoGrupo(7)
 .setCodigoUsuario(123)
 .executar();

// Remover usuário do grupo
api.grupo().excluirUsuario()
 .setCodigoGrupo(7)
 .setCodigoUsuario(123)
 .executar();
```


---

## v.7.0 - Domínio > Processo

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595141126/v.7.0+-+Dom+nio+Processo

```
wide760import br.com.lecom.open.api.receive.dto.RetornoProcessoAbertura;

ResponseOpenApi<List<RetornoProcessoAbertura>> response =
 api.processo().listarProcessosParaAbrir().executar();

response.getContent().forEach(p ->
 System.out.println("ID: " + p.getId() + " — " + p.getName()));
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoProcessoAberto;

ResponseOpenApi<RetornoProcessoAberto> response = api.processo().abrirInstancia()
 .setCodigoProcesso(42)
 .setVersao(1)
 .executar();

if (response.getStatus() == 200) {
 RetornoProcessoAberto inst = response.getContent();
 System.out.println("processInstanceId : " + inst.getProcessInstanceId());
 System.out.println("activityInstanceId: " + inst.getActivityInstanceId());
 System.out.println("cycle : " + inst.getCycle());
}
```

```
wide760import br.com.lecom.open.api.model.FormularioProcessoBuilder;

FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("nomeCliente", "João da Silva")
 .addCampo("valorContrato", "50000")
 .addCampo("centroCusto", "CC-001")
 .build();

ResponseOpenApi<RetornoProcessoAberto> response = api.processo().abrirInstancia()
 .setCodigoProcesso(42)
 .setVersao(1)
 .setFormulario(formulario)
 .executar();
```

```
wide760import br.com.lecom.open.api.model.FormularioProcessoBuilder;
import br.com.lecom.open.api.constant.TipoAcao;

FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("nomeCliente", "João da Silva")
 .addCampo("valorContrato", "50000")
 .build();

// Abre, preenche e já aprova — tudo em uma chamada
// TipoAcao.APROVAR = "APPROVED" | TipoAcao.REPROVAR = "REPROVED"
ResponseOpenApi<RetornoProcessoAberto> response = api.processo().abrirInstancia()
 .setCodigoProcesso(42)
 .setVersao(1)
 .setFormulario(formulario)
 .executar(TipoAcao.APROVAR);
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoProcessoExecutado;
import br.com.lecom.open.api.constant.TipoAcao;

// Aprovar atividade
ResponseOpenApi<RetornoProcessoExecutado> response = api.processo().executarInstancia()
 .setCodigoInstancia(1001)
 .setCodAtividade(5)
 .setCodCiclo(1)
 .setTipoAcao(TipoAcao.APROVAR)
 .executar();

// Reprovar atividade
api.processo().executarInstancia()
 .setCodigoInstancia(1001)
 .setCodAtividade(5)
 .setTipoAcao(TipoAcao.REPROVAR)
 .executar();

// Aprovar e preencher formulário na mesma chamada
FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("observacao", "Aprovado após análise completa")
 .build();

api.processo().executarInstancia()
 .setCodigoInstancia(1001)
 .setCodAtividade(5)
 .setCodCiclo(1)
 .setTipoAcao(TipoAcao.APROVAR)
 .setFormulario(formulario)
 .executar();
```

```
wide760import br.com.lecom.open.api.model.FormularioProcessoBuilder;

FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("status", "Em análise")
 .addCampo("prioridade", "Alta")
 .build();

ResponseOpenApi<Void> response = api.processo().atualizarInstancia()
 .setCodigoInstancia(1001)
 .setCodAtividade(5)
 .setCodCiclo(1)
 .setFormulario(formulario)
 .executar();
// status 204 = sucesso
```

```
wide760import br.com.lecom.open.api.model.FormularioProcessoBuilder;
import br.com.lecom.open.api.model.Grid;
import br.com.lecom.open.api.model.Linha;

FormularioProcesso formulario = new FormularioProcessoBuilder()
 .addCampo("observacao", "Revisão dos itens")
 .addGrid(new Grid("ITENS")
 // 1. Inserir nova linha
 .addLinha(new Linha()
 .addCampo("LST_PRODUTO", "Monitor 27\"")
 .addCampo("QTD", 1)
 .addCampo("VLR_UNITARIO", 1500.00)
 )
 // 2. Alterar linha de índice 0 (primeira linha existente do grid)
 .atualizaLinha(new Linha(0)
 .atualizaCampo("QTD", 3)
 )
 // 3. Deletar linha de índice 2
 .deletarLinha(2)
 )
 .build();

ResponseOpenApi<Void> response = api.processo().atualizarInstancia()
 .setCodigoInstancia(1001)
 .setCodAtividade(5)
 .setCodCiclo(1)
 .setFormulario(formulario)
 .executar();
// status 204 = sucesso
```

```
wide760ResponseOpenApi<Object> response = api.processo().cancelarProcesso()
 .setCodigoInstancia(1001)
 .setMotivoCancelamento("Cancelado a pedido do solicitante")
 .executar();
// status 204 = sucesso
```

```
wide760import br.com.lecom.open.api.constant.TipoEncaminhaAtividade;

// Encaminhar para usuário específico — status 204 = sucesso
ResponseOpenApi<Object> response = api.processo().encaminharProcesso()
 .setTipoEncaminhamento(TipoEncaminhaAtividade.USUARIO)
 .addTarget("joao.silva")
 .setProcesso(1001, 5, 1)
 .executar();

// Encaminhar para grupo
api.processo().encaminharProcesso()
 .setTipoEncaminhamento(TipoEncaminhaAtividade.GRUPO)
 .addTarget("aprov-rh")
 .setProcesso(1001, 5, 1)
 .executar();

// Múltiplos destinos
api.processo().encaminharProcesso()
 .setTipoEncaminhamento(TipoEncaminhaAtividade.USUARIO)
 .addTarget("joao.silva")
 .addTarget("maria.souza")
 .setProcesso(1001, 5, 1)
 .executar();
```

```
// Pendências com filtro e paginação
api.processo().buscarProcessosPendentes()
 .porNomeProcesso("Contratação")
 .porDataPrazoAtividade("2026-01-01", "2026-12-31")
 .setPage(0).setSize(20)
 .executar();

// Pendências — todas sem paginar (percorre páginas automaticamente)
List<ProcessosPendentesUser> todas = api.processo().buscarProcessosPendentes()
 .porCodigoProcesso(42)
 .executarTodos();

// Pendências agrupadas — processos em atraso
ResponseOpenApi<List<ProcessosPendentesUserAgrupado>> agrupado = api.processo().buscarProcessosPendentesAgrupado()
 .porProcessosEmAtraso(true)
 .setPage(0).setSize(10)
 .executar();

// Processos abertos — todas as páginas
List<ProcessosAbertos> abertos = api.processo().retornarProcessosAbertos()
 .porDataInicioProcesso("2026-01-01", "2026-12-31")
 .executarTodos();

// Busca avançada — campo pesquisável + status
// StatusPesquisa: IN_PROGRESS, APPROVED, REPROVED, CANCELED, FINISHED, IN_ALERT, DELAYED, IN_HIBERNATION
import br.com.lecom.open.api.constant.StatusPesquisa;

ResponseOpenApi<List<ProcessoInstanciaDetalhado>> avancado = api.processo().buscarProcessosInstanciasAvancado()
 .porFormulario(42)
 .porStatus(StatusPesquisa.IN_PROGRESS)
 .adicionarCampoPesquisavel("nomeCliente", "João")
 .executar();
```

```
// Atividades da instância
ResponseOpenApi<List<DadosAtividadesInstancia>> atividades = api.processo().retornaAtividadesInstancia()
 .setProcessInstanceId(1001).executar();

// Dados detalhados das atividades
ResponseOpenApi<RetornoDadosInstancia> dadosInst = api.processo().retornaDadosAtividadesInstancia()
 .setProcessInstanceId(1001).executar();

// Dados de uma atividade específica
ResponseOpenApi<RetornoProcessoAtividade> dadosAtiv = api.processo().buscarDadosAtividade()
 .setProcessInstanceId(1001)
 .setActivityInstanceId(2001)
 .executar();

// Dados de um grid de uma atividade
ResponseOpenApi<RetornoProcessoAtividadeGrid> dadosGrid = api.processo().buscarDadosGridAtividade()
 .setProcessInstanceId(1001)
 .setActivityInstanceId(2001)
 .executar();

// Definição de campos da atividade
ResponseOpenApi<RetornoDefinicaoCampoAtividade> definicao = api.processo().retornaDefinicaoCamposAtividade()
 .setProcessInstanceId(1001)
 .setActivityInstanceId(2001)
 .executar();

// Campos de resultado do processo
ResponseOpenApi<RetornoCamposResultadoProcesso> resultado = api.processo().retornaCamposResultadoProcesso()
 .setProcessInstanceId(1001).executar();

// Fases do processo
ResponseOpenApi<List<Fase>> fases = api.processo().fases()
 .setProcessInstanceId(1001).executar();
```

```
// Listar responsáveis
ResponseOpenApi<List<DadosInstanciaUsuario>> resp = api.processo().retornaResponsaveisAtividadeInstancia()
 .setProcessInstanceId(1001).executar();

// Incluir responsável — status 204 = sucesso
ResponseOpenApi<Response> incluir = api.processo().incluirResponsavel()
 .setProcessInstanceId(1001)
 .setActivityInstanceId(2001)
 .setCodigoUsuario(123)
 .executar();

// Excluir responsável — status 204 = sucesso
ResponseOpenApi<Response> excluir = api.processo().excluirResponsavel()
 .setProcessInstanceId(1001)
 .setActivityInstanceId(2001)
 .setCodigoUsuario(123)
 .executar();
```

```
// Alterar SLA da instância
ResponseOpenApi<RetornoAlteraSla> sla = api.processo().alteraSla()
 .setProcessInstanceId(1001)
 .setNovaDataSla("2026-12-31T23:59:00")
 .executar();

// Remover processo da hibernação — status 204 = sucesso
ResponseOpenApi<Response> hibern = api.processo().removerHibernacao()
 .setProcessInstanceId(1001)
 .executar();
```


---

## v.7.0 - Domínio > Usuários

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3596517378/v.7.0+-+Dom+nio+Usu+rios

```
wide760import br.com.lecom.open.api.receive.dto.Usuario;
import br.com.lecom.open.api.response.ResponseOpenApi;
import br.com.lecom.open.api.constant.StatusUsuario;
import java.util.List;

// Com filtros
ResponseOpenApi<List<Usuario>> response = api.usuario().buscar()
 .porNome("João")
 .porLogin("joao.silva")
 .porEmail("joao@empresa.com")
 .porStatus(StatusUsuario.ATIVO)
 .porPermissaoAdm(false)
 .setPage(0)
 .setSize(20)
 .executar();

// Buscar todos sem paginação manual
List<Usuario> todos = api.usuario().buscar()
 .porNome("Maria")
 .executarTodos();
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoDadosUsuario;

ResponseOpenApi<RetornoDadosUsuario> response = api.usuario()
 .buscarPorId(123)
 .executar();

RetornoDadosUsuario usuario = response.getContent();
```

```
wide760import br.com.lecom.open.api.constant.LinguagemUsuario;
import br.com.lecom.open.api.constant.TipoPesquisaUsuario;

ResponseOpenApi<RetornoDadosUsuario> response = api.usuario().criar()
 .setNome("Maria Silva")
 .setLogin("maria.silva")
 .setEmail("maria@empresa.com")
 .setSenha("Senha@2026")
 .setDepartamento("ti")
 .setLinguagem(LinguagemUsuario.PORTUGUES)
 .setTipoPesquisa(TipoPesquisaUsuario.COMPLETA)
 .executar();
```

```
// addGrupo() usa o identificador (apelido) do grupo — busca e vincula automaticamente
// addFuncao() usa o identificador (apelido) da função — idem
// setDepartamento() usa o identificador do departamento — idem
ResponseOpenApi<RetornoDadosUsuario> response = api.usuario().criar()
 .setNome("Carlos Oliveira")
 .setLogin("carlos.oliveira")
 .setEmail("carlos@empresa.com")
 .setSenha("Senha@2026")
 .setDepartamento("financeiro")
 .addGrupo("aprovadores-financeiro")
 .addGrupo("gestores")
 .addFuncao("analista-financeiro")
 .setLinguagem("pt_BR")
 .setPermissaoEncaminharAtividade(true)
 .setPermissaoCancelarProcesso(false)
 .executar();

if (response.getStatus() == 200) {
 RetornoDadosUsuario usuario = response.getContent();
 System.out.println("Usuário criado ID: " + usuario.getId());
}
```

```
wide760import br.com.lecom.open.api.impl.usuario.RotaCriarUsuarioImpl;

ResponseOpenApi<RetornoDadosUsuario> response =
 RotaCriarUsuarioImpl.builder(config)
 .setNome("Ana Souza")
 .setLogin("ana.souza")
 .setEmail("ana@empresa.com")
 .setSenha("Senha@2026")
 .setDepartamento("rh")
 .addGrupo("rh-equipe")
 .setLider(10)
 .setSubstituto(11)
 .setCampoAdicional1("Ramal 1234")
 .setCampoAdicional2("CC-001")
 .setInicioFerias("2026-07-01")
 .setFimFerias("2026-07-15")
 .setHabilitaMFA(false)
 .build()
 .executar();
```

```
// setCodigo() é OBRIGATÓRIO — identifica o usuário a editar
ResponseOpenApi<RetornoDadosUsuario> response = api.usuario().editar()
 .setCodigo(123) // OBRIGATÓRIO
 .setNome("Carlos Oliveira Atualizado")
 .setEmail("carlos.novo@empresa.com")
 .setCelular("11988880000")
 .executar();
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoGruposUsuario;

// Listar grupos do usuário
ResponseOpenApi<List<RetornoGruposUsuario>> grupos = api.usuario()
 .retornarGrupos()
 .setCodigo(123)
 .executar();

// Incluir usuário em grupo (status 204 = sucesso)
api.usuario().incluirGrupo()
 .setCodigoUsuario(123)
 .setCodigoGrupo(456)
 .executar();

// Remover usuário de grupo
api.usuario().excluirGrupo()
 .setCodigoUsuario(123)
 .setCodigoGrupo(456)
 .executar();
```

```
wide760import br.com.lecom.open.api.receive.dto.RetornoFuncoesUsuario;

// Listar funções do usuário
ResponseOpenApi<List<RetornoFuncoesUsuario>> funcoes = api.usuario()
 .retornarFuncoes()
 .setCodigo(123)
 .executar();

// Incluir função ao usuário
api.usuario().incluirFuncao()
 .setCodigoUsuario(123)
 .setCodigoFuncao(789)
 .executar();

// Remover função do usuário
api.usuario().excluirFuncao()
 .setCodigoUsuario(123)
 .setCodigoFuncao(789)
 .executar();
```

```
wide760import br.com.lecom.open.api.receive.dto.DadosUserApiKey;

// Gerar nova API Key para o usuário
ResponseOpenApi<DadosUserApiKey> resp = api.usuario().gerarApiKey()
 .setCodigoUsuario(123) // OBRIGATÓRIO
 .setAlias("integracao-erp") // OBRIGATÓRIO — usado também para revogar
 .executar();

// Revogar API Key pelo alias
api.usuario().revogarApiKey()
 .setCodigoUsuario(123) // OBRIGATÓRIO
 .setAlias("integracao-erp") // OBRIGATÓRIO — mesmo alias informado ao criar
 .executar();
```


---

## v.7.0 - Estrutura básica de um robô

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991699341/v.7.0+-+Estrutura+b+sica+de+um+rob

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

## v.7.0 - Exemplo configuração Gmail

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991703597/v.7.0+-+Exemplo+configura+o+Gmail

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

## v.7.0 - Exemplo configuração Microsoft

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991703630/v.7.0+-+Exemplo+configura+o+Microsoft

```
#F4F5F7
Raiz da url:   https://login.microsoftonline.com/iddiretorio/oauth2/v2.0/authorize ?
```


---

## v.7.0 - Gerenciamento de saldo IA

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991703871/v.7.0+-+Gerenciamento+de+saldo+IA

```
Você poderá ainda definir, juntamente com o seu gestor, limites de crédito para o ambiente de desenvolvimento, homologação e produção.#DEEBFF
Caso seus créditos acabem, solicite ao seu gestor uma aquisição.
```


---

## v.7.0 - Instalação (pom.xml)

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595730957/v.7.0+-+Instala+o+pom.xml

```
<dependency>
 <groupId>br.com.lecom.open.api</groupId>
 <artifactId>rotasOpenApi</artifactId>
 <version>7.0.0v1</version>
</dependency>
```

```
<repositories>
 <repository>
 <id>lecom-services</id>
 <name>Lecom Services repository</name>
 <url>https://repo-store.lecom.com.br/repository/lecom-services</url>
 <releases><enabled>true</enabled></releases>
 <snapshots><enabled>true</enabled></snapshots>
 </repository>
</repositories>
```

```
<properties>
 <maven.compiler.source>12</maven.compiler.source>
 <maven.compiler.target>12</maven.compiler.target>
</properties>
```


---

## v.7.0 - Inventário BPM

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991690638/v.7.0+-+Invent+rio+BPM

```
#F4F5F7
Atividades Concentradoras
Nas atividades do tipo concentradora, responsáveis por receber e consolidar atividades paralelas, a contagem de ciclos ocorre por atividade paralela concluída. Isso ocorre porque o motor de processo aguarda a chegada de todas as atividades paralelas antes de liberar a atividade concentradora para execução. Cada chegada é tratada como um evento individual, registrada com um novo ciclo e armazenados dados específicos garantindo rastreabilidade do processo de unificação das informações oriundas dos diferentes caminhos do fluxo.
Exemplo: se três atividades paralelas são finalizadas e convergem para uma concentradora, serão contabilizados 3 ciclos nessa atividade.
```


---

## v.7.0 - Login

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991703935/v.7.0+-+Login

```
Neste momento, você receberá um e-mail com o acesso temporário: 

Aguarde o e-mail e não faça uma nova tentativa de redefinir senha, pois será recebida a seguinte mensagem:#DEEBFF
“Você já solicitou a redefinição de senha recentemente. Por favor, aguarde alguns minutos antes de tentar novamente”.
```


---

## v.7.0 - Mensagens

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991688250/v.7.0+-+Mensagens

```
Mensagens e anexos em processos
Para incluir mensagens e anexos no processo, siga os passos abaixo:

Abra o formulário do processo e clique em Mensagens:

Note que a caixa de Mensagens será aberta com o código do processo.

Ao clicar em Nova conversa, será aberta uma nova janela. Note que a mensagem está classificada como Pública, isso quer dizer que todos os usuários terão acesso as mensagens e arquivos compartilhados:

Selecione os usuários desta mensagem:

Neste momento você pode atribuir um título para a conversa:

Digite a mensagem desejada:

No decorrer da conversa é possível marcar um usuário com um @ (arroba), para adicioná-lo a conversa:
Caso o usuário marcado não tenha acesso ao processo, será possível visualizar apenas os arquivos compartilhados e as mensagens.
```

```
As informações: Código do processo e título do processo; Código da atividade, título da atividade e ciclo da atividade são clicáveis e levam para o processo ou atividade:

Após o envio da primeira mensagem, será habilitada a função de upload de arquivos:
As extensões habilitadas para o upload são: PDF, DOC, XLS, PPT, PNG, JGEP, sendo que o arquivo poderá ter no máximo 10MB. 
Lembrando: o tipo de arquivo e o tamanho podem ser ajustados no módulo de Documentos, pelo responsável pela administração da plataforma.
```


---

## v.7.0 - Merge Request

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991701518/v.7.0+-+Merge+Request

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

## v.7.0 - No Módulo Documentos

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991686309/v.7.0+-+No+M+dulo+Documentos

```
A funcionalidade de resumo de documentos por inteligência artificial encontra-se disponível a partir da versão básica da plataforma.
```


---

## v.7.0 - Recomendação inteligente de fluxos de trabalho

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991685897/v.7.0+-+Recomenda+o+inteligente+de+fluxos+de+trabalho

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

## v.7.0 - Referência Rápida: Todos os métodos

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595501583/v.7.0+-+Refer+ncia+R+pida+Todos+os+m+todos

```
// ❌ v6.x — REMOVIDO
RotasOpenAPIConfig.setDomain("empresa.com");
RotasOpenAPIConfig.setCredentials("chave");

// ✅ v7.0.0 — OBRIGATÓRIO
ApiConfig config = ApiConfig.builder()
 .domain("empresa.lecom.com.br")
 .credentials("chave")
 .build();
RotasOpenApi api = new RotasOpenApi(config);
```

```
// ❌ v6.x — chamada estática
RotasOpenApi.usuario().buscar().porNome("João").executar();

// ✅ v7.0.0 — chamada via instância
api.usuario().buscar().porNome("João").executar();
```

```
// ❌ v6.x — impossível suportar múltiplos tenants com configuração estática

// ✅ v7.0.0 — uma instância por tenant
RotasOpenApi apiEmpresaA = new RotasOpenApi(
 ApiConfig.builder().domain("a.lecom.com.br").credentials("key-a").build());

RotasOpenApi apiEmpresaB = new RotasOpenApi(
 ApiConfig.builder().domain("b.lecom.com.br").credentials("key-b").build());
```


---

## v.7.0 - ResponseOpenApi - Paginação - Constantes

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/3595960333/v.7.0+-+ResponseOpenApi+-+Pagina+o+-+Constantes

```
wide760ResponseOpenApi<RetornoProcessoAberto> response = api.processo().abrirInstancia()
 .setCodigoProcesso(42)
 .executar();

if (response.getStatus() == 200) {
 RetornoProcessoAberto instancia = response.getContent();
 System.out.println("processInstanceId: " + instancia.getProcessInstanceId());
 System.out.println("activityInstanceId: " + instancia.getActivityInstanceId());
 System.out.println("cycle: " + instancia.getCycle());
} else {
 System.out.println("Erro status: " + response.getStatus());
 if (response.getErros() != null) {
 response.getErros().forEach(e -> System.out.println(" " + e.getMessage()));
 }
}
```

```
// Busca todos os usuários cujo nome contém "Maria" — sem se preocupar com paginação
List<Usuario> todos = api.usuario().buscar()
 .porNome("Maria")
 .executarTodos();

// Todos os departamentos
List<Departamento> deptos = api.departamento().buscar().executarTodos();
```

```
wide760ResponseOpenApi<List<Usuario>> response = api.usuario().buscar()
 .setPage(0) // página inicial (base 0)
 .setSize(20) // itens por página
 .executar();

Page page = response.getPage();
page.getTotalElements(); // total de registros
page.getTotalPages(); // total de páginas
page.getSize(); // tamanho da página
page.hasNext(0); // true se há próxima página
```

```
wide760int paginaAtual = 0;
List<Usuario> acumulado = new ArrayList<>();

while (true) {
 ResponseOpenApi<List<Usuario>> resp = api.usuario().buscar()
 .setPage(paginaAtual)
 .setSize(50)
 .executar();

 if (resp.getStatus() != 200 || resp.getContent() == null) break;
 acumulado.addAll(resp.getContent());

 Page page = resp.getPage();
 if (page == null || !page.hasNext(paginaAtual)) break;
 paginaAtual++;
}
```

```
wide760import br.com.lecom.open.api.constant.TipoAcao;

TipoAcao.APROVAR // "APPROVED" — aprova a atividade
TipoAcao.REPROVAR // "REPROVED" — reprova a atividade
```

```
wide760import br.com.lecom.open.api.constant.TipoEncaminhaAtividade;

TipoEncaminhaAtividade.USUARIO // "USER"
TipoEncaminhaAtividade.FUNCAO // "FUNCTION"
TipoEncaminhaAtividade.GRUPO // "GROUP"
TipoEncaminhaAtividade.DEPARTAMENTO // "DEPARTMENT"
```

```
wide760import br.com.lecom.open.api.constant.StatusUsuario;

StatusUsuario.ATIVO // "ATIVO"
StatusUsuario.INATIVO // "INATIVO"
StatusUsuario.BLOQUEADO // "BLOQUEADOS"
StatusUsuario.PENDENTE // "PENDENTE"
```

```
wide760import br.com.lecom.open.api.constant.LinguagemUsuario;

LinguagemUsuario.PORTUGUES // "pt_BR"
LinguagemUsuario.INGLES // "en_US"
LinguagemUsuario.ESPANHOL // "es_ES"
```


---

## v.7.0 - Resultados da Pesquisa

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991687645/v.7.0+-+Resultados+da+Pesquisa

```
Vamos conhecer cada item abaixo:
I) Extensão do arquivo: As extensões disponíveis para exportação são: XLSX, CVS, XML e PDF. 
Clique no ícone desejado para iniciar a exportação.
Para cada extensão você terá informações e funcionalidades específicas para orientar a exportação:

Extensão XLSX
Para realizar a exportação na extensão XLSX, clique no ícone indicado:
Observe as informações sobre a exportação dessa extensão:#DEEBFF
A geração da planilha para download imediato pode levar alguns minutos. 
Se o texto no campo exceder 32.767 caracteres, o valor excedido será substituído por [...].
```

```
Em seguida selecione os campos que deseja que apareça na exportação:
Caso haja muitos campos para selecionar, você pode digitar o nome do campo para em seguida selecioná-lo:
Selecione os campos desejados e clique em Gerar:

Extensão XML
Para realizar a exportação na extensão XLSX, clique no ícone indicado:
Observe as informações sobre a exportação dessa extensão:#DEEBFF
A geração do XML para download imediato pode levar alguns minutos.
```


---

## v.7.0 - Robô para abertura de processos

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705603/v.7.0+-+Rob+para+abertura+de+processos

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

## v.7.0 - Robô para alterar SLA

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705651/v.7.0+-+Rob+para+alterar+SLA

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

## v.7.0 - Robô para aprovação automática

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705627/v.7.0+-+Rob+para+aprova+o+autom+tica

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

## v.7.0 - Robô para cancelamento

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705615/v.7.0+-+Rob+para+cancelamento

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

## v.7.0 - Robô para conexão com banco de dados

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991699394/v.7.0+-+Rob+para+conex+o+com+banco+de+dados

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

## v.7.0 - Robô para edição de metadados

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705675/v.7.0+-+Rob+para+edi+o+de+metadados

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

## v.7.0 - Robô para encaminhar processo

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705639/v.7.0+-+Rob+para+encaminhar+processo

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

## v.7.0 - Robô para envio de e-mail

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991699374/v.7.0+-+Rob+para+envio+de+e-mail

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

## v.7.0 - Robô para envio de email

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705687/v.7.0+-+Rob+para+envio+de+email

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

## v.7.0 - Robô para inclusão de documento

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991705663/v.7.0+-+Rob+para+inclus+o+de+documento

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

## v.7.0 - Uso da funcionalidade

https://lecomsa.atlassian.net/wiki/spaces/VPL/pages/2991686229/v.7.0+-+Uso+da+funcionalidade

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
