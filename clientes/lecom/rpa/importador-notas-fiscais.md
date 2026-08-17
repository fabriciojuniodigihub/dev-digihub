# Importador de Notas Fiscais, Portal Prefeitura

Robô do Roberty. PDD escrito pelo Maycon Moraes Sene em 17/08/2026.
No Studio aparece como **Importação Notas Fiscais**, ambiente de homologação.

**Credenciais não ficam aqui.** Estão no PDF `Portal de NOTA E BOLETO PARA CLIENTE - IMPORTADOR`,
guardado fora do versionamento. São o CNPJ e a senha do contribuinte no portal da prefeitura,
mais a chave do importador.

## O que ele faz

Todo dia às **8h00**, entra no portal da Prefeitura de Bauru, pega as notas fiscais emitidas e
importa na base auxiliar da Lecom pelo app importador.

O contribuinte é a própria **Lecom Tecnologia S.A.**, ou seja, é automação de processo interno
do cliente Lecom Administrativo.

## Fluxo

```
Abrir Navegador
  → Acessar Portal Prefeitura Bauru
  → Fazer Login (usuário e senha)        ⟵ captcha pendurado aqui
  → Entrar em NFe e Filtrar por Data
  → Selecionar NFes do dia e baixar .XLS
  → Inserir na Base Auxiliar Lecom
```

## Passo a passo, resumido do PDD

**1. Abrir navegador** em `tributario.bauru.sp.gov.br`, tela "Painel do Contribuinte".

**1.1 a 1.4. Login.** Digita o CNPJ, digita a senha, **resolve o captcha**, clica em Entrar.

**2 a 2.3. Chegar na nota fiscal.** Ícone Nota Fiscal, botão Continuar (a conta tem mais de uma
empresa, então precisa escolher a linha), depois o ícone Consultar Nota(s) Fiscal(is).

**2.4 a 2.7. Filtrar.** Troca o campo de busca de `NF` para `DtEmissao`, digita a data no
seletor e clica na lupa "Realizar Busca Simples".

**3.1 e 3.2. Exportar.** Checkbox "selecionar tudo" no cabeçalho e depois o botão "Exportar
Notas Fiscais marcadas para arquivo XLS". O arquivo cai como `nfe.xls` em Downloads.

**4.1 a 4.3. Sair.** Ícone do cadastro, botão Sair, e confirma o OK do alerta de logoff.

**5.1 a 5.6. Importar.** Abre o app importador em
`plataforma.lecom.com.br/app-ext/app_portal_importador/`, digita a chave, seleciona o `nfe.xls`
de Downloads e clica em Importar.

**6. Limpar.** Apaga o arquivo baixado da pasta Downloads.

## Observações minhas

**O captcha é de imagem com texto distorcido**, tipo `SW8mxn`. Não é reCAPTCHA. Então a ação
nativa `Solve common captcha` do Roberty deve dar conta, sem serviço externo.
Ver [roberty-plataforma.md](../../../notas/roberty-plataforma.md).

**O login sai e o arquivo é apagado no fim.** Os dois passos são boa prática e já estão no
desenho, vale manter em qualquer alteração.

**O passo 2.1 existe porque a conta enxerga duas empresas**, Lecom Tecnologia e Lecom
Participações. Se o robô não escolher a linha certa, importa nota da empresa errada.

**A URL de importação é `app-ext`**, que é o contexto das aplicações externas da plataforma,
rodando no `tomcat_app` separado.

## O que falta no PDD

Quatro seções ficaram com o texto de exemplo do modelo: Entradas, Saídas, **Tratamento de
Exceções** e Testes e Validação.

É onde entra a melhoria pedida, de mandar e-mail quando estourar exceção. A decisão precisa ser
escrita ali, além de implementada.

## Melhorias em discussão

**Retry do login com captcha.** Hoje o loop envolve só a leitura do captcha, e por isso a nova
tentativa não passa: depois de errar, o servidor invalida o captcha e o token da sessão. O loop
tem que envolver a tentativa inteira, com `Recarregar Página` no topo de cada iteração e
verificação por elemento que só existe logado. Desenho completo combinado com o Maycon.

**E-mail na exceção**, com o contexto da falha, e sub-rotina de exceção configurada no robô.

**Cuidado com número de tentativas:** portal de governo bloqueia conta por tentativa repetida.
Quatro é suficiente.
