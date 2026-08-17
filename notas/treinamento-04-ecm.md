# Treinamento Lecom - módulo 04, ECM (documentos)

Transcrito de `04 - Módulo ECM.mp4` (30 min). O mais curto e um dos mais úteis.

## Uma frase resume o módulo

> "Sempre quando for pensar em ECM e Lecom, sempre coloque na cabeça que a gente está falando
> de **template**."

Template é a **estrutura de um tipo de documento**. A analogia usada: a prateleira onde cada
tipo de documento é guardado. Todo arquivo anexado num processo está associado a um template.

## O que se configura num template

| Configuração | Detalhe |
|---|---|
| **Identificador** | sem acento, espaço ou caractere especial, como no resto da ferramenta |
| **Tipos de arquivo permitidos** | PDF, docx, xlsx, txt, o que for. Bloqueia o resto |
| **Tamanho máximo** | em KB (1024 = 1 MB) |
| **Modelo padrão** | um documento base. Em vez de anexar do zero, a pessoa clica em criar, baixa o modelo já com logo e formatação, edita e reenvia |
| **Marca d'água** | imagem de fundo do PDF |
| **Categoria** | organiza os templates, como as categorias de processo |
| **Idioma** | português, inglês, espanhol |
| **PDF assinada** | assinatura por certificado. Existe, mas é raro. O instrutor nem passa em treinamento |

## Metadados

São informações que o documento obrigatoriamente carrega. O ganho está na automação:

> "Quando é anexado o arquivo, o próprio processo tendo o CNPJ da operadora, eu consigo puxar
> esse CNPJ para o arquivo anexado."

Ou seja, **o formulário transfere o dado automaticamente para o documento armazenado**. Depois
dá para pesquisar direto no ECM, sem passar pelo BPM.

Cada metadado tem: obrigatório, pesquisável, usado como resultado, **chave primária** (valor
único, mesmo conceito de banco) e tamanho.

Exemplo dado: um template para guardar documento de veículo, com metadados de placa e renavam.

## Permissão do template: o erro que trava todo mundo

Depois de criar o template, **botão direito, Permissões**, e dar acesso ao grupo ou usuário.
Sem isso o template simplesmente **não aparece** na hora de criar documento.

Aconteceu ao vivo na gravação: criaram o template, foram usar, não apareceu, e o aluno acertou
o diagnóstico antes do instrutor. Se um template sumiu, é permissão.

A permissão também aceita filtro por metadado: "este usuário só consulta documentos deste
template onde o CNPJ for igual a tal".

## Check-out e check-in

Para editar um documento existente:

1. **Check-out**: baixa o arquivo e **deixa o documento indisponível para consulta**, porque
   está sendo editado
2. edita local
3. **Check-in**: sobe de volta, escolhendo **sobrescrever a versão** ou **versionar** (v1.1, v2)

É o mecanismo que evita duas pessoas editarem o mesmo documento ao mesmo tempo.

Outras ações no botão direito: visualizar, ver versões (dá para ver que existem, mas parece
não dar para baixar as antigas), baixar cópia, exportar para impressão, **adicionar rendition**
(carimbo ou marca sobreposta, tipo "arquivo não autorizado") e excluir.

## Busca dentro do conteúdo do arquivo

Existe pesquisa por **conteúdo do arquivo**, não só por metadado. Digitando "45 dias" ele
encontra documentos que tenham esse texto dentro. É o OCR da plataforma.

## Dossiê

Agrupa **vários templates que compartilham o mesmo metadado**, para pesquisar uma vez e trazer
documentos de todos.

O exemplo: numa admissão a pessoa anexa RG, CPF e CNH, cada um no seu template, mas todos têm
o metadado "nome completo". Criando um dossiê que relaciona esses templates pelo metadado
comum, uma busca por nome traz os três de uma vez.

## A informação que evita prometer o que não existe

> "Eu fiz em um ambiente que tem licença **completa** de ECM. Dá uma olhada no ambiente da
> Verity, você vai ver que **na licença básica você não tem esses componentes**, inclusive
> esse dossiê que eu expliquei agora e também **metadados**."

**Licença básica de ECM não tem dossiê nem metadados.** Antes de desenhar solução que dependa
de metadado, conferir a licença do cliente.

## Pastas

Dá para organizar documentos em pastas dentro do ECM, mas depende de permissão específica no
usuário: "pode criar pastas" e "pode tornar pastas públicas". E às vezes só reflete depois de
deslogar e logar de novo.

## Um detalhe operacional que apareceu de passagem

> "Semana passada foi excluído todos os documentos do ECM da Alper."

Aconteceu de verdade, e por isso várias buscas na gravação não retornaram nada. Serve de
lembrete de que exclusão em ECM é destrutiva e o ambiente de aceite é usado de verdade.
