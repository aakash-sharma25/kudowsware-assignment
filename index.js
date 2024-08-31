const express = require("express");
const authRoutes = require("./router/authRoutes");
const userRoutes = require("./router/userRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

dbConnect();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
