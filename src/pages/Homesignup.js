import ironman from "../components/assets/images/ironman.jpg";

//pages, components
import Navhome from "../components/Navhome";
import Signup from "../components/Signup";

const Homesignup = ({ handleToken, token }) => {
  return (
    <section>
      <div>
        <img className="home-container" alt="Ironman" src={ironman} />
      </div>
      {token ? (
        <Navhome handleToken={handleToken} token={token} />
      ) : (
        <Signup handleToken={handleToken} token={token} />
      )}
    </section>
  );
};

export default Homesignup;
