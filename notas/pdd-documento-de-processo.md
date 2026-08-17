# PDD, o documento de definição de processo

Todo robô do Roberty tem que ter um. É o documento que explica, passo a passo, o que foi
automatizado. Papel timbrado com as duas marcas, Roberty e Lecom.

Referência: `PDD - Importação Notas Fiscais Lecom.pdf`, escrito pelo Maycon em 17/08/2026.

Serve para três coisas: alinhar com o cliente o que vai ser feito antes de construir, permitir
que outra pessoa dê manutenção sem depender de quem escreveu, e servir de aceite no fim.

## As seções, na ordem

| Seção | O que vai |
|---|---|
| Nome do Projeto | |
| Data | |
| Autor | |
| Descrição do Processo | o que a automação faz, e a periodicidade |
| Objetivos | lista do que o robô entrega |
| Atividades Manuais a serem Automatizadas | o que a pessoa fazia na mão hoje |
| Linguagem de Programação | |
| Outras Ferramentas ou Bibliotecas | |
| **Fluxo de Trabalho** | o diagrama, mais o passo a passo |
| Entradas | arquivos, credenciais, configuração |
| Saídas | relatórios, documentos, e-mails |
| **Tratamento de Exceções** | o que o robô faz quando falha |
| Testes e Validação | casos, cenários e critério de aceitação |
| Responsáveis | desenvolvimento, revisão, aprovação |
| Observações Adicionais | |

## O formato do passo a passo

É a parte que dá trabalho e é a que vale. Uma tabela por passo, numerada em dois níveis
(`1`, `1.1`, `1.2`, `2`, `2.1`), com duas colunas:

| Coluna | Conteúdo |
|---|---|
| esquerda | **print da tela**, com o elemento em foco destacado em vermelho |
| direita, "Ação" | a frase do que fazer, no imperativo |

Exemplo real: `1.2 – Login na Prefeitura` mostra o print do formulário com o campo Senha
circulado, e a ação diz "Clicar no campo Senha e digitar a senha".

Acima do passo a passo vai o **diagrama do fluxo**, em raia com o nome da ferramenta (Roberty),
começando no círculo verde e terminando no vermelho. No diagrama do importador, o captcha
aparece pendurado embaixo da etapa de login, ligado por linha pontilhada.

O nível de detalhe é alto de propósito: cada clique é um passo. `4.1` é clicar no ícone de
cadastro, `4.2` é clicar em Sair, `4.3` é confirmar o OK do logoff.

## O que costuma ficar em branco, e não deveria

No PDD do importador, quatro seções vieram só com o texto de exemplo do modelo:
**Entradas, Saídas, Tratamento de Exceções e Testes e Validação**.

Justamente as que respondem "e quando der errado?". Se for para melhorar alguma coisa nesse
processo, é aí. Ainda mais agora que o pedido é fazer o robô avisar por e-mail quando estourar
exceção: essa decisão tem que estar escrita no PDD, não só no código.

## Modelo para copiar

```markdown
# Documento de definição de processo

**Nome do Projeto:**
**Data:**
**Autor:**

## Descrição do Processo

## Objetivos

## Atividades Manuais a serem Automatizadas

## Linguagem de Programação

## Outras Ferramentas ou Bibliotecas

## Fluxo de Trabalho

(diagrama)

### Passo a passo

| 1 - Nome do passo | Ação |
|---|---|
| (print) | O que fazer |

## Entradas

## Saídas

## Tratamento de Exceções

## Testes e Validação

## Responsáveis

Desenvolvimento:
Revisão:
Aprovação:

## Observações Adicionais
```

## Regra prática

Robô novo, PDD junto. E quando mexer em robô existente, atualizar o PDD na mesma entrega,
senão em três meses o documento não descreve mais o que está rodando.
