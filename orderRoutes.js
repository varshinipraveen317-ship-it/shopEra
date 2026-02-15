const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
} = require("../controllers/orderController");

const verifyToken = require("../middleware/verifyToken");

//  Place order (checkout)
router.post("/", verifyToken, createOrder);

//  Get logged-in user's orders
router.get("/my", verifyToken, getMyOrders);

module.exports = router;
