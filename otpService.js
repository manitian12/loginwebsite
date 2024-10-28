// otpService.js
const nodemailer = require('nodemailer');

async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}.`
  });
}

module.exports = { sendOTPEmail };

