// ===== 1. CATEGORÍAS =====
// Cada una: su id interno y el nombre que se muestra en el sidebar.
const categorias = [
  { id: "peliculas", nombre: "Películas" },
  { id: "juegos",    nombre: "Juegos" },
  { id: "series",    nombre: "Series" },
  { id: "libros",    nombre: "Libros" },
  { id: "mangas",    nombre: "Mangas" },
  { id: "anime",     nombre: "Anime" }
];

// A partir de las categorías armamos los títulos "# películas", "# series"...
const titulos = {};
categorias.forEach(function (c) { titulos[c.id] = "# " + c.nombre.toLowerCase(); });

// Colores pastel para las etiquetas de género; se van asignando en orden
// a cada etiqueta nueva que se crea (y se repiten en ciclo si hay muchas).
const paletaEtiquetas = ["#cfe8f3", "#ffe3c2", "#d6e0ff", "#ffd3ea", "#ded4ff", "#d8f0d3", "#ffe9a8"];

// ===== 2. DATOS POR DEFECTO =====
const datosPorDefecto = {
  peliculas: [
    { titulo: "Perfect Days", tituloEs: "Perfect Days", director: "Wim Wenders",
      estudio: "Master Mind", anio: 2023, generos: ["Drama"], pais: "Japón",
      estrellas: 5, sinopsis: "Un limpiador de baños en Tokio encuentra belleza en su rutina.",
      comentario: "Me dejó en calma. Una joya silenciosa.", portada: "", fechaVista: "2025" },
    { titulo: "La Sustancia", tituloEs: "La Sustancia", director: "Coralie Fargeat",
      estudio: "Working Title", anio: 2024, generos: ["Terror"], pais: "Francia",
      estrellas: 4.5, sinopsis: "Una estrella en decadencia prueba un suero misterioso.",
      comentario: "Perturbadora y genial.", portada: "", fechaVista: "2025" }
  ],
  series: [], libros: [], juegos: [], mangas: [], anime: [],
  // Etiquetas de género compartidas por todas las categorías.
  generos: [
    { nombre: "Drama", color: paletaEtiquetas[0] },
    { nombre: "Terror", color: paletaEtiquetas[1] }
  ]
};

// ===== 3. GUARDADO EN EL NAVEGADOR =====
let data = JSON.parse(localStorage.getItem("bitacora")) || datosPorDefecto;
if (!data.generos) data.generos = [];  // por si venías de una versión sin etiquetas
function guardar() { localStorage.setItem("bitacora", JSON.stringify(data)); }

// Busca una etiqueta de género por nombre (sin importar mayúsculas); si no
// existe la crea con el siguiente color de la paleta y la deja guardada.
function obtenerOCrearGenero(nombre) {
  const limpio = (nombre || "").trim();
  if (!limpio) return null;
  let tag = data.generos.find(function (g) { return g.nombre.toLowerCase() === limpio.toLowerCase(); });
  if (!tag) {
    tag = { nombre: limpio, color: paletaEtiquetas[data.generos.length % paletaEtiquetas.length] };
    data.generos.push(tag);
    guardar();
  }
  return tag;
}

