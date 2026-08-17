# Treinamento Lecom - módulo 05, Studio 1 (versões, tabela, export)

Transcrito de `05 - Módulo Studio 1.mp4` (30 min). Este módulo é curto mas é onde estão as
regras que, se ignoradas, **quebram processo em produção**.

## Os quatro estados de um modelo

Na lista do Studio, o ícone diz tudo:

| Ícone | Estado | Aparece na Workspace? |
|---|---|---|
| **check verde** | ativo/liberado | sim, em modo normal |
| **tubo de ensaio** | modo teste | sim, mas só em modo teste |
| **cadeado** | suspenso | não |
| **folha** | rascunho (em edição) | **não, de jeito nenhum** |

O rascunho é a causa de uma pergunta que o instrutor diz receber sempre:

> "Fulano, eu não estou enxergando meu processo." Porque geralmente a gente está mexendo no
> processo e ele está em modo rascunho, e quando está editando não fica visível para ninguém.

## A regra que não se quebra: nunca desenvolver na versão corrente

Qualquer alteração feita na V1 **reflete imediatamente em todos os processos já abertos**
naquela versão. Criou um campo, ele aparece nos mil processos em andamento.

O exemplo de estrago que ele dá é bom e vale entender:

> Você cria um **campo auxiliar** (invisível, que recebe variável) usado para fazer o
> roteamento, tipo `se o campo for igual a X vai para tal atividade`. Esse campo é preenchido
> por JavaScript numa atividade anterior. Só que você tem mil processos já correndo que
> **passaram daquela atividade sem o campo existir**. Esses mil processos não têm a
> informação, e o roteamento não tem para onde ir.

## O fluxo correto de melhoria

```
1. exportar a V1 do ambiente de PRODUÇÃO
2. importar essa V1 em cima da V1 de HOMOLOGAÇÃO
3. suspender o modelo
4. versionar para V2
5. desenvolver as melhorias na V2
6. publicar / liberar
```

O passo 1 e 2 parecem burocracia mas não são:

> "Não somos nós talvez só que vamos estar desenvolvendo no ambiente de aceite. Pode ter
> divergência entre a V1 de homologação e a V1 de produção. Como boa prática a gente sempre
> copia o que está rodando no dia a dia e joga em homologação, para só assim desenvolver."

Ou seja: **o que está em produção é a verdade**. Homologação pode ter lixo de testes de
outras pessoas.

## Versionar x duplicar

| Ação | Quando usar |
|---|---|
| **Versionar** | melhoria no mesmo processo. Vira V2, V3 |
| **Duplicar** | processo **novo** que é parecido com um existente. Copia campos, layout, regras de tela, atividades e aliases, e pede um nome novo de tabela |

Duplicar também serve para **faxina**: quando o modelo acumulou muitos campos inativos
(aparecem em **vermelho** na listagem) e virou uma salada, duplicar gera uma cópia limpa.

Não dá para excluir modelo nem versão que já tenha processo aberto.

## Gerar tabela: o erro que todo iniciante comete

Cada modelo tem uma **tabela física no banco**, criada com o nome definido na criação do
modelo. Os campos que você cria no Studio viram **colunas** dessa tabela.

Se a tabela não for gerada, abrir o processo dá:

> "Não foi possível abrir essa instância de processo. O modelo de dados desse processo não
> foi criado."

E o instrutor confirma que é campeão de dúvida:

> "Eu tenho uma dúvida que sempre todo mundo tem: o meu processo não está abrindo. Porque não
> gerou a tabela."

Não precisa gerar a cada campo criado. Dá para modelar tudo, configurar layout, e só então
gerar a tabela antes de testar. Mas **antes de abrir qualquer processo, a tabela tem que
existir**, e depois de criar campo novo tem que gerar de novo.

Sobre o nome da tabela: a plataforma sabe sozinha em qual banco criar, não se aponta nada.
Na demonstração as tabelas apareciam com prefixo **`F_`** (`F_ADMISSAO`, `F_AUDITORIA`).
Vale registrar que nas queries de Power BI da Atlântica as tabelas de dados de processo
apareciam com prefixo **`G_`**. Provavelmente varia por versão ou por convenção do ambiente.
**Conferir no banco do cliente antes de escrever query**, não assumir o prefixo.

## Exportar e importar: o arquivo `.atos`

Exportar gera um arquivo **`.atos`** (por dentro é um monte de XML). É assim que o processo
viaja entre ambientes: exporta de homologação, importa em produção depois de validado.

É também o formato que a skill `lecom-excel-generator` manipula, com os `_E.xml` de etapa.

## Um pedaço de história que explica meia dúzia de nomes

> "O Lecom não se chamava Lecom até 2016. Essa plataforma se chamava **Atos**. Por estratégia
> comercial foi alterado o nome da plataforma de Atos para Lecom, recebendo o mesmo nome da
> empresa."

Isso explica de uma vez: o arquivo **`.atos`**, o usuário **`atosmaster`**, o produto
**AtosBPM**, as libs **`atos-api`** e **`atos_annotations_servicos`**, e o pacote Java
`br.com.lecom.atos.servicos.annotation`.

Na mesma linha, **"segue etapa"** era o comando antigo de passagem entre atividades até por
volta da versão 5.0. Os comandos mudaram, mas a **documentação da plataforma ainda diz
"segue etapa"**. É legado de nomenclatura, não recurso atual.

## Registro de alterações

Ao publicar, existe um campo de observação que fica no histórico do modelo. O instrutor admite
que não usa:

> "Está sem observação porque eu sou um relaxado, eu só coloco publicar e não escrevo nada."

**Isso é o que eu não vou copiar.** É justamente o registro que permite entender o que mudou
de uma versão para outra, e preencher custa dez segundos. Vale como diferencial silencioso.

## Menu do Studio

Além da modelagem: **serviços** (a parte avançada, que exige Eclipse com JDK),
**categorias** (organiza os modelos por área, como no ECM) e **log**.
