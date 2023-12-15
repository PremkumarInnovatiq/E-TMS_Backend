import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import NewCourses from '../../models/courses/index'
import  AuditDetails from '../../models/audit/audit';

const classSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: NewCourses,
        required: true,
    },
    courseName: {
        type:String
    },
    classAccessType: {
        type: String,
        enum: ['public', 'private'],
    },
    classDeliveryType: {
        type: String,
        enum: ['online', 'offline', 'hybrid'],
    },
    instructorCost: {
        type: Number,
    },
    classType:{
        type:String
    },
    currency: {
        type: String,
    },
    instructorCostCurrency: {
        type: String,
    },
    isGuaranteedToRun:{type:Boolean},
    externalRoom:{type:Boolean},
    minimumEnrollment: {
        type: Number,
    },
    maximumEnrollment: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'cancelled', 'pending'],
        default: 'open',
    },
    sessions: [{
        sessionNumber: {
            type: Number,
        },
        sessionStartDate: {
            type: Date,
        },
        courseName:{
            type:String
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        courseCode:{
            type:String
        },
        status:{
            type:String
        },
       

        sessionEndDate: {
            type: Date,
        },
        sessionStartTime: {
            type: String,
        },
        sessionEndTime: {
            type: String
        },
        laboratoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Laboratory',
        },
        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        
       
    }],
    collectionName: { type: String, default: 'classes' },
    modifiedBy: {type: String}
}, MongoSchemaAddOn);

classSchema.plugin(mongoosePaginate)



const handleCRUD = function (operation, collectionName, modifiedBy, next) {
	if (operation === 'createClassController') {
         operation = 'Created';
	}else if (operation === 'updateClassController') {
        operation = 'Updated';
	}
  
	// Store audit details for the CRUD operation
	const audit = new AuditDetails({
		collectionName,
		operation,
		modifiedBy,
        type: "userAudit"
    	});
	audit.save();
	next();
};

// Apply middleware to the "new_courses" collection
classSchema.post('save', function (doc, next) {
	handleCRUD.call(doc, 'createClassController', doc.collectionName,doc.modifiedBy, next);
});
classSchema.post('findOneAndUpdate', function (doc, next) {
	handleCRUD.call(doc, 'updateClassController', doc.collectionName, doc.modifiedBy,next);
});



module.exports = mongoose.model('Classes', classSchema);

