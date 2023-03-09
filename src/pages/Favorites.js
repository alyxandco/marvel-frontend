import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

//pages, components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Favorites = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // exploitation du contenu du cookie favoris
  const cookie = Cookies.get("Marvel-charFav");

  let obj;
  if (cookie) {
    obj = JSON.parse(cookie);
  } else {
    obj = [];
  }
  // tronquage
  const truncate = (string, maxlength) => {
    return string?.length > maxlength
      ? string.slice(0, maxlength - 1) + "…"
      : string;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--jnfnxpb8s78c.code.run/characters?`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : token ? (
    <div>
      <Header />
      <section className="character-top-section">
        <h1>Favorite(s)</h1>
      </section>
      <div className="character-container">
        {obj.map((charFavId, index) => {
          return (
            <div key={index}>
              {data.message.results.map((character, index) => {
                return (
                  <div key={index}>
                    {charFavId === character._id ? (
                      <article>
                        <div>
                          <img
                            alt={character.name}
                            src={
                              character.thumbnail.path +
                              "/standard_xlarge" +
                              "." +
                              character.thumbnail.extension
                            }
                            className="character-image"
                          />
                          <p>
                            <span>{truncate(`${character.name}`, 40)}</span>
                          </p>
                        </div>
                        <div className="char-description-button">
                          <p className="character-description">
                            {truncate(`${character.description}`, 800)}
                          </p>
                        </div>
                      </article>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  ) : (
    navigate("/")
  );
};
export default Favorites;