// Escapa comillas y "&" para poder meter texto dentro de value="...".
function escaparAtributo(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// Íconos chicos para cada fila del formulario (estilo lista de propiedades).
const iconosPropiedad = {
  texto: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="4" x2="15" y2="4"/><line x1="3" y1="9" x2="15" y2="9"/><line x1="3" y1="14" x2="10" y2="14"/></svg>',
  persona: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="6" r="3"/><path d="M3 16c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/></svg>',
  edificio: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linejoin="round"><rect x="4" y="3" width="10" height="14" rx="1"/><rect x="6.5" y="6" width="2" height="2"/><rect x="10" y="6" width="2" height="2"/><rect x="6.5" y="10" width="2" height="2"/><rect x="10" y="10" width="2" height="2"/></svg>',
  calendario: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="12" height="11" rx="1.5"/><line x1="3" y1="7.5" x2="15" y2="7.5"/><line x1="6" y1="2.3" x2="6" y2="5"/><line x1="12" y1="2.3" x2="12" y2="5"/></svg>',
  bandera: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="2" x2="4" y2="16"/><path d="M4 3 h9 l-2.3 3 L13 9 H4"/></svg>',
  estrella: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.4" stroke-linejoin="round"><path d="M9 2.3 11 6.7 15.7 7.4 12.3 10.7 13.1 15.4 9 13.1 4.9 15.4 5.7 10.7 2.3 7.4 7 6.7Z"/></svg>',
  etiqueta: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M9 3 h4 l4 4-6.5 6.5-4-4V3Z"/><circle cx="10.6" cy="6.4" r="0.9" fill="#141414" stroke="none"/></svg>',
  parrafo: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="4" x2="15" y2="4"/><line x1="3" y1="8" x2="15" y2="8"/><line x1="3" y1="12" x2="11" y2="12"/><line x1="3" y1="16" x2="13" y2="16"/></svg>',
  comentario: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linejoin="round"><path d="M3 4 h12 v8 H8 l-3 3 v-3 H3 Z"/></svg>',
  imagen: '<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#141414" stroke-width="1.5" stroke-linejoin="round"><rect x="3" y="3" width="12" height="12" rx="1.5"/><circle cx="7" cy="7" r="1.2" fill="#141414" stroke="none"/><path d="M4 13 l3.5-4 2.5 3 2-2.5 2.5 3.5" stroke-linecap="round"/></svg>'
};
// Arma una fila "ícono + etiqueta + valor" del formulario.
function filaPropiedad(icono, etiqueta, valorHtml) {
  return '<div class="propiedad">'
    + '<span class="propiedad-icono">' + iconosPropiedad[icono] + '</span>'
    + '<span class="propiedad-label">' + etiqueta + '</span>'
    + '<div class="propiedad-valor">' + valorHtml + '</div>'
    + '</div>';
}

// ===== 4. ELEMENTOS Y ESTADO =====
const galeria = document.getElementById("galeria");
const tituloCategoria = document.getElementById("titulo-categoria");
const contadorEntradas = document.getElementById("contador-entradas");
const listaCategorias = document.getElementById("lista-categorias");

let categoriaActual = null;  // categoría abierta
let fichaActual = null;      // índice de la película abierta en su ficha
let portadaSubida = "";      // imagen subida desde el computador (mientras el formulario está abierto)
let indiceEditando = null;   // índice de la ficha que se está editando (null = ficha nueva)
let estrellasFormulario = 0; // calificación elegida en el formulario, con clic directo
let generosSeleccionados = []; // nombres de las etiquetas elegidas en el formulario actual
let indiceArrastrado = null; // índice de la tarjeta que se está arrastrando en la grilla

// ===== 5. SIDEBAR: lista de categorías ("ARCHIVO") =====
// Un ícono de línea por categoría (estilo Feather), 18x18, mismo trazo para todos.
const iconosCategoria = {
  peliculas: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',
  juegos: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="10" rx="5"/><line x1="7" y1="11" x2="7" y2="15"/><line x1="5" y1="13" x2="9" y2="13"/><circle cx="16" cy="11" r="0.8" fill="#141414" stroke="none"/><circle cx="18.5" cy="14" r="0.8" fill="#141414" stroke="none"/></svg>',
  series: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>',
  libros: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  mangas: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  anime: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#141414" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>'
};

// Ícono de papelera para el botón "Eliminar" de la ficha (usa currentColor
// para heredar el rojo definido en .btn-eliminar).
const iconoPapelera = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';

function construirSidebar() {
  listaCategorias.innerHTML = categorias.map(function (c) {
    return '<li class="cat-item" data-cat="' + c.id + '">'
      + '<span class="cat-icono">' + iconosCategoria[c.id] + '</span>' + titulos[c.id] + '</li>';
  }).join("");

  listaCategorias.querySelectorAll(".cat-item").forEach(function (li) {
    li.addEventListener("click", function () { abrirCategoria(li.dataset.cat); });
  });
}

// Marca en negrita la categoría abierta dentro del sidebar
function marcarCategoriaActiva() {
  listaCategorias.querySelectorAll(".cat-item").forEach(function (li) {
    li.classList.toggle("activa", li.dataset.cat === categoriaActual);
  });
}

// ===== 8. ESTRELLAS =====
// Estrella dibujada a mano (no el carácter "★" de la fuente): así conocemos
// su geometría exacta y el recorte al 50% cae justo en la mitad real de la
// figura, en vez de la mitad "visual" del cajón de texto (que con la fuente
// dejaba la estrella casi completa en vez de a la mitad).
const SVG_ESTRELLA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>';

// Dibuja 5 estrellas; cada una se llena 100%, 50% o 0% según la nota.
function estrellasHTML(n) {
  let s = '<span class="estrellas-cont">';
  for (let i = 1; i <= 5; i++) {
    let ancho = 0;
    if (n >= i) ancho = 100;              // estrella entera
    else if (n >= i - 0.5) ancho = 50;    // media estrella
    s += '<span class="estrella"><span class="e-fondo">' + SVG_ESTRELLA + '</span>'
       + '<span class="e-frente" style="width:' + ancho + '%">' + SVG_ESTRELLA + '</span></span>';
  }
  return s + '</span>';
}
// Igual que la anterior, pero agrega dos zonas clickeables por estrella:
// la mitad izquierda vale i-0.5 y la derecha vale i.
function estrellasEditablesHTML(n) {
  let s = '<span class="estrellas-cont editable">';
  for (let i = 1; i <= 5; i++) {
    let ancho = 0;
    if (n >= i) ancho = 100;
    else if (n >= i - 0.5) ancho = 50;
    s += '<span class="estrella">'
       +   '<span class="e-fondo">' + SVG_ESTRELLA + '</span>'
       +   '<span class="e-frente" style="width:' + ancho + '%">' + SVG_ESTRELLA + '</span>'
       +   '<span class="zona izq" data-val="' + (i - 0.5) + '"></span>'
       +   '<span class="zona der" data-val="' + i + '"></span>'
       + '</span>';
  }
  return s + '</span>';
}
// ===== ETIQUETAS DE GÉNERO =====
// Lectura (ficha): pastillas de color, sin interacción.
function etiquetasHTML(nombres) {
  if (!nombres || nombres.length === 0) return "—";
  return nombres.map(function (n) {
    const tag = data.generos.find(function (g) { return g.nombre === n; });
    const color = tag ? tag.color : "#e5e5e5";
    return '<span class="etiqueta-genero" style="background:' + color + '">' + n + '</span>';
  }).join(" ");
}
// Edición (formulario): todas las etiquetas existentes, marcando las elegidas.
// Cada una trae su "×" para poder eliminarla del todo (no solo desmarcarla).
function renderEtiquetasFormulario() {
  const cont = document.getElementById("f-etiquetas");
  if (!cont) return;
  cont.innerHTML = data.generos.map(function (g) {
    const activa = generosSeleccionados.indexOf(g.nombre) !== -1;
    return '<span class="etiqueta-genero' + (activa ? " activa" : " inactiva") + '" data-genero="'
      + g.nombre + '" style="background:' + g.color + '">' + g.nombre
      + '<span class="etiqueta-quitar" data-quitar="' + g.nombre + '" title="Eliminar etiqueta">×</span>'
      + '</span>';
  }).join("");
}

// Borra una etiqueta de género de la lista global y la saca de todas las
// fichas (de cualquier categoría) que la tuvieran puesta.
function eliminarGenero(nombre) {
  const idx = data.generos.findIndex(function (g) { return g.nombre === nombre; });
  if (idx === -1) return;
  data.generos.splice(idx, 1);
  categorias.forEach(function (c) {
    data[c.id].forEach(function (p) {
      if (p.generos) p.generos = p.generos.filter(function (g) { return g !== nombre; });
    });
  });
  const pos = generosSeleccionados.indexOf(nombre);
  if (pos !== -1) generosSeleccionados.splice(pos, 1);
  guardar();
  renderEtiquetasFormulario();
}

// ===== 9. ABRIR CATEGORÍA Y GALERÍA =====
function abrirCategoria(cat) {
  categoriaActual = cat;
  marcarCategoriaActiva();
  mostrarGaleria();
}

function mostrarGaleria() {
  const items = data[categoriaActual];
  tituloCategoria.textContent = titulos[categoriaActual];
  contadorEntradas.textContent = "Entradas: [" + items.length + "]";
  // El botón de agregar va arriba, con espacio propio para no quedar
  // pegado a la línea del encabezado ni a la grilla.
  let html = '<button class="btn-retro" id="btn-agregar">+ agregar</button>';

  if (items.length === 0) {
    html += '<p class="vacio">Todavía no hay nada aquí. ¡Pronto!</p>';
  } else {
    html += '<div class="grid-cards">' + items.map(function (p, i) {
      // data-index nos permite saber qué película se clickeó
      const fondo = p.portada
        ? 'style="background-image:url(\'' + p.portada + '\');background-size:cover;background-position:center"'
        : '';
      const autor = p.director ? '<p class="card-autor">' + p.director + '</p>' : '';
      const sinopsis = p.sinopsis ? '<p class="card-sinopsis">' + p.sinopsis + '</p>' : '';
      const fechaVista = p.fechaVista ? '<p class="card-fecha-vista">Fecha en que la vi: ' + p.fechaVista + '</p>' : '';
      return '<div class="card" data-index="' + i + '" draggable="true">'
        + '<div class="portada" ' + fondo + '></div>'
        + '<div class="card-info"><p class="card-titulo">' + p.titulo + '</p>'
        + autor + sinopsis
        + '<div class="estrellas">' + estrellasHTML(p.estrellas) + '</div>'
        + fechaVista
        + '</div></div>';
    }).join("") + '</div>';
  }

  galeria.innerHTML = html;
  document.getElementById("btn-agregar").addEventListener("click", mostrarFormulario);
}

// ===== 10. FICHA (al hacer clic en una película) =====
function mostrarFicha(i) {
  fichaActual = i;
  const p = data[categoriaActual][i];
  const fondo = p.portada
    ? 'style="background-image:url(\'' + p.portada + '\');background-size:cover;background-position:center"'
    : '';
  // (p.director || "—") muestra un guion cuando el campo está vacío.
  // Ficheros viejos guardaban "genero" (texto); los nuevos guardan "generos" (arreglo).
  const generosFicha = p.generos || (p.genero ? [p.genero] : []);
  galeria.innerHTML =
    '<div class="ficha-acciones">'
    +   '<button class="btn-retro" id="btn-volver">← volver</button>'
    +   '<button class="btn-retro" id="btn-editar">Editar</button>'
    +   '<button class="btn-retro btn-eliminar" id="btn-eliminar" title="Eliminar" aria-label="Eliminar">' + iconoPapelera + '</button>'
    + '</div>'
    + '<div class="ficha-cabecera">'
    +   '<div class="ficha-portada" ' + fondo + '></div>'
    +   '<div class="ficha-datos">'
    +     '<h2 class="ficha-titulo">' + p.titulo + '</h2>'
    +     '<p class="ficha-sub">Título en español: ' + (p.tituloEs || "—") + '</p>'
    +     '<div class="rating-edit">' + estrellasEditablesHTML(p.estrellas) + '</div>'
    +     '<p class="dato"><b>Director/a:</b> ' + (p.director || "—") + '</p>'
    +     '<p class="dato"><b>Estudio:</b> ' + (p.estudio || "—") + '</p>'
    +     '<p class="dato"><b>Fecha:</b> ' + (p.anio || "—") + '</p>'
    +     '<p class="dato"><b>Género:</b> ' + etiquetasHTML(generosFicha) + '</p>'
    +     '<p class="dato"><b>País:</b> ' + (p.pais || "—") + '</p>'
    +     '<p class="dato"><b>Fecha en que la vi:</b> ' + (p.fechaVista || "—") + '</p>'
    +   '</div>'
    + '</div>'
    + '<p class="ficha-label">Sinopsis</p>'
    + '<p class="ficha-texto">' + (p.sinopsis || "—") + '</p>'
    + '<details class="ficha-comentario-desplegable">'
    +   '<summary>Mi comentario</summary>'
    +   '<div class="ficha-comentario">&gt; ' + (p.comentario || "—") + '</div>'
    + '</details>';
}

// ===== 11. FORMULARIO PARA AGREGAR O EDITAR =====
// Si se pasa "indice", el formulario se precarga con esa ficha y al guardar
// se reemplaza en vez de crear una nueva.
function mostrarFormulario(indice) {
  indiceEditando = (typeof indice === "number") ? indice : null;
  const editando = indiceEditando !== null ? data[categoriaActual][indiceEditando] : null;

  portadaSubida = editando ? (editando.portada || "") : "";
  estrellasFormulario = editando ? (editando.estrellas || 0) : 0;
  generosSeleccionados = editando
    ? (editando.generos || (editando.genero ? [editando.genero] : [])).slice()
    : [];

  const val = function (campo) { return editando ? escaparAtributo(editando[campo]) : ""; };
  const texto = function (campo) { return editando ? (editando[campo] || "") : ""; };
  // El link de portada solo se precarga si era un link (no una imagen subida en base64).
  const linkPortada = (editando && editando.portada && editando.portada.indexOf("data:") !== 0)
    ? editando.portada : "";
  const previewInicial = portadaSubida
    ? '<img src="' + portadaSubida + '" style="max-width:100px;border:2px solid var(--tinta);border-radius:5px;margin-top:6px">'
    : "";

  galeria.innerHTML =
    '<div class="formulario">'
    + filaPropiedad("texto", "Título", '<input id="f-titulo" type="text" value="' + val("titulo") + '">')
    + filaPropiedad("texto", "Título en español", '<input id="f-tituloEs" type="text" value="' + val("tituloEs") + '">')
    + filaPropiedad("persona", "Director/a", '<input id="f-director" type="text" value="' + val("director") + '">')
    + filaPropiedad("edificio", "Estudio", '<input id="f-estudio" type="text" value="' + val("estudio") + '">')
    + filaPropiedad("calendario", "Fecha de publicación", '<input id="f-anio" type="text" value="' + val("anio") + '">')
    + filaPropiedad("etiqueta", "Género",
        '<div class="etiquetas-form" id="f-etiquetas"></div>'
        + '<div class="etiqueta-nueva">'
        +   '<input id="f-genero-nuevo" type="text" placeholder="nueva etiqueta...">'
        +   '<button type="button" class="btn-retro" id="f-genero-agregar">+ etiqueta</button>'
        + '</div>')
    + filaPropiedad("bandera", "País", '<input id="f-pais" type="text" value="' + val("pais") + '">')
    + filaPropiedad("calendario", "Fecha en que la vi", '<input id="f-fechaVista" type="text" value="' + val("fechaVista") + '">')
    + filaPropiedad("estrella", "Calificación", '<div class="rating-edit" id="f-rating">' + estrellasEditablesHTML(estrellasFormulario) + '</div>')
    + filaPropiedad("parrafo", "Sinopsis", '<textarea id="f-sinopsis" rows="3">' + texto("sinopsis") + '</textarea>')
    + filaPropiedad("comentario", "Mi comentario", '<textarea id="f-comentario" rows="3">' + texto("comentario") + '</textarea>')
    + filaPropiedad("imagen", "Portada",
        '<label class="btn-retro" for="f-archivo">Elegir imagen</label>'
        + (portadaSubida || linkPortada ? ' <button type="button" class="btn-retro btn-eliminar" id="f-quitar-imagen">Quitar imagen</button>' : '')
        + '<input id="f-archivo" type="file" accept="image/*" class="input-archivo-oculto">'
        + '<span class="nombre-archivo" id="f-archivo-nombre">' + (portadaSubida ? "Imagen actual" : "Sin imagen") + '</span>'
        + '<div id="f-preview">' + previewInicial + '</div>'
        + '<input id="f-portada" type="text" placeholder="...o pega un link de imagen" value="' + escaparAtributo(linkPortada) + '">')
    + '<p id="f-error" style="color:#a32d2d;font-size:13px;margin:6px 0 0;"></p>'
    + '<div class="form-acciones">'
    +   '<button class="btn-retro" id="f-guardar">Guardar</button>'
    +   '<button class="btn-retro" id="f-cancelar">Cancelar</button>'
    + '</div>'
    + '</div>';

  renderEtiquetasFormulario();

  document.getElementById("f-archivo").addEventListener("change", leerArchivo);
  document.getElementById("f-guardar").addEventListener("click", guardarPelicula);
  document.getElementById("f-cancelar").addEventListener("click", function () {
    if (indiceEditando !== null) mostrarFicha(indiceEditando); else mostrarGaleria();
  });
  document.getElementById("f-genero-nuevo").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("f-genero-agregar").click();
    }
  });
  const btnQuitarImagen = document.getElementById("f-quitar-imagen");
  if (btnQuitarImagen) btnQuitarImagen.addEventListener("click", quitarImagenFormulario);
}

