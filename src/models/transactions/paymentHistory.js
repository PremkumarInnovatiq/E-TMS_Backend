import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const paymentHistorySchema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.ObjectId,
		ref: 'Projects',
	},
	course: {
		type:String
	},
	name: {
		type:String
	},
	email: {
		type:String
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	price: {
		type: Number,
		required: [true, 'Payment History must have a price!'],
	},
	transactionId : {
		type: String,
		required: [true, 'Payment History must have a Transaction Id!'],
	},
	payment_intent : {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	paymentType: {
		type: String,
		enum: ['paid', 'free']
	},
	status: {
		type: String,
		enum: ['Success', 'Failed']
	},
});

paymentHistorySchema.plugin(mongoosePaginate);

const paymentHistory = mongoose.model('paymentHistory', paymentHistorySchema);
module.exports = paymentHistory;
