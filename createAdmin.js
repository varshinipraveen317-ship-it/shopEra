const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const adminExists = await User.findOne({
      email: "admin@shopera.com",
    });

    if (adminExists) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Main Admin",
      email: "admin@shopera.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("🎉 Admin created successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });