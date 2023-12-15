/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
// User Model
//import urlSlug from 'mongoose-url-slugs';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userLogsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
		},
		rollNo: {
			type: String,
		},
		email: {
			type: String,
			//required: true,
			//trim: true,
			
		},
		loginTime: {
			type: Date,
			default: Date.now,
		},
		type: {
			type: String,
		},
		logoutTime: {
			type: Date,
			//default: Date.now,
		},
		
		gender: {
			type: String,
			enum: ['male', 'female', 'mixed'],
			default: 'male',
		},
			
	},
	MongoSchemaAddOn
);
//userSchema.index({name:"text",last_name:"text"});
//userSchema.plugin(urlSlug('name'));
userLogsSchema.plugin(mongoosePaginate);







const UserLogs = mongoose.model('UserLogs', userLogsSchema);

module.exports = UserLogs;
