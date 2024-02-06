const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  userName: { type: String },
  password: { type: String },
  resetPassword: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
