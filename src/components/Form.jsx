import React, { useState, useEffect } from "react";
import Error from "./Error";

const Form = ({ setUrlInput, setSongs }) => {
  const [inputSong, setInputSong] = useState("");
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);

  const handlingForm = async (e) => {
    e.preventDefault();

    let respuesta;

    if (
      inputSong === "" ||
      !inputSong.includes("https://www.youtube.com") ||
      !inputSong.includes("v=")
    ) {
      setError(true);
      return null;
    }
    setError(false);

    // Conseguir id_yotube desde la url
    const idYoutube = inputSong.slice(32, 43);

    // LLamar api youtube con id y apikey
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idYoutube}&key=${process.env.REACT_APP_API_KEY}`;

    await fetch(url)
      .then((response) => response.json())
      .then((resultado) => (respuesta = resultado));

    const { items } = respuesta;

    // Petición POST de objeto con: url, fecha formateada, titulo e imagen
    const urlPost = "https://busca-canciones.herokuapp.com/agregar-cancion";

    const InfoObj = {
      idYoutube: idYoutube,
      url: inputSong,
      fecha: parseFloat(Date.now()),
      title: items[0].snippet.title,
      image: items[0].snippet.thumbnails.high.url,
      enlace: "",
    };

    fetch(urlPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(InfoObj),
    });

    setExito(true);

    setTimeout(() => {
      setExito(false);
    }, 3000);

    // Cambia el estado para renderizar la nueva canción añadida
    setUrlInput(inputSong);

    /* Reseteamos form y estado */
    setInputSong("");
    document.getElementById("enviar-form").reset();
  };

  useEffect(() => {
    const gettingSongs = () => {
      const url = "https://busca-canciones.herokuapp.com/canciones";

      fetch(url)
        .then((response) => response.json())
        .then((resultado) => setSongs(resultado));
    };

    gettingSongs();
  }, [setSongs, error, exito]);

  return (
    <>
      <form className="w-full" id="enviar-form" onSubmit={handlingForm}>
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
      {error ? <Error mensaje="No es un enlace válido" tipo="error" /> : null}
      {exito ? <Error mensaje="Link enviado con éxito" /> : null}
    </>
  );
};

export default Form;
