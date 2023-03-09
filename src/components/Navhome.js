import Marvel_Logo from "../components/assets/images/Marvel_Logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Navhome = ({ handleToken, token }) => {
  const navigate = useNavigate();
  return (
    <div className="main-nav-home">
      <div>
        <img className="image-logo-home" alt="logo Marvel" src={Marvel_Logo} />
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
        <button
          onClick={() => {
            handleToken(null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      </nav>
    </div>
  );
};
export default Navhome;
