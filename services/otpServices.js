const Otp = require('../models/otpModel')

exports.findLatestOtp = async function ( phoneNumber ) {
  return Otp.findOne({ phoneNumber }).sort({ _id: -1 }).limit(1)
}

exports.deleteOtpRecords = async function ( phoneNumber ) {
  return Otp.deleteMany({ phoneNumber });
}
