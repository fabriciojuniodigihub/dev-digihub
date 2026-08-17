# Plataforma Lecom - o que é e como se integra

Base técnica da maior parte do que a Digihub entrega. Versão documentada mais recente: **5.70**.

## Documentação oficial (pública, sem login)

| Fonte | URL |
|---|---|
| Manual da plataforma v5.70 | https://lecomsa.atlassian.net/wiki/spaces/PLV570/overview |
| Manual da plataforma v5.60 | https://lecomsa.atlassian.net/wiki/spaces/PLV5 |
| Referência de API | https://lecomsa.readme.io (antigo api.lecom.com.br) |
| Índice de todas as páginas da API | https://lecomsa.readme.io/llms.txt |
| Portal de Serviços (produto) | https://www.lecom.com.br/portal-de-servicos/ |
| Governance (produto) | https://www.lecom.com.br/governance/ |
| Governo | https://www.lecom.com.br/governo/ |

O `llms.txt` é o atalho: lista as ~200 páginas da referência de API com link direto, e cada
página tem versão `.md` no fim da URL, que abre em texto puro.

## Módulos da plataforma

| Módulo | Para que serve |
|---|---|
| Workspace | onde o usuário final executa e acompanha suas atividades |
| Studio | modelagem e configuração de processos (perfil modelista) |
| Análises | indicadores e gráficos por processo |
| Documentos | GED, indexação e organização documental |
| Admin | usuários, grupos, funções, departamentos |
| Login | perfis, licenças, gestão do ambiente |
| Cadastro Fácil | formulários e tabelas sem código |
| RPA (Roberty) | automação de tarefas repetitivas |

Capacidades vendidas: BPM com BPMN 2.0, RPA, IA na modelagem e triagem, Analytics, GED, OCR.
Infra em nuvem privada dedicada. Acreditação SOC ISAE 3402 e conformidade LGPD.
O Studio centraliza componentes reutilizáveis: conexões externas, rotinas JavaScript, gráficos,
robôs e integrações.

## API REST - o essencial

- Base: `https://api.lecom.com.br`
- Versão mínima da plataforma: 5.50 RTM 1.06
- Toda chamada exige dois parâmetros: **`apikey`** e **`X-Server`**
- `X-Server` é o domínio do ambiente do cliente. Ex.: URL `https://education.plataformalecom.com.br/`
  vira X-Server `education.plataformalecom.com.br`
- `apikey` é gerada em **Admin > cadastro de usuários > aba Chaves de API**: dá um apelido,
  cria, e copia. **A chave só aparece uma vez.** Para trocar, revoga o apelido e cria outro
- Revogar quebra imediatamente qualquer aplicação que use aquela chave
- Verbos padrão REST (GET, POST, PUT, PATCH, DELETE), respostas 2xx/4xx/5xx
- Endpoints são versionados de v1 a v5, convivendo ao mesmo tempo, com alguns marcados
  como deprecados. Sempre conferir qual versão o ambiente do cliente suporta

## Famílias de endpoints

**Processos (instâncias)**
abrir processo, atualizar dados da atividade, aprovar/rejeitar, consultar atividades pendentes
por usuário, encaminhar, incluir e remover responsável, cancelar processo, tirar atividade da
hibernação, consultar dados da atividade (com e sem grid), alterar prazos de SLA, calcular
tempo útil, pesquisa avançada de processos.

**Definições de processo**
listar processos que o usuário pode abrir, pendências agrupadas por processo, definições de
campos do formulário, campos de resultado, fases do processo, atividades da fase, informações
gerais da instância.

**Documentos em processo**
propriedades do template, incluir, substituir, baixar, desvincular e excluir documento, cada
um em três variações: campo simples, dentro de grid, e em linha específica da grid.

**Admin**
usuários (listar, criar, editar, atualizar parcial), grupos, funções, departamentos, com as
associações cruzadas entre eles, e criação/revogação de apikey por usuário.

**ECM**
listar documentos e dossiês, metadados, versões, templates permitidos, definições de campos
de metadados, upload e download.

## O que isso significa no dia a dia

Quase toda integração que a área de Serviços vai fazer cai em um destes três blocos:
abrir/movimentar processo, ler ou gravar dados de formulário, e anexar/baixar documento.
Provisionamento de usuário e permissão vem do bloco Admin.
