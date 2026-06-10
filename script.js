/* ============================================================
    PARTE 1: LOS DATOS  CONCEPTOS
   ============================================================ */

const CONCEPTOS = [
  {
    titulo: "01. Costos Fijos",
    queEs: "Gastos constantes que no cambian con el nivel de producción. Se pagan de forma obligatoria cada periodo.",
    ejemplo: "El arriendo mensual del local de la pizzería ($300.00) o el internet fijo.",
    formula: "Suma de todos los egresos fijos del mes",
    error: "Creer que el costo fijo es cero si un mes no hay ventas. La deuda contractual sigue intacta."
  },

  {
    titulo: "02. Costos Variables",
    queEs: "Gastos que cambian de forma proporcional según la cantidad de unidades producidas y vendidas.",
    ejemplo: "Las cajas de cartón para pizza o los guantes desechables de cocina.",
    formula: "Costo empaque unitario × Volumen de ventas",
    error: "Mezclar estos gastos con los ingredientes estables de la receta, dificultando el desglose."
  },

  {
    titulo: "03. Costos Directos e Indirectos",
    queEs: "Directo: gasto asignable a un producto específico. Indirecto: gasto compartido del local en general.",
    ejemplo: "Directo: el queso y el pepperoni. Indirecto: el agua comercial o el salario del administrador.",
    formula: "Costo Indirecto Unitario = Costos Indirectos Totales / Volumen de Venta",
    error: "Invertir los conceptos, creyendo que el directo es el fijo y el indirecto el que varía."
  },

  {
    titulo: "04. Costo de Materia Prima",
    queEs: "El valor de los insumos físicos que quedan dentro del plato final terminado.",
    ejemplo: "250 gramos de harina equivalen a $0.15 de un saco de 50 kg comprado a $30.00.",
    formula: "Costo Insumo = (Precio Compra / Cantidad Compra) × Cantidad Receta",
    error: "Olvidar homologar las unidades (operar kilos con gramos), provocando distorsiones de costo."
  },

  {
    titulo: "05. Mano de Obra",
    queEs: "El costo del tiempo humano invertido en preparar y cocinar un plato.",
    ejemplo: "$1.00 por los 20 minutos de armar una pizza, con un salario de $3.00 la hora.",
    formula: "Costo Mano Obra = (Minutos Preparación × Costo Hora) / 60",
    error: "No diferenciar tareas por unidad de las tareas por lote (una olla de salsa para 10 pizzas), inflando el costo."
  },

  {
    titulo: "06. Costeo de Recetas",
    queEs: "La suma de todos los costos anteriores para obtener el costo de producción total de un plato.",
    ejemplo: "Harina $0.15 + tiempo $1.00 + indirectos $1.00 = costo real de $2.15.",
    formula: "Costo por Porción = (Materia Prima + Mano de Obra + Costos Indirectos) / N° de Porciones",
    error: "Olvidar dividir entre las porciones, asumiendo que una receta familiar cuesta igual que una porción individual."
  },

  {
    titulo: "07. Margen de Ganancia",
    queEs: "El porcentaje de beneficio sobre el costo que define el dueño para obtener rentabilidad.",
    ejemplo: "Si una porción cuesta $0.50 y se quiere un 100% de margen, se vende en $1.00.",
    formula: "Precio Venta = Costo Unitario + [Costo Unitario × (Margen / 100)]",
    error: "Multiplicar el costo por el entero (costo × 50) en vez de usar 50/100, dando precios irreales."
  },

  {
    titulo: "08. Punto de Equilibrio",
    queEs: "La cantidad mínima de unidades a vender para que el ingreso iguale a los gastos fijos. Ni se gana ni se pierde.",
    ejemplo: "Vender 400 pizzas de $1.00 (con $0.50 de costo) para cubrir $200.00 de gastos fijos.",
    formula: "Punto Equilibrio = Costos Fijos Totales / (Precio Venta - Costo Unitario)",
    error: "No restar el costo unitario al precio antes de dividir, generando una meta de ventas ficticia."
  }
];


/* ============================================================ 
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
const btnIrAprendizaje = document.getElementById("btn-ir-aprendizaje"); // primero

/* Referencias a las pantallas */
const pantallaPortada = document.getElementById("pantalla-portada");
const pantallaSimulador = document.getElementById("pantalla-simulador");


