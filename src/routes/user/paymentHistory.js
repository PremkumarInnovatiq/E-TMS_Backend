const express = require('express');

const paymentHistorycontroller = require(`../../controllers/user/paymentHistory`);
// const authcontroller = require(`./../controllers/authController`);

const router = express.Router({});

router
	.route('/userPaymentHistory')
	.get(paymentHistorycontroller.getPaymentHistory);

router
.route('/userPaymentHistory/:id')
.get(paymentHistorycontroller.getPaymentHistoryById);

router
	.route('/programsPaymentHistory')
	.get(paymentHistorycontroller.getProgramsPaymentHistory);

router
.route('/programsPaymentHistory/:id')
.get(paymentHistorycontroller.getProgramsPaymentHistoryById);




module.exports = router;
