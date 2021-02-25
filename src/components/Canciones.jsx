import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Cancion from "./Cancion";
import Spinner from "./Spinner";

const Canciones = () => {
  const [songs, setSongs] = useState([]);
  const [dataSongs, setDataSongs] = useState([]);

  useEffect(() => {
    const callingApi = async () => {
      const url = "https://whispering-tundra-59051.herokuapp.com/canciones";

      const resultado = await axios.get(url);

      setSongs(resultado.data);

      handlingLinks();
    };
    callingApi();
  }, []);

  const handlingLinks = () => {
    songs.forEach((song) => {
      setDataSongs([
        ...dataSongs,
        {
          url: song.link,
          id: this.url.slice(32, 43),
          hora: parseFloat(song.fecha),
          horaFormateada: moment(this.hora).locale("es").calendar(),
        },
      ]);
      // return {
      //   url: song.link,
      //   id: this.url.slice(32, 43),
      //   hora: parseFloat(song.fecha),
      //   horaFormateada: moment(this.hora).locale("es").calendar(),
      // };
    });
  };

  // useEffect(() => {
  //   const callingApiYoutube = (id, horaFormateada) => {

  //   };
  // },[])

  return (
    <>
      {!songs ? (
        <Spinner />
      ) : (
        songs.map((song) => <Cancion key={song.id} song={song} />)
      )}
    </>
  );
};

export default Canciones;
