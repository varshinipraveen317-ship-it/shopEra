import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useCart } from "../component/CartContext";

const ProductDetails = () => {
  const { id } = useParams(); // MongoDB _id
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (!product) {
    return <p className={styles.notFound}>Product not found 😕</p>;
  }

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        id: product._id, // ensure Mongo ID is used
      },
      quantity
    );
    navigate("/cart");
  };

  return (
    <div className={styles.productDetails}>
      {/* BACK */}
      <button className={styles.backBtn} onClick={() => navigate("/shop")}>
        ← Back to Shop
      </button>

      {/* PRODUCT INFO */}
      <div className={styles.mainSection}>
        <img
          src={
            product.image
              ? `http://localhost:5000/${product.image}` // ✅ FIXED
              : "/no-image.png"
          }
          alt={product.name}
          className={styles.image}
        />

        <div className={styles.info}>
          <h1>{product.name}</h1>
          <p className={styles.price}>₹{product.price}</p>
          <p className={styles.description}>{product.description}</p>

          {/* QUANTITY */}
          <div className={styles.quantity}>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            className={styles.addToCart}
            onClick={handleAddToCart}
            disabled={!isLoggedIn}
          >
            Add to Cart
          </button>

          {!isLoggedIn && (
            <p className={styles.warning}>
              ⚠ Please login to add items to cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
