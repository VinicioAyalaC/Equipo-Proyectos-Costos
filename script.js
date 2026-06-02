/* ============================================================
    LÓGICA DEL SISTEMA DE COSTEO - script.js (Grupo Ramones)
============================================================
    Este archivo hace TRES cosas:
    1. Guarda los datos (8 conceptos y 5 preguntas) en arreglos.
    2. Inyecta ese contenido en el HTML (contenido dinámico).
    3. Controla el flujo: cambiar de pantalla, navegar cartillas,
        desbloquear y calificar el test.

    La técnica clave del proyecto es la INYECCIÓN DINÁMICA:  las cartillas y preguntas no están escritas en el HTML,
    sino aquí en datos, y JavaScript las dibuja en pantalla.
   ============================================================ */


/* ============================================================
    PARTE 1: LOS DATOS  CONCEPTOS
   ============================================================ */

const CONCEPTOS = [
  {
    titulo: "01. Costos Fijos",
    queEs: "Gastos constantes que no cambian con el nivel de producción. Se pagan de forma obligatoria cada periodo.",
    ejemplo: "El arriendo mensual del local de la pizzería ($300.00) o el internet fijo.",
    formula: "Suma de todos los egresos fijos del mes",
    error: "Creer que el costo fijo es cero si un mes no hay ventas. La deuda contractual sigue intacta." },

  {
    titulo: "02. Costos Variables",
    queEs: "Gastos que cambian de forma proporcional según la cantidad de unidades producidas y vendidas.",
    ejemplo: "Las cajas de cartón para pizza o los guantes desechables de cocina.",
    formula: "Costo empaque unitario × Volumen de ventas",
    error: "Mezclar estos gastos con los ingredientes estables de la receta, dificultando el desglose."  },

  {
    titulo: "03. Costos Directos e Indirectos",
    queEs: "Directo: gasto asignable a un producto específico. Indirecto: gasto compartido del local en general.",
    ejemplo: "Directo: el queso y el pepperoni. Indirecto: el agua comercial o el salario del administrador.",
    formula: "Costo Indirecto Unitario = Costos Indirectos Totales / Volumen de Venta",
    error: "Invertir los conceptos, creyendo que el directo es el fijo y el indirecto el que varía." },

  {
    titulo: "04. Costo de Materia Prima",
    queEs: "El valor de los insumos físicos que quedan dentro del plato final terminado.",
    ejemplo: "250 gramos de harina equivalen a $0.15 de un saco de 50 kg comprado a $30.00.",
    formula: "Costo Insumo = (Precio Compra / Cantidad Compra) × Cantidad Receta",
    error: "Olvidar homologar las unidades (operar kilos con gramos), provocando distorsiones de costo."  },

  {
    titulo: "05. Mano de Obra",
    queEs: "El costo del tiempo humano invertido en preparar y cocinar un plato.",
    ejemplo: "$1.00 por los 20 minutos de armar una pizza, con un salario de $3.00 la hora.",
    formula: "Costo Mano Obra = (Minutos Preparación × Costo Hora) / 60",
    error: "No diferenciar tareas por unidad de las tareas por lote (una olla de salsa para 10 pizzas), inflando el costo." },

  {
    titulo: "06. Costeo de Recetas",
    queEs: "La suma de todos los costos anteriores para obtener el costo de producción total de un plato.",
    ejemplo: "Harina $0.15 + tiempo $1.00 + indirectos $1.00 = costo real de $2.15.",    
    formula: "Costo por Porción = (Materia Prima + Mano de Obra + Costos Indirectos) / N° de Porciones",
    error: "Olvidar dividir entre las porciones, asumiendo que una receta familiar cuesta igual que una porción individual." },

  {
    titulo: "07. Margen de Ganancia",
    queEs: "El porcentaje de beneficio sobre el costo que define el dueño para obtener rentabilidad.",
    ejemplo: "Si una porción cuesta $0.50 y se quiere un 100% de margen, se vende en $1.00.",
    formula: "Precio Venta = Costo Unitario + [Costo Unitario × (Margen / 100)]",
    error: "Multiplicar el costo por el entero (costo × 50) en vez de usar 50/100, dando precios irreales." },

  {
    titulo: "08. Punto de Equilibrio",
    queEs: "La cantidad mínima de unidades a vender para que el ingreso iguale a los gastos fijos. Ni se gana ni se pierde.",
    ejemplo: "Vender 400 pizzas de $1.00 (con $0.50 de costo) para cubrir $200.00 de gastos fijos.",
    formula: "Punto Equilibrio = Costos Fijos Totales / (Precio Venta - Costo Unitario)",
    error: "No restar el costo unitario al precio antes de dividir, generando una meta de ventas ficticia."
  }
];


/*/* ============================================================ 
Las 5 preguntas del test
   Cada pregunta tiene su enunciado, sus opciones y el número
   de la opción correcta (empezando a contar desde 0).
   Las respuestas correctas están repartidas (no todas iguales). */
