# Exercício de integração Java - módulo 10

O Haislan passou como tarefa desenvolver a integração de layout de e-mail da Alper, para
disparar na aprovação da atividade de conferência de documentos.

Como o layout real do cliente não veio no material, aqui está a integração completa com um
layout próprio. A estrutura, que é o que o exercício cobra, é a mesma.

## O que ela faz

Na aprovação da atividade, monta o checklist de abertura de subestipulante em HTML e envia para
os e-mails que estiverem no campo auxiliar `EMAIL_OPERADORA`, separados por ponto e vírgula.

## Padrão seguido

O da casa, tirado dos projetos de exemplo e do que o módulo 10 cobra:

- `@IntegrationModule`, `@Version` e `implements IntegracaoFace`
- método anotado com `@Execution`
- retorno `0|mensagem` para sucesso e `99|mensagem` para erro, sempre dentro de try/catch
- campos do formulário pelo `getMapCamposFormulario()`, sempre com `Funcoes.nulo(...)`
- `EmailMessage` monta, `enviaEmailMessage` envia, e o remetente vem do `getDesFrom()`
- `StringBuilder` para o HTML

A diferença em relação aos projetos antigos é o log: eles usam Log4j, aqui é **SLF4J**, que é o
que o treinamento diz ser o padrão atual depois da vulnerabilidade do Log4j.

## Testes

```bash
javac -encoding UTF-8 -d build $(find teste/stubs src teste -name "*.java")
java -cp build TesteEnviaEmailChecklistOperadora
```

Os stubs em `teste/stubs/` são versões mínimas das classes da plataforma, só para compilar e
rodar fora do ambiente. Não são as classes da Lecom e não devem ir para o repositório da
integração.

São 18 verificações: caso feliz, dois destinatários, sem e-mail informado, entrada suja com
espaço e ponto e vírgula sobrando, falha no envio pela plataforma, e campo opcional ausente.

Os dois últimos são os que costumam quebrar em produção. Sem tratar campo ausente, o corpo do
e-mail sai com `null` escrito no meio; e a observação em branco não pode gerar um bloco vazio no
layout.

## O que a banca não prova

Integração só roda de verdade dentro do ambiente. Isso aqui prova a lógica, o retorno e o HTML.
Depois de publicar, o teste real é abrir um processo e aprovar a atividade.
