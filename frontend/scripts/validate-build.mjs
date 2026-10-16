import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('build');
const expected = ['index.html', 'projetos.html', 'bastidores.html', 'curriculo.html', 'favicon.svg',
  'casos/sistema-de-selos.html', 'casos/sala-vanguardeira.html', 'casos/sentinela-ai.html',
  'img/selos.webp', 'img/vanguardeira.webp', 'img/sentinela.webp', 'img/luis-florencio.webp',
  ...['lab-debian','lab-implantado','lote-b13','placa-arm','hardware-aberto','componentes-arm','tvbox-preparacao','desktop-linux','scripts-tvbox','ffmpeg-stream'].map(id=>`img/registro/${id}.webp`)];
for (const p of expected) {
  assert.ok(fs.existsSync(path.join(root,p)), `Arquivo ausente no build: ${p}`);
}
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.match(html, /<script[^>]+src=["'][^"']+\.js/, 'Bundle JS não referenciado no index');
assert.ok(!html.includes('%PUBLIC_URL%'), 'Placeholder PUBLIC_URL não expandido');
const jsDir = path.join(root, 'static', 'js');
assert.ok(fs.existsSync(jsDir), 'Bundle JS não foi criado');
const bundles = fs.readdirSync(jsDir).filter(f=>f.endsWith('.js'));
assert.ok(bundles.length>0, 'Sem JavaScript compilado');
const chunks = bundles.map(f=>fs.readFileSync(path.join(jsDir,f),'utf8')).join('\n');
// Verificar marcador estavel no bundle em vez de string acentuada: o minificador converte letras para Unicode escapado.
for (const text of ['SENTINELA','SISTEMA DE SELOS','SALA VANGUARDEIRA','Contato profissional direto','gallery-active-photo','mobile-cta-projects','app-projetos-tecnicos','technical-project-','HERMES Security Portable','TLuizLabs','Infra TI Labs','cyber-window','interactive-infra-map','infra-map-node-','infra-map-svg','mobile-infra-shortcuts','ticker-v3-track']) {
  assert.ok(chunks.includes(text), `Texto da V3 não encontrado no JS: ${text}`);
}
assert.ok(!chunks.includes('topology-square'), 'Topologia antiga ainda no bundle');
assert.ok(!chunks.includes('v7-cyber-atmosphere'), 'Canvas ASCII continua presente no bundle');
assert.ok(!chunks.includes('TELEMETRIA SIMULADA'), 'Texto antigo de telemetria sintética ainda no bundle');
assert.ok(!chunks.includes('telemetry-stat-arm'), 'Telemetria antiga ainda incluída no bundle');
assert.ok(!chunks.includes('INCIDENTE SIMULADO'), 'Simulador de incidente ainda no bundle');
assert.ok(!chunks.includes('ticket registrado [OK]'), 'Confirmação fictícia de ticket encontrada');
console.log(`PASS: build válido, ${expected.length} arquivos essenciais e ${bundles.length} scripts compilados.`);
