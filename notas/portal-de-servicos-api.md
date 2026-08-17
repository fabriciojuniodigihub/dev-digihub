# Portal de Serviços - API de integração com o BPM

Fonte: `Documentação/Portal/Portal de Serviços - Manual 5.0 API BPM.pdf` (manual da própria
Digihub). O outro PDF da pasta, `Lecom Portal - Manual do Usuário.pdf`, é a visão do usuário final.

## Configuração antes de tudo

No Portal, com perfil de administrador: **Configurações > Parâmetros**, preencher
"Usuário da API do Portal" e "Senha da API do Portal". Sem isso nenhum endpoint responde.

## Autenticação

JWT via Bearer Token, obtido antes de qualquer chamada e reenviado em toda requisição.

```
GET /api/v1/lecom/token?username={usuario}&password={senha}
POST /api/v1/lecom/token          (mesma coisa, credenciais no body JSON)

// resposta
{ "token": "eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9..." }

// nas demais chamadas
Authorization: Bearer {token}
```

A senha vai URL-encoded na querystring. Validade do token depende da configuração do ambiente.

## Endpoints

| Método | Endpoint | O que faz |
|---|---|---|
| GET/POST | `/api/v1/lecom/token` | obtém o JWT |
| GET | `/api/v1/lecom/getUser?cpf=&cnpj=&email=` | consulta usuário (pelo menos um parâmetro) |
| GET | `/api/v1/lecom/user/{codProcesso}` | consulta usuário pelo código do processo BPM |
| POST | `/api/v1/lecom/user` | cria usuário no portal |
| POST | `/api/v1/BPM/processo` | **encaminha processo do BPM para o portal** |
| PUT | `/api/v1/BPM/processo/AtualizaUsuario` | troca o responsável pela solicitação |
| GET | `/api/v1/lecom/getAllUsers` | lista todos |
| GET | `/api/v1/lecom/getUser/group?codGroup=&codServico=&description=` | lista por grupo/serviço |

Criar usuário: `name`, `cpf` e `email` obrigatórios; `phone`, `businessName` e `businessCnpj`
opcionais. CPF no formato `000.000.000-00` e CNPJ `00.000.000/0000-00`.

Enviar processo:

```json
POST /api/v1/BPM/processo
{
  "codProcesso": "4410",
  "codFormLecom": "268",
  "codVersaoLecom": "1",
  "cpf": "549.778.485-27",
  "cnpj": "71.058.930/0001-44"
}
```

`cpf` ou `cnpj`, pelo menos um. Resposta usa `code` `0` para sucesso e `-1` para erro,
não o status HTTP.

## Os dois fluxos

**BPM para Portal** (processo nasce no BPM):
token, `getUser` pelo CPF, `POST user` se não existir, `POST /BPM/processo`.

**Portal para BPM** (recuperar dados do solicitante):
token, `GET /lecom/user/{codProcesso}`, e usar o CPF/CNPJ nas regras do BPM.

## Erros conhecidos

| Mensagem | O que significa |
|---|---|
| `Registro já Realizado!` | processo já foi enviado antes, não reenviar |
| `Usuário não encontrado!` | criar o usuário primeiro |
| `Parâmetro CPF inválido!` | formatação do CPF |

## Integração pronta

Existe a classe `sendPortalServicos.java`, usada como módulo de integração dentro do BPM
para encaminhar processo ao Portal. O manual só linka o fonte no Google Drive, não vem no
pacote. **Pendência: pedir esse arquivo para o time.**

## Autenticação do usuário final no Portal

OAuth padrão, OAuth PKCE, GOV.BR e validação via API própria. Isso é configuração do
Portal, não desta API.
