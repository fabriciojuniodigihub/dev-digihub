# Clientes

Uma pasta por cliente. A Lecom também é cliente, pelo Lecom Administrativo.

| Pasta | Cliente | Ambientes |
|---|---|---|
| [alper](alper/) | Alper Seguros | prd, act, dev |
| [atlantica](atlantica/) | Atlântica | prd, act |
| [deloitte](deloitte/) | Deloitte | prd, act, dev |
| [digihub](digihub/) | Digihub (interno) | v5.5, v5.7, prod 5.60 |
| [johnson-johnson](johnson-johnson/) | Johnson & Johnson | prd, act |
| [justica](justica/) | Justiça | a confirmar |
| [laboratorio-digital](laboratorio-digital/) | Laboratório Digital | prd, act |
| [lecom](lecom/) | Lecom | prd, act |
| [novo-tempo](novo-tempo/) | Novo Tempo | prd, act |
| [sicoob-sao-miguel](sicoob-sao-miguel/) | Sicoob São Miguel | prd, hom |
| [sodexo](sodexo/) | Sodexo | prd, act |
| [too-seguros](too-seguros/) | Too Seguros | a confirmar |
| [unimed-botucatu](unimed-botucatu/) | Unimed Botucatu | a confirmar |

## Divisão dentro de cada cliente

| Pasta | Conteúdo |
|---|---|
| `javascript/` | regras de tela e arquivos da API JS, um por processo |
| `robos/` | robôs em Java |
| `integracoes/` | integrações Java, de atividade e de campo |
| `sql/` | queries de lupa, relatório e diagnóstico |
| `atos/` | exportações de processo, com a versão no nome |
| `rpa/` | automações do Roberty e o `robo.json` exportado |
| `chamados/` | um arquivo por chamado: o que pediram, o que causava, o que mudou |

## Convenções

**Nome de arquivo JS** acompanha o processo e a versão, como o time faz:
`solicitacao-compras_v1.0.js`. Ao versionar o processo, copia e sobe como `v2.0`.

**Robô e integração** mantêm o nome da classe, igual está no GitLab da Lecom.

**Chamado** vira um arquivo com o código do Jira no nome, por exemplo `SD-2602.md`, com o que
foi pedido, o que causava o problema, o que mudou arquivo por arquivo, e o retorno dado ao
cliente.

**Credencial nunca entra aqui.** Chave e senha ficam em `material/`, fora do versionamento.
O índice de acessos é o [acessos-mapa.md](../notas/acessos-mapa.md), que também fica só local.
