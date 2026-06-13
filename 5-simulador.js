// Variables de control interno para el motor económico del simulador
let productoActual = null;    
let costoTotalReceta = 0;     
let costoPorPorcion = 0;      
let precioVenta = 0;          
const PORCENTAJE_MANO_OBRA = 0.30; // Coeficiente fijo del 30%

// Función utilitaria para controlar qué pantalla está visible u oculta
function mostrarPantalla(pantallaObjetivo) {
  document.getElementById("pantalla-portada").classList.add("oculto");
  document.getElementById("pantalla-aprendizaje").classList.add("oculto");
  document.getElementById("pantalla-test").classList.add("oculto");
  document.getElementById("pantalla-simulador").classList.add("oculto");

  // Eliminamos el bloqueo visual de la sección requerida
  pantallaObjetivo.classList.remove("oculto");
}

// Aplica la fórmula del costo bruto del ingrediente considerando su merma
function obtenerCostoIngrediente(ingrediente) {
  let cantidadUsable = ingrediente.precioPor * (1 - ingrediente.merma);
  let precioPorUnidad = ingrediente.precio / cantidadUsable;
  let costoTotal = precioPorUnidad * ingrediente.cantidad;
  return parseFloat(costoTotal.toFixed(2));
}

// Genera de forma dinámica las tarjetas de ingredientes del producto escogido
function mostrarIngredientes(producto) {
  costoTotalReceta = 0;
  let html = '<div class="cuadricula-ingredientes">';

  for (let i = 0; i < producto.ingredientes.length; i++) {
    let ing = producto.ingredientes[i];
    let costoIng = obtenerCostoIngrediente(ing);
    costoTotalReceta += costoIng;

    html += `
      <div class="tarjeta-ingrediente">
        <p class="ingrediente-nombre">${ing.nombre}</p>
        <p class="ingrediente-detalle">Cantidad: ${ing.cantidad} ${ing.unidad}</p>
        <p class="ingrediente-detalle">Precio ref: $${ing.precio} / ${ing.precioPor} ${ing.unidad}</p>
        <p class="ingrediente-merma">Merma: ${ing.merma * 100}%</p>
        <p class="ingrediente-costo">Costo: $${costoIng.toFixed(2)}</p>
      </div>
    `;
  }
  html += '</div>';
  document.getElementById("contenedor-ingredientes").innerHTML = html;

  // Cálculos financieros derivados
  let costoMateriaPrimaUnitario = costoTotalReceta / producto.porciones;
  let costoManoObraUnitario = costoMateriaPrimaUnitario * PORCENTAJE_MANO_OBRA;
  costoPorPorcion = costoMateriaPrimaUnitario + costoManoObraUnitario;

  // Actualizamos etiquetas de texto en el HTML
  document.getElementById("total-materia-prima").textContent = "$" + costoTotalReceta.toFixed(2);
  document.getElementById("costo-mano-obra").textContent = "$" + costoManoObraUnitario.toFixed(2);
  document.getElementById("costo-porcion").textContent = "$" + costoPorPorcion.toFixed(2);
}

// Calcula el precio de venta final según el margen
function procesarPrecioVenta() {
  let margen = parseInt(document.getElementById("input-margen").value);

  if (isNaN(margen) || margen < 0) {
    alert("Escribe un margen porcentual válido.");
    return;
  }

  precioVenta = costoPorPorcion + (costoPorPorcion * (margen / 100));
  document.getElementById("precio-venta").textContent = "$" + precioVenta.toFixed(2);
  document.getElementById("bloque-equilibrio").classList.remove("oculto");
}

// Calcula el punto de equilibrio y envía el dato a la bodega
function procesarPuntoEquilibrio() {
  let costosFijos = parseFloat(document.getElementById("input-costos-fijos").value);

  if (isNaN(costosFijos) || costosFijos <= 0) {
    alert("Por favor introduce los costos fijos.");
    return;
  }

  let margenContribucion = precioVenta - costoPorPorcion;
  if (margenContribucion <= 0) {
    alert("El precio de venta no puede ser menor o igual que los costos.");
    return;
  }

  let unidadesPE = Math.ceil(costosFijos / margenContribucion);
  document.getElementById("unidades-equilibrio").textContent = unidadesPE + " unidades";

  // CONEXIÓN CLAVE CON BODEGA.JS: Enviamos las unidades calculadas para activar el inventario
  actualizarUnidadesPE(unidadesPE);

  desplegarResumen(costosFijos, unidadesPE);
}

