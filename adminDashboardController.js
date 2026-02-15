const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {
    //  ADMIN CHECK
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "placed",
    });

    res.status(200).json({
      totalProducts,
      totalOrders,
      pendingOrders,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};
