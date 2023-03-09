import Marvel_Logo from "../components/assets/images/Marvel_Logo.svg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "https://site--marvel-backend--jnfnxpb8s78c.code.run/user/login",
        data
      );
      if (response.data.token) {
        // J'affiche une alerte
        alert(`connecté`);
        navigate("/Comics");
        handleToken(response.data.token);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "Missing parameter") {
        setErrorMessage("Merci de saisir tous les champs obligatoires");
        alert(`Merci de saisir tous les champs obligatoires`);
      }
      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("Utilisateur et/ou mot de passe incorrect");
        alert(`Utilisateur et/ou mot de passe incorrect`);
      }
    }
  };

  return (
    <div className="login-main-nav-home">
      <div>
        <img className="image-logo-home" alt="logo Marvel" src={Marvel_Logo} />
      </div>
      <div>
        <h2 style={{ color: "black" }}>CONNEXION :</h2>
        <form onSubmit={handleLogin}>
          <input
            className="login-home"
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="login-home"
            id="password"
            placeholder="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="login-nav-home-button" type="submit">
            Se connecter
          </button>
          <Link to="/signup">
            <div>
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              Pas encore de compte ? <span>inscris-toi</span> !
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
