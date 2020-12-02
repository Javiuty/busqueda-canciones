// Variables
const container = document.querySelector(".canciones__main-container");
const addBtn = document.querySelector("#addBtn");
const enviarForm = document.querySelector("#enviar-form");
let buscador = document.querySelector("#buscador");

let video = {
  link: "",
};

// Event Listeners
enviarForm.addEventListener("submit", enviandoData);
buscador.addEventListener("keyup", handlingForm);

// LLenando el input según lo rellena el usuario
function handlingForm(e) {
  video.link = e.target.value.trim();
}

callApi();

// Enviando petición POST para agregar nuestra cancion a la BBDD
async function enviandoData(event) {
  event.preventDefault();

  if (
    video.link === "" ||
    !video.link.includes("https://www.youtube.com") ||
    !video.link.includes("v=")
  ) {
    errorValidacion();
  } else {
    await fetch(
      "https://whispering-tundra-59051.herokuapp.com/agregar-cancion",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: video.link,
          fecha: Date.now(),
        }),
      }
    );

    limpiarErrores();

    enviarForm.reset();

    limpiarHTML();

    callApi();
  }
}

// Fetching canciones from our API
function callApi() {
  limpiarHTML();

  fetch("https://whispering-tundra-59051.herokuapp.com/canciones")
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      return handlingLinks(dataJSON);
    });
}

// Sacando url, id del link
function handlingLinks(canciones) {
  canciones.forEach((cancion) => {
    const url = cancion.link;

    const id = url.slice(32, 43);

    const hora = parseFloat(cancion.fecha);

    const horaFormateada = moment(hora).locale("es").calendar();

    callingApiYoutube(id, horaFormateada);
  });
}

//
function callingApiYoutube(id, horaFormateada) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${GOOGLE_KEY}`
  )
    .then((response) => response.json())
    .then((data) => renderingHTML(data, horaFormateada));
}

function renderingHTML(video, horaFormateada) {
  let titulo = video.items[0].snippet.title;

  if (titulo.length > 32) {
    titulo = titulo.slice(0, 45) + "...";
  }

  const imagenVideo = video.items[0].snippet.thumbnails.high.url;

  const hora = horaFormateada;

  let div = document.createElement("div");
  div.classList.add("canciones__cancion");
  div.innerHTML = `
  <img src=${imagenVideo} alt=${titulo} />
  <div class="canciones__cancion-title">
    <h3>${titulo}</h3>
  </div>
  <button class="btn">Descargar</button>
  <p>${hora}</p>
  `;

  container.appendChild(div);
}

function limpiarHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// Función que crea notificacion en caso de fallo de validacion
function errorValidacion() {
  let error = document.createElement("p");
  error.textContent = "El link no es válido, pruebe otra vez";
  error.classList.add("errorValidacion");
  document.querySelector("#enviar-form").appendChild(error);
}

function limpiarErrores() {
  document.querySelector("#enviar-form p").remove();
}