const pantallaAprendizaje = document.getElementById("pantalla-aprendizaje");
const pantallaTest = document.getElementById("pantalla-test");


const btnCartillaAnterior = document.getElementById("btn-cartilla-anterior");
const btnCartillaSiguiente = document.getElementById("btn-cartilla-siguiente");
const btnIrTest = document.getElementById("btn-ir-test");
const btnCalificar = document.getElementById("btn-calificar");
const btnReiniciarTest = document.getElementById("btn-reiniciar-test"); // <--- NUEVA LÍNEA

const contenedorCartilla = document.getElementById("contenedor-cartilla");
const contadorCartilla = document.getElementById("contador-cartilla");
const contenedorPreguntas = document.getElementById("contenedor-preguntas-dinamicas");
const resultadoTest = document.getElementById("resultado-test");




// Referencias a bloques dentro del simulador //
const bloqueIngredientes = document.getElementById("bloque-ingredientes");
const bloqueMargen = document.getElementById("bloque-margen");
const bloqueEquilibrio = document.getElementById("bloque-equilibrio");
const resumenFinal = document.getElementById("resumen-final");

/* Referencias a los contenedores donde el JS escribe HTML dinámico */
const contenedorIngredientes = document.getElementById("contenedor-ingredientes");
const contenidoResumen = document.getElementById("contenido-resumen");

/* Referencias a los elementos que muestran resultados */
const totalMateriaPrima = document.getElementById("total-materia-prima");
const costoPorcionEl = document.getElementById("costo-porcion");
const costoManoObraEl = document.getElementById("costo-mano-obra");
const precioVentaEl = document.getElementById("precio-venta");
const unidadesEquilibrio = document.getElementById("unidades-equilibrio");

/* Referencias a los campos de entrada del usuario */
const selectorProducto = document.getElementById("selector-producto");
const inputMargen = document.getElementById("input-margen");
const inputCostosFijos = document.getElementById("input-costos-fijos");

/* Referencias a los botones */
const btnIrSimulador = document.getElementById("btn-ir-simulador");
const btnVolverPortada = document.getElementById("btn-volver-portada");
const btnCalcularMargen = document.getElementById("btn-calcular-margen");
const btnCalcularEquilibrio = document.getElementById("btn-calcular-equilibrio");
const btnReiniciarSimulador = document.getElementById("btn-reiniciar-simulador");



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
  pantallaSimulador.classList.add("oculto");  //////////////////

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
  } else {
    btnCartillaAnterior.disabled = false;
  }


  // El botón "Siguiente" se desactiva si estamos en la última  
  if (cartillaActual === CONCEPTOS.length - 1) {
    btnCartillaSiguiente.disabled = true;
  } else {
    btnCartillaSiguiente.disabled = false;
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
      html += ` <label class="opcion">
                            <input type="radio"
                                  name="pregunta-${i}"
                                  value="${j}">
                            ${opcion}
                    </label> `;
    }  // fin de for j

    html += `</div>`;   // Cerramos el div de la pregunta
  }  //// fin de for i

  contenedorPreguntas.innerHTML = html;
}  // fin de dibujarPreguntas()


/* Revisa las respuestas, cuenta los aciertos, pinta cada opción
   de verde o rojo, y muestra la nota final. */


function calificarTest() {

  let opciones = document.querySelectorAll(".opcion"); // Obtiene todos los elementos con la clase "opcion"

  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.remove("correcta");
    opciones[i].classList.remove("incorrecta");
  }

  let aciertos = 0;

  // Revisamos pregunta por pregunta
  for (let i = 0; i < PREGUNTAS.length; i++) {
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
  } //fin for (i)

  // Mostramos la caja de resultado con la nota
  resultadoTest.classList.remove("oculto");
  resultadoTest.innerHTML = ` <p class="nota">${aciertos} / ${PREGUNTAS.length}</p>
                              <p>respuestas correctas</p>`;
  btnReiniciarTest.classList.remove("oculto"); //NUEVA LÍNEA: Muestra el botón de volver

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
}
);



// Botón "Siguiente" de las cartillas
btnCartillaSiguiente.addEventListener("click", function () {
  if (cartillaActual < CONCEPTOS.length - 1) {
    cartillaActual++;
    dibujarCartilla();
  }
}
);



