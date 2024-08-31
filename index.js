const express = require("express");
const connectDb = require("./config/ConnectDb");
const authRoutes = require("./router/authRoutes");
const userRoutes = require("./router/userRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectDb();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
