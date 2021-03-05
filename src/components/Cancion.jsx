import React from "react";

const Cancion = ({ song }) => {
  const { title, image, enlace } = song;

  let newTitle;

  //To make title fit inside container
  if (title.length > 63) {
    newTitle = title.slice(0, 63) + "...";
  } else {
    newTitle = title;
  }

  let clase = !enlace ? "btn" : "btn enabled";

  return (
    // <div className="canciones__cancion">
    //   <img src={image} alt={newTitle} />
    //   <div className="canciones__cancion-title">
    //     <h3>{newTitle}</h3>
    //   </div>
    //   <div>
    //     <button className={clase}>
    //       <a href={enlace}>Descargar</a>
    //     </button>
    //   </div>
    // </div>

    <figure className="canciones__cancion">
      <img src={image} alt={title} />
      <figcaption>
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