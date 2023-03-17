const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Strings = require("../config/strings");
const helpers = require("../helpers/helpers");
const UserService = require("../services/usersServices");
const OtpService = require("../services/otpServices");
const User = require("../models/userModel");
const Otp = require("../models/otpModel");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const otpPhoneNumber = process.env.OTP_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken);

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, phoneNumber, password, otpCode } = req?.body;
  const userExist = await UserService.findOneUser(phoneNumber);
  if (userExist) {
    res?.status(400);
    throw new Error(Strings.userExists);
  }

  const otp = await OtpService.findLatestOtp(phoneNumber);

  if (otp.code !== otpCode) {
    console.log(otp.code);
    res?.status(400);
    throw new Error(Strings.wrongOtp);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await UserService.createUser(
      name,
      username,
      phoneNumber,
      hashPassword
    );
    if (user) {
      const data = {
        _id: user.id,
        name: user.name,
        username: user.username,
      };
      await OtpService.deleteOtpRecords(phoneNumber);
      res?.status(201).json([data, Strings.userCreatedSuccess]);
    }
  }
});

const checkUser = asyncHandler(async (req, res) => {
  let randomN = Math.floor(Math.random() * 90000) + 10000;

  const clientMessage = await client.messages.create({
    body: `Enter this Otp ${randomN}`,
    from: otpPhoneNumber,
    to: req?.body?.phoneNumber,
  });
  if (!clientMessage) {
    res?.status(400);
    throw new Error();
  }

  const newOtp = await OtpService.createOtp(req?.body?.phoneNumber, randomN);

  if (!newOtp) {
    res?.status(400);
    throw new Error();
  }

  res?.status(201).json(Strings.otpSentSuccess);
});

const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req?.body;
  const user = await UserService.findOneUser(phoneNumber);
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    const data = {
      _id: user.id,
      name: user.name,
      username: user.username,
      phoneNumber: user.phoneNumber,
      token: helpers.generateToken(user._id),
    };
    res?.status(200).json([data, Strings.userLoggedInSuccess]);
  } else {
    res?.status(400);
    throw new Error(Strings.invalidCredentials);
  }
});

const searchUser = asyncHandler(async (req, res) => {
  const usersList = req.query.name
    ? await UserService.searchUser(req?.query, req.user.name)
    : await UserService.findAllUsers();
  res?.status(200).json([usersList, Strings.userFetchSuccessfully]);
});

const Users = {
  loginUser,
  registerUser,
  searchUser,
  checkUser,
};
module.exports = Users;