const PREGUNTAS = [
  {
    enunciado: "Si el arriendo del local de pizzas cuesta $300 al mes, ¿qué tipo de costo es?",
    opciones: ["Costo Variable", "Costo Directo", "Costo Indirecto / Fijo"],
    correcta: 2   // la tercera opción (índice 2)
  },
  
  {
    enunciado: "Si compras un saco de harina en kilos pero tu receta usa gramos, ¿qué debe hacer el sistema antes de calcular?",
    opciones: ["Homologar las unidades (convertir kilos a gramos)", "Multiplicar los kilos por los gramos", "Ignorar los gramos y aproximar al ojo"],
    correcta: 0   // la primera opción (índice 0)
  },
  
  {
    enunciado: "El cocinero tarda 20 minutos en una olla de salsa que rinde para 10 pizzas. ¿Cómo se asigna ese costo?",
    opciones: ["Cobrar los 20 minutos enteros a la primera pizza", "Dividir el costo de esos 20 minutos entre las 10 pizzas", "No cobrar la mano de obra porque la salsa es un extra"],
    correcta: 1   // la segunda opción (índice 1)
  },
  
  {
    enunciado: "Si un plato cuesta $2.00 y se quiere ganar 50%, ¿cómo opera el JavaScript el porcentaje?",
    opciones: ["Multiplicar el costo por 50 (2.00 * 50)", "Sumarle 50 dólares al costo", "Dividir el porcentaje para 100 (50/100) y multiplicarlo por el costo"],
    correcta: 2   // la tercera opción (índice 2)
  },
  
  {
    enunciado: "¿Qué representa el Punto de Equilibrio para el dueño?",
    opciones: ["La cantidad mínima de platos para cubrir gastos, quedando en cero", "El momento en que el negocio duplica ganancias", "El precio más alto al que puede vender una pizza"],
    correcta: 0   // la primera opción (índice 0)
  }
];


/* ============================================================
PARTE 2: REFERENCIAS A ELEMENTOS DEL HTML
Guardamos en variables los elementos que vamos a usar 
============================================================*/
const btnIrAprendizaje    = document.getElementById("btn-ir-aprendizaje"); // primero

const pantallaPortada     = document.getElementById("pantalla-portada");
const pantallaAprendizaje = document.getElementById("pantalla-aprendizaje");
const pantallaTest        = document.getElementById("pantalla-test");


const btnCartillaAnterior = document.getElementById("btn-cartilla-anterior");
const btnCartillaSiguiente= document.getElementById("btn-cartilla-siguiente");
const btnIrTest           = document.getElementById("btn-ir-test");
const btnCalificar        = document.getElementById("btn-calificar");

const contenedorCartilla  = document.getElementById("contenedor-cartilla");
const contadorCartilla    = document.getElementById("contador-cartilla");
const contenedorPreguntas = document.getElementById("contenedor-preguntas-dinamicas");
const resultadoTest       = document.getElementById("resultado-test");


/* Variable que recuerda en qué cartilla estamos (empieza en la 0). */
let cartillaActual = 0;


/* ============================================================
  PARTE 3: FUNCIONES DE PANTALLA
  Muestra una pantalla y oculta las demás.  Recuerda: quitar la clase "oculto" la muestra,
  y agregarla la esconde (lo definimos en el CSS).
   ============================================================ */

function mostrarPantalla(pantalla) {
  /* Primero ocultamos las tres; 
  .classList permite manipular las clases CSS del elemento 
  .add("oculto") agrega la clase "oculto".
  .remove("oculto") elimina la clase "oculto"     */
  pantallaPortada.classList.add("oculto");
  pantallaAprendizaje.classList.add("oculto");
  pantallaTest.classList.add("oculto");  
  pantalla.classList.remove("oculto");   // Luego mostramos solo la que queremos
}


/* ============================================================
   PARTE 4: LÓGICA DE LAS CARTILLAS
   ============================================================ */

/* Dibuja en pantalla la cartilla que toca según "cartillaActual".
   Aquí ocurre la inyección dinámica: construimos el HTML con los  datos del concepto y lo metemos en el contenedor. */
