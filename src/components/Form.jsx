import React, { useState } from "react";
import Error from "./Error";

const Form = ({ setUrl }) => {
  const [inputSong, setInputSong] = useState("");
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);

  const handlingForm = async (e) => {
    e.preventDefault();

    if (
      inputSong === "" ||
      !inputSong.includes("https://www.youtube.com") ||
      !inputSong.includes("v=")
    ) {
      setError(true);
      return null;
    }
    setError(false);
    /* Hacemos petición Fetch para enviar datos a nuestro server */
    await fetch(
      "https://whispering-tundra-59051.herokuapp.com/agregar-cancion",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: inputSong,
          fecha: Date.now(),
        }),
      }
    );

    setExito(true);

    setTimeout(() => {
      setExito(false);
    }, 3000);

    /* Reseteamos form y estado */
    setInputSong("");
    document.getElementById("enviar-form").reset();
  };

  return (
    <form id="enviar-form" onSubmit={handlingForm}>
      {error ? <Error mensaje="No es un enlace válido" tipo="error" /> : null}
      {exito ? <Error mensaje="Link enviado con éxito" /> : null}
      <div className="header__form-container">
        <label>
          <input
            id="buscador"
            type="text"
            placeholder="Inserta aquí el link de youtube"
            onChange={(e) => setInputSong(e.target.value.trim())}
          />
        </label>
        <button type="submit" id="addBtn" className="btn">
          Añadir canción
        </button>
      </div>
    </form>
  );
};

export default Form;
