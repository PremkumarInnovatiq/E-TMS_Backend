import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import User from '../../models/User'

const auditSchema = new mongoose.Schema(
	{
		collectionName: String,
		operation: String,
		activity: String,
		type: {
			type: String,
			enum: ['userAudit', 'loginActivity']
		},
		modifiedBy: {
			type: mongoose.Schema.ObjectId,
			ref: User,
			required: true
		},
		auditData: mongoose.Schema.Types.Mixed
	},
	MongoSchemaAddOn
);
auditSchema.plugin(mongoosePaginate);


//Populate middleware function
// auditSchema.pre(/^find/, function (next) {
// 	this.populate('modifiedBy', { last_name: 1 });
// 	next();
// });

module.exports = mongoose.model('AuditDetails', auditSchema);

