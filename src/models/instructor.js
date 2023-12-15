import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const instructorSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    linkedin: {
        type: String
    },
    about: {
        type: String
    },
    experience: {
        type: String
    },
    website: {
        type: String
    }
}, MongoSchemaAddOn);

instructorSchema.plugin(mongoosePaginate);

const Instructor = mongoose.model('Instructor', instructorSchema);

export default Instructor;