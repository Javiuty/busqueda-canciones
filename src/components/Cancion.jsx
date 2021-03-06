import React from "react";

const Cancion = ({ song }) => {
  const { title, image, enlace } = song;

  let newTitle;

  //To make title fit inside container
  if (title.length > 55) {
    newTitle = title.slice(0, 41) + "...";
  } else {
    newTitle = title;
  }

  let clase = !enlace ? "btn" : "btn enabled";

  return (
    <figure className="canciones__cancion">
      <img src={image} alt={title} />
      <figcaption>
        <p>x</p>
        {/* Icono cruz para borrar película */}
        <h3>{newTitle}</h3>
        <button className={clase}>
          <a href={enlace}>Descargar</a>
        </button>
      </figcaption>
    </figure>
  );
};

export default Cancion;
