import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./UpiPayment.module.css";

const UpiPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const shippingAddress = location.state?.shippingAddress;

  //  Redirect SAFELY after render
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/checkout");
    }
  }, [shippingAddress, navigate]);

  if (!shippingAddress) {
    return null; //  don't render anything while redirecting
  }

  const handleSuccess = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          shippingAddress,
          paymentMethod: "UPI",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/orders");
    } catch (err) {
      console.error("UPI ORDER ERROR:", err.response?.data || err);
      alert("Failed to place order after payment");
    }
  };

  return (
    <div className={styles.upi}>
      <h1>Complete UPI Payment</h1>

      <div className={styles.box}>
        <p>Scan QR or pay to:</p>
        <h3>shoperashop@upi</h3>

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=shoperashop@upi"
          alt="UPI QR"
        />

        <button onClick={handleSuccess}>
          Payment Successful
        </button>
      </div>
    </div>
  );
};

export default UpiPayment;
