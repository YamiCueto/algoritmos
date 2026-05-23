// ─────────────────────────────────────────────
//  DIAGRAMA SVG
// ─────────────────────────────────────────────
const SVG = `
<svg id="fc" viewBox="0 0 300 560" width="280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4a5568"/>
    </marker>
    <marker id="arr-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
    </marker>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- FLECHAS (se activan por clase) -->
  <line class="fc-arrow" id="a-start-input"  x1="150" y1="52"  x2="150" y2="93"  stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line class="fc-arrow" id="a-input-dec"    x1="150" y1="127" x2="150" y2="183" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-dec-par"  points="107,220 60,220 60,310 102,310" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-dec-impar" points="193,220 240,220 240,310 198,310" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-par-end"   points="150,345 150,360 150,420 150,460" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)" style="display:none"/>
  <polyline class="fc-arrow" id="a-par-end-path"  points="150,345 150,380 150,460" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)" style="display:none"/>
  <polyline class="fc-arrow" id="a-out-par-end"   points="150,345 150,460" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <!-- flechas reales desde outputs al fin -->
  <polyline class="fc-arrow" id="a-parbox-end"   points="150,345 150,460" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)" style="display:none"/>

  <!-- flecha par → fin -->
  <polyline class="fc-arrow" id="a-res-par-end"  points="150,341 150,462" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <!-- flecha impar → fin -->
  <polyline class="fc-arrow" id="a-res-impar-end" points="240,341 240,430 150,430 150,462" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>

  <!-- NODOS -->
  <!-- Inicio -->
  <ellipse id="n-inicio" cx="150" cy="30" rx="55" ry="22" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="150" y="35" text-anchor="middle" font-size="13" fill="#e2e8f0">Inicio</text>

  <!-- Leer número (paralelogramo) -->
  <polygon id="n-input" points="95,97 205,97 215,127 85,127" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="150" y="117" text-anchor="middle" font-size="12" fill="#7dd3fc">Leer número</text>

  <!-- Decisión -->
  <polygon id="n-dec" points="150,185 230,220 150,255 70,220" fill="#2d2a1e" stroke="#eab308" stroke-width="2"/>
  <text x="150" y="215" text-anchor="middle" font-size="11" fill="#fde047">número</text>
  <text x="150" y="229" text-anchor="middle" font-size="11" fill="#fde047">% 2 === 0 ?</text>

  <!-- Label Sí / No -->
  <text x="52"  y="216" text-anchor="middle" font-size="11" fill="#94a3b8">Sí</text>
  <text x="248" y="216" text-anchor="middle" font-size="11" fill="#94a3b8">No</text>

  <!-- Resultado par -->
  <rect id="n-par" x="30" y="310" width="120" height="32" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="90" y="330" text-anchor="middle" font-size="12" fill="#4ade80">Es par</text>

  <!-- Resultado impar -->
  <rect id="n-impar" x="150" y="310" width="120" height="32" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
  <text x="210" y="330" text-anchor="middle" font-size="12" fill="#fca5a5">Es impar</text>

  <!-- Fin -->
  <ellipse id="n-fin" cx="150" cy="482" rx="55" ry="22" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="150" y="487" text-anchor="middle" font-size="13" fill="#e2e8f0">Fin</text>
</svg>`;

// ─────────────────────────────────────────────
//  CÓDIGO DEL ALGORITMO (líneas)
// ─────────────────────────────────────────────
const CODE_LINES = [
  'const numero = parseInt(prompt("Ingresa un número:"));',
  '',
  'if (numero % 2 === 0) {',
  '  console.log(numero + " es par");',
  '} else {',
  '  console.log(numero + " es impar");',
  '}',
];

// ─────────────────────────────────────────────
//  PASOS DEL ALGORITMO
//  cada paso: { node, arrow, codeLine, desc, action }
// ─────────────────────────────────────────────
function buildSteps(num) {
  const esPar = num % 2 === 0;
  return [
    {
      node: 'n-inicio',
      arrow: null,
      codeLine: null,
      desc: '🟢 Inicio del algoritmo.',
      action: null,
    },
    {
      node: 'n-input',
      arrow: 'a-start-input',
      codeLine: 0,
      desc: `📥 Leer el número ingresado: <strong>${num}</strong>`,
      action: () => log(`> prompt: "${num}"`, 'log'),
    },
    {
      node: 'n-dec',
      arrow: 'a-input-dec',
      codeLine: 2,
      desc: `🔀 Evaluar: <strong>${num} % 2 === 0</strong> → <strong>${esPar}</strong>`,
      action: () => log(`> ${num} % 2 = ${num % 2}`, 'log'),
    },
    {
      node: esPar ? 'n-par' : 'n-impar',
      arrow: esPar ? 'a-dec-par' : 'a-dec-impar',
      codeLine: esPar ? 3 : 5,
      desc: esPar
        ? `✅ La condición es verdadera → mostrar "Es par"`
        : `❌ La condición es falsa → mostrar "Es impar"`,
      action: () => log(`${num} es ${esPar ? 'par' : 'impar'}`, 'out'),
    },
    {
      node: 'n-fin',
      arrow: esPar ? 'a-res-par-end' : 'a-res-impar-end',
      codeLine: null,
      desc: '🏁 Fin del algoritmo.',
      action: null,
    },
  ];
}

