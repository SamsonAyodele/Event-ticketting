const moment = require("moment");
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

let tokenTypes = {
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
};

let tokenStatus = {
  NOT_USED: "NOT_USED",
  USED: "USED",
};

let tokenExpires = (number = 5);

let createForgotPasswordToken = (email) => {
  const tokenData = {
    key: email,
    type: tokenTypes.FORGOT_PASSWORD,
    expires: moment().add(tokenExpires, "minutes").toDate(),
    status: tokenStatus.USED,
  };
  let token = createToken(tokenData);
  return token;
};

let createToken = async (req, res) => {
  const tokenData = req.body;
  // let code = tokenData.code;
  let validCode = false;
  while (!validCode) {
    tokenData.code = generateCode(6);
    const isCodeExist = await User.findOne({ code: tokenData.code });
    if (isCodeExist) {
      validCode = true;
      break;
    }
    let token = await User.save(tokenData);
    return token;
  }
};

let generateCode = (num = 15) => {
  const dateString = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2);
  let result = randomNum + dateString;
  result = result.length > num ? result.substring(0, num) : result;
  return result.toUpperCase();
};

const forgotPassword = async (req, res) => {
  try {
    const params = { ...req.body };
    let user = await User.findOne({ email: params.email });
    if (!user) {
      console.log("User not found");
      return false;
    }
    const token = await createForgotPasswordToken({ email: params.email });
    res.status(200).json({
      message: "Token sent successfully",
      token: token,
    });
    // await sendForgotPasswordMail(params.email, token.code);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { signUpUser, signInUser, forgotPassword };

// async function forgetPassword(req, res, next) {
//   try {
//     //get the user based on the posted email
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     const generateToken = async function () {
//       const resetToken = crypto.randomBytes(20).toString("hex");
//       //hashing the plain token with crypto to store in db in hexadecimal form
//       const passwordResetToken = crypto
//         .createHash("sha256", resetToken)
//         .digest("hex");
//       const expireTimeStamp = Date.now() + 3600 * 1000; //expires after one hour
//       user.password_reset_token = passwordResetToken;
//       user.password_reset_expiry = expireTimeStamp;
//       await user.save();
//       return resetToken;
//     };
//     const resetToken = await generateToken();
//     res.status(200).json({
//       message: "password reset token was sent successfully",
//       token: resetToken,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
