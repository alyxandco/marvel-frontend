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
  const [charfavorites, setCharfavorites] = useState("");

  let charfav = JSON.stringify(charfavorites);
  Cookies.set("Marvel-charFav", charfav, { expires: 10 });
  console.log("string cookie :", charfavorites);
  // console.log(Cookies.get("Marvel-charFav"));

  const cookie = Cookies.get("Marvel-charFav");
  console.log("cookie :", cookie);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?name=${search}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data.message.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  const truncate = (string, maxlength) => {
    return string?.length > maxlength
      ? string.slice(0, maxlength - 1) + "…"
      : string;
  };

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
                      const newCharfavorites = [...charfavorites];
                      newCharfavorites.push(character._id);
                      setCharfavorites(newCharfavorites);
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
