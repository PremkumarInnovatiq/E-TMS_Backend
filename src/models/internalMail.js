import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const InternalEmails = new mongoose.Schema(
    {
        mail:[{
            to: {
                type: String,
            },
            cc: {
                type: String
            },
            from:{
                type:String
            },
            fromName:{
                type:String
            },
            fromProfile:{
                type:String
            },
            content: {
                type: String,
            },
            attachment: {
                type: String,
            },
            date: {
                type:Date
            },
            time: {
                type:String
            },
            read: {
                type:Boolean
            }
    
    
        }],
        subject: {
            type: String,
        },
        toStatus: {
            type: String,
        },
        fromStatus: {
            type: String,
        },
        toImportant: {
            type: Boolean
        },
        fromImportant: {
            type: Boolean
        },
        toArchive: {
            type: Boolean
        },
        fromArchive: {
            type: Boolean
        },
        toStarred: {
            type: Boolean
        },
        fromStarred: {
            type: Boolean
        },
        toSpam: {
            type: Boolean
        },
        fromSpam: {
            type: Boolean
        },

        collectionName: { type: String, default: 'internalemails' },
        modifiedBy: { type: String }
    },
    MongoSchemaAddOn
);
InternalEmails.plugin(mongoosePaginate);

module.exports = mongoose.model('internalemails', InternalEmails);
