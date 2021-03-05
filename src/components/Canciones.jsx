import React, { useEffect } from "react";
import Cancion from "./Cancion";

const Canciones = ({ urlInput, setSongs, songs }) => {
  useEffect(() => {
    const gettingSongs = () => {
      const url = "https://whispering-tundra-59051.herokuapp.com/canciones";

      fetch(url)
        .then((response) => response.json())
        .then((resultado) => setSongs(resultado));
    };

    gettingSongs();
  }, [urlInput, setSongs]);

  return (
    <>
      {songs.map((song) => (
        <Cancion key={song.id} song={song} />
      ))}
    </>
  );
};

export default Canciones;
