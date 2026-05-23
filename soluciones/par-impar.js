// Algoritmo: Par o Impar
// Diagrama de flujo: ../ejercicios/par-impar.md

// Paso 1: Leer el número
const numero = parseInt(prompt("Ingresa un número entero:"));

// Paso 2: Verificar si el residuo de dividir entre 2 es 0
if (numero % 2 === 0) {
  // Paso 3a: El número es par
  console.log(`${numero} es par`);
} else {
  // Paso 3b: El número es impar
  console.log(`${numero} es impar`);
}
