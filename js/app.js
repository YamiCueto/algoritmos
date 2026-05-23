import { loadPartials }                        from './loader.js';
import { SVG, CODE_LINES_BY_LANG, buildSteps } from './algorithms/par-impar.js';
import { createHighlighter }                   from 'https://esm.sh/shiki@1';

// ── Estado ─────────────────────────────────────────────────────────────
let stepIndex    = 0;
let steps        = [];
let autoTimer    = null;
let currentLang  = 'js';
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
  document.getElementById('flowchart-wrap').innerHTML = SVG;
  await renderCode();
  bindEvents();
})();

// ── Eventos ────────────────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('btn-next').addEventListener('click', next);
  document.getElementById('btn-reset').addEventListener('click', reset);
  document.getElementById('btn-auto').addEventListener('click', toggleAuto);
  document.getElementById('num-input').addEventListener('input', reset);

  document.querySelectorAll('.lang-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      switchLang(tab.dataset.lang);
    });
  });
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
  const code = CODE_LINES_BY_LANG[currentLang].join('\n');
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
    const num = parseInt(document.getElementById('num-input').value);
    if (isNaN(num)) { log('Ingresa un número válido.', 'err'); return; }
    steps = buildSteps(num);
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
  document.getElementById('step-desc').textContent = 'Ingresa un número y presiona "Siguiente paso".';
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
