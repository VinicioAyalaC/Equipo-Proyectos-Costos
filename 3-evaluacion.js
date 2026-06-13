// Función para armar los radio buttons de las 5 preguntas del test
function dibujarPreguntas() {
  let html = "";
  const contenedorPreguntas = document.getElementById("contenedor-preguntas-dinamicas");

  // Primer ciclo: Recorre cada una de las preguntas
  for (let i = 0; i < PREGUNTAS.length; i++) {
    let cuestionario = PREGUNTAS[i];    
    html += `<div class="pregunta" id="pregunta-${i}">`;  
    html += `<p class="enunciado">${i + 1}. ${cuestionario.enunciado}</p>`;  

    // Segundo ciclo nested: Recorre las opciones de esa pregunta específica
    for (let j = 0; j < cuestionario.opciones.length; j++) {
      let opcion = cuestionario.opciones[j];  
      html += `
        <label class="opcion">
            <input type="radio" name="pregunta-${i}" value="${j}">
            ${opcion}
        </label> `;
    }  
    html += `</div>`;   
  }  

  // Subimos todo el bloque de código estructurado al HTML
  contenedorPreguntas.innerHTML = html;
}

// Función encargada de calificar el test y dar una nota retroalimentada
function calificarTest() {
  // Limpiamos los estilos de respuestas anteriores por si acaso
  let opciones = document.querySelectorAll(".opcion"); 
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.remove("correcta", "incorrecta");
  }

  let aciertos = 0;

  // Analizamos pregunta por pregunta
  for (let i = 0; i < PREGUNTAS.length; i++) {
    const pregunta = PREGUNTAS[i]; 
    // Captura el radio button seleccionado por el usuario en esta pregunta
    const seleccion = document.querySelector(`input[name="pregunta-${i}"]:checked`);
    // Captura visualmente los labels de la interfaz
    const opcionesHTML = document.querySelectorAll(`#pregunta-${i} .opcion`);

    // Pintamos la respuesta correcta siempre de color verde
    opcionesHTML[pregunta.correcta].classList.add("correcta");

    // Si el usuario contestó la pregunta:
    if (seleccion) {
      const elegida = parseInt(seleccion.value);
      if (elegida === pregunta.correcta) {
        aciertos++; // Sumamos puntos si coincide
      } else {
        opcionesHTML[elegida].classList.add("incorrecta"); // Rojo si se equivocó
      }
    }  
  } 

  // Mostramos el bloque de resultados
  const resultadoTest = document.getElementById("resultado-test");
  resultadoTest.classList.remove("oculto");
  resultadoTest.innerHTML = `
    <p class="nota">${aciertos} / ${PREGUNTAS.length}</p>
    <p>respuestas correctas</p>
  `;
  
  // Hacemos visible el botón para resetear y regresar a la portada
  document.getElementById("btn-reiniciar-test").classList.remove("oculto"); 
  resultadoTest.scrollIntoView({ behavior: "smooth" });
}