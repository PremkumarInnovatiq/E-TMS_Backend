import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const Theme = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        image_link: {
            type: String,
          },
        collectionName: { type: String, default: 'themes' },
        modifiedBy: { type: String }
    },
    MongoSchemaAddOn
);
Theme.plugin(mongoosePaginate);

module.exports = mongoose.model('themes', Theme);
