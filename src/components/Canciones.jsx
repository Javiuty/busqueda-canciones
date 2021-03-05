import React from "react";
import Cancion from "./Cancion";

const Canciones = ({ songs }) => {
  return (
    <>{songs && songs.map((song) => <Cancion key={song.id} song={song} />)}</>
  );
};

export default Canciones;
