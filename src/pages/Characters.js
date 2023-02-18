import axios from "axios";
// import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

//pages, composants
import Header from "../components/Header";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [charFavorites, setCharFavorites] = useState([]);

  // pagination
  const [pageRequired, setPageRequired] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 100;
  const skip = (pageRequired - 1) * limit;

  console.log("skip : ", skip);
  console.log("pagerequired : ", pageRequired);
  console.log("totalPages : ", totalPages);

  const handleClick = (action) => {
    if (action === "minus") setPageRequired(pageRequired - 1);
    else if (action === "plus") setPageRequired(pageRequired + 1);
    else if (action === "last") setPageRequired(totalPages);
  };

  // fin pagination

  //favoris

  const charFav = JSON.stringify(charFavorites);
  console.log("charfavorites : ", charFavorites);
  console.log("charfav : ", charFav);
  if (charFav) {
    Cookies.set("Marvel-charFav", charFav);
  }
  console.log("string cookie :", charFavorites);
  // console.log(Cookies.get("Marvel-charFav"));
  const cookie = Cookies.get("Marvel-charFav");
  // console.log("cookie :", cookie);

  //fin favoris

  // tronquage
  const truncate = (string, maxlength) => {
    return string?.length > maxlength
      ? string.slice(0, maxlength - 1) + "…"
      : string;
  };
  // fin tronquage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?name=${search}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data.message);
        setTotalPages(Math.ceil(response.data.message.count / limit));
        console.log("totalPages :", totalPages);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : (
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
                  <p
                    onClick={() => {
                      const newCharFavorites = [...charFavorites];
                      newCharFavorites.push(character._id);
                      setCharFavorites(newCharFavorites);
                    }}
                  >
                    <span>★ {truncate(`${character.name}`, 40)}</span>
                  </p>
                </div>
                <div className="char-description-button">
                  <p className="character-description">
                    {truncate(`${character.description}`, 800)}
                  </p>

                  <Link
                    to="/Comicsbycharacter"
                    state={{
                      charName: character.name,
                      charId: character._id,
                      charThumbPath: character.thumbnail.path,
                      charThumbExt: character.thumbnail.extension,
                    }}
                  >
                    <button className="char-button">See his Comics 🤡</button>
                  </Link>
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

export default Characters;
