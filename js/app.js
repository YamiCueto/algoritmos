import { loadPartials }      from './loader.js';
import { createHighlighter } from 'https://esm.sh/shiki@1';

// ── Estado ─────────────────────────────────────────────────────────────
let stepIndex    = 0;
let steps        = [];
let autoTimer    = null;
let currentLang  = 'js';
let currentAlgo  = null;
let _highlighter = null;

const LANG_MAP = { js: 'javascript', ts: 'typescript', java: 'java', python: 'python' };

async function getHighlighter() {
  if (!_highlighter) {
    _highlighter = await createHighlighter({
      themes: ['tokyo-night'],
      langs:  ['javascript', 'typescript', 'java', 'python'],
    });
  }
  return _highlighter;
}

// ── Arranque ───────────────────────────────────────────────────────────
(async () => {
  await loadPartials();
  await loadAlgorithm('par-impar');
  bindEvents();
})();

// ── Cargar algoritmo ───────────────────────────────────────────────
async function loadAlgorithm(algoId) {
  stopAuto();
  const mod = await import(`./algorithms/${algoId}.js`);
  currentAlgo = mod;

  document.getElementById('flowchart-wrap').innerHTML = mod.SVG;

  document.getElementById('algo-inputs').innerHTML = mod.CONTROLS_HTML;
  document.getElementById('algo-inputs').querySelectorAll('input').forEach(inp =>
    inp.addEventListener('input', reset)
  );

  document.querySelectorAll('.sidebar-item[data-algo]').forEach(item =>
    item.classList.toggle('active', item.dataset.algo === algoId)
  );

  await reset();
}

// ── Eventos ────────────────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('btn-next').addEventListener('click', next);
  document.getElementById('btn-reset').addEventListener('click', reset);
  document.getElementById('btn-auto').addEventListener('click', toggleAuto);

  document.querySelectorAll('.lang-tab').forEach(tab =>
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      switchLang(tab.dataset.lang);
    })
  );

  document.querySelectorAll('.sidebar-item[data-algo]').forEach(item =>
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('disabled')) return;
      loadAlgorithm(item.dataset.algo);
    })
  );
}

// ── Cambio de lenguaje ───────────────────────────────────────────────
async function switchLang(lang) {
  currentLang = lang;
  const activeLine = (stepIndex > 0 && steps.length > 0)
    ? (steps[stepIndex - 1].codeLines?.[lang] ?? null)
    : null;
  await renderCode(activeLine);
}

// ── Renderizar código (Shiki) ────────────────────────────────────────
async function renderCode(activeLine = null) {
  const hl   = await getHighlighter();
  const code = currentAlgo.CODE_LINES_BY_LANG[currentLang].join('\n');
  const html = hl.codeToHtml(code, {
    lang:  LANG_MAP[currentLang],
    theme: 'tokyo-night',
  });

  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('.line').forEach((line, i) => {
    const num = document.createElement('span');
    num.className   = 'line-num';
    num.textContent = i + 1;
    line.prepend(num);
    if (i === activeLine) line.classList.add('active');
  });

  const panel = document.getElementById('code-panel');
  panel.innerHTML = tmp.innerHTML;

  if (activeLine !== null) {
    panel.querySelectorAll('.line')[activeLine]
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ── Siguiente paso ─────────────────────────────────────────────────────
async function next() {
  if (steps.length === 0) {
    const result = currentAlgo.buildSteps();
    if (!result) { log('Ingresa valores válidos.', 'err'); return; }
    steps = result;
  }

  if (stepIndex >= steps.length) return;

  const s = steps[stepIndex];
  clearHighlights();

  if (s.node) {
    const el = document.getElementById(s.node);
    if (el) { el.setAttribute('filter', 'url(#glow)'); el.dataset.active = '1'; }
  }

  if (s.arrow) {
    const el = document.getElementById(s.arrow);
    if (el) {
      el.setAttribute('stroke', '#3b82f6');
      el.setAttribute('stroke-width', '2.5');
      el.setAttribute('marker-end', 'url(#arr-active)');
    }
  }

  await renderCode(s.codeLines?.[currentLang] ?? null);
  document.getElementById('step-desc').innerHTML = s.desc;
  if (s.action) s.action(log);

  stepIndex++;

  if (stepIndex >= steps.length) {
    document.getElementById('btn-next').disabled = true;
    stopAuto();
  }
}

// ── Reset ──────────────────────────────────────────────────────────────
async function reset() {
  stopAuto();
  stepIndex = 0;
  steps     = [];
  clearHighlights();
  await renderCode();
  document.getElementById('step-desc').textContent = 'Configura los valores y presiona “Siguiente paso”.';
  document.getElementById('console-panel').innerHTML = '';
  document.getElementById('btn-next').disabled = false;
}

// ── Auto play ──────────────────────────────────────────────────────────
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

// ── Helpers ────────────────────────────────────────────────────────────
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
  const div   = document.createElement('div');
  div.className   = type;
  div.textContent = msg;
  panel.appendChild(div);
  panel.scrollTop = panel.scrollHeight;
}
