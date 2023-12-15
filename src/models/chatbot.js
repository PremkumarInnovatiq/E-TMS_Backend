import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const Chatbot = new mongoose.Schema(
    {
        messages: [
            {
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                role: {
                    type: String
                },
                type: {
                    type: String
                },
                text: {
                    type: String
                },
                status: {
                    type: String
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},


        collectionName: { type: String, default: 'chatbot' },
        modifiedBy: { type: String }
    },
    MongoSchemaAddOn
);
Chatbot.plugin(mongoosePaginate);

module.exports = mongoose.model('chatbot', Chatbot);
