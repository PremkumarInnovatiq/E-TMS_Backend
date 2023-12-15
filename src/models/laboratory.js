import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';


const laboratorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, MongoSchemaAddOn);

laboratorySchema.plugin(mongoosePaginate)

const Laboratory = mongoose.model('Laboratory', laboratorySchema);

export default Laboratory;