function dibujarCartilla() {
  const OBJETO = CONCEPTOS[cartillaActual];   // el concepto actual

  // Armamos el HTML de la cartilla usando los datos del objeto
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
  `; //fin de contenedorCartilla || genera el objeto en html


  // Actualizamos el contador "X de 8"
  contadorCartilla.textContent = (cartillaActual + 1) + " de " + CONCEPTOS.length;


  
  // El botón "Anterior" se desactiva si estamos en la primera  
  if (cartillaActual === 0) {
    btnCartillaAnterior.disabled = true;
  }else{
    btnCartillaAnterior.disabled = false;
  }


  // El botón "Siguiente" se desactiva si estamos en la última  
  if (cartillaActual === CONCEPTOS.length - 1) {
    btnCartillaSiguiente.disabled = true;
  }

  /* DESBLOQUEO DEL TEST:
     Cuando el usuario llega a la última cartilla (la 8), activamos el botón del test quitándole el "disabled". */
  if (cartillaActual === CONCEPTOS.length - 1) {
    btnIrTest.disabled = false;
    btnIrTest.textContent = "Comenzar test";
  }
}  // fin de dibujarCartilla


/* ============================================================
   PARTE 5: LÓGICA DEL TEST
   ============================================================ */

/* Inyecta las 5 preguntas dentro del contenedor dinámico.
   Recorre el arreglo de preguntas y, por cada una, recorre sus
   opciones para crear los botones de radio. */
function dibujarPreguntas() {
      let html = "";

      // Recorremos cada pregunta (i = número de pregunta) 

    for (let i = 0; i < PREGUNTAS.length; i++) {
        
        let cuestionario = PREGUNTAS[i];    // Guardamos la pregunta actual en una variable    
        html += `<div class="pregunta" id="pregunta-${i}">`;  // Creamos el contenedor de la pregunta   
        html += `<p class="enunciado">${i + 1}. ${cuestionario.enunciado}</p>`;  // // Mostramos el enunciado de la pregunta

            // Recorremos las opciones de la pregunta
            for (let j = 0; j < cuestionario.opciones.length; j++) {
                
                let opcion = cuestionario.opciones[j];  // Guardamos la opción actual

                // Creamos cada opción con radio button
                html += `
                    <label class="opcion">
                        <input type="radio"
                              name="pregunta-${i}"
                              value="${j}">
                        ${opcion}

                    </label>
                `;
            }  // fin de for j

        
        html += `</div>`;   // Cerramos el div de la pregunta
    }  //// fin de for i


      contenedorPreguntas.innerHTML = html;
}  // fin de dibujarPreguntas()


/* Revisa las respuestas, cuenta los aciertos, pinta cada opción
   de verde o rojo, y muestra la nota final. */
function calificarTest() {
  let aciertos = 0;

  // Revisamos pregunta por pregunta
 for(let i=0; i<PREGUNTAS.length; i++){
  const pregunta = PREGUNTAS[i]; // Siempre apunta al mismo objeto, no cambia

  // Busca en el HTML un <input> que cumpla dos condiciones:
  //   name="pregunta-0" (o 1, 2... según la vuelta) → que pertenezca a esta pregunta
  //  :checked → que esté marcado por el usuario
  const seleccion = document.querySelector(`input[name="pregunta-${i}"]:checked`)

  // Busca todos los elementos con clase .opcion que estén dentro del 
  // contenedor #pregunta-0 (o 1, 2...). El resultado es una lista
    const opcionesHTML = document.querySelectorAll(`#pregunta-${i} .opcion`);

    // pregunta.correcta es un número, por ejemplo 2. Entonces accede 
    // a opcionesHTML[2] y le agrega la clase CSS "correcta", que normalmente 
    // la pinta de verde.
    opcionesHTML[pregunta.correcta].classList.add("correcta");

    if (seleccion) {

          //seleccion.value devuelve el valor del input como texto, por ejemplo "2"
          // . parseInt() lo convierte al número 2, para poder compararlo correctamente.
          const elegida = parseInt(seleccion.value);  

          if (elegida === pregunta.correcta) {
            // Acertó
            aciertos++;
          } else {
            // Falló: pintamos de rojo la que eligió mal
            opcionesHTML[elegida].classList.add("incorrecta");
          }
        }  // fin de if

  
 }




  // Mostramos la caja de resultado con la nota
  resultadoTest.classList.remove("oculto");
  resultadoTest.innerHTML = `
    <p class="nota">${aciertos} / ${PREGUNTAS.length}</p>
    <p>respuestas correctas</p>
  `;

  // Llevamos la vista hasta el resultado para que se vea
  resultadoTest.scrollIntoView({ behavior: "smooth" });
}





/* ============================================================
   PARTE 6: CONECTAR LOS BOTONES (eventos)
   ============================================================
   Aquí le decimos a cada botón qué función ejecutar al pulsarlo. */

// Portada -> Aprendizaje
btnIrAprendizaje.addEventListener("click", function () { // boton comenzar a estudiar
                                              mostrarPantalla(pantallaAprendizaje);
                                              dibujarCartilla();   // dibujamos la primera cartilla al entrar
                                            }
);



// Botón "Anterior" de las cartillas
btnCartillaAnterior.addEventListener("click", function () {
  if (cartillaActual > 0) {
    cartillaActual--;
    dibujarCartilla();
  }
});



// Botón "Siguiente" de las cartillas
btnCartillaSiguiente.addEventListener("click", function () {
  if (cartillaActual < CONCEPTOS.length - 1) {
    cartillaActual++;
    dibujarCartilla();
  }
});



// Aprendizaje -> Test
btnIrTest.addEventListener("click", function () {
  mostrarPantalla(pantallaTest);
  dibujarPreguntas();   // inyectamos las preguntas al entrar al test
});

// Botón para calificar
btnCalificar.addEventListener("click", calificarTest);
