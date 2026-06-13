// ============================================================
// ESTADO INICIAL DE LA BODEGA (ALMACÉN DE INGREDIENTES)
// ============================================================
const BODEGA = {
  "Harina de trigo":     { cantidad: 100000, unidad: "g" },
  "Salsa de tomate":     { cantidad: 50000,  unidad: "ml" },
  "Queso mozzarella":    { cantidad: 30000,  unidad: "g" },
  "Aceite de oliva":     { cantidad: 20000,  unidad: "ml" },
  "Levadura":            { cantidad: 5000,   unidad: "g" },
  "Carne de res molida": { cantidad: 50000,  unidad: "g" },
  "Pan de hamburguesa":  { cantidad: 1000,   unidad: "unidad" },
  "Queso cheddar":       { cantidad: 20000,  unidad: "g" },
  "Lechuga":             { cantidad: 15000,  unidad: "g" },
  "Tomate":              { cantidad: 20000,  unidad: "g" },
  "Salsa especial":      { cantidad: 10000,  unidad: "ml" },
  "Cacao en polvo":      { cantidad: 10000,  unidad: "g" },
  "Huevos":              { cantidad: 1000,   unidad: "unidad" },
  "Azúcar":              { cantidad: 50000,  unidad: "g" },
  "Mantequilla":         { cantidad: 20000,  unidad: "g" },
  "Leche":               { cantidad: 30000,  unidad: "ml" }
};

// Variable global interna para recordar las unidades calculadas en el simulador
let unidadesParaProducir = 0;

// ============================================================
// FUNCIÓN: DIBUJAR LA BODEGA EN LA PANTALLA
// ============================================================
function dibujarBodega() {
  let html = '<div class="cuadricula-bodega">';
  const nombres = Object.keys(BODEGA);

  // Recorremos todos los ingredientes para armar sus tarjetas visuales
  for (let i = 0; i < nombres.length; i++) {
    const nombre = nombres[i];
    const item   = BODEGA[nombre];

    // Cambiamos el color de la tarjeta según las existencias
    let colorStock = "#e2e8f0"; // Gris por defecto (Lleno)
    if (item.cantidad <= 0) {
      colorStock = "#fed7d7"; // Rojo si se agotó por completo
    } else if (item.cantidad < 2000) {
      colorStock = "#feebc8"; // Amarillo si queda muy poco (Alerta)
    }

    // Agregamos la tarjeta al bloque de texto HTML
    html += `
      <div class="tarjeta-bodega" style="background: ${colorStock};">
        <p>${nombre}</p>
        <p>${item.cantidad.toFixed(2)} ${item.unidad}</p>
      </div>
    `;
  }

  html += '</div>';
  // Subimos las tarjetas creadas al contenedor real del index.html
  document.getElementById("contenedor-bodega").innerHTML = html;
}

// ============================================================
// FUNCIÓN: DESCONTAR LOS INGREDIENTES CUANDO SE CLIQUEA EL BOTÓN
// ============================================================
function producirLote() {
  // Verificamos que el simulador tenga un producto activo seleccionado
  if (productoActual === null || unidadesParaProducir <= 0) {
    alert("Primero debes calcular el punto de equilibrio en el simulador.");
    return;
  }

  // Calculamos cuántas recetas completas se necesitan (Ej: si pide 40 porciones y la receta rinde 8, son 5 recetas)
  // Math.ceil redondea hacia arriba para que nunca falten ingredientes
  const recetasNecesarias = Math.ceil(unidadesParaProducir / productoActual.porciones);

  // Ciclo para revisar ingrediente por ingrediente del producto actual
  for (let i = 0; i < productoActual.ingredientes.length; i++) {
    const ing = productoActual.ingredientes[i];

    // Cantidad teórica que pide la receta multiplicada por las veces que la haremos
    const cantidadReceta = ing.cantidad * recetasNecesarias;
    
    // Sumamos el desperdicio usando la fórmula de la merma
    const cantidadConMerma = cantidadReceta / (1 - ing.merma);

    // Si el ingrediente existe en nuestra bodega, le restamos el gasto real
    if (BODEGA[ing.nombre]) {
      BODEGA[ing.nombre].cantidad -= cantidadConMerma;
    }
  }

  // Volvemos a pintar las tarjetas en la pantalla para ver los nuevos números rebajados
  dibujarBodega();

  // Mostramos el bloque de aviso verde confirmando el éxito
  const mensaje = document.getElementById("mensaje-produccion");
  mensaje.innerHTML = `✅ ¡Éxito! Se procesaron ${recetasNecesarias} recetas completas para cubrir las ${unidadesParaProducir} porciones de ${productoActual.nombre} necesarias para tu punto de equilibrio. Los insumos han sido descontados de la bodega.`;
  mensaje.classList.remove("oculto");
  
  // Desactivamos el botón para evitar que el usuario lo pulse dos veces por error y duplique el descuento
  document.getElementById("btn-producir-lote").disabled = true;
}

// ============================================================
// FUNCIÓN ENLACE: RECIBE LAS UNIDADES DESDE EL SIMULADOR
// ============================================================
function actualizarUnidadesPE(unidades) {
  unidadesParaProducir = unidades;
  // Habilitamos el botón de la bodega ya que ahora sí sabemos cuánto descontar
  document.getElementById("btn-producir-lote").disabled = false;
}

// ============================================================
// INICIALIZADOR DE EVENTOS DE LA BODEGA
// ============================================================
// Esperamos a que la página cargue por completo para asignar el clic al botón del HTML
window.addEventListener("load", function() {
  const btnProducir = document.getElementById("btn-producir-lote");
  if (btnProducir) {
    btnProducir.addEventListener("click", producirLote);
  }
  // Pintamos el inventario inicial
  dibujarBodega();
});