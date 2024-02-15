const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let saltRounds = 10;
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    phone: { type: String },
    // resetPassword: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

userSchema.method("generateToken", function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { issuer: "http://localhost:4747", expiresIn: "4H" }
  );
  return token;
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
