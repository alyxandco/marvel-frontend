import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

//pages, composants
import Header from "../components/Header";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [charfavorites, setCharfavorites] = useState([]);

  const cookie = Cookies.get("Marvel-charFav");
  const obj = JSON.parse(cookie);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let obj2 = "";
        for (let i = 0; i < obj.length; i++) {
          //   console.log("obj", [i], obj[i]);
          obj2 = obj[i];
          console.log("obj2 : ", obj2);
          console.log(data);

          const response = await axios.get(
            `http://localhost:4000/character/${obj2}`
          );
          setData(data + response.data);
          setIsLoading(false);
          console.log(response.data);
          <p>hello</p>;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p className="loading">Loading 🔥🔥🔥...</p>
  ) : (
    <>
      <Header />
      <section className="character-top-section">
        <h1>{data.message.name} Character(s)</h1>
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
    </>
  );
};
export default Favorites;
