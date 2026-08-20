# Boleto automático do Banco do Brasil

Análise de viabilidade, ainda sem nada construído. Base: reunião de alinhamento de 20/08/2026,
15h, com Emilia Boscolo, Gabriel Soares e Maycon Sene. Gravação e transcrição em
`gravacoes/reunioes/2026-08-20 alinhamento boleto automatico`.

## O que existe hoje

O boleto do **Santander** já é automatizado. O robô recebe uma **cópia oculta** do e-mail que o
banco dispara, lê essa cópia, monta o layout do boleto e envia com link para o cliente. A
montagem do PDF é feita pelo robô a partir dos dados do título, não vem pronta do banco.

A Lecom mudou para o **Banco do Brasil** e usa uma ferramenta de terceiro, a **Tecfin**, que faz
a integração com o BB por API, transmite o registro e dispara o e-mail do boleto com código de
barras e QR do Pix.

## O que trava

A ferramenta da Tecfin **não permite cópia oculta**. Palavras do Gabriel: "pelo Banco do Brasil
não, por enquanto".

Isso mata o caminho mais barato, que era só trocar o layout no robô do Santander. Sem a cópia
oculta não existe o e-mail de gatilho que o robô lê hoje.

Já existe chamado de melhoria aberto na Tecfin por causa disso. Hoje, para a Juliana do
faturamento receber cópia, alguém precisa incluir o e-mail dela **no cadastro do cliente**, junto
com o e-mail do próprio cliente.

## Os caminhos discutidos

**API do Banco do Brasil.** Preferência de todos na reunião. Ficou de o Maycon consultar a
documentação no portal do BB e ver se precisa de acesso, token ou certificado. O contato para
liberar é o **Alexandre**, via Emilia.

**Robô entrando no Protheus como usuário.** Existe tela do gestor financeiro com opção de
reenviar o boleto e baixar em PDF. Funciona, mas **consome licença** a cada acesso, uma licença
financeiro ou full a menos para quem está trabalhando. A saída seria rodar de madrugada, como
já é feito no importador de notas da prefeitura, e mesmo assim consome, só que sem concorrer com
usuário. Exige fechar a tela direito para não prender a licença.

**Montar o boleto do zero.** É o que o Santander já faz e o que o Gabriel fazia em ADVPL: pegar
saldo do título, vencimento, CNPJ do cliente e demais dados, montar o layout na hora e enviar.

## O que eu levantei sobre a API do BB

O Banco do Brasil tem **API de Cobrança** publicada no Portal Developers. Exige cadastro no
portal e **convênio de cobrança ativo**, com autenticação OAuth por client credentials.

**O ponto que muda a conversa:** a API devolve os dados do boleto em JSON, com `linhaDigitavel`,
`codigoBarraNumerico`, dados do beneficiário e situação do título. **Ela não devolve o PDF.**

Ou seja, a esperança levantada na reunião de "puxar o PDF pronto pela API" não se confirma. Mas
isso não é problema, é até melhor: os dados que a API devolve são exatamente os que o robô do
Santander já usa para montar o boleto. A montagem do PDF continua sendo nossa, do mesmo jeito
que já é hoje.

## Minha leitura da viabilidade

**É possível, e o caminho é híbrido.** Consultar os títulos registrados pela API do BB e montar
o PDF reaproveitando a rotina de layout que já existe no robô do Santander.

Isso evita os dois problemas: não depende da cópia oculta que a Tecfin não oferece, e não
consome licença do Protheus.

O que precisa ser confirmado antes de estimar:

| Ponto | Quem resolve |
|---|---|
| Existe convênio de cobrança ativo no BB em nome da Lecom | Emilia, com o Alexandre |
| Credenciais do Portal Developers, token e certificado | Maycon |
| Se há custo por consumo da API | a leitura da reunião é que não há, mas não está confirmado |
| Quanto da rotina de layout do robô do Santander dá para reaproveitar | depende de ver o código |
| De onde sai a lista de títulos a enviar, do Protheus ou da própria API | definir |

## Riscos

**Dependência de terceiro.** A Tecfin está no meio do caminho e é ela que registra o boleto
hoje. Se a gente consultar a API do BB direto, precisa garantir que o título já foi registrado
por ela, senão não vai existir para consultar.

**Boleto é documento de cobrança.** Errar valor, vencimento ou beneficiário tem consequência
real com o cliente final. Montar o PDF por conta própria exige conferência dobrada, e a
validação tem que ser feita comparando com o boleto que o banco emite.

**A melhoria da Tecfin pode chegar.** Se eles liberarem cópia oculta, o caminho mais barato
volta a existir e talvez não valha construir nada. Vale perguntar o prazo antes de investir.

## Situação

Aguardando o Maycon consultar a documentação do BB e a Emilia falar com o Alexandre sobre
acesso. Nada foi decidido nem iniciado.
