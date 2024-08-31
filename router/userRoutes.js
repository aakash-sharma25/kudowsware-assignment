const express = require("express");
const { submitUserDetail } = require("../controllers/userController");

const router = express.Router();


router.post("/userDetails", submitUserDetail)

module.exports = router ;