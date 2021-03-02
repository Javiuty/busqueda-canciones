import React from "react";

const Cancion = ({ song }) => {
  const { fecha, title, image, enlace } = song;

  let newTitle;

  // To make title fit
  if (title.length > 32) {
    newTitle = title.slice(0, 30) + "...";
  } else {
    newTitle = title;
  }

  let clase = !enlace ? "btn" : "btn enabled";

  return (
    <div className="canciones__cancion">
      <img src={image} alt={newTitle} />
      <div className="canciones__cancion-title">
        <h3>{newTitle}</h3>
      </div>
      <a href={enlace}>
        <button className={clase}>Descargar</button>
      </a>
      <p>{fecha}</p>
    </div>
  );
};

export default Cancion;
