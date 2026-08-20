// Testa emailValido e sanitizaEmail com um Form falso, fora da plataforma.
const fs = require('fs');
const vm = require('vm');
const path = __dirname + "/analise_documentos.js";

let campoValor = '', campoErros = [], gridLinhas = [], gridErro = '';

const campoEmail = {
  value: v => (v === undefined ? campoValor : (campoValor = v)),
  errors: e => (e === undefined ? campoErros : (campoErros = e)),
  subscribe: () => {}, required: () => {}, className: () => {}
};
const gridAssinantes = {
  fields: () => campoEmail,
  dataRows: () => gridLinhas,
  errors: e => (e === undefined ? gridErro : (gridErro = e)),
  subscribe: () => {}, visible: () => gridAssinantes
};
const ctx = {
  ProcessData: { activityInstanceId: 2 },
  Form: {
    grids: () => gridAssinantes,
    fields: () => ({ value: () => '', subscribe: () => {}, visible: () => {}, required: () => {},
                     label: () => {}, className: () => {}, errors: () => {} }),
    actions: () => ({ subscribe: () => {} }),
    apply: () => Promise.resolve(), subscribe: () => {}, errors: () => ({})
  },
  $: () => ({ ready: () => {} }),
  JSPadrao: { validaEmail: () => true, validaCPF: () => true },
  console, alert: () => {}, document: {}
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path, 'utf8'), ctx);

const casos = [
  ['teste@@teste.com',        false, 'o caso do print'],
  ['teste@teste.com',         true,  'valido simples'],
  ['  Teste@Teste.COM  ',     true,  'com espaco e maiuscula'],
  ['teste',                   false, 'sem arroba'],
  ['teste@',                  false, 'sem dominio'],
  ['@teste.com',              false, 'sem usuario'],
  ['teste@teste',             false, 'dominio sem ponto'],
  ['teste@teste.c',           false, 'tld de uma letra'],
  ['teste@teste..com',        false, 'ponto duplo no dominio'],
  ['.teste@teste.com',        false, 'ponto no comeco'],
  ['teste.@teste.com',        false, 'ponto no fim do usuario'],
  ['teste@.com',              false, 'dominio comecando com ponto'],
  ['te ste@teste.com',        false, 'espaco no meio'],
  ['nome.sobrenome@lecom.com.br', true, 'dominio composto'],
  ['nome+tag@lecom.com.br',   true,  'com mais'],
  ['nome_1@sub.lecom.com.br', true,  'subdominio'],
];

let falhas = 0;
console.log('CAMPO: sanitizaEmail bloqueia o valor invalido?\n');
for (const [entrada, esperado, descricao] of casos) {
  campoValor = entrada; campoErros = [];
  const passou = ctx.sanitizaEmail();
  const limpou = campoValor === '';
  const ok = passou === esperado && (esperado ? !limpou : limpou);
  if (!ok) falhas++;
  console.log(`  ${ok ? 'ok  ' : 'FALHA'} ${JSON.stringify(entrada).padEnd(32)} ${(esperado?'valido':'invalido').padEnd(9)} ${descricao}`);
  if (!esperado && !limpou) console.log('        ^ nao limpou o campo, a linha entraria na grid');
}

console.log('\nGRID: validaEmailsDaGrid barra o envio?\n');
const cenarios = [
  [[{ASS_EMAIL:'a@lecom.com.br'},{ASS_EMAIL:'b@lecom.com.br'}], true,  'todos validos'],
  [[{ASS_EMAIL:'a@lecom.com.br'},{ASS_EMAIL:'teste@@teste.com'}], false, 'um invalido'],
  [[{ASS_EMAIL:''}], false, 'vazio'],
];
for (const [linhas, deveriaPassar, descricao] of cenarios) {
  gridLinhas = linhas; gridErro = ''; let rejeitou = false;
  const passou = ctx.validaEmailsDaGrid(() => { rejeitou = true; });
  const ok = passou === deveriaPassar && rejeitou === !deveriaPassar;
  if (!ok) falhas++;
  console.log(`  ${ok ? 'ok  ' : 'FALHA'} ${descricao.padEnd(16)} ${deveriaPassar ? 'passa' : 'barra'}${gridErro ? '  -> ' + gridErro : ''}`);
}

console.log(falhas === 0 ? '\nTODOS OS TESTES PASSARAM' : `\n${falhas} FALHA(S)`);
process.exit(falhas ? 1 : 0);
