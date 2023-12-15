import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import User from '../User'

const userauditSchema = new mongoose.Schema(
	{
		userName: String,
		Email: String,
		loginTime: String,
		userType:String,
	},
	MongoSchemaAddOn
	
);

userauditSchema.plugin(mongoosePaginate);


//Populate middleware function
// auditSchema.pre(/^find/, function (next) {
// 	this.populate('modifiedBy', { last_name: 1 });
// 	next();
// });

module.exports = mongoose.model('UserAuditDetails', userauditSchema);