// Borra la portada actual del formulario (subida o por link), sin tocar
// el resto de los datos; recién se guarda de verdad al apretar "Guardar".
function quitarImagenFormulario() {
  portadaSubida = "";
  document.getElementById("f-preview").innerHTML = "";
  document.getElementById("f-portada").value = "";
  document.getElementById("f-archivo").value = "";
  document.getElementById("f-archivo-nombre").textContent = "Sin imagen";
  document.getElementById("f-quitar-imagen").remove();
}

// Lee la imagen elegida y la convierte en texto (base64) para poder guardarla.
function leerArchivo(e) {
  const archivo = e.target.files[0];        // el archivo que eligió la usuaria
  if (!archivo) return;
  const lector = new FileReader();          // el "lector de archivos" del navegador
  lector.onload = function () {             // cuando termina de leer...
    portadaSubida = lector.result;          // guardamos la imagen convertida en texto
    document.getElementById("f-preview").innerHTML =
      '<img src="' + portadaSubida + '" style="max-width:100px;border:2px solid var(--tinta);border-radius:5px;margin-top:6px">';
    document.getElementById("f-archivo-nombre").textContent = archivo.name;
  };
  lector.readAsDataURL(archivo);            // dispara la lectura (async)
}

function guardarPelicula() {
  const titulo = document.getElementById("f-titulo").value.trim();
  if (titulo === "") {
    document.getElementById("f-error").textContent = "El título no puede estar vacío.";
    return;
  }
  const entrada = {
    titulo: titulo,
    tituloEs: document.getElementById("f-tituloEs").value.trim(),
    director: document.getElementById("f-director").value.trim(),
    estudio: document.getElementById("f-estudio").value.trim(),
    anio: document.getElementById("f-anio").value.trim(),
    generos: generosSeleccionados.slice(),
    pais: document.getElementById("f-pais").value.trim(),
    fechaVista: document.getElementById("f-fechaVista").value.trim(),
    estrellas: estrellasFormulario,     // se elige haciendo clic en las estrellas
    sinopsis: document.getElementById("f-sinopsis").value.trim(),
    comentario: document.getElementById("f-comentario").value.trim(),
    // si subiste archivo, usa esa imagen; si no, usa el link que hayas pegado
    portada: portadaSubida || document.getElementById("f-portada").value.trim()
  };
  if (indiceEditando === null) {
    data[categoriaActual].unshift(entrada);  // ficha nueva: va AL INICIO
  } else {
    data[categoriaActual][indiceEditando] = entrada;  // ficha existente: se reemplaza
  }
  guardar();
  mostrarGaleria();
}

