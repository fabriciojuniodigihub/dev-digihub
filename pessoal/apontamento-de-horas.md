# Apontamento de horas

Uma entrada por dia, em texto corrido, do jeito que vai para a planilha. O pessoal aqui é
prático, então nada de explicação longa: o problema que tinha e como resolvi.

## 20/08/2026

**SD-2606, fluxo de viagens.** O cliente ampliou o escopo duas vezes no mesmo dia. De manhã o
Marketing entrou junto com o Comercial, e depois o Rafael pediu que ele próprio, o Tiago e o
Ailton continuassem passando direto. Reescrevi as duas condições de roteamento para atender
isso. No caminho descobri que a exceção do Tiago e do Ailton comparava um campo vazio em 332 de
332 processos e nunca tinha funcionado; troquei pelo campo que é preenchido de verdade.

Levantei em produção quem passou pela Aprovação do Gestor: 84 de 332 processos, e só três
pessoas aprovaram alguma coisa. Gerei planilha com quem abriu e quem aprovou, que o Maycon
pediu.

Testei em homologação com o José, o Mário, o Tiago, a Ynaiã e o Rafael, além dos cenários com e
sem item, e todos seguiram para o destino esperado. Também achei que 9 usuários estão com o
departamento diferente entre produção e homologação, o que estava fazendo os testes darem
resultado enganoso.

Publicação em produção autorizada pelo José para hoje após as 17h.

**Análises e Assinatura de Documentos.** A validação de e-mail dos assinantes mostrava o alerta
e deixava adicionar o e-mail errado na tabela do mesmo jeito. Refiz a validação para limpar o
campo e barrar a inclusão, acrescentei a checagem no envio da etapa, cobri as etapas que não
tinham validação nenhuma e escrevi 19 testes automatizados.

**Atendimento.** Textos para o chamado e para os e-mails do Rafael e do Departamento Pessoal.

**Reunião.** Alinhamento do Boleto automático, das 15h às 15h30, com a Emilia Boscolo, o
Gabriel Soares e o Maycon.

**Estudo.** Roberty.
