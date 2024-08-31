
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { response } = require("express");
require("dotenv").config();


exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res.status(200).json({
      message: "user registered successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
        message:"user login successfull",
        user:user,
      });

   
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
