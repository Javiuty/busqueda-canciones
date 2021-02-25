import React from "react";

const Cancion = ({ song }) => (
  <div className="canciones__cancion">
    <img src="" alt="" />
    <div class="canciones__cancion-title">
      <h3>$titulo</h3>
    </div>
    <a href="https://www.google.es">
      <button class="btn">Descargar</button>
    </a>
    <p>$hora</p>
  </div>
);

export default Cancion;