// ===== 12. CLICS DENTRO DE LA GALERÍA (un solo detector para todo) =====
galeria.addEventListener("click", function (e) {
  // ¿clic en media/entera estrella? Puede ser en el formulario o en la ficha.
  const media = e.target.closest("[data-val]");
  if (media) {
    const contenedorForm = media.closest("#f-rating");
    if (contenedorForm) {
      estrellasFormulario = parseFloat(media.dataset.val);
      contenedorForm.innerHTML = estrellasEditablesHTML(estrellasFormulario);
      return;
    }
    data[categoriaActual][fichaActual].estrellas = parseFloat(media.dataset.val);
    guardar();
    mostrarFicha(fichaActual);   // redibuja la ficha con la nota nueva
    return;
  }
  // ¿clic en la "×" de una etiqueta? -> la borra del todo (con confirmación)
  const quitar = e.target.closest(".etiqueta-quitar");
  if (quitar) {
    const nombre = quitar.dataset.quitar;
    confirmarPersonalizado('¿Eliminar la etiqueta "' + nombre + '"? Se va a sacar de todas las fichas que la tengan.').then(function (ok) {
      if (ok) eliminarGenero(nombre);
    });
    return;
  }
  // ¿clic en una etiqueta del formulario? -> la prende/apaga
  const etiqueta = e.target.closest(".etiqueta-genero");
  if (etiqueta && document.getElementById("f-etiquetas")) {
    const nombre = etiqueta.dataset.genero;
    const pos = generosSeleccionados.indexOf(nombre);
    if (pos === -1) generosSeleccionados.push(nombre); else generosSeleccionados.splice(pos, 1);
    renderEtiquetasFormulario();
    return;
  }
  // ¿clic en "+ etiqueta"? -> crea (o reutiliza) la etiqueta escrita y la marca
  if (e.target.closest("#f-genero-agregar")) {
    const inputNuevo = document.getElementById("f-genero-nuevo");
    const tag = obtenerOCrearGenero(inputNuevo.value);
    if (tag) {
      if (generosSeleccionados.indexOf(tag.nombre) === -1) generosSeleccionados.push(tag.nombre);
      inputNuevo.value = "";
      renderEtiquetasFormulario();
    }
    return;
  }
  // ¿clic en "volver"?
  if (e.target.closest("#btn-volver")) { mostrarGaleria(); return; }
  // ¿clic en "editar"? -> abre el formulario precargado con esta ficha
  if (e.target.closest("#btn-editar")) { mostrarFormulario(fichaActual); return; }
  // ¿clic en "eliminar"? -> pide confirmación con el modal propio y borra la ficha
  if (e.target.closest("#btn-eliminar")) {
    confirmarPersonalizado("¿Eliminar esta ficha? No se puede deshacer.").then(function (ok) {
      if (!ok) return;
      data[categoriaActual].splice(fichaActual, 1);
      guardar();
      mostrarGaleria();
    });
    return;
  }
  // ¿clic en una tarjeta? -> abre su ficha
  const card = e.target.closest(".card");
  if (card) { mostrarFicha(parseInt(card.dataset.index)); return; }
});

