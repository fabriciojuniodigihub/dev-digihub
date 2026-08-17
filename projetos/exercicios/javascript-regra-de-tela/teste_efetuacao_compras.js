/*
 * Banca de teste da regra de tela, rodando em Node.
 * Simula o que a APIJS do Lecom expõe: Form, ProcessData e o $(document).ready.
 * Não é ambiente Lecom, é para provar que a lógica está certa antes de subir.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ARQUIVO = path.join(__dirname, 'efetuacao_compras_v1.0.js');

function montaAmbiente(etapaAtual) {
    const campos = {};
    const modais = [];
    let applies = 0;

    function campo(id) {
        if (!campos[id]) {
            campos[id] = { valor: '', visivel: true, obrigatorio: {}, eventos: {} };
        }
        const estado = campos[id];
        const api = {
            value(v) {
                if (v === undefined) return estado.valor;
                estado.valor = v;
                return api;
            },
            visible(v) {
                if (v === undefined) return estado.visivel;
                estado.visivel = v;
                return api;
            },
            setRequired(acao, v) {
                estado.obrigatorio[acao] = v;
                return api;
            },
            subscribe(evento, fn) {
                (estado.eventos[evento] = estado.eventos[evento] || []).push(fn);
                return api;
            },
            apply() { applies++; return Promise.resolve(api); }
        };
        return api;
    }

    const Form = {
        fields: campo,
        apply() { applies++; return Promise.resolve(); },
        addMessageModal(cfg) { modais.push(cfg); }
    };

    const contexto = {
        Form,
        ProcessData: { activityInstanceId: etapaAtual },
        document: {},
        $: (arg) => (typeof arg === 'function' ? arg() : { ready: (fn) => fn() }),
        console
    };
    contexto.$.ready = (fn) => fn();

    vm.createContext(contexto);
    vm.runInContext(fs.readFileSync(ARQUIVO, 'utf8'), contexto);

    return {
        campos,
        modais,
        applies: () => applies,
        dispara(id, evento) {
            (campos[id].eventos[evento] || []).forEach((fn) => fn());
        },
        set(id, valor) { campos[id].valor = valor; }
    };
}

/* ------------------------------------------------------------------ */

let passou = 0, falhou = 0;

function ok(descricao, condicao, obtido) {
    if (condicao) {
        passou++;
        console.log('  ok   ' + descricao);
    } else {
        falhou++;
        console.log('  FALHOU ' + descricao + (obtido !== undefined ? '  -> obtido: ' + JSON.stringify(obtido) : ''));
    }
}

console.log('\nRegra 1 - justificativa acima de R$ 10.000,00\n');

const casos = [
    ['', false, 'campo vazio'],
    ['9.999,99', false, 'abaixo do limite'],
    ['10.000,00', false, 'exatamente no limite, nao exige'],
    ['10.000,01', true, 'um centavo acima, exige'],
    ['250.000,00', true, 'bem acima, exige']
];

for (const [valor, esperado, descricao] of casos) {
    const amb = montaAmbiente(2);
    amb.set('VALOR_PRODUTO', valor);
    amb.dispara('VALOR_PRODUTO', 'CHANGE');

    const j = amb.campos['JUSTIFICATIVA'];
    ok(descricao + ' - visivel=' + esperado, j.visivel === esperado, j.visivel);
    ok(descricao + ' - obrigatorio=' + esperado, j.obrigatorio['aprovar'] === esperado, j.obrigatorio);
}

console.log('\nRegra 1b - ao baixar o valor, limpa e desobriga\n');
{
    const amb = montaAmbiente(2);
    amb.set('VALOR_PRODUTO', '15.000,00');
    amb.dispara('VALOR_PRODUTO', 'CHANGE');
    amb.campos['JUSTIFICATIVA'].valor = 'compra emergencial';

    amb.set('VALOR_PRODUTO', '900,00');
    amb.dispara('VALOR_PRODUTO', 'CHANGE');

    const j = amb.campos['JUSTIFICATIVA'];
    ok('some da tela', j.visivel === false, j.visivel);
    ok('deixa de ser obrigatorio', j.obrigatorio['aprovar'] === false, j.obrigatorio);
    ok('limpa o texto que ja tinha', j.valor === '', j.valor);
}

console.log('\nRegra 2 - mes de entrega\n');

const meses = [
    ['Maio', false],
    ['Junho', true],
    ['Abril', true],
    ['Dezembro', true],
    ['', false]
];

for (const [mes, esperaAviso] of meses) {
    const amb = montaAmbiente(2);
    amb.set('MES_ENTREGA', mes);
    amb.dispara('MES_ENTREGA', 'CHANGE');

    const teve = amb.modais.length > 0;
    ok((mes || '(vazio)') + ' -> aviso=' + esperaAviso, teve === esperaAviso, amb.modais);
    if (teve) {
        ok('  mensagem contem "Errou o mes"', /Errou o m[êe]s/.test(amb.modais[0].message), amb.modais[0].message);
    }
}

console.log('\nRegra 3 - so roda na atividade certa\n');
{
    const amb = montaAmbiente(99);
    ok('nao registra evento em outra atividade', Object.keys(amb.campos).length === 0, Object.keys(amb.campos));
}

console.log('\nRegra 4 - performance: um apply por regra\n');
{
    const amb = montaAmbiente(2);
    const antes = amb.applies();
    amb.set('VALOR_PRODUTO', '20.000,00');
    amb.dispara('VALOR_PRODUTO', 'CHANGE');
    ok('um unico apply no change', amb.applies() - antes === 1, amb.applies() - antes);
}

console.log('\n' + '-'.repeat(50));
console.log(`passou: ${passou}   falhou: ${falhou}`);
process.exit(falhou ? 1 : 0);
