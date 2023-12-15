import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';

const videoSchema = new mongoose.Schema({

    filename: {
        type: String,
    },
    url: {
        type: String
    },
    jobId: {
        type: String
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    inputUrl: {
        type: String
    },

}, MongoSchemaAddOn);

videoSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Video', videoSchema);


