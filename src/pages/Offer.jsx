import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [idData, setIdData] = useState();
  const [isLoad, setIsLoad] = useState(false);
  let navigate = useNavigate();

  const tabDetails = ["MARQUE", "TAILLE", "ÉTAT", "COULEUR", "EMPLACEMENT"];
  useEffect(() => {
    const fetchIdData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setIdData(response.data);
        setIsLoad(true);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchIdData();
  }, [id]);

  return !isLoad ? (
    <span>Is Loading ...</span>
  ) : (
    <div className="grey">
      <div className="offer-product container">
        <div className="left-side">
          <img className="image-product" src={idData.product_image.url} />
        </div>

        <div className="product">
          <h3>{idData.product_price} €</h3>
          <section className="product-infos">
            {idData.product_details.map((elem) => {
              for (let i = 0; i < tabDetails.length; i++) {
                if (elem.hasOwnProperty(tabDetails[i])) {
                  return (
                    <div key={i} className="offer-list">
                      {tabDetails[i]} <span>{elem[tabDetails[i]]}</span>
                    </div>
                  );
                } else {
                  // return;
                }
              }
            })}
            <div className="divider"></div>
          </section>
          <div className="product-desc">
            <p className="product-name">{idData.product_name}</p>
            <p className="product-description">{idData.product_description}</p>
            <div className="user-infos">
              <img src={idData.owner.account.avatar.url} />
              <p>{idData.owner.account.username}</p>
            </div>
          </div>
          <button
            className="button-buy"
            onClick={() => {
              navigate("/payement", {
                state: {
                  id: id,
                  title: idData.product_name,
                  price: idData.product_price,
                },
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
