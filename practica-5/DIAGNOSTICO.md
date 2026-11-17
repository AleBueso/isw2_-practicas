# Práctica 5 · Clínica de código — Diagnóstico

**Paciente:** `enfermo.js` — función `calc(p, t, c)` que calcula el total de un pedido.
**Tratamiento:** `sano.js` — función `calcularTotalPedido(productos, tipoCliente, codigoPais)`.
**Prueba de alta:** `tests/pedido.test.js` (ejecutar `node --test` dentro de `practica-5/`).

## Síntomas encontrados (code smells)

| # | Síntoma | Dónde en `enfermo.js` | Tratamiento en `sano.js` |
|---|---------|-----------------------|--------------------------|
| 1 | Nombres poco descriptivos | `calc`, `p`, `t`, `c`, `r`, `d`, `q`, `pr` | Nombres claros: `calcularTotalPedido`, `productos`, `tipoCliente`, `codigoPais` |
| 2 | Números mágicos | `0.25`, `0.05`, `0.12`, `0.13`, `1000` | Constantes con nombre: `DESCUENTO_POR_TIPO_CLIENTE`, `IMPUESTO_POR_PAIS` |
| 3 | Función larga que hace demasiado | `calc` suma, descuenta, cobra impuesto, imprime y redondea | Funciones pequeñas: `calcularSubtotal`, `aplicarDescuento`, `aplicarImpuesto`, `redondearADosDecimales` |
| 4 | Cadenas de `if / else if` | Descuentos e impuestos | Tablas de búsqueda: agregar un país es agregar una línea |
| 5 | `if` anidados | `if (q > 0) { if (pr > 0) … }` | Función `esProductoValido` + `filter` |
| 6 | Variable global mutable | `var d = 0.15` | Constantes congeladas con `Object.freeze` |
| 7 | Uso de `var` y `==` | Todo el archivo | `const` y comparaciones sin coerción |
| 8 | Efecto secundario oculto | `console.log("pedido grande!!")` dentro del cálculo | Eliminado: una función de cálculo solo calcula |
| 9 | Sin documentación | Ningún comentario explica los parámetros | JSDoc en la función principal |
| 10 | Sin tests | — | 6 tests, incluido uno que compara sano vs. enfermo |

## Cómo verifiqué que el tratamiento no rompió nada

El último test recorre todas las combinaciones de tipo de cliente (0–3) y país (HN, GT, SV, MX)
y comprueba que `calcularTotalPedido` devuelve exactamente lo mismo que `calc`.
El refactor cambia la estructura del código, pero no su comportamiento.

Resultado: `node --test` → 6 tests pasan.

## Pronóstico

El código sano es más fácil de leer, de probar por partes y de extender
(por ejemplo, agregar Nicaragua es una sola línea en `IMPUESTO_POR_PAIS`).
