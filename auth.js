const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./user");

router.post("/signup", async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password) {
    return res
      .status(400)
      .json({ message: "Please provide an email, full name, and password" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({ message: "Signed up successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide an email and password" });
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/feedback", async (req, res) => {
  try {
    const { email, feedback, subject, fullName } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found.");

    user.feedback = feedback;
    user.subject = subject;
    user.fullName = fullName;
    await user.save();

    res.send("Feedback submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
