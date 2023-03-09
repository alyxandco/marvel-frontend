import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Homesignup from "./pages/Homesignup";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Comicsbycharacter from "./pages/Comicsbycharacter";
import Favorites from "./pages/Favorites";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Je trouve un cookie token, ce cookie
  // - Sinon, rien
  const [token, setToken] = useState(Cookies.get("token-marvel") || null);
  // fonction pour stocker OU suppr le token dans le state + cookie
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-marvel", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-marvel");
    }
  };

  return (
    <Router>
      <Routes handleToken={handleToken}>
        <Route
          path="/"
          element={<Home handleToken={handleToken} token={token} />}
        />
        <Route
          path="/signup"
          element={<Homesignup handleToken={handleToken} token={token} />}
        />
        <Route
          path="/characters"
          element={<Characters handleToken={handleToken} token={token} />}
        />
        <Route
          path="/comics"
          element={<Comics handleToken={handleToken} token={token} />}
        />
        <Route
          path="/comicsbycharacter"
          element={
            <Comicsbycharacter handleToken={handleToken} token={token} />
          }
        />
        <Route
          path="/Favorites"
          element={<Favorites handleToken={handleToken} token={token} />}
        />
      </Routes>
    </Router>
  );
}
export default App;
