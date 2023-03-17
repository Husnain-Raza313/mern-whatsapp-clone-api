const mongoose = require("mongoose");
const Strings = require("../config/strings");

const OtpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      length: 20,
      required: [true, Strings.pleaseAddName],
      minlength: 3,
    },
    code: {
      type: String,
      required: [true, Strings.pleaseAddOtp],
      unique: true,
      length: 5,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Otp", OtpSchema);
