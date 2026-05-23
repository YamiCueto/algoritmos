/**
 * Mayor de tres
 * Dado tres números A, B y C, retorna el mayor.
 */
function mayorDeTres(a, b, c) {
  let mayor = a;
  if (b > mayor) mayor = b;
  if (c > mayor) mayor = c;
  return mayor;
}

// Ejemplos
console.log(mayorDeTres(5, 9, 3));  // 9
console.log(mayorDeTres(7, 2, 7));  // 7
console.log(mayorDeTres(1, 1, 1));  // 1
