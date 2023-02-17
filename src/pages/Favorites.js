import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

//pages, composants
import Header from "../components/Header";

const Favorites = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [charfavorites, setCharfavorites] = useState([]);

  const cookie = Cookies.get("Marvel-charFav");
  console.log("cookie from favorites :", cookie);

  return <p>Hello</p>;
};

export default Favorites;
