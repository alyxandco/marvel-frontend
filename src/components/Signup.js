import Marvel_Logo from "../components/assets/images/Marvel_Logo.svg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ handleToken, token }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const data = {
        email: email,
        password: password,
        username: username,
      };
      const response = await axios.post(
        "https://site--marvel-backend--jnfnxpb8s78c.code.run/signup",
        data
      );
      if (response.data.token) {
        // J'affiche une alerte
        alert(`connecté`);
        navigate("/Comics");
        const cookieToken = response.data.token;
        handleToken(cookieToken);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data === "This email already has an account") {
        setErrorMessage("Veuillez utiliser un Email valide.");
        alert(`Email déjà utilisé, merci d'utiliser un Email valide.`);
      }
      if (error.response.data === "Missing parameter") {
        setErrorMessage("Merci de saisir tous les champs obligatoires");
        alert(`Merci de saisir tous les champs obligatoires`);
      }
    }
  };

  return (
    <div className="login-main-nav-home">
      <div>
        <img className="image-logo-home" alt="logo Marvel" src={Marvel_Logo} />
      </div>
      <div>
        <h2 style={{ color: "black" }}>INSCRIPTION :</h2>
        <form onSubmit={handleSignup}>
          <input
            className="login-home"
            id="username"
            placeholder="nom"
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
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
            S'inscrire
          </button>
          <Link to="/">
            <div>
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              Tu as déjà un compte ? <span>Connecte-toi</span> !
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Signup;