// Aprendizaje -> Test
btnIrTest.addEventListener("click", function () {
  mostrarPantalla(pantallaTest);
  dibujarPreguntas();   // inyectamos las preguntas al entrar al test
}
);

// Botón para reiniciar todo y volver a la portada
btnReiniciarTest.addEventListener("click", function () {
  cartillaActual = 0; // Volver a la primera cartilla  
  resultadoTest.classList.add("oculto"); // Ocultar resultado  
  btnReiniciarTest.classList.add("oculto"); // Ocultar botón volver  
  resultadoTest.innerHTML = ""; // Limpiar resultado  
  contenedorPreguntas.innerHTML = ""; // Limpiar preguntas del test  
  btnIrTest.disabled = true;
  btnIrTest.textContent = "Comenzar test (bloqueado)";
  mostrarPantalla(pantallaPortada);// Regresar a la pantalla principal
});

// Botón para calificar
btnCalificar.addEventListener("click", calificarTest);




//---------------SIMULADOR------------------

/* ============================================================
   PARTE 1: LOS DATOS
   Aquí viven todos los productos y sus ingredientes.
 
   Estructura usada:
     - PRODUCTOS es un OBJETO  ({}): contiene tres productos.
     - Cada producto es también un OBJETO con propiedades.
     - La propiedad "ingredientes" es un ARREGLO ([]) de objetos.
     - Cada ingrediente es un OBJETO con 4 propiedades.
 
   Vinicio: puedes agregar más productos aquí siguiendo el mismo patrón.
   ============================================================ */
const PRODUCTOS = {

  /* ----- PRODUCTO 1: Pizza Margarita ----- */
  pizza: {
    nombre: "Pizza Margarita",               /* nombre para mostrar en pantalla */
    porciones: 8,                            /* cuántas porciones rinde una receta */
    ingredientes: [                          /* arreglo de ingredientes */
      {
        nombre: "Harina de trigo",
        cantidad: 500,                       /* cantidad usada en la receta */
        unidad: "g",                         /* gramos */
        precioPor: 1000,                     /* el precio corresponde a esta cantidad */
        precio: 1.20,
        merma: 0.10                        /* precio de 1000 g = $1.20 */
      },
      {
        nombre: "Salsa de tomate",
        cantidad: 200,
        unidad: "ml",
        precioPor: 500,
        precio: 0.90,
        merma: 0.10
      },
      {
        nombre: "Queso mozzarella",
        cantidad: 300,
        unidad: "g",
        precioPor: 1000,
        precio: 4.50,
        merma: 0.10
      },
      {
        nombre: "Aceite de oliva",
        cantidad: 30,
        unidad: "ml",
        precioPor: 500,
        precio: 3.00,
        merma: 0.10
      },
      {
        nombre: "Levadura",
        cantidad: 7,
        unidad: "g",
        precioPor: 100,
        precio: 0.60,
        merma: 0.10
      }
    ]
  }, // ----- Fin pizza



  /* ----- PRODUCTO 2: Hamburguesa Clásica ----- */
  hamburguesa: {
    nombre: "Hamburguesa Clásica",
    porciones: 4,
    ingredientes: [
      {
        nombre: "Carne de res molida",
        cantidad: 400,
        unidad: "g",
        precioPor: 1000,
        precio: 5.00,
        merma: 0.10
      },
      {
        nombre: "Pan de hamburguesa",
        cantidad: 4,
        unidad: "unidad",
        precioPor: 1,           /* precio por cada unidad */
        precio: 0.40,
        merma: 0.10
      },
      {
        nombre: "Queso cheddar",
        cantidad: 80,
        unidad: "g",
        precioPor: 200,
        precio: 1.80,
        merma: 0.10
      },
      {
        nombre: "Lechuga",
        cantidad: 60,
        unidad: "g",
        precioPor: 300,
        precio: 0.50,
        merma: 0.10
      },
      {
        nombre: "Tomate",
        cantidad: 100,
        unidad: "g",
        precioPor: 1000,
        precio: 0.80,
        merma: 0.10
      },
      {
        nombre: "Salsa especial",
        cantidad: 40,
        unidad: "ml",
        precioPor: 200,
        precio: 1.20,
        merma: 0.10
      }
    ]
  },  // ----- Fin hamburguesa


  /* ----- PRODUCTO 3: Pastel de Chocolate ----- */
  pastel: {
    nombre: "Pastel de Chocolate",
    porciones: 12,
    ingredientes: [
      {
        nombre: "Harina de trigo",
        cantidad: 300,
        unidad: "g",
        precioPor: 1000,
        precio: 1.20,
        merma: 0.10
      },
      {
        nombre: "Cacao en polvo",
        cantidad: 80,
        unidad: "g",
        precioPor: 250,
        precio: 2.00,
        merma: 0.10
      },
      {
        nombre: "Huevos",
        cantidad: 4,
        unidad: "unidad",
        precioPor: 1,
        precio: 0.25,
        merma: 0.10
      },
      {
        nombre: "Azúcar",
        cantidad: 250,
        unidad: "g",
        precioPor: 1000,
        precio: 0.90,
        merma: 0.10
      },
      {
        nombre: "Mantequilla",
        cantidad: 150,
        unidad: "g",
        precioPor: 500,
        precio: 2.40,
        merma: 0.10
      },
      {
        nombre: "Leche",
        cantidad: 200,
        unidad: "ml",
        precioPor: 1000,
        precio: 0.85,
        merma: 0.10
      }
    ]
  }  // ----- Fin pastel

}; // Fin del objeto PRODUCTOS


