import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//pages, components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Comicsbycharacter = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  const { charId, charName, charThumbPath, charThumbExt } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      if (!charId) {
        navigate("/");
      }
      try {
        const response = await axios.get(
          `https://site--marvel-backend--jnfnxpb8s78c.code.run/comics/${charId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [charId]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "…" : string;
  };

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : charId ? (
    <>
      <Header />

      <section className="comic-by-char-top-section">
        <h1>Comics with {charName} </h1>
        <img
          alt={charName}
          // eslint-disable-next-line
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
      <Footer />
    </>
  ) : (
    navigate("/")
  );
};

export default Comicsbycharacter;
