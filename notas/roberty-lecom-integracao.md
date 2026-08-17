# Roberty falando com a Plataforma Lecom

Existe integração nativa, no-code, entre as duas ferramentas do grupo. São quatro ações na
biblioteca do Roberty Studio, categoria **Lecom**. Isso não aparece em nenhum material do pacote
da Equipe Técnica, só na documentação oficial do Roberty.

Fonte: `docs.roberty.app`, páginas em `material/_docs_roberty/`.

## As quatro ações

| Ação | O que faz |
|---|---|
| **Conexão** | autentica no ambiente Lecom |
| **Abrir Processo** | instancia um processo |
| **Atualizar Dados da Atividade** | grava campos do formulário e mexe na grid |
| **Aprovar ou Rejeitar Atividade** | move o processo adiante |

### Conexão

Dois campos, os dois obrigatórios: **chave de API** fornecida pela Lecom e o **endereço do
servidor**. Devolve um id que as outras ações usam como referência.

**Tem que vir antes de qualquer outra ação da Lecom no fluxo.** É a mesma lógica das conexões de
banco no Roberty.

A autenticação é a da open-api da plataforma, a mesma família de rotas descrita em
[robos-e-integracoes.md](robos-e-integracoes.md).

### Abrir Processo

Campos: conexão, **id do processo** (obrigatório), versão, idioma, servidor, e um par
**modo teste** com **usuário de teste**. Ligando modo teste, o usuário de teste passa a ser
obrigatório.

Não tem retorno.

Isso casa direto com o ciclo de vida do modelo que está em
[treinamento-05-studio-1.md](treinamento-05-studio-1.md): processo em modo teste só abre para
quem tem permissão, então o usuário de teste aqui precisa ser um que enxergue o modelo.

### Atualizar Dados da Atividade

Recebe o processo aberto no fluxo e uma lista de campos, cada um com nome e valor. Também
manipula **grid**: incluir, alterar e remover linhas, informando a ação desejada por linha.

Exige o processo e pelo menos um campo ou uma linha de grid. Sem retorno.

### Aprovar ou Rejeitar Atividade

Processo mais status, **Aprovado** ou **Reprovado**. Sem retorno.

A regra que importa: **o processo precisa estar numa atividade pendente**, senão não acontece
nada.

## Por que isso muda o jogo aqui

Hoje, quando um RPA precisa mexer no BPM, o caminho é o robô logar na interface como usuário de
sistema (aquele `tarefa.automatico` que aparece no
[treinamento-06-studio-2.md](treinamento-06-studio-2.md)) e clicar na tela, ou então alguém
escreve uma integração Java. Com essas quatro ações, o robô conversa com a plataforma por API,
sem simular usuário.

Casos em que isso resolve rápido:

- robô lê uma planilha ou um e-mail e **abre processo** por linha, em vez de o usuário abrir na mão
- robô consulta um sistema legado, **grava o retorno nos campos** e aprova a etapa
- a etapa de "usuário de sistema" do fluxo deixa de precisar de RPA de tela

## Cuidados

**A chave de API é credencial de ambiente.** Vai em parâmetro do robô marcado como
**segredo** (`{{SEGREDOS.x}}`), nunca em `{{PARAMETROS.x}}`, porque parâmetro comum entra no
código compilado. Ver [roberty-plataforma.md](roberty-plataforma.md).

**Nenhuma das três ações de escrita tem retorno.** Não dá para conferir sucesso pelo retorno da
ação, então a validação tem que ser feita depois, consultando o processo ou o banco.

**Acesso à open-api precisa ser liberado pela Lecom**, igual ao acesso de banco e SSH.

## O que ainda não sei

- se essas ações funcionam com a 5.x ou só da 6.0 para cima
- qual o formato exato do "id do processo": se é o `COD_FORM` ou outro identificador
- se a atualização de campo respeita a visibilidade da etapa, ou se grava mesmo em campo oculto

Isso só se responde testando num ambiente. Vale perguntar ao Haislan se algum cliente já usa.
