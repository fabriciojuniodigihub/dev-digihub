# Referências externas, prêmios e código público de Lecom

## O código da Digihub é fechado

A organização **`digihub-br`** existe no GitHub (mesmo namespace do Jira deles,
`digihub-br.atlassian.net`) mas **não tem nenhum repositório público**. O código vive no
GitLab interno: `repo.lecom.com.br` (DevOps atual) e `git.lecom.com.br` (o antigo).
Ou seja, aprender com o código do time só de dentro.

## Código público de Lecom BPM que vale estudar

| Repositório | O que é |
|---|---|
| `in5-alassis/Andrade-Gutierrez` | **o melhor achado.** Template de workspace da consultoria Infive para iniciar um cliente Lecom. Java, JS, properties por ambiente. Autores Rafael Marquini e Heitor Oliveira. GPLv3 |
| `AndreMichelli/Lecom-Seconci` e `Lecom-Ever` | integrações reais (canal ético, formulários públicos, robôs de notificação), organizadas em submódulos por robô |
| `lluisaps/BPM-Lecom-functions-` | `bpmFunctions.js`, coletânea de funções de formulário |

### O padrão de robô do template da Infive

Vale copiar a ideia. Para cada robô, um pacote com `Main`, `RbActionsDb`, `RbQueries` e
`GetParametros`, mais utilitários comuns em `common/util`: `ActionsDb`, `Queries`,
`Funcoes`, `HandleErrors`, `Md5`, e controllers `ExecutaAberturaProcessoBpm`,
`ExecutaEtapaProcessoBpm`, `ExecutaNotificacaoEmailBpm`.

```java
@RobotModule("RbTemplate")
@Version({1,0,1})
public class RbTemplate implements WebServices {

    private final static Logger LOGGER = Logger.getLogger(RbTemplate.class);

    @Execution
    public void executeMain() throws Exception, SQLException {
        Map<String, String> paramGerais = getParam.getParamGerais(LOGGER);
        Map<String, String> paramExec   = getParam.getParamExecEtpGen(LOGGER);

        Connection cnBpm = DBUtils.getConnection(paramGerais.get("cnBpm"));
        boolean isTestando = Boolean.parseBoolean(paramExec.get("isTestando"));

        try {
            cnBpm.setAutoCommit(false);
            // regra do robô
        } catch (SQLException e) {
            handleErrors.HandleSQLException(LOGGER, notifica, e, ..., paramGerais, isTestando, 0);
            actDb.insertIn5RecExecucao(cnBpm, paramGerais, ...);
        } finally {
            if (isTestando) cnBpm.rollback();
            else            cnBpm.commit();
            cnBpm.setAutoCommit(true);
            if (!cnBpm.isClosed()) cnBpm.close();
        }
    }
}
```

Quatro ideias daí que eu quero usar:

1. **Flag `isTestando` que troca `commit` por `rollback`.** Dá para rodar o robô contra o
   banco real e ver o que ele faria, sem gravar nada. É a diferença entre testar e torcer
2. **`setAutoCommit(false)` com commit/rollback explícito no `finally`.** Robô que grava em
   várias tabelas sem transação deixa dado pela metade quando falha no meio
3. **Tabela de auditoria de execução** (`insertIn5RecExecucao`), gravando código de status
   e mensagem a cada rodada. Quando o cliente pergunta "o robô rodou ontem?", tem resposta
4. **Tratamento de erro centralizado** que loga **e notifica por e-mail**, em vez de
   `printStackTrace` que ninguém vê

Diferença de contexto: aquele projeto é Java 8 e usa `log4j` e a interface `WebServices` do
modelo antigo. Na 7.0 é Java 20, SLF4J e Spring Boot. As anotações `@RobotModule`,
`@Version` e `@Execution` continuam iguais, então a estrutura se traduz direto.

## Prêmios e reconhecimento do grupo

Serve para conversa com cliente e para entender o discurso da casa.

| Ano | Reconhecimento |
|---|---|
| 2017 | **Global Awards for Excellence in Business Process Management** (WfMC), a maior premiação de BPM do mundo. Venceu com dois cases, **MDT Víncula** (saúde, processos 100% rastreáveis) e **ISS Brasil** (workflow de RH para 520 mil funcionários de campo), e ficou finalista com **Cleartech** |
| — | Case **Melitta do Brasil** publicado no anuário *BPM Excellence in Practice*, da Future Strategies |
| 2025 | Selo **Innovative Workplaces** da **MIT Technology Review Brasil**, entre as 20 empresas mais inovadoras do Brasil, anunciado no EmTech 2025 |
| 2023, 2024, 2025 | **Great Place to Work (GPTW)**, três anos seguidos |
| 2025 | Lecom completou **30 anos** |

Credenciais técnicas que aparecem na venda: acreditação **SOC ISAE 3402** (dizem ser a única
nacional do segmento), conformidade LGPD, alianças com AWS e Azure, e o case **gov.br**,
apresentado como um dos maiores casos de BPMS do setor público no mundo.

## Pessoas fora do time direto que valem seguir

- **Diego Nassula** — Applications Coordinator and Engineer na Digihub. Cargo de coordenação
  técnica, provável referência de arquitetura
- **Alisson Barbosa** — Desenvolvedor Java na Digihub (o `alissonDigihub` marcado como DEV
  no Discord)
- **Getúlio Alves Ribeiro Siqueira de Mira** — Programador de software, ex-Lecom
  (o `Getúlio Mira` do Discord, marcado ENIA)
- **vinicius.henrique** — escreveu os exemplos oficiais de robô da 7.0 na documentação da
  Lecom. Quem escreve a doc oficial costuma ser quem mais domina a plataforma
- **Adriano Bortoli** — CEO da Roberty Automation, o braço de RPA do grupo

## Como usar isso a favor

O caminho para virar referência aqui não é escrever mais código, é **entregar chamado que não
volta**. O que separa quem sobe de quem fica é: reproduzir o problema antes de propor a
correção, testar em aceite antes de pedir subida, explicar a causa no chamado em vez de só
dizer "corrigido", e deixar rastro (log, auditoria, registro de alteração na publicação).
Esse é exatamente o padrão que aparece nos chamados do Jira e no template da Infive.
