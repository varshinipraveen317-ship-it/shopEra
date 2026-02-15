const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const verifyToken = require("../middleware/verifyToken");
const adminAuth = require("../middleware/adminAuth");

/* ================= ADMIN: GET ALL ORDERS ================= */
router.get("/", verifyToken, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ================= ADMIN: UPDATE ORDER STATUS ================= */
router.put("/:id/status", verifyToken, adminAuth, async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({ message: "Order status is required" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
});

module.exports = router;
