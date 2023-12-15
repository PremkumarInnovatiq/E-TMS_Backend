import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';


const FundingGrantSchema = new mongoose.Schema({
    grant_type: {
        type: String,
        enum: ['NTU', 'WSQ', 'SSG', 'MCES'],
    },
}, MongoSchemaAddOn);

FundingGrantSchema.plugin(mongoosePaginate)

const FundingGrant = mongoose.model('FundingGrant', FundingGrantSchema);

export default FundingGrant;
