# Treinamento Lecom - módulo 03, Admin e SSO

Transcrito de `03 - Módulos Admin e SSO.mp4` (1h18). É o módulo que define **quem vê o quê**
e **quem recebe cada atividade**. Segundo o instrutor, é aqui que "geralmente dá xabu".

## Cadastro de usuário

Obrigatórios: nome, e-mail, login, senha, **departamento**. Grupo e função são opcionais,
e a pessoa pode ter **vários grupos e várias funções**.

Login segue o padrão da empresa: na Verity e na Alper é o próprio e-mail sem o domínio;
outras empresas usam matrícula.

Endereço, número, complemento e celular existem mas ninguém preenche.

| Status | Quando acontece |
|---|---|
| **bloqueado** | o próprio sistema marca depois de 3 ou 5 tentativas erradas. Só um administrador desmarca |
| **inativo** | pessoa desligada |

### Senha expira

Por padrão **sim**. Desmarcar só para **usuário de sistema**: execução automática, usuário
público, RPA, integração. O motivo é prático:

> "Para que nós não tenhamos suporte recorrente de acesso negado, a gente cadastra como
> Never Expired."

## Permissão para pesquisa: a que mais causa problema

Três níveis, e a escolha errada vaza dado ou trava o usuário.

| Nível | O que a pessoa consulta |
|---|---|
| **Completa** | tudo, qualquer processo do ambiente, de qualquer área |
| **Parcial** | o que ela **abriu** mais o que ela **participou** (executou alguma atividade) |
| **Sem permissão** | só o que ela **abriu** |

**O padrão é Parcial.** Completa só para quem modela (nós), diretoria (CIO, CEO, VP) e
eventualmente uma equipe de performance que cuida do ambiente. Sem permissão é para
terceiros: fornecedor e cliente com acesso ao ambiente.

Se um gestor precisa ver tudo de um processo específico, **não se dá Completa no usuário**.
Dá-se acesso completo **naquele modelo**, dentro da modelagem. A regra geral vale para tudo:
permissão ampla vai no modelo, não no perfil.

## Campos especiais e LGPD

Campo marcado na modelagem como **"campo pessoal ou sensível"** (a própria ferramenta cita a
Lei Geral de Proteção de Dados no tooltip) só é visto por quem tem a permissão de campos
especiais. Exemplos: salário de uma admissão, valor de contrato, valor estimado de uma vaga.

Mesma lógica da pesquisa: **não marcar no usuário**, e sim dar a permissão no modelo, para o
grupo certo (RH no processo de admissão, financeiro e comercial em processos de contrato).
Marcar no usuário libera o dado sensível de **todos** os processos, o que é problema de LGPD.

## Usuário substituto

Define quem assume as atividades de alguém num período (férias, afastamento). A partir do
salvamento, tudo que iria para a área de trabalho da pessoa vai para o substituto.

## Chave de API

Gerada no cadastro do usuário. **Aparece uma vez só**, então copiar e guardar onde a
integração consiga ler. Se perder, deleta e gera outra. Um usuário pode ter várias chaves,
uma por integração.

## atosmaster: o acesso que libera modelagem

Usuário restrito, **não passar para o cliente**. É o único lugar onde se dá a permissão de
**modelista**, ou seja, criar fluxograma e processo no Studio.

Pegadinha clássica, que o instrutor diz ver em quase todo mundo que começa:

> "A pessoa fala: mas eu marquei o alterar processos e ela não consegue alterar o processo.
> Aí eu falo: lembra do atosmaster?"

O campo **"alterar processos"** no perfil comum **não** dá acesso de modelista. É outra coisa,
bem restrita, e o instrutor nem usa. Ou a pessoa é modelista pelo atosmaster, ou não é.

## Importação de usuários

Nativamente não existe sincronização automática. As opções:

- **Importar do LDAP**: lista o diretório e importa sem preencher campo a campo
- **Importar do Excel**: baixa o modelo, que tem abas para **departamentos, grupos, funções e
  usuários**, com legenda e senha temporária de primeiro acesso. É o preferido em ambiente novo
- Para automatizar de verdade, cria-se um **robô** que roda de madrugada importando do Totvs,
  da folha ou do AD

## Identificador: a regra que atravessa a ferramenta inteira

Usuário, grupo, departamento, função, campo, atividade e template **todos têm um
identificador** gerado sem acento, sem espaço e sem caractere especial.

> "Depois quando a gente precisa de uma query, quando a gente precisa configurar no modelo um
> grupo, função ou usuário, a gente não coloca o nome bonito. O sistema sempre vai pedir o
> identificador."

## Grupo, departamento e função

A lógica oficial:

