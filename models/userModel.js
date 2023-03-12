const mongoose = require("mongoose");
const Strings = require("../config/strings");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      length: 20,
      required: [true, Strings.pleaseAddName],
      minlength: 3,
    },
    username: {
      type: String,
      required: [true, Strings.pleaseAddUsername],
      unique: true,
      length: 30,
    },
    email: {
      type: String,
      required: [true, Strings.pleaseAddEmail],
      unique: true,
      length: 30,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    phoneNumber: {
      type: String,
      required: [true, Strings.pleaseAddPhoneNumber],
      unique: true,
      length: 15,
      match:
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    },
    password: {
      type: String,
      required: [true, Strings.pleaseAddPassword],
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
