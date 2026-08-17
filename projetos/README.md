# Provas e exercícios

O que tem prazo e banca fica em `provas/`. O que o Haislan passou como tarefa durante o
treinamento fica em `exercicios/`.

Código de cliente não fica aqui, fica em [clientes/](../clientes/).

## Provas

| Pasta | Prova | Situação |
|---|---|---|
| [roberty-professional](provas/roberty-professional/) | Certificação Roberty Professional | resolvida e conferida, falta montar no Studio |

## Exercícios do treinamento Lecom

| Pasta | Origem | Situação |
|---|---|---|
| [javascript-regra-de-tela](exercicios/javascript-regra-de-tela/) | módulo 09 | 23 testes passando |
| [integracao-envio-email](exercicios/integracao-envio-email/) | módulo 10 | 18 testes passando |
| processo completo | atividade final, sexta-feira | pendente, depende de acesso ao Studio |

## Como rodar os testes

```bash
# regra de tela
cd exercicios/javascript-regra-de-tela && node teste_efetuacao_compras.js

# integração Java
cd exercicios/integracao-envio-email
javac -encoding UTF-8 -d build $(find teste/stubs src teste -name "*.java")
java -cp build TesteEnviaEmailChecklistOperadora

# gabarito da certificação
cd provas/roberty-professional && python valida_ptax.py
```

## O que falta

A atividade final do treinamento é modelar um processo inteiro no Studio, e o Haislan disse que
dá a certificação interna em cima dela. Não dá para adiantar aqui porque depende do ambiente. O
que já está pronto para essa hora é a nota [modelagem no Studio](../notas/treinamento-06-studio-2.md)
com as boas práticas de fluxograma que ele cobra.
