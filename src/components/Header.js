import Marvel_Logo from "../components/assets/images/Marvel_Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  try {
    return (
      <header className="hidden">
        <Link to="/">
          <img
            className="image-logo-header"
            alt="logo Marvel"
            src={Marvel_Logo}
          />
        </Link>
        <nav className="nav-header">
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
      </header>
    );
  } catch (error) {
    console.log(error.message);
  }
};
export default Header;
