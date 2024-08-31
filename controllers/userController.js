const express = require("express");
const User = require("../model/userSchema");

exports.submitUserDetail = async (req, res) => {
  const { id, resumeLink, phone } = req.body;
  console.log(id, resumeLink, phone);

  try {
    const user = await User.findById(id);
    console.log(user);

    user.resumeLink = resumeLink;
    user.phone = phone;
    await user.save();

    res.status(200).json({
      message: "user data saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
