const { User } = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  try {
    let user = new User(req.body);
    await user.save();
    const token = user.generateToken();
    res.status(201).json({
      message: "Sign up successful",
      data: {
        _id: user.id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return false;
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return false;
    }
    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "1h",
    });
    console.log("User authenticated successfully");
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    if (token) {
      res.json({
        message: "Sign in successfully",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { signUpUser, signInUser };
