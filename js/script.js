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

// Renderizar los objetos del array
function handlingLinks(links) {
  links.forEach((link) => console.log(link));
}
