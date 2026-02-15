import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../component/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const cartContext = useCart();

  /* ================= SAFETY GUARDS ================= */
  if (!cartContext) {
    return <p className={styles.error}>Cart not available</p>;
  }

  const { cartItems, clearCart } = cartContext;

  if (!Array.isArray(cartItems)) {
    return <p className={styles.error}>Invalid cart data</p>;
  }

  /* ================= STATE ================= */
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError("Please enter delivery address");
      return;
    }

    /* ---------- UPI FLOW ---------- */
    if (paymentMethod === "UPI") {
      navigate("/upi-payment", {
        state: {
          shippingAddress: {
            fullName: "Customer",
            address: trimmedAddress,
            city: "Unknown",
            state: "Unknown",
            pincode: "000000",
            phone: "0000000000",
          },
        },
      });
      return;
    }

    /* ---------- COD FLOW ---------- */
    try {
      setLoading(true);
      setError("");

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          shippingAddress: {
            fullName: "Customer",
            address: trimmedAddress,
            city: "Unknown",
            state: "Unknown",
            pincode: "000000",
            phone: "0000000000",
          },
          paymentMethod: "COD",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error(
        "PLACE ORDER ERROR:",
        err.response?.data || err
      );
      setError(
        err.response?.data?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMPTY CART ================= */
  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/shop")}>
          Go Shopping
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>

      {error && <p className={styles.error}>{error}</p>}

      {/* ADDRESS */}
      <div className={styles.section}>
        <h3>Delivery Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full address"
        />
      </div>

      {/* PAYMENT */}
      <div className={styles.section}>
        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          UPI
        </label>
      </div>

      {/* SUMMARY */}
      <div className={styles.summary}>
        <h3>Order Summary</h3>

        {cartItems
          .filter((item) => item.product) /* hide ghost items */
          .map((item, index) => (
            <div key={index} className={styles.row}>
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          ))}

        <button
          onClick={handlePlaceOrder}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
