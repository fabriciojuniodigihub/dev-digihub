# Treinamento Lecom - módulo 02, Workspace

Transcrito de `02 - Módulo Workspace.mp4` (1h13). Workspace também é chamado de
**módulo institucional** ou **área de trabalho**. É o que todo colaborador com acesso vê.

A tela **não é personalizável**. Cliente pede, e a resposta é não.

## O semáforo e as visões

No topo, quatro indicadores das atividades pendentes com aquela pessoa: **em atraso**
(passou do SLA), **em alerta** (perto de vencer), **no prazo** e **total**.

| Visão | O que mostra |
|---|---|
| Minhas atividades | agrupado por modelo de processo, com o semáforo |
| Caixa de entrada | as mesmas informações, sem agrupador e sem semáforo, ordenável |
| Em alerta / Em atraso | recortes do semáforo |
| Abertos por mim | processos que a pessoa abriu, para acompanhar |
| Geridos por mim | processos em que a pessoa é o gestor |
| Pesquisa (Consulta) | única forma de ver processo **já finalizado** |

Detalhe que confunde: em "Abertos por mim", clicar no **nome da atividade** dá erro se a
atividade não é da pessoa. Tem que clicar no **número do processo**, que abre a visão de
acompanhamento com histórico, lista e fluxo colorido (verde executado, azul em andamento,
vermelho rejeitado).

Botão direito na lista dá **acesso múltiplo**: aprovar ou rejeitar vários de uma vez,
desde que não haja campo obrigatório para preencher. Bom para etapa de ciência.

## SLA é por atividade, nunca do processo

Isso é regra da ferramenta, não escolha de modelagem:

> "A ferramenta não permite configurar o SLA do processo como um todo, e sim das atividades
> dentro de um processo."

Se o cliente pedir SLA do processo inteiro, a resposta é somar os SLAs das etapas ou tratar
por indicador, não por configuração.

## Ciclo e rastreabilidade

Quando uma atividade é rejeitada e o processo volta para uma etapa já executada, o **ciclo**
incrementa: ciclo 1, ciclo 2. E o dado antigo **não é perdido**:

> "A base de dados do Lecom não dá update nas informações."

Ou seja, é histórico por inserção. Isso explica o `COD_CICLO` nas tabelas e é o que dá a
rastreabilidade completa que o cliente compra.

## Status de processo

`em andamento`, `atrasado`, `cancelado`, `em hibernação`, `aberto`, `aprovado`, `rejeitado`,
`finalizado`.

Pegadinha no filtro: **"em andamento" traz todos os abertos**, incluindo atrasados e
hibernados. Para ver só os atrasados, filtrar `atrasado` explicitamente.

`cancelado` é quando a pessoa abre o processo e não dá sequência na primeira atividade.
`hibernação` segura a atividade por um tempo (duas horas, cinco dias) antes de liberar para
a área de trabalho de alguém. Existe, mas **é pouco usado**.

## Campos pesquisáveis e exportação

Na modelagem dá para marcar qualquer campo como **visível na listagem** e como
**pesquisável**. Vale pensar nisso na hora de criar o campo, porque é o que permite ao
cliente montar relatório depois sem pedir nada para a gente.

A pesquisa exporta em **xlsx, csv, xml e pdf**, com todos os campos do processo.
Campo de grid sai separado do resto, porque a grid recebe várias linhas por processo.

Cada usuário pode salvar a própria pesquisa em favoritos. É individual, como regra do Outlook.

## Mensageria

Mensagem pode ser **vinculada a um processo**, escolhendo o número do processo na hora de
enviar. O uso real:

> "A pessoa executou a atividade, sentiu falta de uma informação e não consegue rejeitar para
> voltar. Então ela usa a mensageria, para não ter que cancelar o processo."

Serve para falar com alguém fora do fluxo mapeado, e fica documentado dentro do sistema.

## Gestor do processo

É o ponto focal, normalmente o analista sênior, líder ou coordenador que conhece o processo
inteiro. Ele consegue **redirecionar qualquer atividade parada** para outro usuário, grupo,
departamento ou função, mesmo que não seja o grupo definido no fluxo. Serve para quando o
responsável está ausente ou sobrecarregado.

Também é ele que extrai relatório, identifica gargalo e **pede as melhorias para o
desenvolvedor BPM**. Ou seja: é dele que vão vir boa parte dos chamados de melhoria.

## Modo teste, agora com detalhe

Para funcionar, o modelo precisa estar marcado com o **ícone de tubo de ensaio** no Studio.
A partir daí:

- dá para **trocar de área de trabalho** e percorrer o fluxo inteiro sozinho
- **e-mail não vai** para os responsáveis reais, vai para o endereço definido na modelagem
- processos abertos em modo teste **não aparecem no modo normal**, mesmo em produção

E a boa prática que vale anotar:

> "Você tirou do ambiente de homologação porque teve o ok, colocou em produção. Você vai ter
> obrigatoriamente, como boa prática, colocar esse modelo em modo teste para testar pelo menos
> uma vez, para daí sim liberar o modelo."

Testar em aceite não dispensa testar uma vez em produção, em modo teste, antes de liberar.

## Idioma

Português, inglês e espanhol. Traduz **só a interface da plataforma**. Nome de atividade,
campo, label e botão seguem o que foi modelado. Se o cliente precisa em inglês, o modelista
escreve em inglês. Acontece pouco.

## Versões e suporte: informação que evita promessa errada

A Lecom **só dá suporte nas três últimas versões**. Com a 5.70 corrente, isso cobre 5.70,
5.60 e 5.50.

Só que cliente não migra: o ambiente da **Ser Educacional** está em 5.30/5.40, com **mais de
400 processos implementados** em produção. Migração é cara porque toda customização em Java e
JavaScript precisa ser revista e testada, e isso vira custo de consultoria. Muitos deixam a
versão envelhecer.

Distinção importante para responder chamado:

> "Bug de produto não é bug do que nós desenvolvemos. Se aconteceu um bug na integração que
> você desenvolveu, isso é desenvolvimento nosso, então nós damos suporte. Diferente de
> produto."

Se for bug de produto em versão antiga, o caminho é propor migração ou contornar.

## Pessoas da Lecom citadas

**Leda** (consultor) e **Renan** (gerente de projeto). O Renan bate com o
`Renan Friol` que aparece comentando chamados no Jira.

## Uma frase sobre postura com cliente

> "Se nós não soubermos responder e formos questionados, a gente traz para casa, você me
> questiona ou questiona outra pessoa aqui, para daí retornar para o cliente."

Nunca inventar resposta na frente do cliente. Levar a dúvida e voltar com ela respondida.
