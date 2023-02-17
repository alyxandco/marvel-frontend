import axios from "axios";
import { useEffect, useState } from "react";

//pages, composants
import Header from "../components/Header";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [skip, setSkip] = useState(0);

  //!  const skip = (pageRequired - 1) * limit;

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "…" : string;
  };

  const handleClick = (action) => {
    if (action === "minus") setSkip(skip - 1000);
    else if (action === "plus") setSkip(skip + 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics?title=${search}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data.message.results);
        setTotalPages(Math.ceil(response.data.message.count / 100));
        console.log(totalPages);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, skip]);

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : (
    <>
      <Header />

      <section className="comic-top-section">
        <h1>{data.message.count} Comic(s)</h1>
        <div>
          <input
            className="search-input"
            type="text"
            name="search"
            value={search}
            placeholder="🔍  Search for Comics"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <section className="skip">
          <div>
            <button
              onClick={() => {
                handleClick("minus");
                // setCounter(counter - 1);
              }}
            >
              -
            </button>
            <span>{skip}</span>
            <button
              onClick={() => {
                handleClick("plus");
              }}
            >
              +
            </button>
          </div>
        </section>
      </section>
      <div className="comic-container">
        {data.message.results.map((comic) => {
          return comic.description ? (
            <div key={comic._id}>
              <article>
                <div>
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
                  <p>
                    <span>{truncate(`★ ${comic.title}`, 40)}</span>
                  </p>
                </div>
                <div>
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

export default Comics;
