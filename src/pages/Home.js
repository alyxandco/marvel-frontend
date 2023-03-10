import ironman from "../components/assets/images/ironman.jpg";

//pages, components
import Navhome from "../components/Navhome";
import Login from "../components/Login";

const Home = ({ handleToken, token }) => {
  return (
    <section>
      <div>
        <img className="home-container" alt="Ironman" src={ironman} />
      </div>
      {token ? (
        <Navhome handleToken={handleToken} token={token} />
      ) : (
        <Login handleToken={handleToken} token={token} />
      )}
    </section>
  );
};

export default Home;
