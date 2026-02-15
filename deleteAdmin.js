const mongoose = require("mongoose");
require("dotenv").config();
const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const result = await Admin.deleteOne({
      email: "admin@shopera.com",
    });

    console.log(
      result.deletedCount
        ? "🗑️ Admin deleted"
        : "⚠️ No admin found"
    );

    process.exit(0);
  })
  .catch(console.error);