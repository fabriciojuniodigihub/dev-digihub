# Exercício de regra de tela - módulo 09

O que o Haislan pediu na gravação, com 30 minutos de prazo:

1. o campo só aparece na tela, e como obrigatório, se a compra passar de R$ 10.000,00
   ("dez mil e um centavos", nas palavras dele)
2. se a pessoa escolher um mês diferente de maio, exibir uma mensagem no meio da tela
   dizendo que errou o mês

E a observação que ele fez junto: como o campo passa a ser controlado pelo script, a
obrigatoriedade tem que sair da configuração do Studio.

## Como está resolvido

`efetuacao_compras_v1.0.js` segue o padrão da casa: um arquivo por processo, variável global com
o código da etapa, tudo dentro do `$(document).ready`, lógica isolada em função e um `apply()` só
no fim de cada regra.

Os identificadores usados são `VALOR_PRODUTO`, `JUSTIFICATIVA` e `MES_ENTREGA`. Na hora de subir
para o ambiente, trocar pelos identificadores reais do processo.

## Testes

```bash
node teste_efetuacao_compras.js
```

A banca simula `Form`, `ProcessData` e o `$(document).ready` em Node. São 23 verificações,
incluindo o caso de fronteira que o enunciado cobra: R$ 10.000,00 **não** exige justificativa,
R$ 10.000,01 exige.

Também cobre o caminho de volta, que o enunciado não pede mas quebraria em produção: quando o
valor baixa, o campo some, perde a obrigatoriedade e o texto que já estava digitado é limpo.
Sem isso, ficaria uma justificativa gravada num processo que não precisa dela.

## O que a banca não prova

Ela roda fora do Lecom. Prova a lógica, não a integração com a APIJS. O teste de verdade é abrir
a atividade no modo teste do ambiente e conferir os dois cenários na tela.
