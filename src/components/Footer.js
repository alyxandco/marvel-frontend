import Marvel_icon from "../components/assets/images/Marvel_icon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="hidden">
      <Link to="/">
        <img
          className="image-logo-footer"
          alt="logo Marvel"
          src={Marvel_icon}
        />
      </Link>
      <p>© 2023 - Made by Alex @Le Reacteur</p>
    </footer>
  );
};

export default Footer;
