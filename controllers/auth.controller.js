const { User } = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

 const  signUpUser = async (req, res)  =>  {
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
}

module.exports = { signUpUser };