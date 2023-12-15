import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const Leaves = new mongoose.Schema(
    {
        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classes",
        },

        className: {
            type: String,
        },
        applyDate: {
            type: Date,
        },

        fromDate: {
            type: Date,
        },
        toDate: {
            type: Date,
        },
        status: {
            type: String,
        },

        reason: {
            type: String,
        },


        collectionName: { type: String, default: 'leaves' },
        modifiedBy: { type: String }
    },
    MongoSchemaAddOn
);
Leaves.plugin(mongoosePaginate);

module.exports = mongoose.model('leaves', Leaves);
