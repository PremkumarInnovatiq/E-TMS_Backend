import {sendOTP } from '../../controllers/user/send-otp';
const router = require('express').Router();

router.post('/', sendOTP);
module.exports = router;