// ===== 12a-bis. ARRASTRAR Y SOLTAR TARJETAS (reordenar la grilla) =====
galeria.addEventListener("dragstart", function (e) {
  const card = e.target.closest(".card");
  if (!card) return;
  indiceArrastrado = parseInt(card.dataset.index);
  card.classList.add("arrastrando");
  e.dataTransfer.effectAllowed = "move";
});

galeria.addEventListener("dragover", function (e) {
  const card = e.target.closest(".card");
  if (!card || indiceArrastrado === null) return;
  e.preventDefault();   // necesario para que el navegador permita soltar acá
  card.classList.add("sobre-destino");
});

galeria.addEventListener("dragleave", function (e) {
  const card = e.target.closest(".card");
  if (card) card.classList.remove("sobre-destino");
});

galeria.addEventListener("drop", function (e) {
  const card = e.target.closest(".card");
  if (!card || indiceArrastrado === null) return;
  e.preventDefault();
  const indiceDestino = parseInt(card.dataset.index);
  if (indiceDestino !== indiceArrastrado) {
    const items = data[categoriaActual];
    const [movida] = items.splice(indiceArrastrado, 1);   // la saca de donde estaba
    items.splice(indiceDestino, 0, movida);                // la mete en el lugar nuevo
    guardar();
    mostrarGaleria();
  }
  indiceArrastrado = null;
});