// Imprime la tarjeta con el resumen integral del análisis
function desplegarResumen(costosFijos, peUnidades) {
  let nombreProducto = productoActual.nombre;
  let html = `
    <div class="fila-resumen"><strong>Producto:</strong> <span>${nombreProducto}</span></div>
    <div class="fila-resumen"><strong>Costo unitario por porción:</strong> <span>$${costoPorPorcion.toFixed(2)}</span></div>
    <div class="fila-resumen"><strong>Precio Venta sugerido:</strong> <span>$${precioVenta.toFixed(2)}</span></div>
    <div class="fila-resumen"><strong>Punto de equilibrio mensual:</strong> <span>${peUnidades} unidades</span></div>
  `;
  document.getElementById("contenido-resumen").innerHTML = html;
  document.getElementById("resumen-final").classList.remove("oculto");
  document.getElementById("resumen-final").scrollIntoView({ behavior: "smooth" });
}

// Limpia los datos de los formularios para empezar desde cero
function resetearSimulador() {
  productoActual = null;
  document.getElementById("selector-producto").value = "";
  document.getElementById("input-margen").value = "";
  document.getElementById("input-costos-fijos").value = "";
  document.getElementById("bloque-ingredientes").classList.add("oculto");
  document.getElementById("bloque-margen").classList.add("oculto");
  document.getElementById("bloque-equilibrio").classList.add("oculto");
  document.getElementById("resumen-final").classList.add("oculto");
  document.getElementById("btn-producir-lote").disabled = true;
  document.getElementById("mensaje-produccion").classList.add("oculto");
}

// ============================================================
// ASIGNACIÓN DE EVENTOS (LISTENERS DE CLIC E INTERFACES)
// ============================================================

// Botón: Ir de Portada a Aprendizaje
document.getElementById("btn-ir-aprendizaje").addEventListener("click", function() {
  mostrarPantalla(document.getElementById("pantalla-aprendizaje"));
  dibujarCartilla();
});

// Navegación de Cartillas Educativas
document.getElementById("btn-cartilla-anterior").addEventListener("click", function() {
  if (cartillaActual > 0) { cartillaActual--; dibujarCartilla(); }
});
document.getElementById("btn-cartilla-siguiente").addEventListener("click", function() {
  if (cartillaActual < CONCEPTOS.length - 1) { cartillaActual++; dibujarCartilla(); }
});

// Ir al Test
document.getElementById("btn-ir-test").addEventListener("click", function() {
  mostrarPantalla(document.getElementById("pantalla-test"));
  dibujarPreguntas();
});

// Evaluar Test
document.getElementById("btn-calificar").addEventListener("click", calificarTest);

// Regresar del test al Inicio
document.getElementById("btn-reiniciar-test").addEventListener("click", function() {
  cartillaActual = 0;
  document.getElementById("resultado-test").classList.add("oculto");
  document.getElementById("btn-reiniciar-test").classList.add("oculto");
  document.getElementById("btn-ir-test").disabled = true;
  document.getElementById("btn-ir-test").textContent = "Comenzar test (bloqueado)";
  mostrarPantalla(document.getElementById("pantalla-portada"));
});

// Botón: Ir de Portada a Simulador
document.getElementById("btn-ir-simulador").addEventListener("click", function() {
  mostrarPantalla(document.getElementById("pantalla-simulador"));
  dibujarBodega(); // Inicializa pintando la bodega al abrir
});

// Volver del simulador a Portada
document.getElementById("btn-volver-portada").addEventListener("click", function() {
  resetearSimulador();
  mostrarPantalla(document.getElementById("pantalla-portada"));
});

// Selector dinámico de Productos
document.getElementById("selector-producto").addEventListener("change", function() {
  let valor = this.value;
  if (valor === "") { resetearSimulador(); return; }
  productoActual = PRODUCTOS[valor];
  mostrarIngredientes(productoActual);
  document.getElementById("bloque-ingredientes").classList.remove("oculto");
  document.getElementById("bloque-margen").classList.remove("oculto");
});

// Cálculos del simulador
// Cambia la línea del margen por esta que está limpia y corregida:
document.getElementById("btn-calcular-margen").addEventListener("click", procesarPrecioVenta);
document.getElementById("btn-calcular-equilibrio").addEventListener("click", procesarPuntoEquilibrio);
document.getElementById("btn-reiniciar-simulador").addEventListener("click", resetearSimulador);