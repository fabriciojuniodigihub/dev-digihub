# SD-2606, condições do roteamento antes da alteração

Extraído do banco em 18/08/2026 17:03, direto de `ETAPA.DES_ROTEAMENTO`,
formulário 81, versão 14, etapa 1 (Solicitação).

Guardado para poder voltar atrás se o teste em homologação der problema.

## Homologação (`bpm_act`)

**Bloco `[2]` -> COMPRAS_E_RESERVAS** (rota padrão: nao)

```
($RESSARCIDO_LOGIN == "tiago.amor" || $RESSARCIDO_LOGIN == "ailton.fabri" || $RESSARCIDO_LOGIN == $COORD_RESPONSAVEL) && ($QTD_ITENS > 0)
```

**Bloco `[3]` -> APROVACAO_DOGESTOR** (rota padrão: sim)

```
(sem condicao)
```

**Bloco `[1]` -> PRESTACAO_DE_CONTAS** (rota padrão: nao)

```
($RESSARCIDO_LOGIN == "tiago.amor" || $RESSARCIDO_LOGIN == "ailton.fabri" || $RESSARCIDO_LOGIN == $COORD_RESPONSAVEL) && ($QTD_ITENS == 0)
```

## Produção (`bpm_prd`)

**Bloco `[2]` -> COMPRAS_E_RESERVAS** (rota padrão: nao)

```
($RESSARCIDO_LOGIN == "tiago.amor" || $RESSARCIDO_LOGIN == "ailton.fabri" || $RESSARCIDO_LOGIN == $COORD_RESPONSAVEL) && ($QTD_ITENS > 0)
```

**Bloco `[3]` -> APROVACAO_DOGESTOR** (rota padrão: sim)

```
(sem condicao)
```

**Bloco `[1]` -> PRESTACAO_DE_CONTAS** (rota padrão: nao)

```
($RESSARCIDO_LOGIN == "tiago.amor" || $RESSARCIDO_LOGIN == "ailton.fabri" || $RESSARCIDO_LOGIN == $COORD_RESPONSAVEL) && ($QTD_ITENS == 0)
```
