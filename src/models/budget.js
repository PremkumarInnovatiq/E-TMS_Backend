import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const Budgets = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        trainingBudget: {
            type: String,
        },
        year: {
            type: String,
        },

        percentage: {
            type: String,
        },
        trainingType: {
            type: String,
        },
        status: {
            type: String,
        },

        collectionName: { type: String, default: 'budgets' },
        modifiedBy: { type: String }
    },
    MongoSchemaAddOn
);
Budgets.plugin(mongoosePaginate);

module.exports = mongoose.model('budgets', Budgets);
