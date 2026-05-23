// ── SVG del diagrama de flujo ──────────────────────────────────────────
export const SVG = `
<svg id="fc" viewBox="0 0 340 590" width="300" xmlns="http://www.w3.org/2000/svg">
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

  <!-- Flechas verticales (camino principal) -->
  <line   class="fc-arrow" id="a-inicio-input" x1="170" y1="50"  x2="170" y2="72"  stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line   class="fc-arrow" id="a-input-seta"   x1="170" y1="104" x2="170" y2="128" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line   class="fc-arrow" id="a-seta-decb"    x1="170" y1="158" x2="170" y2="190" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line   class="fc-arrow" id="a-decb-decc"    x1="170" y1="270" x2="170" y2="316" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line   class="fc-arrow" id="a-decc-show"    x1="170" y1="396" x2="170" y2="438" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line   class="fc-arrow" id="a-show-fin"     x1="170" y1="470" x2="170" y2="504" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Rama B: dec-b → set-b (Sí) y set-b → dec-c -->
  <polyline class="fc-arrow" id="a-decb-setb"  points="248,230 258,230" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-setb-decc"  points="295,246 295,308 170,308 170,316" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>

  <!-- Rama C: dec-c → set-c (Sí) y set-c → show -->
  <polyline class="fc-arrow" id="a-decc-setc"  points="248,356 258,356" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-setc-show"  points="295,372 295,430 170,430 170,438" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>

  <!-- Nodos -->
  <ellipse  id="n-inicio" cx="170" cy="28"  rx="58" ry="22" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="170" y="33"  text-anchor="middle" font-size="13" fill="#e2e8f0">Inicio</text>

  <polygon  id="n-input"  points="86,72 254,72 264,104 76,104" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="92"  text-anchor="middle" font-size="12" fill="#7dd3fc">Leer A, B, C</text>

  <rect     id="n-set-a"  x="100" y="128" width="140" height="30" rx="6" fill="#2d3748" stroke="#718096" stroke-width="2"/>
  <text x="170" y="148"  text-anchor="middle" font-size="12" fill="#e2e8f0">mayor = A</text>

  <!-- dec-b: diamond cx=170, cy=230 -->
  <polygon  id="n-dec-b"  points="170,190 250,230 170,270 90,230" fill="#2d2a1e" stroke="#eab308" stroke-width="2"/>
  <text x="170" y="225"  text-anchor="middle" font-size="11" fill="#fde047">B &gt;</text>
  <text x="170" y="239"  text-anchor="middle" font-size="11" fill="#fde047">mayor?</text>
  <text x="253" y="242"  text-anchor="start"  font-size="11" fill="#94a3b8">Sí</text>
  <text x="156" y="284"  text-anchor="middle" font-size="11" fill="#94a3b8">No</text>

  <!-- set-b: right of dec-b -->
  <rect     id="n-set-b"  x="258" y="216" width="72" height="28" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="294" y="234"  text-anchor="middle" font-size="11" fill="#4ade80">mayor = B</text>

  <!-- dec-c: diamond cx=170, cy=356 -->
  <polygon  id="n-dec-c"  points="170,316 250,356 170,396 90,356" fill="#2d2a1e" stroke="#eab308" stroke-width="2"/>
  <text x="170" y="351"  text-anchor="middle" font-size="11" fill="#fde047">C &gt;</text>
  <text x="170" y="365"  text-anchor="middle" font-size="11" fill="#fde047">mayor?</text>
  <text x="253" y="368"  text-anchor="start"  font-size="11" fill="#94a3b8">Sí</text>
  <text x="156" y="410"  text-anchor="middle" font-size="11" fill="#94a3b8">No</text>

  <!-- set-c: right of dec-c -->
  <rect     id="n-set-c"  x="258" y="342" width="72" height="28" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="294" y="360"  text-anchor="middle" font-size="11" fill="#4ade80">mayor = C</text>

  <polygon  id="n-show"   points="76,438 264,438 274,470 66,470" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="458"  text-anchor="middle" font-size="12" fill="#7dd3fc">Mostrar mayor</text>

  <ellipse  id="n-fin"    cx="170" cy="526" rx="58" ry="22" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="170" y="531"  text-anchor="middle" font-size="13" fill="#e2e8f0">Fin</text>
</svg>`;

// ── Controles de entrada ───────────────────────────────────────────────
export const CONTROLS_HTML = `
  <label class="ctrl-label">A:</label>
  <input type="number" id="input-a" value="5"  title="Número A">
  <label class="ctrl-label">B:</label>
  <input type="number" id="input-b" value="9"  title="Número B">
  <label class="ctrl-label">C:</label>
  <input type="number" id="input-c" value="3"  title="Número C">
`;

