const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, experience, skills, education } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    passwordHash,
    experience,
    skills,
    education,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

module.exports = router;
