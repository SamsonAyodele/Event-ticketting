const { User } = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    // let userExist = await User.findOne({ fullName: req.body.fullName });
    // if (userExist) {
    //   res.status(400).json({
    //     message: `${userExist.name} already exist`,
    //   });
    // }
    let user = new User(req.body);
    await user.save();
    res.status(200).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User find successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    let userExist = await User.findById(userId);
    if (!userExist) {
      res.status(400).json({
        message: `${userExist.name} not found`,
      });
    }
    let user = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    let userExist = await User.findById(userId);
    if (!userExist) {
      res.status(400).json({
        message: `${userExist.name} not found`,
      });
    }
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
