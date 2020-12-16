// Variables
const container = document.querySelector(".canciones__main-container");
let time = "AIzaSyDVmaMaw";
let zone = "H4C2QOt9VD6";
let hrs = "zLBjuZ9efi1nuxM";
const addBtn = document.querySelector("#addBtn");
const enviarForm = document.querySelector("#enviar-form");
let buscador = document.querySelector("#buscador");
let errores = [];

let video = {
  link: "",
};

callApi();

// Event Listeners
enviarForm.addEventListener("submit", enviandoData);
buscador.addEventListener("change", handlingForm);

// LLenando el input según lo rellena el usuario
function handlingForm(e) {
  video.link = e.target.value.trim();
}

// Enviando petición POST para agregar nuestra cancion a la BBDD
async function enviandoData(event) {
  event.preventDefault();

  if (
    video.link === "" ||
    !video.link.includes("https://www.youtube.com") ||
    !video.link.includes("v=")
  ) {
    errorValidacion();
    return;
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

    // Reset Obj
    video.link = "";

    if (errores) {
      limpiarErrores();
    }

    mensajeExito();

    enviarForm.reset();

    limpiarHTML();

    callApi();
  }
}

// Fetching canciones from our API
function callApi() {
  limpiarHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("centered");
  divSpinner.innerHTML = `
  <div class="sk-fading-circle">
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div>
  `;
  container.appendChild(divSpinner);

  setTimeout(() => {
    fetch("https://whispering-tundra-59051.herokuapp.com/canciones")
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        return handlingLinks(dataJSON);
      })
      .finally(() => {
        divSpinner.remove();
      });
  }, 1000);
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
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${
      time + zone + hrs
    }`
  )
    .then((response) => response.json())
    .then((data) => renderingHTML(data, horaFormateada));
}

function renderingHTML(video, horaFormateada) {
  let titulo = video.items[0].snippet.title;

  if (titulo.length > 32) {
    titulo = titulo.slice(0, 30) + "...";
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
  if (errores.length) {
    null;
  } else {
    let error = document.createElement("p");
    errores.push(error);
    error.textContent = "El link no es válido, pruebe otra vez";
    error.classList.add("errorValidacion");
    enviarForm.appendChild(error);
  }

  enviarForm.reset();
}

function limpiarErrores() {
  if (document.querySelector("#enviar-form .errorValidacion")) {
    document.querySelector("#enviar-form .errorValidacion").remove();
  }
}

//
function mensajeExito() {
  let exito = document.createElement("p");
  exito.textContent = "Agregando la canción...";
  exito.classList.add("mensaje-exito");
  document.querySelector("#enviar-form").appendChild(exito);

  setTimeout(() => {
    exito.remove();
  }, 1300);
}
