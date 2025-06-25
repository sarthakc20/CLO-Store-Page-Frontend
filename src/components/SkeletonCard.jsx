import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-img" />
      <div className="info">
        <div className="skeleton-line title" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
};

export default SkeletonCard;