// ─────────────────────────────────────────────
//  ESTADO
// ─────────────────────────────────────────────
let stepIndex = 0;
let steps = [];
let autoTimer = null;

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
document.getElementById('flowchart-wrap').innerHTML = SVG;
renderCode();
bindEvents();

function bindEvents() {
  document.getElementById('btn-next').addEventListener('click', next);
  document.getElementById('btn-reset').addEventListener('click', reset);
  document.getElementById('btn-auto').addEventListener('click', toggleAuto);
  document.getElementById('num-input').addEventListener('input', reset);
}

// ─────────────────────────────────────────────
//  RENDER CÓDIGO
// ─────────────────────────────────────────────
function renderCode(activeLine = null) {
  const panel = document.getElementById('code-panel');
  panel.innerHTML = CODE_LINES.map((line, i) => {
    const active = i === activeLine ? ' active' : '';
    const escaped = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="code-line${active}">
      <span class="line-num">${i + 1}</span>
      <span>${escaped || '&nbsp;'}</span>
    </div>`;
  }).join('');

  if (activeLine !== null) {
    const el = panel.querySelectorAll('.code-line')[activeLine];
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ─────────────────────────────────────────────
//  SIGUIENTE PASO
// ─────────────────────────────────────────────
function next() {
  if (steps.length === 0) {
    const num = parseInt(document.getElementById('num-input').value);
    if (isNaN(num)) { log('Ingresa un número válido.', 'err'); return; }
    steps = buildSteps(num);
  }

  if (stepIndex >= steps.length) return;

  const s = steps[stepIndex];

  // limpiar resaltados anteriores
  clearHighlights();

  // resaltar nodo
  if (s.node) {
    const el = document.getElementById(s.node);
    if (el) { el.setAttribute('filter', 'url(#glow)'); el.dataset.active = '1'; }
  }

  // resaltar flecha
  if (s.arrow) {
    const el = document.getElementById(s.arrow);
    if (el) {
      el.setAttribute('stroke', '#3b82f6');
      el.setAttribute('stroke-width', '2.5');
      el.setAttribute('marker-end', 'url(#arr-active)');
    }
  }

  // resaltar línea de código
  renderCode(s.codeLine);

  // descripción
  document.getElementById('step-desc').innerHTML = s.desc;

  // acción (log de consola)
  if (s.action) s.action();

  stepIndex++;

  // si terminamos, deshabilitar botón next
  if (stepIndex >= steps.length) {
    document.getElementById('btn-next').disabled = true;
    stopAuto();
  }
}

// ─────────────────────────────────────────────
//  RESET
// ─────────────────────────────────────────────
function reset() {
  stopAuto();
  stepIndex = 0;
  steps = [];
  clearHighlights();
  renderCode();
  document.getElementById('step-desc').textContent = 'Ingresa un número y presiona "Siguiente paso".';
  document.getElementById('console-panel').innerHTML = '';
  document.getElementById('btn-next').disabled = false;
}

// ─────────────────────────────────────────────
//  AUTO PLAY
// ─────────────────────────────────────────────
function toggleAuto() {
  if (autoTimer) {
    stopAuto();
  } else {
    document.getElementById('btn-auto').textContent = '⏸ Pausar';
    autoTimer = setInterval(() => {
      if (stepIndex >= steps.length && steps.length > 0) { stopAuto(); return; }
      next();
    }, 900);
  }
}

function stopAuto() {
  clearInterval(autoTimer);
  autoTimer = null;
  document.getElementById('btn-auto').textContent = '▶▶ Auto';
}

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
function clearHighlights() {
  document.querySelectorAll('[data-active]').forEach(el => {
    el.removeAttribute('filter');
    el.removeAttribute('data-active');
  });
  document.querySelectorAll('.fc-arrow').forEach(el => {
    el.setAttribute('stroke', '#4a5568');
    el.setAttribute('stroke-width', '2');
    el.setAttribute('marker-end', 'url(#arr)');
  });
}

function log(msg, type = 'log') {
  const panel = document.getElementById('console-panel');
  const div = document.createElement('div');
  div.className = type;
  div.textContent = msg;
  panel.appendChild(div);
  panel.scrollTop = panel.scrollHeight;
}
