import React from "react";

const pricingLabels = {
  0: "Paid",
  1: "Free",
  2: "View Only",
};

const ProductCard = ({ item }) => {
  return (
    <div className="card">
      <img src={item.imagePath} alt={item.title} />
      <div className="info">
        <h3>{item.title}</h3>
        <p>{item.creator}</p>
        <p>
          {pricingLabels[item.pricingOption]}
          {item.pricingOption === 0 && item.price ? ` - $${item.price}` : ""}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
