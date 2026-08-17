# Treinamento Lecom - módulo 10, Integração e Robô

Transcrito de `10 - Módulo Avançado Integração e Robô.mp4` (1h25). Fecha o treinamento e é o
mais técnico. Tudo aqui é Java.

## Integração x robô: o que muda é o gatilho e o retorno

> "O desenvolvimento em si é semelhante. A única diferença deles é o **gatilho** e o
> **retorno**, e o que você consegue utilizar de nativo dentro da plataforma."

| | Gatilho | Retorno |
|---|---|---|
| **Integração** | aprovação/rejeição de atividade, carregamento de atividade, ou carregamento de campo | sucesso/erro, ou os valores dos campos |
| **Robô** | task agendada: minuto, hora, dia, semana, mês, ano | nenhum, é rotina |

Robô é o equivalente a um cron ou task do Windows, só que escrito em Java em vez de RPA.

## A mudança arquitetural que separa as versões

Isso explica muito problema antigo de cliente.

**Antes:** integração rodava **junto com a plataforma**, no mesmo Tomcat. Uma conexão de banco
não fechada, ou um `InputStream` deixado aberto, ia acumulando até **travar o serviço inteiro**
e exigir restart do ambiente. Com mil usuários simultâneos, isso derruba todo mundo.

**Agora:** cada integração, robô e aplicação externa **roda isolada**, com repositório próprio
no GitLab e usuário de banco separado, com limite de conexão próprio. Se der problema, fica
contido nas integrações e não derruba a plataforma.

O ambiente da **Ser Educacional (5.30)** ainda é do modelo antigo, com tudo rodando junto.

## Configuração da integração

Nome, identificador, tipo (passagem de atividade ou inicialização de campo/atividade),
modelistas, proprietário, e mais dois campos que importam:

**Execução síncrona x assíncrona:** na síncrona a plataforma **espera** a integração terminar
para abrir a tela ou seguir o processo. Na assíncrona ela abre a atividade e a integração roda
em paralelo.

**Nível de log:** a plataforma usa **SLF4J** (era Log4j, trocado por causa do problema de
segurança). Níveis: trace, debug, info, warn, error, fatal.

> "No ambiente de teste geralmente a gente coloca todos. No de produção só error, para não
> acumular log dentro do ambiente, porque esses arquivos começam a ficar pesados."

## O fluxo completo de desenvolvimento

```
1. criar a integração na plataforma  → ela cria o repositório no GitLab
2. clonar o repositório               → autenticação com 2FA (token próprio para o Git)
3. escolher a branch: developer = homologação, master = produção
4. importar no Eclipse
5. editar a classe anotada com @Execution
6. commit e push
7. voltar na plataforma e clicar em Publicar
   → pipeline: build → SonarQube scan → deploy
```

O acesso ao GitLab de cada ambiente é pedido por **chamado na Lecom**.

O **SonarQube** pode reprovar a publicação. Avisos (warn) não impedem; erros sim. O instrutor
tomou um erro ao vivo e o conselho foi direto: quando não passar, chamar ele para depurar
junto.

Detalhe de rotina: a tela de pipeline às vezes trava no build; um F5 mostra que o deploy já
terminou.

## Retorno da integração

**Passagem de atividade:** `0|mensagem` para sucesso, `99|mensagem` para erro. Sempre dentro
de try/catch, com o sucesso no `try` e o erro no `catch`.

```java
@Execution
public String execute() {
    try {
        // regra
        return "0|Sucesso, primeira integração";
    } catch (Exception e) {
        return "99|Erro: " + e.getMessage();
    }
}
```

**Carregamento de campo:** retorna os valores **separados por pipe**, na ordem dos campos
configurados na atividade:

```
valor1|valor2|valor3
```

É o mesmo princípio do select com 10 colunas mapeadas para 10 campos.

## O objeto `IntegracaoVO`

É por ele que a integração conversa com o processo. Tudo com `get`/`set`:

| Método | Traz |
|---|---|
| `getCodigoProcesso()` | o número da instância |
| `getCodigoEtapa()` | a etapa |
| `getCodigoCiclo()` | o ciclo |
| `getCodigoFormulario()` | o modelo |
| `getUsuarioEtapa()` / `getUsuarioIniciador()` | os códigos da tabela `USUARIO` |
| `getEmailFrom()` | o remetente configurado no ambiente |
| `getMapCamposFormulario()` | **um `Map` com os campos do formulário** |
| `setConexao(...)` / `getConnection()` | conexão de banco |

O acesso aos campos mantém a convenção do cifrão:

