import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//pages, composants
import Header from "../components/Header";

const Comicsbycharacter = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(null);

  const location = useLocation();
  const { charId, charName, charThumbPath, charThumbExt } = location.state;
  console.log(charName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics/${charId}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data.message.comics);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, charId]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "…" : string;
  };

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : (
    <>
      <Header />

      <section className="comic-by-char-top-section">
        <h1>Comics with {charName} </h1>
        <img
          alt={charName}
          src={charThumbPath + "/standard_large" + "." + charThumbExt}
          className="character-image-logo"
        />
      </section>
      <div className="comic-container">
        {data.message.comics.map((comic) => {
          return comic.description ? (
            <div key={comic._id}>
              <article>
                <div className="colonne-1">
                  <img
                    alt={comic.title}
                    src={
                      comic.thumbnail.path +
                      "/portrait_xlarge" +
                      "." +
                      comic.thumbnail.extension
                    }
                    className="character-image"
                  />
                  <span>{truncate(`★ ${comic.title}`, 40)}</span>
                </div>
                <div className="colonne-2">
                  <p className="character-description">
                    {truncate(`${comic.description}`, 800)}
                  </p>
                </div>
              </article>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </>
  );
};

export default Comicsbycharacter;
