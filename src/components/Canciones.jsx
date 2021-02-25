import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

const Canciones = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const callingApi = async () => {
      const url = "https://whispering-tundra-59051.herokuapp.com/canciones";

      const resultado = await axios.get(url);

      setSongs(resultado.data);

      handlingLinks(songs);
    };
    callingApi();
  }, []);

  const handlingLinks = (canciones) => {
    canciones.forEach((cancion) => {
      const url = cancion.link;

      const id = url.slice(32, 43);

      const hora = parseFloat(cancion.fecha);

      const horaFormateada = moment(hora).locale("es").calendar();

      /* callingApiYoutube(id, horaFormateada); */
    });
  };

  return (
    <>
      <h2>Canciones</h2>
    </>
  );
};

export default Canciones;
