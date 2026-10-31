const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce_db";
  await mongoose.connect(uri);
  console.log("MongoDB Connected Successfully!");
}

module.exports = connectDB;
