import { loadPartials }            from './loader.js';
import { SVG, CODE_LINES, buildSteps } from './algorithms/par-impar.js';

// ── Estado ─────────────────────────────────────────────────────────────
let stepIndex = 0;
let steps     = [];
let autoTimer = null;

// ── Arranque ───────────────────────────────────────────────────────────
(async () => {
  await loadPartials();
  document.getElementById('flowchart-wrap').innerHTML = SVG;
  renderCode();
  bindEvents();
})();

// ── Eventos ────────────────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('btn-next').addEventListener('click', next);
  document.getElementById('btn-reset').addEventListener('click', reset);
  document.getElementById('btn-auto').addEventListener('click', toggleAuto);
  document.getElementById('num-input').addEventListener('input', reset);
}

// ── Renderizar código ──────────────────────────────────────────────────
function renderCode(activeLine = null) {
  const panel = document.getElementById('code-panel');
  panel.innerHTML = CODE_LINES.map((line, i) => {
    const active  = i === activeLine ? ' active' : '';
    const escaped = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="code-line${active}">
      <span class="line-num">${i + 1}</span>
      <span>${escaped || '&nbsp;'}</span>
    </div>`;
  }).join('');

  if (activeLine !== null) {
    panel.querySelectorAll('.code-line')[activeLine]
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ── Siguiente paso ─────────────────────────────────────────────────────
function next() {
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

  renderCode(s.codeLine);
  document.getElementById('step-desc').innerHTML = s.desc;
  if (s.action) s.action(log);

  stepIndex++;

  if (stepIndex >= steps.length) {
    document.getElementById('btn-next').disabled = true;
    stopAuto();
  }
}

// ── Reset ──────────────────────────────────────────────────────────────
function reset() {
  stopAuto();
  stepIndex = 0;
  steps     = [];
  clearHighlights();
  renderCode();
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
