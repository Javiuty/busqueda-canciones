// Variables
let container = document.querySelector(".canciones__main-container");
let addBtn = document.querySelector("#addBtn");

// Event Listeners
addBtn.addEventListener("click", submitCancion);

// Enviando petición POST para agregar nuestra cancion a la BBDD
function submitCancion() {}

// Fetching canciones from our API
function callApi() {
  fetch("http://localhost:5000/canciones")
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
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${GOOGLE_KEY.apiKey}`
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
