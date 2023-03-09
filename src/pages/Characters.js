import axios from "axios";
// import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

//pages, components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Characters = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [charFavorites, setCharFavorites] = useState([]);

  const navigate = useNavigate();

  // pagination
  const [pageRequired, setPageRequired] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 100;
  const skip = (pageRequired - 1) * limit;

  const handleClick = (action) => {
    if (action === "minus") setPageRequired(pageRequired - 1);
    else if (action === "plus") setPageRequired(pageRequired + 1);
    else if (action === "last") setPageRequired(totalPages);
  };

  //favoris
  const charFav = JSON.stringify(charFavorites);
  if (charFav) {
    Cookies.set("Marvel-charFav", charFav);
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
          `https://site--marvel-backend--jnfnxpb8s78c.code.run/characters?name=${search}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
        setTotalPages(Math.ceil(response.data.message.count / limit));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, skip]);

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : token ? (
    <>
      <Header />
      <section className="character-top-section">
        <h1>{data.message.count} Character(s)</h1>
        <div>
          <input
            className="search-input"
            type="text"
            name="search"
            value={search}
            placeholder="🔍  Search for Characters"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="skip">
          <div>
            {pageRequired > 1 && data.message.count !== 0 ? (
              <button
                className="pagination"
                onClick={() => {
                  handleClick("minus");
                }}
              >
                Previous page
              </button>
            ) : null}
            <span>
              page &nbsp;
              {pageRequired} / {totalPages}
            </span>

            {pageRequired !== totalPages && data.message.count !== 0 ? (
              <button
                className="pagination"
                onClick={() => {
                  handleClick("plus");
                }}
              >
                Next page
              </button>
            ) : null}

            {pageRequired !== totalPages && data.message.count !== 0 ? (
              <button
                className="pagination-last"
                onClick={() => {
                  handleClick("last");
                }}
              >
                Go to last page
              </button>
            ) : null}
          </div>
        </div>
      </section>
      <div className="character-container">
        {data.message.results.map((character) => {
          return character.description ? (
            <div key={character._id}>
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
                    <span>★ {truncate(`${character.name}`, 40)}</span>
                  </p>
                </div>
                <div className="char-description-button">
                  <p className="character-description">
                    {truncate(`${character.description}`, 800)}
                  </p>
                  <div>
                    <button
                      className="fav-button"
                      onClick={() => {
                        const newCharFavorites = [...charFavorites];
                        newCharFavorites.push(character._id);
                        setCharFavorites(newCharFavorites);
                      }}
                    >
                      Add to Fav
                    </button>
                    <Link
                      to="/Comicsbycharacter"
                      state={{
                        charName: character.name,
                        charId: character._id,
                        charThumbPath: character.thumbnail.path,
                        charThumbExt: character.thumbnail.extension,
                      }}
                    >
                      <button className="pagination">See Comics</button>
                    </Link>
                  </div>
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

export default Characters;
