import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payement = () => {
  const location = useLocation();
  const { id, title, price } = location.state;
  const protectionCost = price * 0.1;
  const deliveryCost = price * 0.2;
  const total = price + protectionCost + deliveryCost;

  return (
    <section className="grey">
      <div className="offer-product container">
        <div className="product-payement">
          <p className="offer-resume">Résumé de la commande</p>
          <div className="offer-content">
            <div className="offer-content-container">
              <p className="offer-content-text">Commande </p>
              <span>{price.toFixed(2)} €</span>
            </div>
            <div className="offer-content-container">
              <p className="offer-content-text">
                Frais de protection acheteurs
              </p>
              <span>{protectionCost.toFixed(2)} €</span>
            </div>
            <div className="offer-content-container">
              <p className="offer-content-text">Frais de port</p>
              <span>{deliveryCost.toFixed(2)} €</span>
            </div>
          </div>
          <div className="offer-content">
            <p className="offer-content-total">
              Total <span>{total}€</span>
            </p>
            <p className="offer-content-text">
              Il ne vous reste plus qu'un étape pour vous offrir
              <span className="bold"> {title}</span>. Vous allez payer
              <span className="bold"> {total} </span>€ (frais de protection et
              frais de port inclus).
            </p>
          </div>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm id={id} title={title} price={price} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payement;
