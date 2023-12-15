

import { redisClient } from '../../middleware/redisClient';

// import Email from '../../utils/email'
import User from '../../models/User';

const Email = require ('../../utils/email');


exports.sendOTP = async function(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ status: 'error', message: 'User not found' });
  }

const storedOtp = Math.floor(100000 + Math.random() * 900000);

redisClient.set(`${email}`, storedOtp, 'EX', 300);

  const emailData = {
    to: email,
    subject: 'OTP for Login',
    text: storedOtp,
    name: user.name
  };
  try {
    await new Email(user).sendOtp(emailData);
    return res.status(200).send({ status: 'success', message: 'OTP sent to email' });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: 'Failed to send OTP via email' });
  }
}


