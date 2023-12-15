import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import { model } from 'mongoose';
import AuditDetails from '../models/audit/audit';

const courseKitSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "new_courses"
    },
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    videoLink: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    documentLink: {
        type: String
    },
    sections: {
        type: String,
       
    },
    collectionName: { type: String, default: 'coursekits' },
    modifiedBy: { type: String },

}, MongoSchemaAddOn);

courseKitSchema.plugin(mongoosePaginate)



const handleCRUD = function (operation, collectionName, modifiedBy, auditData, next) {
    if (operation === 'createCourseKitController') {
        operation = 'Created';
    } else if (operation === 'updateCourseKitByIdController') {
        operation = 'Updated';
    }

    // Store audit details for the CRUD operation
    const audit = new AuditDetails({
        collectionName,
        operation,
        modifiedBy,
        auditData,
        type: "userAudit"
    });
    audit.save();
    next();
};
// Apply middleware to the "new_courses" collection
courseKitSchema.post('save', function (doc, next) {
    const auditData = {
        courseKit: {
            name: doc.name
        }
    };
    handleCRUD.call(doc, 'createCourseKitController', doc.collectionName, doc.modifiedBy, auditData, next);
});
courseKitSchema.post('findOneAndUpdate', function (doc, next) {
    const auditData = {
        courseKit: {
            name: doc.name
        }
    };
    handleCRUD.call(doc, 'updateCourseKitByIdController', doc.collectionName, doc.modifiedBy, auditData, next);
});

module.exports = mongoose.model('CourseKit', courseKitSchema);
