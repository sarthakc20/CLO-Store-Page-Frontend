import React from "react";

const pricingLabels = {
  0: "Paid",
  1: "Free",
  2: "View Only",
};

const ProductCard = ({ item }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={item.imagePath} alt={item.title} loading="lazy"/>
      </div>
      <div className="info">
        <div className="title-container">
          <p>{item.creator}</p>
          <p>{item.title}</p>
        </div>
        <div className="price-container">
          <h3>
            {item.pricingOption === 0 ? "" : pricingLabels[item.pricingOption]}
            {item.pricingOption === 0 && item.price ? `$${item.price}` : ""}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
