import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import HomeOffer from "../components/HomeOffer";

const Home = ({ search }) => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
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
