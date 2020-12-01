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
  video.link = e.target.value;
}

// Enviando petición POST para agregar nuestra cancion a la BBDD
async function enviandoData(event) {
  event.preventDefault();

  await fetch("https://whispering-tundra-59051.herokuapp.com/agregar-cancion", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: video.link,
      fecha: Date.now(),
    }),
  });

  enviarForm.reset();

  limpiarHTML();

  callApi();
}

// Fetching canciones from our API
function callApi() {
  fetch("https://whispering-tundra-59051.herokuapp.com/canciones")
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      return handlingLinks(dataJSON);
    });
}
callApi();

// Sacando url, id del link
function handlingLinks(links) {
  links.forEach((link) => {
    const url = link.link;

    const id = url.slice(32, 43);

    callingApiYoutube(id);
  });
}

//
function callingApiYoutube(id) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${GOOGLE_KEY}`
  )
    .then((response) => response.json())
    .then((data) => renderingHTML(data));
}

function renderingHTML(video) {
  let titulo = video.items[0].snippet.title;

  if (titulo.length > 32) {
    titulo = titulo.slice(0, 32) + "...";
  }

  const imagenVideo = video.items[0].snippet.thumbnails.high.url;

  let div = document.createElement("div");
  div.classList.add("canciones__cancion");
  div.innerHTML = `
  <img src=${imagenVideo} alt=${titulo} />
  <div class="canciones__cancion-title">
    <h3>${titulo}</h3>
  </div>
  <button class="btn">Descargar</button>
  `;

  container.appendChild(div);
}

function limpiarHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
