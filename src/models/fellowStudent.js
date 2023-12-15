import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { MongoSchemaAddOn } from "../utilities/mongoCommonCollection";
import AuditDetails from "./audit/audit"

const fellowStudentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    student_name:{
      type:String
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgram",
      required: false,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgramClasses",
      required: false,
    },
    playbackTime:{
      type:Number
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgram",
      required: false,
    },
    program_name:{
      type:String
    },
    email: {
      type:String
    },
    programTitle: {
      type:String
    },
    status: {
      type: String,
      enum: ["registered", "approved", "inProgress", "completed"],
      default: "registered",
    },
    classStartDate:{
      type:Date
    },
    classEndDate:{
      type:Date
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
    certificateUrl:{
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
    collectionName: { type: String, default: 'fellowStudent' },
    modifiedBy: {type: String}
  },
  MongoSchemaAddOn
);

fellowStudentSchema.plugin(mongoosePaginate);



const handleCRUD = function (operation, collectionName, modifiedBy,next) {
	if (operation === 'createStudentProgramController') {
         operation = 'Created';
	}else if (operation === 'updateStudentApproveList') {
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

fellowStudentSchema.post('save', function (doc, next) {
	handleCRUD.call(doc, 'createStudentProgramController', doc.collectionName, doc.modifiedBy,next);
});

fellowStudentSchema.post('findOneAndUpdate', function (doc, next) {
	handleCRUD.call(doc, 'updateStudentApproveList', doc.collectionName, doc.modifiedBy, next);
});


const fellowStudent = mongoose.model("fellowStudent", fellowStudentSchema);

export default fellowStudent;