// ── Líneas de código por lenguaje ─────────────────────────────────────
export const CODE_LINES_BY_LANG = {
  js: [
    'const a = parseInt(prompt("Ingresa A:"));',
    'const b = parseInt(prompt("Ingresa B:"));',
    'const c = parseInt(prompt("Ingresa C:"));',
    '',
    'let mayor = a;',
    '',
    'if (b > mayor) mayor = b;',
    'if (c > mayor) mayor = c;',
    '',
    'console.log("El mayor es: " + mayor);',
  ],
  ts: [
    'const a: number = parseInt(prompt("Ingresa A:")!);',
    'const b: number = parseInt(prompt("Ingresa B:")!);',
    'const c: number = parseInt(prompt("Ingresa C:")!);',
    '',
    'let mayor: number = a;',
    '',
    'if (b > mayor) mayor = b;',
    'if (c > mayor) mayor = c;',
    '',
    'console.log(`El mayor es: ${mayor}`);',
  ],
  java: [
    'import java.util.Scanner;',
    '',
    'public class MayorDeTres {',
    '  public static void main(String[] args) {',
    '    Scanner sc = new Scanner(System.in);',
    '    int a = sc.nextInt();',
    '    int b = sc.nextInt();',
    '    int c = sc.nextInt();',
    '',
    '    int mayor = a;',
    '',
    '    if (b > mayor) mayor = b;',
    '    if (c > mayor) mayor = c;',
    '',
    '    System.out.println("El mayor es: " + mayor);',
    '  }',
    '}',
  ],
  python: [
    'a = int(input("Ingresa A: "))',
    'b = int(input("Ingresa B: "))',
    'c = int(input("Ingresa C: "))',
    '',
    'mayor = a',
    '',
    'if b > mayor:',
    '    mayor = b',
    'if c > mayor:',
    '    mayor = c',
    '',
    'print(f"El mayor es: {mayor}")',
  ],
};

// ── Pasos del algoritmo ────────────────────────────────────────────────
export function buildSteps() {
  const a = parseInt(document.getElementById('input-a').value);
  const b = parseInt(document.getElementById('input-b').value);
  const c = parseInt(document.getElementById('input-c').value);
  if ([a, b, c].some(isNaN)) return null;

  // Pre-calcular resultados
  const bGreater  = b > a;
  const mayorMidB = bGreater ? b : a;
  const cGreater  = c > mayorMidB;
  const final     = cGreater ? c : mayorMidB;

  const steps = [
    {
      node: 'n-inicio', arrow: null, codeLines: null,
      desc: '🟢 Inicio del algoritmo.',
      action: null,
    },
    {
      node: 'n-input', arrow: 'a-inicio-input',
      codeLines: { js: 0, ts: 0, java: 5, python: 0 },
      desc: `📥 Leer entradas: <strong>A=${a}, B=${b}, C=${c}</strong>`,
      action: (log) => log(`> A=${a}, B=${b}, C=${c}`, 'log'),
    },
    {
      node: 'n-set-a', arrow: 'a-input-seta',
      codeLines: { js: 4, ts: 4, java: 9, python: 4 },
      desc: `📌 Inicializar: <strong>mayor = A = ${a}</strong>`,
      action: (log) => log(`> mayor = ${a}`, 'log'),
    },
    {
      node: 'n-dec-b', arrow: 'a-seta-decb',
      codeLines: { js: 6, ts: 6, java: 11, python: 6 },
      desc: `🔀 Evaluar: <strong>${b} > ${a}</strong> → <strong>${bGreater}</strong>`,
      action: (log) => log(`> ${b} > ${a} = ${bGreater}`, 'log'),
    },
  ];

  if (bGreater) {
    steps.push({
      node: 'n-set-b', arrow: 'a-decb-setb',
      codeLines: { js: 6, ts: 6, java: 11, python: 7 },
      desc: `✅ B es mayor → actualizar <strong>mayor = ${b}</strong>`,
      action: (log) => log(`> mayor = ${b}`, 'log'),
    });
    steps.push({
      node: 'n-dec-c', arrow: 'a-setb-decc',
      codeLines: { js: 7, ts: 7, java: 12, python: 8 },
      desc: `🔀 Evaluar: <strong>${c} > ${mayorMidB}</strong> → <strong>${cGreater}</strong>`,
      action: (log) => log(`> ${c} > ${mayorMidB} = ${cGreater}`, 'log'),
    });
  } else {
    steps.push({
      node: 'n-dec-c', arrow: 'a-decb-decc',
      codeLines: { js: 7, ts: 7, java: 12, python: 8 },
      desc: `❌ B no es mayor → continuar. Evaluar: <strong>${c} > ${mayorMidB}</strong> → <strong>${cGreater}</strong>`,
      action: (log) => log(`> ${b} ≤ ${a}, mayor sigue = ${a}`, 'log'),
    });
  }

  if (cGreater) {
    steps.push({
      node: 'n-set-c', arrow: 'a-decc-setc',
      codeLines: { js: 7, ts: 7, java: 12, python: 9 },
      desc: `✅ C es mayor → actualizar <strong>mayor = ${c}</strong>`,
      action: (log) => log(`> mayor = ${c}`, 'log'),
    });
    steps.push({
      node: 'n-show', arrow: 'a-setc-show',
      codeLines: { js: 9, ts: 9, java: 14, python: 11 },
      desc: `📢 Mostrar resultado: <strong>El mayor es ${c}</strong>`,
      action: (log) => log(`El mayor es: ${c}`, 'out'),
    });
  } else {
    steps.push({
      node: 'n-show', arrow: 'a-decc-show',
      codeLines: { js: 9, ts: 9, java: 14, python: 11 },
      desc: `📢 Mostrar resultado: <strong>El mayor es ${mayorMidB}</strong>`,
      action: (log) => log(`El mayor es: ${mayorMidB}`, 'out'),
    });
  }

  steps.push({
    node: 'n-fin', arrow: 'a-show-fin', codeLines: null,
    desc: '🏁 Fin del algoritmo.',
    action: null,
  });

  return steps;
}
