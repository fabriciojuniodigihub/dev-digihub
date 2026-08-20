# SD-2606, condicoes para publicar em producao

Extraido de homologacao em 20/08/2026 11:35, ja validado nos testes.
Publicacao autorizada pelo Jose para hoje apos as 17h.

Formulario 81, versao 14, etapa Solicitacao. Identificar os blocos **pelo destino**, o rotulo
`[N]` da tela nao e a ordem de avaliacao.

## Bloco que vai para Compras e Reservas

```
($RESSARCIDO_NOME == "Tiago Amor" || $RESSARCIDO_NOME == "Ailton Fabri" || $RESSARCIDO_NOME == "Rafael Silva" || ($RESSARCIDO_LOGIN == $COORD_RESPONSAVEL && $NATUREZA_VIAGEM != "0004 | 2145 - VIAGEM COMERCIAL" && $NATUREZA_VIAGEM != "0011 | 2145 - VIAGEM MARKETING" && $NATUREZA_VIAGEM != "0029 | 2146 - VIAGEM MARKETING")) && ($QTD_ITENS > 0)
```

## Bloco que vai para Prestacao de Contas

```
($RESSARCIDO_NOME == "Tiago Amor" || $RESSARCIDO_NOME == "Ailton Fabri" || $RESSARCIDO_NOME == "Rafael Silva" || ($RESSARCIDO_LOGIN == $COORD_RESPONSAVEL && $NATUREZA_VIAGEM != "0004 | 2145 - VIAGEM COMERCIAL" && $NATUREZA_VIAGEM != "0011 | 2145 - VIAGEM MARKETING" && $NATUREZA_VIAGEM != "0029 | 2146 - VIAGEM MARKETING")) && ($QTD_ITENS == 0)
```

## Bloco que vai para Aprovacao do Gestor

Nao alterar. Continua rota padrao, sem condicao.

## O que esta em producao hoje, para voltar atras se precisar

Compras e Reservas:

```
($RESSARCIDO_LOGIN == "tiago.amor" || $RESSARCIDO_LOGIN == "ailton.fabri" || $RESSARCIDO_LOGIN == $COORD_RESPONSAVEL) && ($QTD_ITENS > 0)
```

Prestacao de Contas:

```
($RESSARCIDO_LOGIN == "tiago.amor" || $RESSARCIDO_LOGIN == "ailton.fabri" || $RESSARCIDO_LOGIN == $COORD_RESPONSAVEL) && ($QTD_ITENS == 0)
```

## Conferir depois de publicar

Ler `ETAPA.DES_ROTEAMENTO` em `bpm_prd` e confirmar que as duas expressoes gravaram inteiras,
com os parenteses aninhados, e que a rota padrao continua no bloco da Aprovacao do Gestor.
