# Ambiente, memória e tuning do servidor

O que a Lecom documenta sobre dimensionamento, mais o que dá para deduzir a partir disso quando
o assunto é lentidão e full GC. Fonte: páginas de pré-requisitos das versões 5.70, 6.0 e 7.0 no
Confluence.

Aviso honesto: **a Lecom não publica configuração de JVM.** Não existe página com `Xmx`, escolha
de coletor ou flag de GC. O que existe é a tabela de memória por serviço, e é dela que se parte.

## Software exigido, e isso não mudou da 5.70 para a 7.0

| Item | Versão |
|---|---|
| Apache Tomcat | 9.0.65 ou superior |
| OpenJDK | 12.0.2 ou superior |
| LibreOffice | 5.0 ou 5.0.2 |
| NodeJS | 12 |
| PM2 | última estável |

Chama atenção que a exigência continua **OpenJDK 12** em 2026, enquanto o DevOps de robôs e
integrações pede **Java 20**. São coisas separadas: a 12 é da plataforma no servidor, a 20 é do
projeto que você compila para publicar.

## Hardware mínimo

Três servidores dedicados, sem outra aplicação junto, e pelo menos dois ambientes (produção e
homologação).

| Servidor | CPU | RAM | Disco |
|---|---|---|---|
| Aplicação | 2 vCPU+ | **11 GB** (era 8 GB na 5.70) | 100 GB SATA |
| Banco de dados | 2 vCPU+ | 4 GB | 100 GB SATA |
| Proxy | 1 vCPU+ | 1 GB | 20 GB SATA |
| Broker (só cluster) | 1 vCPU+ | 2 GB | 30 GB SATA |

Mais **6 GB de swap**, com a recomendação de manter swap em torno de 60% da memória física.

Em cluster, o Message Broker é **ActiveMQ**, em máquina dedicada.

O salto de 8 para 11 GB entre a 5.70 e a 6.0 é o custo dos microserviços novos. Cliente que
atualiza sem mexer no servidor vai sentir.

## Memória por serviço, que é o mapa do problema

| Serviço | MB |
|---|---|
| **Tomcat** | **4208** |
| Job-service | 1280 |
| Redis | 768 |
| Behavior-service | 512 |
| Rabbitmq | 512 |
| Service-integration | 512 |
| Form-service | 320 |
| Audit-service | 256 |
| Gateway-service | 256 |
| tomcat_app | 225 |
| Form-app | 169 |
| Devops-service | 128 |
| Config-service | 64 |

O Tomcat sozinho leva **37,36%** da memória do servidor, e o `tomcat_app` (onde rodam as
aplicações externas) leva 2%. Somando tudo dá perto dos 11 GB, o que significa que o mínimo
documentado **não tem folga nenhuma**.

## Limite de arquivos abertos

Isso costuma passar batido e derruba ambiente:

- processo do **Tomcat**: no mínimo **10.240** arquivos abertos
- **demais serviços**: no mínimo **4.096** cada

No Linux é o `ulimit -n` / `LimitNOFILE` na unit do systemd. Se estiver no padrão de 1024, o
ambiente cai sob carga com erro que não parece ter relação nenhuma com arquivo.

## Onde entra o full GC

Juntando o que a documentação diz com o que o módulo 10 do treinamento explica, o quadro fica
claro.

O Tomcat com 4 GB de heap é o processo mais pesado do servidor. Nas versões antigas, **integração
e robô rodavam dentro dele**. Conexão de banco não fechada e `InputStream` deixado aberto viram
objeto vivo que o coletor não consegue recolher, o heap enche, o Java entra em full GC seguido, a
aplicação congela em pausas cada vez maiores e o time conclui que "travou" e reinicia o serviço.

É exatamente o sintoma que o Haislan descreve na gravação, sem usar o termo GC: "chega uma hora
que trava o servidor, precisa reiniciar o serviço".

Por isso duas coisas importam mais que qualquer flag de JVM:

1. **`try-with-resources` em toda conexão e todo stream.** Vazamento em integração é a causa
   raiz mais comum
2. **Migrar robô e integração para o modelo isolado** (5.60 em diante, com GitLab). Sai de dentro
   do heap do Tomcat e passa a ter processo e limite próprios, e o que vazar derruba só ele

A própria Lecom já corrigiu erro desse tipo. Do hotfix da 5.70 RTM 1.00.1:

> "Adequamos o uso de memória no servidor, no contexto dos serviços responsáveis pelos robôs,
> pois as memórias XSS e HEAP estavam sendo alocadas em frentes que não tinham uso, deixando o
> HEAP com pouca memória (PLT-5481)."

Ou seja, ambiente em versão anterior a essa tem heap mal distribuído nos serviços de robô, de
fábrica. Vale conferir a versão antes de sair investigando outra coisa.

Na 7.0 tem outro caso parecido, agora com container:

> "os arquivos .zip gerados não eram removidos da pasta temporária após o download - o método
> anterior só executava a exclusão no encerramento da JVM, que não ocorre em containers de longa
> duração (PLT-9826)."

Mesma lição: código que confia no fim da JVM para limpar não funciona em serviço que nunca
reinicia.

## Por onde começar quando o ambiente estiver lento

1. **Log do ambiente**, no canto superior direito da plataforma. Baixa os logs consolidados e os
   dos robôs e integrações. Clicando no `node-01` vem tudo zipado
2. conferir se o consumo bate com a tabela acima, serviço por serviço
3. conferir `ulimit -n` de cada serviço contra os mínimos (10.240 e 4.096)
4. conferir a versão: se for anterior ao hotfix da 5.70 RTM 1.00.1, o heap dos serviços de robô
   já vem errado
5. procurar integração que abre conexão ou stream sem fechar, que é a causa raiz mais provável
6. só então falar em aumentar memória

Reinício, quando for necessário, segue a ordem que está em
[lecom-tecnico.md](lecom-tecnico.md): derruba config, discovery, gateway, form-app, form-service,
service-integration e `bpm -c stop`, e sobe na mesma sequência.

## O que preciso confirmar com o time

- onde ficam os `Xmx` de cada serviço, se é na unit do systemd, num `setenv.sh` do Tomcat ou num
  arquivo de configuração da Lecom
- qual coletor está em uso, já que OpenJDK 12 tem G1 como padrão
- se os ambientes SaaS da Lecom já rodam com os 11 GB ou ainda estão no dimensionamento antigo
- se existe GC log ligado em algum ambiente, que é o que resolveria a discussão na base do dado
  em vez do achismo