| Conceito | O que é |
|---|---|
| **Grupo** | fica **acima** do departamento porque cruza departamentos. É a squad: engenheiro de dados, analytics, BPMS, tech lead, APO, analista de processos |
| **Departamento** | a estrutura da empresa: RH, comercial, hiperautomação |
| **Função** | o cargo **dentro** do departamento: tech recruiter dentro do RH, desenvolvedor dentro de hiperautomação |

E a realidade, dita com todas as letras:

> "No final, os consultores são tudo preguiçosos, esquecem que existe função na ferramenta e
> colocam tudo em grupo. Se você precisar rotear, pode criar só o grupo e esquece função."

Vale saber a lógica, mas o padrão de fato do time é **grupo**.

### Roteamento

Rotear é passar de uma etapa para outra. Dá para rotear para **grupo, função, usuário
específico ou usuário logado**.

**Não dá para rotear para departamento.** Departamento serve para configurar quem pode
**abrir** o processo. Confundir isso é erro comum.

## Calendário: o que faz o SLA funcionar

No Admin se configura o **horário útil** (segunda a sexta, das 8 às 18, por exemplo) e os
**dias não trabalhados** (carnaval, natal, ano novo, recesso).

E aqui está a informação que evita configurar SLA errado:

> **O SLA é configurado em horas e percorre só o horário útil.**

Com expediente das 8 às 18, **um dia útil = 10 horas**. Se o cliente pede "SLA de um dia",
configura-se **10**, não 24. Um SLA de 24 horas equivaleria a dois dias e meio.

SLA rodando em fim de semana não existe na prática. Se fosse necessário, teria que configurar
o calendário como 7 dias por semana. Robô que roda de madrugada é outra coisa, configurado no
próprio robô.

## Configurações do ambiente

| Configuração | Observação |
|---|---|
| máximo de tentativas | o que gera o status "bloqueado" |
| dias para expirar senha | padrão **90 dias** |
| autenticação automática por chave | com LDAP/SAML/OAuth, a pessoa já autenticada no notebook cai direto na área de trabalho |
| autenticação automática na execução por e-mail | permite **aprovar a atividade pelo botão no e-mail**, sem entrar na plataforma |
| label do 1º, 2º e 3º campo | até **três campos extras** no cadastro de usuário. Uso real: guardar o usuário do **Totvs RM**, que não segue o mesmo login do LDAP, ou o CPF. Não dá para torná-los obrigatórios |
| máximo de acessos múltiplos | quantos processos dá para aprovar de uma vez (padrão 10 ou 25) |
| URL da plataforma | usada pelos web services para abrir e aprovar processo |
| servidor de e-mail | configurado uma vez, é quem dispara as notificações e a cobrança de atraso |

### A pegadinha do ambiente demonstrativo

Em ambiente de homologação/aceite marcado como **demonstrativo**, existe **uma senha padrão
única para todos os usuários**, configurada no ambiente. A senha individual do cadastro
**não funciona**.

Foi o que aconteceu na gravação: criaram o usuário com uma senha, tentaram logar e deu acesso
negado, inclusive com o atosmaster. Em ambientes do tipo, a senha era `alper23` e `verity2025`.

Se der acesso negado em homologação, **conferir a senha padrão do ambiente antes de procurar
qualquer outra coisa**.

## Módulo SSO (Login)

Faz a gestão de acesso **entre os módulos** da plataforma, por **grupo**. Existem grupos como
"acesso BPM", "acesso ECM", "administrativo".

> "Se eu não tivesse colocado acesso BPM, ia dar acesso negado para você."

Ou seja: usuário cadastrado, com permissão e grupo certo no processo, **ainda assim não entra**
se não estiver no grupo de acesso do módulo. É a segunda causa de "acesso negado".

Outras configurações do SSO:

- **autenticação**: LDAP (antigamente), **SAML** (hoje, inclusive na Alper) e OAuth.
  Quando integrado, a senha cadastrada no Lecom **não vale nada**, vale a do provedor
- **identidade visual**: cor de fundo, logo, banner e alinhamento da tela de login
- **senha forte**, comparação da nova com a antiga
- **MFA**, por Google Authenticator ou e-mail
- **licenças**: cada módulo tem data de expiração e **alguém da Lecom precisa entrar e renovar
  na mão**, não é automático. O ECM tem versão básica e completa, com diferenças de recurso

## Coisas que existem e ninguém usa

Dito abertamente por quem tem 12 anos de ferramenta: **Propriedades** ("nunca usei, nem sei
para que serve"), **propriedades externas** e **notificação mobile** ("nunca vi ninguém usar").
Não perder tempo com isso nem prometer para cliente.
