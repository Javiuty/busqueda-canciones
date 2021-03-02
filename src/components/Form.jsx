import React, { useState } from "react";
import Error from "./Error";
import Axios from "axios";
import moment from "moment";

const Form = ({ setUrlInput }) => {
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

    // Conseguir id_yotube desde la url
    const idYoutube = inputSong.slice(32, 43);

    // LLamar api youtube con id y apikey
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idYoutube}&key=${process.env.REACT_APP_API_KEY}`;

    const resultado = await Axios.get(url);

    const {
      data: { items },
    } = resultado;

    // Petición POST de objeto con: url, fecha formateada, titulo e imagen
    const urlPost = "http://localhost:5000/agregar-cancion";

    const InfoObj = {
      idYoutube: idYoutube,
      url: inputSong,
      fecha: moment(parseFloat(Date.now())).locale("es").calendar(),
      title: items[0].snippet.title,
      image: items[0].snippet.thumbnails.high.url,
      enlace: "",
    };

    // eslint-disable-next-line no-unused-vars
    const resp = await Axios.post(urlPost, InfoObj, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setExito(true);

    setTimeout(() => {
      setExito(false);
    }, 3000);

    setUrlInput(inputSong);

    /* Reseteamos form y estado */
    setInputSong("");
    document.getElementById("enviar-form").reset();
  };

  return (
    <>
      <form id="enviar-form" onSubmit={handlingForm}>
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
        {error ? <Error mensaje="No es un enlace válido" tipo="error" /> : null}
        {exito ? <Error mensaje="Link enviado con éxito" /> : null}
      </form>
    </>
  );
};

export default Form;
