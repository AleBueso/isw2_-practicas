// ⚠️ CÓDIGO ENFERMO — NO usar en producción.
// Calcula el total de un pedido de una tienda. Funciona, pero tiene muchos "code smells".
// Ver DIAGNOSTICO.md para la lista de síntomas.

var d = 0.15; // ¿qué es d?

function calc(p, t, c) {
  var r = 0;
  for (var i = 0; i < p.length; i++) {
    if (p[i].q > 0) {
      if (p[i].pr > 0) {
        r = r + p[i].pr * p[i].q;
      }
    }
  }
  if (t == 1) {
    r = r - r * d;
  } else if (t == 2) {
    r = r - r * 0.25;
  } else if (t == 3) {
    r = r - r * 0.05;
  }
  if (c == "HN") {
    r = r + r * 0.15;
  } else if (c == "GT") {
    r = r + r * 0.12;
  } else if (c == "SV") {
    r = r + r * 0.13;
  }
  if (r > 1000) {
    console.log("pedido grande!!");
  }
  r = Math.round(r * 100) / 100;
  return r;
}

module.exports = { calc };
