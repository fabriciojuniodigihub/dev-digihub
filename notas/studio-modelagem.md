# Studio - modelagem, regras e onde o código entra

## Regra de formulário: tentar isso antes de escrever JavaScript

O Studio tem uma guia **Regras de formulário** que faz no-code o que antes exigia script.
A estrutura é sempre a mesma:

```
Quando acontecer os eventos   →  botão ou campo
E as condições forem atendidas →  blocos condicionais (e / ou, negação com "!", condição interna)
Execute as ações               →  em Agrupador, Botão, Campo, Formulário ou Grid
Senão, execute as ações        →  idem
```

Cobre inclusive soma, subtração, multiplicação e média, inclusive em grid. Uma regra pode ser
vinculada a uma atividade, a várias, ou a "Todas as atividades".

**Cuidado sério:** a mesma regra pode estar ativa em várias atividades e processos.
Alterar uma regra atinge **todos** os lugares onde ela é usada. Antes de editar, olhar a
coluna "Atividades" para ver o alcance. Se a mudança é específica, o certo é **Duplicar** e
editar a cópia.

Cada regra tem título, descrição, vínculos, detalhes e estado ativo/inativo. Dá para
sinalizar (bandeira amarela) para filtrar depois, fazer ação em lote, e reordenar em
"Gerenciar regras por atividade" — a ordem importa, porque as regras encadeiam.

A busca é só por **título e descrição**, então nome vago condena a regra ao esquecimento.
Ao criar uma, escrever título e descrição que alguém acha daqui a um ano.

## Cadastro de JavaScript

Studio, aba **Javascript**. Só aceita arquivo `.js`. No cadastro:

- marcar **Personalizado** para regra nova
- caminho fica o padrão `rotinaJs`
- **Modelistas permitidos**: quem pode usar aquela regra
- **Proprietário**: quem criou

Depois de salvo, o arquivo aparece em "Javascript personalizado" na lateral esquerda, e dá
para editar o cadastro ou o próprio arquivo pelo botão "Editar arquivo".

Ou seja, o `.js` não vive em pasta do servidor: ele é um registro da plataforma, com dono e
permissão. Isso explica a organização vista no Projeto-Base
(`upload/rotinaJS/Desenvolvimento/` e `upload/rotinaJS/Produção/`, com a lib versionada em
`apiJSPadrao_v1.0.x.js`): o versionamento é manual, pelo nome do arquivo.

## Integrações Java na tela do Studio

Com DevOps ativo no ambiente, o campo **Upload** some e dá lugar a **Identificador** e
**Repositório**, e aparecem três botões:

| Botão | O que faz |
|---|---|
| Repositório | abre a página do repositório com o código |
| Pipelines | abre as pipelines já executadas |
| Publicar | pede confirmação e dispara a pipeline de publicação |

Depois de publicar, a plataforma preenche Data de Publicação, Publicado por e Status,
e **a integração vai automaticamente para inativo**. Não esquecer de reativar, senão parece
que a publicação não funcionou.

## Ordem de escolha ao resolver um chamado

1. **Regra de formulário** resolve? Usa. É no-code, versionável na tela e qualquer um mantém
2. Não resolve, mas é comportamento de tela? **API JS**, reaproveitando o `JSPadrao`
3. Precisa falar com sistema externo ou processar em lote? **Robô ou integração Java**

Subir para Java o que uma regra de formulário resolveria é criar dívida para o time todo.
