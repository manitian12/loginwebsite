// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const otpGenerator = require('otp-generator');

// Assuming use of Nodemailer or Twilio API for sending OTP
const { sendOTPEmail, sendOTPSMS } = require('./otpService'); // Helper functions for sending OTPs

let otpStore = {}; // Temporary storage for OTPs, for demonstration

app.use(bodyParser.json());

app.post('/send-otp', (req, res) => {
  const { countryCode, phoneOrEmail } = req.body;
  const otp = otpGenerator.generate(4, { digits: true });
  otpStore[phoneOrEmail] = otp;

  // Send OTP based on whether it's a phone number or email
  const sendMethod = phoneOrEmail.includes('@') ? sendOTPEmail : sendOTPSMS;

  sendMethod(countryCode, phoneOrEmail, otp)
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
});

app.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  if (otpStore[phoneOrEmail] === otp) {
    delete otpStore[phoneOrEmail];
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

