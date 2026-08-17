# Cadastro Fácil - apresentação para a Eucatex

Transcrito de `[Eucatex] Apresentação Cadastro Fácil-20260203.mp4` (23 min). É uma
apresentação **comercial real**, feita para um cliente (Eucatex) que usa Datasul, com o
desenvolvedor do produto (Lucas) na chamada.

Vale por dois motivos: explica o produto e mostra **como se vende um módulo internamente**.

## O problema que ele resolve

Quando não há acesso direto a uma base de terceiro (SAP, Protheus, Datasul), o cliente acaba
exportando os dados e a gente precisa carregá-los para dentro do Lecom. Do jeito antigo, isso
vira:

1. um subprocesso só para upload do arquivo
2. uma integração Java para gravar na base auxiliar
3. uma tabela auxiliar criada na mão
4. depois, uma lupa ou um select para consultar

> "SAP a gente tem um enorme problema. Empresas não conseguem criar recurso do lado do SAP para
> disponibilizar API. Então na maioria das vezes a pessoa opta por exportar os dados."

O mesmo vale para alçadas grandes. O exemplo dado: a alçada da **Ser Educacional tem 12 mil
linhas**.

## O argumento de venda, com número real

Ele mostrou um escopo real da equipe de serviços da Digihub, com 8 processos:

| Item | Horas |
|---|---|
| subprocesso de upload de carga de clientes (6.966 registros) | 24 |
| subprocesso de upload de carga SAP produto | 24 |
| três planilhas de 60 mil linhas | 60 |
| criação das tabelas para consumo por lupa | resto |
| **Total** | **226 horas** |

> "Coisa que a gente vai demorar dois, três dias para fazer, a gente consegue fazer em **uma
> hora** com arrasta e puxa."

E o fechamento do argumento comercial:

> "O cara vê o orçamento de 220 horas só para coisas que o módulo vai entregar. Isso dá três,
> quatro anos de licença. E ele não fica engessado: consegue criar novos cadastros além daquele
> escopo específico e **tirar isso da mão da consultoria**."

## Como funciona

A interface é o modelista do Lecom, só que apenas a parte de campos: arrasta e solta, label,
identificador, campo obrigatório, campo único, reordenação por arraste. Sem fluxograma.

O cadastro se comporta como uma **grid**: cada registro é uma linha.

**Importação e exportação por planilha**, com três modos: sobrescrever tudo, substituir valores
ou ignorar os existentes e subir só os novos. Também dá para editar e excluir registro pela
tela.

**Permissões por grupo**: quem consulta e quem edita, separadamente. Igual ao Lecom.

## A API

Cada cadastro expõe um endpoint REST com **GET, POST, PUT e DELETE**.

```
.../integration/<identificador_do_cadastro>?<filtros>
```

- o **identificador do cadastro** é o que muda a URL entre um cadastro e outro
- os campos retornados vão **separados por vírgula**
- o filtro funciona com **LIKE**, então aceita busca parcial
- autenticação por **token no header**, gerado na área de integrações

O token tem **permissão por cadastro**: define-se quais cadastros aquele token pode acessar.
Um mesmo token pode servir a vários, bastando trocar o identificador na URL.

**Como se usa no processo:**

- para **consultar**: pela **lupa**, em aplicações externas, exatamente como já se faz hoje
- para **inserir, atualizar ou excluir**: uma **integração Java** consumindo a API. A
  estimativa dada foi de cerca de 4 horas de desenvolvimento

## Stack e instalação

- back-end em **Java**, front-end em **React**
- sobe **junto com o produto Lecom**, no mesmo serviço de aplicação
- tem **banco próprio**, ao lado de SSO, ECM, BPM e da base auxiliar
- distribuído via **Docker**

Desenvolvedor do produto: **Lucas**, que estava na chamada. As novas versões estão trazendo
mais tipos de máscara e campo lista.

## Onde fica, por versão

| Versão | Onde acessa |
|---|---|
| 5.70 | menu **Cadastros**, como os outros módulos |
| 6 e 7 | vira **aplicação externa**: configura-se a URL em Aplicações e acessa por lá |

Fora o lugar do menu, é a mesma aplicação. Funciona em 5.70, 6 e 7.

## Uma informação de mercado que apareceu de passagem

> "Já vocês migram para a 7, provavelmente. Pelo menos eu estou tendo **muito projeto aqui de
> migração da 5.70 para a 7 agora**."

Ou seja, a onda de migração para a 7.0 já começou nos clientes. Isso reforça que vale dominar
a 7.0 e conhecer as quebras de compatibilidade (a `rotas-open-api` mudou bastante).

## O lado humano da venda, que vale registrar

O cliente foi honesto sobre a dificuldade real:

> "A gente está com uma categoria de usuário bem resistente à tecnologia. Tudo que a gente
> coloca, a primeira coisa é: **vocês querem fazer isso para me mandar embora?** É o velho
> digitalizar uma empresa de 30 anos."

E o contra-argumento do apresentador foi bom, porque não é técnico:

> "Você tira um pouco a resistência do próprio usuário."

Uma ferramenta de cadastro que o próprio usuário mexe assusta menos que um processo com
subprocesso e integração que só a consultoria entende.

O cliente também elogiou o arrasta-e-solta e disse, quase reclamando: "queria que a parte de
campos do Lecom fosse assim". Detalhe útil para saber onde a plataforma incomoda.

## Como a venda anda internamente

Vale conhecer o caminho, porque é a realidade de qualquer módulo à parte:

> "Agora o Caio vai convencer o Eliezer, aí o Eliezer fala com o gestor, que aciona o Júlio,
> aí começam a brigar no preço e depois volta para a gente."

Do lado da Lecom, quem trata licença e valor é o **Júlio**, com apoio do comercial.
