import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Comicsbycharacter from "./pages/Comicsbycharacter";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comicsbycharacter" element={<Comicsbycharacter />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
export default App;