/* ============================================================
   PARTE 2: VARIABLES GLOBALES
   Aquí guardamos valores que necesitamos en varias funciones.
   Son como "memoria" del programa: recuerdan el estado actual.
   ============================================================ */

let productoActual = null;    /* guarda el objeto del producto seleccionado */
let costoTotalReceta = 0;     /* suma de todos los ingredientes (toda la receta) */
let costoPorPorcion = 0;      /* costo de una sola porción */
let precioVenta = 0;          /* precio de venta calculado con el margen */
const PORCENTAJE_MANO_OBRA = 0.30;   // 30% del costo de ingredientes



/* ============================================================
  PARTE 5: FUNCIÓN PRINCIPAL – calcularCostoIngrediente
  Esta función aplica la fórmula de materia prima del PDF.

  FÓRMULA:
  Costo del ingrediente = (Precio de compra ÷ Cantidad de compra) × Cantidad usada

  Ejemplo: harina a $1.20 el kg, usamos 500 g
    Costo = (1.20 ÷ 1000) × 500 = $0.60

  Parámetro: un objeto "ingrediente" con sus propiedades.
  Retorna: el costo calculado como número con 2 decimales.
   ============================================================ */
function calcularCostoIngrediente(ingrediente) {

  // 1. Calcular cuánto queda usable después de la merma
  let cantidadUsable = ingrediente.precioPor * (1 - ingrediente.merma);

  // 2. Calcular el precio por unidad usable
  let precioPorUnidad = ingrediente.precio / cantidadUsable;

  // 3. Multiplicar por la cantidad que se usa en la receta
  let costoTotal = precioPorUnidad * ingrediente.cantidad;

  return parseFloat(costoTotal.toFixed(2));
}



/* ============================================================
   PARTE 6: mostrarIngredientes – usa un bucle FOR
   Dibuja en pantalla las tarjetas de todos los ingredientes.
 
   El bucle FOR recorre el arreglo de ingredientes del producto
   seleccionado y construye el HTML de cada tarjeta.
 
   Estructura del bucle FOR:
     for (inicio; condición; actualización) { código }
     for (let i = 0; i < arreglo.length; i++) { ... }
   ============================================================ */
