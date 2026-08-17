# Trabalho na Digihub - regras desta pasta

Contexto: Fabrício trabalha na **Digihub Tecnologia** (Bauru/SP), área de **Serviços**, desde
17/08/2026. Gestor direto: Haislan Lima, Head de Serviços. Tudo aqui é material de trabalho.

Antes de qualquer tarefa, ler `notas/empresa.md`, `notas/plataforma-lecom.md` e
`notas/ferramentas-e-canais.md`.

## Regra número um: nada pode parecer escrito por IA

Vale para **todo** artefato que sai desta pasta e chega em outra pessoa: código, commit,
e-mail, resposta de chamado, documentação, mensagem no Discord, comentário no Jira.
Neste chat aqui não precisa, só no que é entregue.

O que denuncia IA e por isso está proibido:

- travessão (—) em qualquer lugar. Usar hífen ou vírgula
- abrir com "Ótima pergunta", "Claro!", "Vamos lá", "Espero ter ajudado"
- fechar com resumo do que acabou de ser dito
- bullet para absolutamente tudo. Texto corrido e tabela são mais naturais
- estrutura perfeita demais, com seção para cada assunto possível
- buzzword: robusto, escalável, seamless, otimizado, solução completa, alavancar
- emoji em contexto formal
- comentário no código explicando o óbvio
- cobrir todos os edge cases na documentação. Gente de verdade não faz isso

O que fazer no lugar:

- frase direta, primeira pessoa, tamanho irregular
- em chamado, seguir o tom que o time já usa: saudação curta com o nome de quem pediu,
  o que causava o problema, o que foi feito, e pergunta se pode subir para homologação
- em e-mail, português correto e formal sem ser rebuscado
- acentuação sempre correta, em tudo, sem exceção

## Commits

Conventional Commits com os tipos oficiais apenas: `feat`, `fix`, `docs`, `style`, `refactor`,
`perf`, `test`, `build`, `ci`, `chore`, `revert`. Escopo entre parênteses é opcional.

- português com acentuação correta
- imperativo: `fix(portal): corrige token expirado na autenticação OAuth`
- nunca travessão
- **nunca** `Co-Authored-By` nem qualquer menção a Claude, IA ou assistente
- se o time tiver o costume de citar o chamado, seguir o padrão deles (ex.: `SD-2602`)

## Código

Vale o padrão de engenharia que já uso em todos os projetos (Clean Architecture, validação de
entrada, sem segredo no código, sem `console.log` em aplicação, teste de comportamento).
Duas ressalvas específicas daqui:

- **o padrão do repositório vence o meu padrão.** Código novo tem que ficar
  indistinguível do que já está lá: mesma nomenclatura, mesma densidade de comentário,
  mesmo estilo. Ler antes de escrever
- stack da casa: Java, JavaScript, SQL, RPA, integração por API REST com a Plataforma Lecom

## Como trabalhar

- **não alterar nada que não foi pedido.** Se eu achar outro problema, aviso e espero
- testar de verdade antes de dizer que está pronto: caso feliz, caso de erro, entrada
  inválida, e o uso real que a pessoa vai fazer
- ao terminar, explicar o que foi feito e o que foi alterado, arquivo por arquivo
- se um teste falhar, dizer que falhou e mostrar a saída. Nunca maquiar
- dado de cliente, credencial e conteúdo de chamado ficam nesta máquina. Não subir para
  serviço externo sem Fabrício pedir
