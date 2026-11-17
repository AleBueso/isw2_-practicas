// ✅ CÓDIGO SANO — versión refactorizada de enfermo.js.
// Mismo comportamiento (verificado por los tests), pero legible y fácil de mantener.

const DESCUENTO_POR_TIPO_CLIENTE = Object.freeze({
  1: 0.15, // cliente frecuente
  2: 0.25, // cliente mayorista
  3: 0.05, // cliente nuevo
});

const IMPUESTO_POR_PAIS = Object.freeze({
  HN: 0.15, // ISV Honduras
  GT: 0.12, // IVA Guatemala
  SV: 0.13, // IVA El Salvador
});

/** Un producto cuenta solo si su cantidad y su precio son positivos. */
function esProductoValido(producto) {
  return producto.q > 0 && producto.pr > 0;
}

function calcularSubtotal(productos) {
  return productos
    .filter(esProductoValido)
    .reduce((suma, producto) => suma + producto.pr * producto.q, 0);
}

function aplicarDescuento(monto, tipoCliente) {
  const descuento = DESCUENTO_POR_TIPO_CLIENTE[tipoCliente] ?? 0;
  return monto - monto * descuento;
}

function aplicarImpuesto(monto, codigoPais) {
  const impuesto = IMPUESTO_POR_PAIS[codigoPais] ?? 0;
  return monto + monto * impuesto;
}

function redondearADosDecimales(monto) {
  return Math.round(monto * 100) / 100;
}

/**
 * Calcula el total de un pedido.
 * @param {Array<{pr:number, q:number}>} productos - precio (pr) y cantidad (q)
 * @param {number} tipoCliente - 1 frecuente, 2 mayorista, 3 nuevo
 * @param {string} codigoPais - "HN", "GT" o "SV"
 * @returns {number} total redondeado a 2 decimales
 */
function calcularTotalPedido(productos, tipoCliente, codigoPais) {
  const subtotal = calcularSubtotal(productos);
  const conDescuento = aplicarDescuento(subtotal, tipoCliente);
  const conImpuesto = aplicarImpuesto(conDescuento, codigoPais);
  return redondearADosDecimales(conImpuesto);
}

module.exports = {
  calcularTotalPedido,
  calcularSubtotal,
  aplicarDescuento,
  aplicarImpuesto,
};