function mostrarIngredientes(producto) {

  /* Reiniciamos el costo total para empezar a sumar desde cero */
  costoTotalReceta = 0;

  /* "html" es una variable de texto donde vamos construyendo
     el HTML de todas las tarjetas antes de inyectarlo de una vez */
  let html = "";

  /* Abrimos el div con la cuadrícula que organiza las tarjetas
     (Edwin definió esta clase en estilos.css) */
  html += '<div class="cuadricula-ingredientes">';


  /* ---- BUCLE FOR: un ciclo por cada ingrediente ---- */
  for (let i = 0; i < producto.ingredientes.length; i++) {
    /* i empieza en 0 y sube de uno en uno hasta llegar
       al último índice del arreglo (length - 1) */

    /* Guardamos el ingrediente actual en una variable para usarlo fácil */
    let ing = producto.ingredientes[i];
    /* Ejemplo: en la primera vuelta, ing = { nombre:"Harina", cantidad:500, ... } */

    /* Calculamos el costo de este ingrediente usando nuestra función */
    let costoIng = calcularCostoIngrediente(ing);

    /* Sumamos el costo al total de la receta */
    costoTotalReceta += costoIng;
    /* += es lo mismo que: costoTotalReceta = costoTotalReceta + costoIng */

    /* Construimos el HTML de esta tarjeta y lo agregamos al texto html */
    html += `
      <div class="tarjeta-ingrediente">
        <p class="ingrediente-nombre">${ing.nombre}</p>
        <p class="ingrediente-detalle">Cantidad: ${ing.cantidad} ${ing.unidad}</p>
        <p class="ingrediente-detalle">Precio ref: $${ing.precio} / ${ing.precioPor} ${ing.unidad}</p>
        <p class="ingrediente-merma">Merma: ${ing.merma * 100}%</p>
        <p class="ingrediente-costo">Costo: $${costoIng.toFixed(2)}</p>
      </div>
    `;
    /* Las llaves ${} dentro de las comillas invertidas (` `) permiten
       insertar variables directamente en el texto. Esto se llama
       "template literals" o interpolación de variables. */

  }
  /* ---- Fin del bucle FOR ---- */


  /* Cerramos el div de la cuadrícula */
  html += '</div>';
  contenedorIngredientes.innerHTML = html;

  let costoIngredientesPorPorcion = costoTotalReceta / producto.porciones;
  let costoManoObra = costoIngredientesPorPorcion * PORCENTAJE_MANO_OBRA;
  costoPorPorcion = costoIngredientesPorPorcion + costoManoObra;

  /* Actualizamos los elementos de la pantalla con los valores calculados.
     toFixed(2) da siempre exactamente 2 decimales: 4.5 → "4.50" */
  totalMateriaPrima.textContent = "$" + costoTotalReceta.toFixed(2);
  costoManoObraEl.textContent = "$" + costoManoObra.toFixed(2);
  costoPorcionEl.textContent = "$" + costoPorPorcion.toFixed(2);
}


/* ============================================================
   PARTE 7: calcularMargen – aplica la fórmula del PDF tema 7
   
   FÓRMULA del PDF:
   Precio Venta = Costo Unitario + (Costo Unitario × Margen ÷ 100)
 
   Parámetros: ninguno (lee los valores de las variables globales
               y del campo de entrada inputMargen)
   ============================================================ */
function calcularMargen() {

  /* Leemos el porcentaje que escribió el usuario.
     parseInt convierte el texto del campo a un número entero. */
  let margen = parseInt(inputMargen.value);

  /* Validación: si el usuario no escribió nada o es un número inválido, avisamos */
  if (isNaN(margen) || margen < 0) {
    /* alert muestra un mensaje emergente al usuario */
    alert("Por favor escribe un porcentaje válido (número mayor o igual a 0).");
    return;  /* "return" sale de la función sin continuar */
  }

  /* Aplicamos la fórmula del margen de ganancia.
     NOTA IMPORTANTE (del PDF, error común del tema 7):
     Se usa (margen / 100), NO se multiplica por el entero margen.
     Ejemplo correcto:  costo + (costo × 0.50) = costo × 1.50
     Ejemplo incorrecto: costo × 50 = resultado absurdo */
  precioVenta = costoPorPorcion + (costoPorPorcion * (margen / 100));

  /* Mostramos el precio de venta calculado en la pantalla */
  precioVentaEl.textContent = "$" + precioVenta.toFixed(2);

  /* Mostramos el bloque del paso 4 (punto de equilibrio).
     Quitamos la clase "oculto" para que sea visible. */
  bloqueEquilibrio.classList.remove("oculto");
}


/* ============================================================
  PARTE 8: calcularPuntoEquilibrio – tema 8 del PDF

  FÓRMULA:
  Punto Equilibrio = Costos Fijos ÷ (Precio Venta − Costo Unitario)
  
  Resultado: la cantidad mínima de unidades a vender para que
  los ingresos cubran exactamente los costos fijos (ni ganancia
  ni pérdida).
   ============================================================ */
