import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import NewCourses from '../../models/course-program/index'
import  AuditDetails from '../../models/audit/audit';

const programClassSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: NewCourses,
        required: true,
    },
    programName: {
        type:String
    },

    classAccessType: {
        type: String,
        enum: ['public', 'private'],
    },
    classType:{
        type:String
    },
    classDeliveryType: {
        type: String,
        enum: ['online', 'offline', 'hybrid'],
    },
    currency:{
        type:String
    },
    instructorCost: {
        type: Number,
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
        
       
    }],
    collectionName: { type: String, default: 'programClasses' },
    modifiedBy: {type: String}
}, MongoSchemaAddOn);

programClassSchema.plugin(mongoosePaginate)



const handleCRUD = function (operation, collectionName, modifiedBy, next) {
	if (operation === 'createProgramClassController') {
         operation = 'Created';
	}else if (operation === 'updateProgramClassController') {
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
programClassSchema.post('save', function (doc, next) {
	handleCRUD.call(doc, 'createProgramClassController', doc.collectionName,doc.modifiedBy, next);
});
programClassSchema.post('findOneAndUpdate', function (doc, next) {
	handleCRUD.call(doc, 'updateProgramClassController', doc.collectionName, doc.modifiedBy,next);
});



module.exports = mongoose.model('ProgramClasses', programClassSchema);

