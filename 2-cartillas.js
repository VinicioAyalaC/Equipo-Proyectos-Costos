// Variable global para rastrear en qué cartilla educativa está el usuario
let cartillaActual = 0;

// Función que escribe dinámicamente en el HTML los textos de la cartilla que corresponde
function dibujarCartilla() {
  // Obtenemos los datos del concepto usando el índice actual
  const OBJETO = CONCEPTOS[cartillaActual];   

  // Referencia al contenedor HTML de la cartilla
  const contenedorCartilla = document.getElementById("contenedor-cartilla");

  // Inyectamos el diseño visual rellenado con los datos del arreglo
  contenedorCartilla.innerHTML = `
    <h2>${OBJETO.titulo}</h2>
    <div class="cartilla-bloque">
      <span class="subtitulo">Qué es</span>
      <p>${OBJETO.queEs}</p>
    </div>
    <div class="cartilla-bloque">
      <span class="subtitulo">Ejemplo</span>
      <p>${OBJETO.ejemplo}</p>
    </div>
    <div class="cartilla-bloque">
      <span class="subtitulo">Lógica / Cálculo</span>
      <div class="cartilla-formula">${OBJETO.formula}</div>
    </div>
    <div class="caja-error">
      <p class="titulo-error">⚠ Error común</p>
      <p>${OBJETO.error}</p>
    </div>
  `; 

  // Actualizamos el contador de texto inferior (ej: "1 de 8")
  document.getElementById("contador-cartilla").textContent = (cartillaActual + 1) + " de " + CONCEPTOS.length;

  // Si estamos en la primera cartilla, bloqueamos el botón "Anterior"
  document.getElementById("btn-cartilla-anterior").disabled = (cartillaActual === 0);

  // Si estamos en la última cartilla, bloqueamos el botón "Siguiente"
  document.getElementById("btn-cartilla-siguiente").disabled = (cartillaActual === CONCEPTOS.length - 1);

  // Desbloqueo del Test: si llegamos al final, activamos el botón para evaluar
  if (cartillaActual === CONCEPTOS.length - 1) {
    const btnIrTest = document.getElementById("btn-ir-test");
    btnIrTest.disabled = false;
    btnIrTest.textContent = "Comenzar test";
  }
}