```java
Map<String, String> campos = integracaoVO.getMapCamposFormulario();
String tipoProduto = Funcoes.nulo(campos.get("$TIPO_PRODUTO"));
```

A classe não é editável: `Ctrl+clique` não abre. É biblioteca da plataforma.

## Boas práticas de Java cobradas no treinamento

**Comparar String com `.equals()`, nunca com `==`.** Foi citado como o erro que mais pega quem
vem de outra linguagem.

**Comparação com `null` quebra.** Por isso existe um utilitário da casa, `Funcoes.nulo(valor)`,
que devolve vazio quando não há valor. Fica em `br.com.lecom.comum.util` e é **copiado entre
projetos** — é a mesma `Funcoes.java` que eu já tinha visto no Projeto-Base, marcada
`@author TODOS`.

**Modificadores de acesso:** `private` por padrão, `public` só o necessário, `protected` para o
pacote.

> "Isso é muito, muito importante: você não sair criando tudo público. Entenda isso, até mesmo
> para você ser um cliente desenvolvedor."

**Relançar exceção nos métodos auxiliares.** Método que não é o principal deve ter `throw` no
catch:

> "Quando eu subo o throw, ele vai interromper o script. Se não, não vai subir a exceção, e daí
> **a minha conexão vai ficar aberta**, porque eu fecho a conexão na principal."

E ele confirma que isso é assinatura do código dele: "todos os projetos que você consultar que
fui eu quem fiz, você vai ver esse throw".

**`StringBuilder` com `.append()`** para montar SQL e o HTML de e-mail, lembrando de usar
`.toString()` na hora de usar.

**Manipulação de banco em três partes, sempre:** conectividade → preparação → execução.

```java
StringBuilder sql = new StringBuilder();
sql.append("INSERT INTO AUX_TIPO_PRODUTO (TIPO_PRODUTO) VALUES (?)");

try (Connection conn = integracaoVO.getConnection();
     PreparedStatement pst = conn.prepareStatement(sql.toString())) {
    pst.setString(1, tipoProduto);
    pst.executeUpdate();
}
```

- `PreparedStatement` com `?`, e a posição do `setString` **começa em 1**, não em 0
- `executeUpdate()` serve para insert, update **e** delete
- **try-with-resources** (Java 7+) fecha a conexão sozinho ao sair do try. No modelo antigo era
  preciso declarar como `null` e fechar no `finally`

**Testar a lógica localmente:** criar um `public static void main` na própria classe, com
valores fixos, e rodar como Java Application no Eclipse. Mas integração e robô **só funcionam
de verdade dentro do ambiente** — o main serve só para validar a lógica.

**Testar o SQL na mão antes.** Ele executa o insert direto no banco, confirma que funciona, e
só então escreve no código.

## Envio de e-mail

Duas classes, com papéis separados:

- **`EmailMessage`** prepara: subject, corpo, remetente, destinatários, flag de HTML, cópia,
  cópia oculta e anexo. Tem **vários construtores**, dá para ver as opções pela assinatura
- **`WFMail`** envia: `enviaEmailMessage(emailMessage)`

```java
List<String> destinatarios = new ArrayList<String>();
destinatarios.add("fulano@empresa.com.br");

EmailMessage msg = new EmailMessage(
    "Assunto",
    corpoHtml.toString(),
    integracaoVO.getEmailFrom(),   // sempre o remetente configurado no ambiente
    destinatarios,
    true                            // HTML: sempre true
);

WFMAIL.enviaEmailMessage(msg);
```

Retorno **"Encaminhado para fila"** significa sucesso.

O corpo em HTML se monta com `StringBuilder`, concatenando as variáveis vindas do
`getMapCamposFormulario()`. Usar `replace` também funciona, mas a concatenação direta no
`append` foi a recomendação.

Trocar o remetente para um endereço diferente do configurado no ambiente é possível, mas
"o buraco é mais embaixo".

## Robô: as duas diferenças

1. a conexão é direta, sem setar antes:
   `DBUtils.getConnection("bpm_act")` em vez de `integracaoVO.setConexao(...)`
2. como roda **fora da atividade**, não existe o objeto com os campos do formulário. O robô
   precisa **fazer SELECT no banco** para descobrir o que processar

Aplicação externa é o caso mais cru: não tem conectividade pronta, monta-se o JDBC do zero.

## Sobre o estilo de mentoria

Vale saber o que esperar:

> "Eu deixo você apanhar pra caramba e depois é que eu venho falando o correto. Porque senão
> você não aprende."

E a expectativa declarada, que é boa notícia para quem quer crescer:

> "Faça com boas práticas, estude orientação a objetos e o resto do Java, porque **eu quero
> você bom em Java aqui, além do BPMS**."
