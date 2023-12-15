import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    arn: {
        type: String,
        required: true
    }
}, MongoSchemaAddOn);

module.exports = mongoose.model('Template', templateSchema);