galeria.addEventListener("dragend", function () {
  // por si el drop no llegó a completarse (se soltó afuera, se canceló, etc.)
  galeria.querySelectorAll(".arrastrando, .sobre-destino").forEach(function (el) {
    el.classList.remove("arrastrando", "sobre-destino");
  });
  indiceArrastrado = null;
});

// ===== 12b. MODAL DE CONFIRMACIÓN (reemplaza el confirm() nativo) =====
// Devuelve una promesa que resuelve en true/false según el botón clickeado.
function confirmarPersonalizado(mensaje) {
  return new Promise(function (resolve) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML =
      '<div class="modal-caja">'
      +   '<p class="modal-mensaje">' + mensaje + '</p>'
      +   '<div class="modal-acciones">'
      +     '<button class="btn-retro" id="modal-cancelar">Cancelar</button>'
      +     '<button class="btn-retro btn-eliminar" id="modal-confirmar">Eliminar</button>'
      +   '</div>'
      + '</div>';
    document.body.appendChild(overlay);

    function cerrar(resultado) {
      overlay.remove();
      resolve(resultado);
    }
    overlay.querySelector("#modal-cancelar").addEventListener("click", function () { cerrar(false); });
    overlay.querySelector("#modal-confirmar").addEventListener("click", function () { cerrar(true); });
    // Clic afuera de la caja también cancela.
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) cerrar(false);
    });
  });
}

// ===== 13. ARRANQUE =====
construirSidebar();
abrirCategoria(categorias[0].id);  // la página carga directo en la primera categoría