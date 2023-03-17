const Otp = require("../models/otpModel");

exports.findLatestOtp = async function (phoneNumber) {
  return Otp.findOne({ phoneNumber }).sort({ _id: -1 }).limit(1);
};

exports.deleteOtpRecords = async function (phoneNumber) {
  return Otp.deleteMany({ phoneNumber });
};

exports.createOtp = async function (phoneNumber, code) {
  return Otp.create({
    phoneNumber,
    code,
  });
};
