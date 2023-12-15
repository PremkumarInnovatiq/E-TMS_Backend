import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const VideoPlayed = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classes",
        },
        videoId: {
            type: String
        },
        status: {
            type: String,
        },


        collectionName: { type: String, default: 'video-play' },
        modifiedBy: { type: String }
    },
    MongoSchemaAddOn
);
VideoPlayed.plugin(mongoosePaginate);

module.exports = mongoose.model('video-play', VideoPlayed);
