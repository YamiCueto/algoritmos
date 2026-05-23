# Algoritmos con Diagramas de Flujo

Repositorio para aprender a programar desde cero usando **diagramas de flujo** como herramienta de pensamiento algorítmico.

## ¿De qué trata este repositorio?

Antes de escribir código, aprendemos a **pensar como programadores** usando diagramas de flujo. Cada problema se modela visualmente primero y luego se traduce a código.

El repositorio incluye un **visualizador interactivo** (`index.html`) donde puedes ver el diagrama animarse paso a paso mientras se ejecuta el algoritmo.

## Visualizador interactivo

Abre `index.html` en el navegador. Puedes:

- Ingresar un valor de entrada
- Avanzar **paso a paso** o en modo **Auto**
- Ver el nodo activo del diagrama resaltado en tiempo real
- Ver la línea de código ejecutándose en paralelo
- Ver la salida en la consola integrada

## ¿Qué es un diagrama de flujo?

Un diagrama de flujo es una representación visual de un algoritmo. Usa símbolos estándar:

| Símbolo | Forma | Descripción |
|--------|-------|-------------|
| Inicio / Fin | Óvalo | Marca el comienzo o el final del algoritmo |
| Proceso | Rectángulo | Una acción o instrucción |
| Entrada/Salida | Paralelogramo | Leer o mostrar datos |
| Decisión | Rombo | Una pregunta con salidas Sí / No |
| Flecha | → | Indica el flujo de ejecución |

## Estructura del repositorio

```
algoritmos/
├── index.html          # Visualizador interactivo
├── app.js              # Lógica del visualizador (SVG + pasos)
├── styles.css          # Estilos del visualizador
├── ejercicios/
│   └── par-impar.md    # Enunciado + diagrama de flujo
└── soluciones/
    └── par-impar.js    # Implementación en JavaScript
```

## Ejercicios

| # | Ejercicio | Diagrama | Solución |
|---|-----------|----------|----------|
| 1 | ¿Par o impar? | [ejercicios/par-impar.md](ejercicios/par-impar.md) | [soluciones/par-impar.js](soluciones/par-impar.js) |

## Tecnologías

- **Visualizador:** HTML + CSS + JavaScript (vanilla)
- **Diagramas:** SVG dibujado a mano en `app.js`
- **Código de ejercicios:** JavaScript

## Cómo practicar

1. Abre `index.html` en el navegador.
2. Lee el enunciado del ejercicio en `ejercicios/`.
3. Observa el diagrama ejecutarse paso a paso.
4. Estudia la solución en `soluciones/`.
5. Intenta modificar o crear tu propio algoritmo.
