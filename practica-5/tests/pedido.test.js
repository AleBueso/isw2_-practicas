// Tests con el runner nativo de Node (no requiere instalar nada).
// Ejecutar desde practica-5/:  node --test
const test = require("node:test");
const assert = require("node:assert/strict");

const { calc } = require("../enfermo");
const {
  calcularTotalPedido,
  calcularSubtotal,
  aplicarDescuento,
  aplicarImpuesto,
} = require("../sano");

const pedido = [
  { pr: 100, q: 2 }, // 200
  { pr: 50, q: 1 },  //  50
  { pr: 10, q: 0 },  // ignorado: cantidad 0
  { pr: -5, q: 3 },  // ignorado: precio negativo
];

test("subtotal ignora productos con cantidad o precio inválidos", () => {
  assert.equal(calcularSubtotal(pedido), 250);
});

test("subtotal de un pedido vacío es 0", () => {
  assert.equal(calcularSubtotal([]), 0);
});

test("descuento por tipo de cliente", () => {
  assert.equal(aplicarDescuento(100, 1), 85);
  assert.equal(aplicarDescuento(100, 2), 75);
  assert.equal(aplicarDescuento(100, 3), 95);
  assert.equal(aplicarDescuento(100, 99), 100); // tipo desconocido: sin descuento
});

test("impuesto por país", () => {
  assert.equal(aplicarImpuesto(100, "HN"), 115);
  assert.equal(aplicarImpuesto(100, "GT"), 112);
  assert.equal(aplicarImpuesto(100, "XX"), 100); // país desconocido: sin impuesto
});

test("total: cliente frecuente en Honduras", () => {
  // 250 - 15% = 212.5 ; + 15% = 244.375 -> 244.38
  assert.equal(calcularTotalPedido(pedido, 1, "HN"), 244.38);
});

test("el código sano da el mismo resultado que el enfermo (no se rompió nada)", () => {
  for (const tipo of [0, 1, 2, 3]) {
    for (const pais of ["HN", "GT", "SV", "MX"]) {
      assert.equal(
        calcularTotalPedido(pedido, tipo, pais),
        calc(pedido, tipo, pais),
        `tipo=${tipo} pais=${pais}`
      );
    }
  }
});