function calcularPuntoEquilibrio() {

  /* Leemos los costos fijos del campo de entrada.
     parseFloat permite decimales (parseFloat("500.50") → 500.5) */
  let costosFijos = parseFloat(inputCostosFijos.value);

  /* Validamos que el valor sea un número positivo */
  if (isNaN(costosFijos) || costosFijos <= 0) {
    alert("Por favor escribe el total de costos fijos (mayor a 0).");
    return;
  }

  /* Calculamos la diferencia entre precio de venta y costo por porción.
     Esto se llama "margen de contribución por unidad". */
  let margenContribucion = precioVenta - costoPorPorcion;

  /* Validamos que el margen sea positivo (si el precio es igual al costo,
     nunca se llega al equilibrio y habría división entre cero) */
  if (margenContribucion <= 0) {
    alert("El precio de venta debe ser mayor al costo por porción.");
    return;
  }

  /* Aplicamos la fórmula del punto de equilibrio */
  let peUnidades = costosFijos / margenContribucion;

  /* Math.ceil redondea HACIA ARRIBA al número entero más cercano.
     No podemos vender "142.7 pizzas", necesitamos al menos 143.
     Math.ceil(142.3) → 143 */
  let peRedondeado = Math.ceil(peUnidades);

  /* Mostramos el resultado en pantalla */
  unidadesEquilibrio.textContent = peRedondeado + " unidades";

  /* Mostramos el resumen final con todos los datos del análisis */
  mostrarResumen(costosFijos, peRedondeado);
}

/* ============================================================
   PARTE 9: mostrarResumen – usa un switch para el tipo de producto
   
   Crea un resumen con todos los datos calculados.
   Usa SWITCH para personalizar el mensaje según el producto.
 
   Estructura del switch:
     switch (variable) {
       case "valor1": código; break;
       case "valor2": código; break;
       default: código por defecto;
     }
   ============================================================ */
function mostrarResumen(costosFijos, peUnidades) {

  /* Determinamos el emoji y nombre según el producto seleccionado.
     switch compara el valor de selectorProducto con cada case. */
  let nombreProducto = "";
  let emojiProducto = "";

  switch (selectorProducto.value) {
    case "pizza":
      nombreProducto = "Pizza Margarita";
      emojiProducto = "🍕";
      break;
    /* "break" es obligatorio: detiene el switch y no cae al siguiente case */

    case "hamburguesa":
      nombreProducto = "Hamburguesa Clásica";
      emojiProducto = "🍔";
      break;

    case "pastel":
      nombreProducto = "Pastel de Chocolate";
      emojiProducto = "🎂";
      break;

    default:
      /* Si ningún case coincide, usamos un valor genérico */
      nombreProducto = "Producto";
      emojiProducto = "🍽️";
  }
  /* Fin del switch */


  /* Construimos el HTML del resumen con todos los valores calculados */
  let html = `
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Producto</span>
      <span class="resumen-valor">${emojiProducto} ${nombreProducto}</span>
    </div>
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Costo materia prima (receta completa)</span>
      <span class="resumen-valor">$${costoTotalReceta.toFixed(2)}</span>
    </div>
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Porciones de la receta</span>
      <span class="resumen-valor">${productoActual.porciones} porciones</span>
    </div>
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Costo por porción</span>
      <span class="resumen-valor">$${costoPorPorcion.toFixed(2)}</span>
    </div>
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Precio de venta (con margen)</span>
      <span class="resumen-valor">$${precioVenta.toFixed(2)}</span>
    </div>
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Costos fijos mensuales</span>
      <span class="resumen-valor">$${costosFijos.toFixed(2)}</span>
    </div>
    <div class="fila-resumen">
      <span class="resumen-etiqueta">Punto de equilibrio</span>
      <span class="resumen-valor">${peUnidades} unidades/mes</span>
    </div>
  `;

  /* Inyectamos el resumen en el contenedor del HTML */
  contenidoResumen.innerHTML = html;

  /* Mostramos el bloque del resumen (quitamos "oculto") */
  resumenFinal.classList.remove("oculto");

  /* Hacemos scroll suave hacia el resumen para que el usuario lo vea.
     scrollIntoView: desplaza la pantalla hasta el elemento.
     behavior: "smooth" hace el desplazamiento animado, no brusco. */
  resumenFinal.scrollIntoView({ behavior: "smooth" });
}


