const HomeOffer = ({ offer }) => {
  return (
    <article className="offer-container">
      <div className="user-details">
        <img src={offer.owner.account.avatar.url} />
        <span>{offer.owner.account.username}</span>
      </div>
      <div className="offer-pictures">
        <img src={offer.product_pictures[0].url} />
      </div>
      <div className="product-details">
        <p>{offer.product_price} €</p>
        <div className="brand-size">
          <p>{offer.product_details[1].TAILLE}</p>
          <p>{offer.product_details[0].MARQUE}</p>
        </div>
      </div>
    </article>
  );
};

export default HomeOffer;
