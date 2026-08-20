# Protheus

ERP da TOTVS, antigo Microsiga. É o sistema onde mora o dado mestre de boa parte dos nossos
clientes: cliente, fornecedor, produto, centro de custo, título a receber. A Plataforma Lecom
não guarda esse dado, ela **consulta o Protheus** na hora de preencher o formulário.

Escrevi esta nota depois de achar consultas ao Protheus espalhadas pelos processos da Lecom
Administrativo. Não é teoria, é o que está rodando lá.

## Como a Lecom usa

Existe uma conexão de banco cadastrada com o nome **Microsiga**, código 27, apontando para o
Protheus. É por ela que as lupas e as listas dos formulários buscam.

**1.626 consultas** em **25 formulários**, sendo 14 deles ativos:

| Formulário | O que busca no Protheus |
|---|---|
| Solicitação de Compras | fornecedor, centro de custo, condição de pagamento, natureza |
| Viagens | cliente, fornecedor, natureza da viagem |
| Solicitação de Boletos e NFS-e | título a receber, nota fiscal, cliente |
| IAC, Apólice de Seguro, Termo de Terceiro, IC Cancelamento | produto, cliente, fornecedor |
| Os `[Roberty]` | mesmas consultas, nas versões automatizadas |

O banco do Protheus deles é **SQL Server**. Dá para ver pelo SQL: concatenação com `+` em vez
de `CONCAT`, e `CONVERT(DATE, campo, 103)` para data no formato brasileiro.

## O nome das tabelas

Aqui está a primeira coisa que confunde. As tabelas não se chamam `SA1`, se chamam `SA1A10`.

O nome físico é **prefixo + código da empresa + zeros à direita**, no máximo 6 caracteres.
Então `SA1A10` é a tabela `SA1` da empresa `A1`. Se houvesse outra empresa, existiria outra
tabela, tipo `SA1B10`, com os mesmos campos e dados diferentes.

**A empresa da Lecom no Protheus é a `A1`.** Toda consulta nossa termina em `A10`.

## As tabelas que aparecem nos nossos processos

| Tabela | O que é | Vezes usada |
|---|---|---|
| `SB1A10` | Produtos | 1.045 |
| `SA2A10` | Fornecedores | 348 |
| `SA1A10` | Clientes | 214 |
| `Z10A10` | Naturezas de viagem, **tabela customizada** | 7 |
| `SEDA10` | Naturezas financeiras | 7 |
| `CTTA10` | Centros de custo | 6 |
| `SE4A10` | Condições de pagamento | 6 |
| `SE1A10` | Contas a receber, os títulos | 3 |
| `SF2A10` | Notas fiscais de saída | 3 |
| `SF4A10` | TES, tipo de entrada e saída | 1 |
| `SD2A10` | Itens das notas de saída | 1 |

Tabela que começa com **Z é customização do cliente**, não é padrão TOTVS. A `Z10` é da Lecom e
guarda as naturezas de viagem, que é justamente o campo do chamado SD-2606.

## O nome dos campos

Cada tabela tem um prefixo próprio de dois ou três caracteres, e **todo campo dela começa com
esse prefixo**. Não tem exceção.

| Tabela | Prefixo | Exemplos reais dos nossos formulários |
|---|---|---|
| SA1, clientes | `A1_` | `A1_COD`, `A1_LOJA`, `A1_NOME`, `A1_NREDUZ`, `A1_CGC`, `A1_MUN` |
| SA2, fornecedores | `A2_` | `A2_COD`, `A2_NOME`, `A2_NREDUZ`, `A2_CGC`, `A2_CC`, `A2_COND` |
| SB1, produtos | `B1_` | `B1_COD`, `B1_DESC`, `B1_MSBLQL` |
| SE1, títulos | `E1_` | `E1_NUM`, `E1_CLIENTE`, `E1_LOJA`, `E1_SALDO`, `E1_EMISSAO`, `E1_VENCTO` |
| SE4, cond. pagamento | `E4_` | `E4_CODIGO`, `E4_DESCRI` |
| SED, naturezas | `ED_` | `ED_CODIGO`, `ED_DESCRIC` |
| CTT, centro de custo | `CTT_` | `CTT_CUSTO`, `CTT_DESC01` |

O prefixo nem sempre é óbvio. `SED` usa `ED_`, `CTT` usa `CTT_`. Não tem regra, tem que
consultar o dicionário.

## O `D_E_L_E_T_`, e por que ele derruba relatório

**Toda tabela do Protheus tem essa coluna.** O ERP não apaga registro, ele marca como
excluído. Registro apagado fica com `*` nessa coluna e continua lá.

Se esquecer o filtro, a lupa devolve fornecedor que não existe mais e o relatório conta o que
não deveria. É o erro clássico de quem chega no Protheus.

Nas nossas consultas aparecem as duas formas, e as duas significam a mesma coisa:

```sql
where D_E_L_E_T_ <> '*'   -- descarta o que foi excluído
where D_E_L_E_T_ = ''     -- só o que está ativo
```

## Exemplos reais dos nossos formulários

Lupa de cliente, no processo de Viagens:

```sql
select A1_NOME as 'Cliente', A1_MUN as 'Município', A1_CGC as 'CNPJ', A1_COD as 'CodProtheus'
  from SA1A10
 where D_E_L_E_T_ <> '*'
   and (UPPER(A1_NOME) LIKE UPPER('%$EMPRESA_CLIENTE%')
        or UPPER(A1_NREDUZ) LIKE UPPER('%$EMPRESA_CLIENTE%'))
```