/* ============================================================
   PARTE 10: reiniciarSimulador
   Regresa todo a su estado inicial para analizar otro producto.
   ============================================================ */
function reiniciarSimulador() {

  /* Reiniciamos las variables globales a sus valores iniciales */
  productoActual = null;
  costoTotalReceta = 0;
  costoPorPorcion = 0;
  precioVenta = 0;

  /* Limpiamos los campos de entrada */
  selectorProducto.value = "";
  inputMargen.value = "";
  inputCostosFijos.value = "";

  /* Ocultamos todos los bloques del simulador */
  bloqueIngredientes.classList.add("oculto");
  bloqueMargen.classList.add("oculto");
  bloqueEquilibrio.classList.add("oculto");
  resumenFinal.classList.add("oculto");

  /* Volvemos al inicio de la pantalla del simulador */
  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ============================================================
   PARTE 11: EVENTOS – conectar los botones con las funciones
   
   "addEventListener" le dice a un elemento qué función ejecutar
   cuando ocurre un evento (ej: "click" = cuando el usuario hace clic).
   
   Formato:
   elemento.addEventListener("nombreEvento", nombreFuncion);
   ============================================================ */

/* --- EVENTO: Botón "Ir al Simulador" (en la portada) --- */
btnIrSimulador.addEventListener("click", function () {
  mostrarPantalla(pantallaSimulador);
  /* Muestra la pantalla del simulador y oculta la portada */
});


/* --- EVENTO: Botón "← Volver" (en el simulador) --- */
btnVolverPortada.addEventListener("click", function () {
  reiniciarSimulador();           /* primero limpiamos todo */
  mostrarPantalla(pantallaPortada); /* luego regresamos a la portada */
});


/* --- EVENTO: Selector de producto (cambio de selección) ---
   "change" se dispara cuando el usuario elige una opción del select */
selectorProducto.addEventListener("change", function () {

  /* Obtenemos el valor elegido (ej: "pizza", "hamburguesa", "pastel") */
  let valorElegido = selectorProducto.value;

  /* Si el usuario eligió la opción vacía (""), ocultamos todo y salimos */
  if (valorElegido === "") {
    bloqueIngredientes.classList.add("oculto");
    bloqueMargen.classList.add("oculto");
    bloqueEquilibrio.classList.add("oculto");
    resumenFinal.classList.add("oculto");
    return;
  }

  /* Obtenemos el objeto del producto usando el valor como clave del objeto PRODUCTOS.
     Ejemplo: PRODUCTOS["pizza"] devuelve todo el objeto de la pizza */
  productoActual = PRODUCTOS[valorElegido];

  /* Llamamos a la función que dibuja los ingredientes */
  mostrarIngredientes(productoActual);

  /* Mostramos el bloque de ingredientes (quitamos "oculto") */
  bloqueIngredientes.classList.remove("oculto");

  /* Mostramos también el bloque del margen (paso 3) */
  bloqueMargen.classList.remove("oculto");

  /* Ocultamos los bloques siguientes hasta que el usuario calcule */
  bloqueEquilibrio.classList.add("oculto");
  resumenFinal.classList.add("oculto");

  /* Reseteamos los campos de los pasos 3 y 4 */
  inputMargen.value = "";
  inputCostosFijos.value = "";
  precioVentaEl.textContent = "—";
  unidadesEquilibrio.textContent = "—";
});


/* --- EVENTO: Botón "Calcular precio de venta" --- */
btnCalcularMargen.addEventListener("click", function () {
  calcularMargen();
  /* Llama a la función que aplica la fórmula del margen de ganancia */
});


/* --- EVENTO: Botón "Calcular punto de equilibrio" --- */
btnCalcularEquilibrio.addEventListener("click", function () {
  calcularPuntoEquilibrio();
  /* Llama a la función que aplica la fórmula del punto de equilibrio */
});


/* --- EVENTO: Botón "🔄 Calcular otro producto" --- */
btnReiniciarSimulador.addEventListener("click", function () {
  reiniciarSimulador();
  /* Limpia todo y deja el simulador listo para otro producto */
});
