import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { MongoSchemaAddOn } from "../utilities/mongoCommonCollection";
import AuditDetails from "../models/audit/audit"
import isBoolean from "validator/lib/isBoolean";

const studentClassesSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:{
      type: String
    },
    coursekit: [
      {
        documentLink: {
              type: String,
          },
          longDescription: {
              type: String,
          },
          name: {
              type: String
          },
          shortDescription: {
              type: String
          },
          filename: {
              type: String,
          },
          videoId:{
            type: String,
          },
          inputUrl: {
            type: String
          },
          url: {
            type:String
          },
          playbackTime: {
            type: Number
          },

      }
  ],

    playbackTime:{
      type:Number
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "new_courses",
      required: true,
    },
    status: {
      type: String,
      enum: ["registered", "approved", "inProgress", "completed"],
      default: "registered",
    },
    registeredOn: {
      type: Date,
    },
    approvedOn: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    certifiacteUrl:{
      type:String
    },
    certificate:{
      type:Boolean
    },
    session: [
      {
        sessionNumber: {
          type: Number,
        },
        sessionStatus: {
          type: String,
          enum: ["scheduled", "completed"],
          default: "scheduled",
        },
        sessionCompletedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    collectionName: { type: String, default: 'StudentClasses' },
    modifiedBy: {type: String}
  },
  MongoSchemaAddOn
);

studentClassesSchema.plugin(mongoosePaginate);



const handleCRUD = function (operation, collectionName, modifiedBy,next) {
	if (operation === 'createStudentClassController') {
         operation = 'Created';
	}else if (operation === 'updateStudentClassController') {
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

studentClassesSchema.post('save', function (doc, next) {
	handleCRUD.call(doc, 'createStudentClassController', doc.collectionName, doc.modifiedBy,next);
});
studentClassesSchema.post('findOneAndUpdate', function (doc, next) {
	handleCRUD.call(doc, 'updateStudentClassController', doc.collectionName, doc.modifiedBy, next);
});


const StudentClasses = mongoose.model("StudentClasses", studentClassesSchema);

export default StudentClasses;
