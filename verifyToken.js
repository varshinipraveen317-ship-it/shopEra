const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //  Check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    //  Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Fetch full user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //  Attach user to request (has _id)
    req.user = user;

    next();
  } catch (error) {
    console.error("VERIFY TOKEN ERROR:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
