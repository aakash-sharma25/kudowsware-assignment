const express = require("express");
const connectDb = require("./config/ConnectDb");
const authRoutes = require("./router/authRoutes");
const userRoutes = require("./router/userRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
// Connect to database
connectDb();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
