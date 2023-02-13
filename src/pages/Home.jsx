import { useNavigate } from "react-router-dom";

// import Offer from "../pages/Offer";
import HomeOffer from "../components/HomeOffer";

const Home = ({ data }) => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="hero">
        <img src="https://lereacteur-vinted.netlify.app/static/media/tear.884480420945b3afd77b44a6c5f98567.svg" />
      </div>
      <section className="home-offers">
        {data.offers.map((offer) => {
          if (offer.owner.account.avatar) {
            return (
              <div
                key={offer._id}
                onClick={() => {
                  navigate(`/offer/${offer._id}`);
                }}
              >
                <HomeOffer offer={offer} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </section>
    </div>
  );
};

export default Home;
