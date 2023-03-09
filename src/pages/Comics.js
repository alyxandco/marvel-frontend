import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//pages, components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Comics = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

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
          `https://site--marvel-backend--jnfnxpb8s78c.code.run/comics?title=${search}&skip=${skip}`
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
      <section className="comic-top-section">
        <div>
          <h1>{data.message.count} Comic(s)</h1>
        </div>
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
      <Footer />
    </>
  ) : (
    navigate("/")
  );
};

export default Comics;
