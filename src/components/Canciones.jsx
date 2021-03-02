import React, { useEffect, useState } from "react";
import Axios from "axios";
import Cancion from "./Cancion";
import Spinner from "./Spinner";

const Canciones = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const gettingSongs = async () => {
      const url = "http://localhost:5000/canciones";

      const resultado = await Axios.get(url);

      setSongs(resultado.data);
    };

    gettingSongs();
  }, []);

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
