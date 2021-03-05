import React, { useState } from "react";
import Form from "./components/Form";
import { ReactComponent as IconHeadphones } from "./images/SVG/headphones.svg";
import Canciones from "./components/Canciones";

const App = () => {
  const [urlInput, setUrlInput] = useState("");
  const [songs, setSongs] = useState([]);

  return (
    <>
      <header className="header" id="buscador">
        <header className="header__container">
          <div className="header__left-container">
            <h1 className="header__left-container__title">
              búsqueda<span>de</span>canciones
            </h1>
          </div>
          <div className="header__right-container">
            <ul className="header__right-container__menu">
              <li className="header__right-container__menu-item">
                <a href="#buscador" className="link">
                  Buscador
                </a>
              </li>
              <li className="header__right-container__menu-item">
                <a href="#canciones" className="link">
                  Canciones
                </a>
              </li>
            </ul>
          </div>
        </header>
        <section className="header__body">
          <div className="header__body-icono">
            <IconHeadphones className="icon" />
          </div>
          <div className="header__body-subtitle">
            <h2>
              Bienvenidos/as, aquí podréis descargaros vuestras canciones de
              youtube favoritas.
            </h2>
            <h3>
              El proceso es muy sencillo, solamente tenéis que añadir el link
              del video de youtube que te guste y darle al botón "añadir
              canción". Las canciones se subirán lo antes posible. Por favor,
              tengan un poco de paciencia con el proceso.
            </h3>
          </div>
        </section>
        <section className="header__form">
          <Form setUrlInput={setUrlInput} setSongs={setSongs} />
        </section>
      </header>
      <section className="canciones" id="canciones">
        <div className="canciones__container-title">
          <h2>
            <span>Tus</span>Canciones
          </h2>
        </div>
        <div className="canciones__main-container">
          <Canciones urlInput={urlInput} setSongs={setSongs} songs={songs} />
        </div>
      </section>
    </>
  );
};

export default App;
