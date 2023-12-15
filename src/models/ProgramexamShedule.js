import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const ExamSchedule = new mongoose.Schema(
  {
    ProgramName: {
      type: String,
      required: true,
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgram"
  },
    programCode: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },

    endDate: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    duration: {
      type: String,
    },
    endTime: {
      type: String,
    },
   
    details: {
      type: String,
    },
 
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
   
    collectionName: { type: String, default: 'examshedule' },
    modifiedBy: { type: String }
  },
  MongoSchemaAddOn
);
ExamSchedule.plugin(mongoosePaginate);

module.exports = mongoose.model('programexamshedule', ExamSchedule);
