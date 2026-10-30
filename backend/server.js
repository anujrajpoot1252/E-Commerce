
require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("ShopEase Backend is Running!");
});

// Signup and Login routes
app.use("/api/auth", authRoutes);

// Protected Profile route
app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated successfully",
    user: req.user,
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Connect database and start server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
