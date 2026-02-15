import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ id, image, name, price }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.card} onClick={goToDetails}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={name}
          className={styles.image}
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = noImage;
          }}
        />
      </div>

      <h3 className={styles.title}>{name}</h3>
      <p className={styles.price}>₹{price}</p>

      <button
        className={styles.buyBtn}
        onClick={(e) => {
          e.stopPropagation();
          goToDetails();
        }}
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;
