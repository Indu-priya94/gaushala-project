const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");


// REGISTER ADMIN
router.post("/register", async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      username: req.body.username,
      password: hashedPassword,
    });

    await admin.save();

    res.json("Admin Registered");

  } catch (error) {
    res.status(500).json(error);
  }
});


// LOGIN ADMIN
router.post("/login", async (req, res) => {
  try {

    const admin = await Admin.findOne({
      username: req.body.username,
    });

    if (!admin) {
      return res.status(400).json("Admin not found");
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json("Wrong Password");
    }

    const token = jwt.sign(
      { id: admin._id },
      "secretkey"
    );

    res.json({
      token,
      message: "Login Success",
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;