import ironman from "../components/assets/images/ironman.jpg";
import Marvel_Logo from "../components/assets/images/Marvel_Logo.svg";

import { Link } from "react-router-dom";

const Home = () => {
  try {
    return (
      <section>
        <div>
          <img className="home-container" alt="Ironman" src={ironman} />
        </div>
        <div className="main-nav-home">
          <div>
            <img
              className="image-logo-home"
              alt="logo Marvel"
              src={Marvel_Logo}
            />
          </div>
          <nav className="nav-home">
            <Link to="/Characters">
              <button>Characters</button>
            </Link>
            <Link to="/Comics">
              <button>Comics</button>
            </Link>
            <Link to="/Favorites">
              <button>★ Favorites</button>
            </Link>
          </nav>
        </div>
      </section>
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default Home;
