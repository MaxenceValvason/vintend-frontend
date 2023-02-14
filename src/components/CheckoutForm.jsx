import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

import axios from "axios";

const CheckoutForm = ({ id, title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, id);

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: title,
        amount: price,
      }
    );

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return !completed ? (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="card-element" />
        <button className="button-pay" type="submit">
          Pay
        </button>
      </form>
    </div>
  ) : (
    <p className="pay-done">Merci pour votre achat.</p>
  );
};

export default CheckoutForm;
