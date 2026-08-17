# Lecom

Ambientes: prd, act

A Lecom também é cliente, pelo Lecom Administrativo.


Credenciais e chaves **não ficam aqui**. Estão em
`material/EquipeTecnica/Equipe Técnica/Acessos Clientes/Lecom Administrativo/`, fora do versionamento.
O índice de acessos está em [acessos-mapa.md](../../notas/acessos-mapa.md).

## O que vai em cada pasta

| Pasta | Conteúdo |
|---|---|
| `javascript/` | Regras de tela e arquivos da API JS do formulário, um por processo. |
| `robos/` | Robôs em Java. |
| `integracoes/` | Integrações Java, de atividade e de campo. |
| `sql/` | Queries de lupa, de relatório e de apoio ao diagnóstico. |
| `atos/` | Exportações de processo (.atos). Guardar com versão no nome. |
| `rpa/` | Automações do Roberty e o que for exportado do Studio (robo.json). |
| `chamados/` | Um arquivo por chamado: o que foi pedido, o que causava, o que mudou. |

## Anotações

Versão da plataforma: a confirmar

A Lecom aqui é o **Lecom Administrativo**, os processos internos da própria Lecom Tecnologia S.A.

### Automações

| O que | Onde |
|---|---|
| Importador de Notas Fiscais do Portal da Prefeitura de Bauru | [rpa/importador-notas-fiscais.md](rpa/importador-notas-fiscais.md) |

O importador roda diariamente às 8h00 e é o robô que tem o problema do retry do captcha.
