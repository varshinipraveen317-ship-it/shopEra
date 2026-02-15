const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

const verifyToken = require("../middleware/verifyToken");

//  Cart routes (user must be logged in)
router.post("/", verifyToken, addToCart);        // Add to cart
router.get("/", verifyToken, getCart);           // Get cart
router.delete("/:productId", verifyToken, removeFromCart); // Remove item

module.exports = router;
