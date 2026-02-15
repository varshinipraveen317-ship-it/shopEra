const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

/*  PLACE ORDER (FROM CART) */
exports.createOrder = async (req, res) => {
  try {
    //  MUST use _id
    const userId = req.user._id;

    const { shippingAddress = {}, paymentMethod } = req.body;

    /* ---------------- VALIDATE SHIPPING ADDRESS ---------------- */
    const safeAddress = {
      fullName: shippingAddress.fullName || "Customer",
      address: shippingAddress.address?.trim(),
      city: shippingAddress.city || "Unknown",
      state: shippingAddress.state || "Unknown",
      pincode: shippingAddress.pincode || "000000",
      phone: shippingAddress.phone || "0000000000",
    };

    if (!safeAddress.address) {
      return res
        .status(400)
        .json({ message: "Shipping address is required" });
    }

    /* ---------------- GET USER CART ---------------- */
    const user = await User.findById(userId).populate("cart.product");

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    /* ---------------- VALIDATE STOCK ---------------- */
    for (const cartItem of user.cart) {
      const product = cartItem.product;

      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found" });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      totalAmount += product.price * cartItem.quantity;

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price, // snapshot
      });
    }

    /* ---------------- CREATE ORDER ---------------- */
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress: safeAddress,
      paymentMethod: paymentMethod || "COD",
    });

    /* ---------------- REDUCE STOCK ---------------- */
    for (const cartItem of user.cart) {
      await Product.findByIdAndUpdate(cartItem.product._id, {
        $inc: { stock: -cartItem.quantity },
      });
    }

    /* ---------------- CLEAR CART ---------------- */
    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};

/*  GET MY ORDERS (USER) */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

/*  GET ALL ORDERS (ADMIN) */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

/*  UPDATE ORDER STATUS (ADMIN) */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    res.status(500).json({
      message: "Failed to update order",
    });
  }
};
