import React from "react";
import { shortTitle } from "../helpers";

const Cancion = ({ song }) => {
  const { id, title, image, enlace } = song;

  let clase = !enlace ? "btn" : "btn enabled";

  const deleteSong = (id) => {
    console.log("Eliminando canción...", id);
  };

  return (
    <figure className="canciones__cancion">
      <img src={image} alt={title} />
      <p className="delete-song" onClick={() => deleteSong(id)}>
        x
      </p>
      <figcaption>
        <h3>{shortTitle(title)}</h3>
        <button className={clase}>
          <a href={enlace}>Descargar</a>
        </button>
      </figcaption>
    </figure>
  );
};

export default Cancion;