Lupa de produto, com o filtro de bloqueado:

```sql
select B1_COD as 'Código', B1_DESC as 'Descrição do Produto'
  from SB1A10
 where D_E_L_E_T_ <> '*' and B1_MSBLQL = 2
   and UPPER(B1_DESC) LIKE UPPER('%$DESCRPROD_01%')
   and B1_COD NOT LIKE 'CP%'
```

`B1_MSBLQL = 2` quer dizer produto **não** bloqueado. É contraintuitivo e vale lembrar: 1 é
bloqueado, 2 é liberado.

Fornecedor puxando centro de custo, condição de pagamento e natureza de uma vez:

```sql
select DISTINCT A2.A2_NOME, A2.A2_CGC, CTT.CTT_CUSTO, CTT_DESC01,
       E4_CODIGO, E4_DESCRI, ED_CODIGO, ED_DESCRIC
  from SA2A10 A2
  LEFT JOIN CTTA10 CTT ON CTT.CTT_CUSTO = A2.A2_CC
  LEFT JOIN SE4A10 SE4 ON SE4.E4_CODIGO = A2.A2_COND AND SE4.D_E_L_E_T_ = ''
  LEFT JOIN SEDA10 SED ON SED.ED_COD ...
```

Repara que o `LEFT JOIN` repete o filtro de deletado. Tem que repetir em cada tabela, senão o
registro excluído volta pelo join.

## Chave composta: código mais loja

Cliente e fornecedor **não são identificados só pelo código**. A chave é código mais loja,
`A1_COD` + `A1_LOJA`. O mesmo cliente pode ter várias lojas, cada uma com CNPJ e endereço
próprios.

Aparece no nosso SQL de títulos:

```sql
LEFT JOIN SA1A10 SA1 ON SA1.A1_COD = SE1.E1_CLIENTE AND SA1.A1_LOJA = SE1.E1_LOJA
```

Esquecer a loja no join duplica linha e é difícil de perceber, porque o resultado parece certo.

## O dicionário de dados

O Protheus guarda a própria estrutura em tabelas que começam com `SX`. Servem para descobrir
nome e significado de campo sem depender de consultor.

| Tabela | O que guarda |
|---|---|
| `SX2` | as tabelas do sistema, nome e descrição |
| `SX3` | os campos de cada tabela, tipo, tamanho e validação |
| `SX5` | tabelas genéricas, as listas de domínio |
| `SX6` | parâmetros do sistema |
| `SIX` | índices |

Precisando saber o que é um campo, `SX3` responde. É o caminho mais rápido que perguntar.

## Como integrar

**Consulta direta no banco**, que é o que a Lecom faz hoje. Simples, rápido e serve para lupa e
lista. O risco é ler estrutura interna do ERP: se a TOTVS mudar em uma atualização, quebra.

**REST ou SOAP**, quando precisa gravar. A TOTVS tem catálogo de APIs padrão e dá para
desenvolver serviço próprio em ADVPL com `FWRest` e `FWHttpServer`. Gravar direto na tabela é
proibido na prática, porque o ERP tem regra de negócio, numeração e integração contábil que
rodam por trás da rotina.

A regra prática: **ler pode ser direto no banco, escrever tem que ser pela API.**

## Armadilhas

**Falta de filtro de filial.** Só **3 das 1.626** consultas usam `_FILIAL`, e nessas o campo
aparece no join entre nota e item, não como filtro. Funciona porque a Lecom tem uma filial só.
Em cliente com várias, a mesma consulta traz dado misturado e ninguém percebe de imediato.

**Campo com espaço à direita.** O Protheus preenche com espaço até o tamanho do campo. Comparar
com `=` sem `RTRIM` falha e ninguém entende por quê.

**Data como texto.** Muita data vem no formato `AAAAMMDD` em campo texto, por isso o
`CONVERT(DATE, campo, 103)` no SQL do formulário 127.

**Tabela Z é do cliente.** Nomenclatura, conteúdo e regra são de quem criou. Não adianta
procurar documentação da TOTVS.

## Para estudar depois

ADVPL, que é a linguagem do Protheus, e TLPP, a versão mais nova. Não preciso hoje, porque a
gente consome de fora, mas ajuda a ler rotina do cliente quando precisar entender uma regra.

## Onde pesquisei

- [Principais Tabelas do Protheus](https://protheusadvpl.com.br/principais-tabelas-do-protheus/)
- [Dicionário de Dados Protheus](https://fbsolutions.com.br/tabelas-totvs-protheus/)
- [SX2, tabelas do sistema](https://medium.com/@fabricioereche/sx2-tabelas-do-sistema-86061b5066e9)
- [Tabela SE1, contas a receber](https://sempreju.com.br/tabelas_protheus/tabelas/tabela_se1.html)
- [Tabela CTT, centro de custo](https://sempreju.com.br/tabelas_protheus/tabelas/tabela_ctt.html)
- [APIs no TOTVS Protheus](https://grupo377.com.br/blog-apis-no-totvs/)
- [Webservice Rest ADVPL](https://paulohcc.com/trabalhando-com-webservice-rest-advpl/)

O resto veio das consultas que estão gravadas em `ETAPA_CAMPO.VLR_VALOR` na base da Lecom.
