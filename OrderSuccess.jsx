import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderSuccess.module.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.successPage}>
      <div className={styles.card}>
        <h1>🎉 Order Placed Successfully!</h1>
        <p>
          Thank you for shopping with us.  
          Your order will be delivered soon.
        </p>

        <button onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>

        <button
          className={styles.homeBtn}
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
