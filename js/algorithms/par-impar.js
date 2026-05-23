// ── SVG del diagrama de flujo ──────────────────────────────────────────
export const SVG = `
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

  <!-- Flechas -->
  <line   class="fc-arrow" id="a-start-input"   x1="150" y1="52"  x2="150" y2="93"  stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <line   class="fc-arrow" id="a-input-dec"     x1="150" y1="127" x2="150" y2="183" stroke="#4a5568" stroke-width="2" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-dec-par"     points="107,220 60,220 60,310 102,310"   stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-dec-impar"   points="193,220 240,220 240,310 198,310" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-res-par-end"   points="150,341 150,462"               stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <polyline class="fc-arrow" id="a-res-impar-end" points="240,341 240,430 150,430 150,462" stroke="#4a5568" stroke-width="2" fill="none" marker-end="url(#arr)"/>

  <!-- Nodos -->
  <ellipse  id="n-inicio" cx="150" cy="30"  rx="55" ry="22" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="150" y="35"  text-anchor="middle" font-size="13" fill="#e2e8f0">Inicio</text>

  <polygon  id="n-input"  points="95,97 205,97 215,127 85,127" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="150" y="117" text-anchor="middle" font-size="12" fill="#7dd3fc">Leer número</text>

  <polygon  id="n-dec"    points="150,185 230,220 150,255 70,220" fill="#2d2a1e" stroke="#eab308" stroke-width="2"/>
  <text x="150" y="215"  text-anchor="middle" font-size="11" fill="#fde047">número</text>
  <text x="150" y="229"  text-anchor="middle" font-size="11" fill="#fde047">% 2 === 0 ?</text>
  <text x="52"  y="216"  text-anchor="middle" font-size="11" fill="#94a3b8">Sí</text>
  <text x="248" y="216"  text-anchor="middle" font-size="11" fill="#94a3b8">No</text>

  <rect     id="n-par"    x="30"  y="310" width="120" height="32" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="90"  y="330"  text-anchor="middle" font-size="12" fill="#4ade80">Es par</text>

  <rect     id="n-impar"  x="150" y="310" width="120" height="32" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
  <text x="210" y="330"  text-anchor="middle" font-size="12" fill="#fca5a5">Es impar</text>

  <ellipse  id="n-fin"    cx="150" cy="482" rx="55" ry="22" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
  <text x="150" y="487"  text-anchor="middle" font-size="13" fill="#e2e8f0">Fin</text>
</svg>`;

// ── Controles de entrada ───────────────────────────────────────────
export const CONTROLS_HTML = `
  <label class="ctrl-label">Número:</label>
  <input type="number" id="input-a" value="7" title="Número de entrada">
`;

// ── Líneas de código por lenguaje ─────────────────────────────────────
export const CODE_LINES_BY_LANG = {
  js: [
    'const numero = parseInt(prompt("Ingresa un número:"));',
    '',
    'if (numero % 2 === 0) {',
    '  console.log(numero + " es par");',
    '} else {',
    '  console.log(numero + " es impar");',
    '}',
  ],
  ts: [
    'const numero: number = parseInt(prompt("Ingresa un número:")!);',
    '',
    'if (numero % 2 === 0) {',
    '  console.log(`${numero} es par`);',
    '} else {',
    '  console.log(`${numero} es impar`);',
    '}',
  ],
  java: [
    'import java.util.Scanner;',
    '',
    'public class ParImpar {',
    '  public static void main(String[] args) {',
    '    Scanner sc = new Scanner(System.in);',
    '    int numero = sc.nextInt();',
    '',
    '    if (numero % 2 == 0) {',
    '      System.out.println(numero + " es par");',
    '    } else {',
    '      System.out.println(numero + " es impar");',
    '    }',
    '  }',
    '}',
  ],
  python: [
    'numero = int(input("Ingresa un número: "))',
    '',
    'if numero % 2 == 0:',
    '  print(f"{numero} es par")',
    'else:',
    '  print(f"{numero} es impar")',
  ],
};

// ── Pasos del algoritmo ────────────────────────────────────────────────
export function buildSteps() {
  const num = parseInt(document.getElementById('input-a').value);
  if (isNaN(num)) return null;
  const esPar = num % 2 === 0;
  return [
    {
      node: 'n-inicio',
      arrow: null,
      codeLines: null,
      desc: '🟢 Inicio del algoritmo.',
      action: null,
    },
    {
      node: 'n-input',
      arrow: 'a-start-input',
      codeLines: { js: 0, ts: 0, java: 5, python: 0 },
      desc: `📥 Leer el número ingresado: <strong>${num}</strong>`,
      action: (log) => log(`> prompt: "${num}"`, 'log'),
    },
    {
      node: 'n-dec',
      arrow: 'a-input-dec',
      codeLines: { js: 2, ts: 2, java: 7, python: 2 },
      desc: `🔀 Evaluar: <strong>${num} % 2 === 0</strong> → <strong>${esPar}</strong>`,
      action: (log) => log(`> ${num} % 2 = ${num % 2}`, 'log'),
    },
    {
      node: esPar ? 'n-par' : 'n-impar',
      arrow: esPar ? 'a-dec-par' : 'a-dec-impar',
      codeLines: esPar
        ? { js: 3, ts: 3, java: 8, python: 3 }
        : { js: 5, ts: 5, java: 10, python: 5 },
      desc: esPar
        ? `✅ La condición es verdadera → mostrar "Es par"`
        : `❌ La condición es falsa → mostrar "Es impar"`,
      action: (log) => log(`${num} es ${esPar ? 'par' : 'impar'}`, 'out'),
    },
    {
      node: 'n-fin',
      arrow: esPar ? 'a-res-par-end' : 'a-res-impar-end',
      codeLines: null,
      desc: '🏁 Fin del algoritmo.',
      action: null,
    },
  ];
}
