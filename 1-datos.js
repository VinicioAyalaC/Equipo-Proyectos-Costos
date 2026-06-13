// ============================================================
// ARREGLO DE CONCEPTOS EDUCATIVOS (CARTILLAS)
// ============================================================
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

// ============================================================
// ARREGLO DE PREGUNTAS DEL EVALUADOR (TEST)
// ============================================================
const PREGUNTAS = [
  {
    enunciado: "Si el arriendo del local de pizzas cuesta $300 al mes, ¿qué tipo de costo es?",
    opciones: ["Costo Variable", "Costo Directo", "Costo Indirecto / Fijo"],
    correcta: 2
  },
  {
    enunciado: "Si compras un saco de harina en kilos pero tu receta usa gramos, ¿qué debe hacer el sistema antes de calcular?",
    opciones: ["Homologar las unidades (convertir kilos a gramos)", "Multiplicar los kilos por los gramos", "Ignorar los gramos y aproximar al ojo"],
    correcta: 0
  },
  {
    enunciado: "El cocinero tarda 20 minutos en una olla de salsa que rinde para 10 pizzas. ¿Cómo se asigna ese costo?",
    opciones: ["Cobrar los 20 minutos enteros a la primera pizza", "Dividir el costo de esos 20 minutos entre las 10 pizzas", "No cobrar la mano de obra porque la salsa es un extra"],
    correcta: 1
  },
  {
    enunciado: "Si un plato cuesta $2.00 y se quiere ganar 50%, ¿cómo opera el JavaScript el porcentaje?",
    opciones: ["Multiplicar el costo por 50 (2.00 * 50)", "Sumarle 50 dólares al costo", "Dividir el porcentaje para 100 (50/100) y multiplicarlo por el costo"],
    correcta: 2
  },
  {
    enunciado: "¿Qué representa el Punto de Equilibrio para el dueño?",
    opciones: ["La cantidad mínima de platos para cubrir gastos, quedando en cero", "El momento en que el negocio duplica ganancias", "El precio más alto al que puede vender una pizza"],
    correcta: 0
  }
];

// ============================================================
// OBJETO MAESTRO DE PRODUCTOS E INGREDIENTES PARA EL SIMULADOR
// ============================================================
const PRODUCTOS = {
  pizza: {
    nombre: "Pizza Margarita",
    porciones: 8,
    ingredientes: [
      { nombre: "Harina de trigo", cantidad: 500, unidad: "g", precioPor: 1000, precio: 1.20, merma: 0.10 },
      { nombre: "Salsa de tomate", cantidad: 200, unidad: "ml", precioPor: 500, precio: 0.90, merma: 0.10 },
      { nombre: "Queso mozzarella", cantidad: 300, unidad: "g", precioPor: 1000, precio: 4.50, merma: 0.10 },
      { nombre: "Aceite de oliva", cantidad: 30, unidad: "ml", precioPor: 500, precio: 3.00, merma: 0.10 },
      { nombre: "Levadura", cantidad: 7, unidad: "g", precioPor: 100, precio: 0.60, merma: 0.10 }
    ]
  },
  hamburguesa: {
    nombre: "Hamburguesa Clásica",
    porciones: 4,
    ingredientes: [
      { nombre: "Carne de res molida", cantidad: 400, unidad: "g", precioPor: 1000, precio: 5.00, merma: 0.10 },
      { nombre: "Pan de hamburguesa", cantidad: 4, unidad: "unidad", precioPor: 1, precio: 0.40, merma: 0.10 },
      { nombre: "Queso cheddar", cantidad: 80, unidad: "g", precioPor: 200, precio: 1.80, merma: 0.10 },
      { nombre: "Lechuga", cantidad: 60, unidad: "g", precioPor: 300, precio: 0.50, merma: 0.10 },
      { nombre: "Tomate", cantidad: 100, unidad: "g", precioPor: 1000, precio: 0.80, merma: 0.10 },
      { nombre: "Salsa especial", cantidad: 40, unidad: "ml", precioPor: 200, precio: 1.20, merma: 0.10 }
    ]
  },
  pastel: {
    nombre: "Pastel de Chocolate",
    porciones: 12,
    ingredientes: [
      { nombre: "Harina de trigo", cantidad: 300, unidad: "g", precioPor: 1000, precio: 1.20, merma: 0.10 },
      { font: "Cacao en polvo", nombre: "Cacao en polvo", cantidad: 80, unidad: "g", precioPor: 250, precio: 2.00, merma: 0.10 },
      { nombre: "Huevos", cantidad: 4, unidad: "unidad", precioPor: 1, precio: 0.25, merma: 0.10 },
      { nombre: "Azúcar", cantidad: 250, unidad: "g", precioPor: 1000, precio: 0.90, merma: 0.10 },
      { nombre: "Mantequilla", cantidad: 150, unidad: "g", precioPor: 500, precio: 2.40, merma: 0.10 },
      { nombre: "Leche", cantidad: 200, unidad: "ml", precioPor: 1000, precio: 0.85, merma: 0.10 }
    ]
  }
};