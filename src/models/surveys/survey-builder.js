import mongoose from "mongoose";
import { MongoSchemaAddOn } from "../../utilities/mongoCommonCollection";

const mongoosePaginate = require("mongoose-paginate-v2");

// Create Survey schema
const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    question1:{
      type: String
    },
    question2:{
      type: String
    },
    question3:{
      type: String
    },
    question4:{
      type: String
    },
    question5:{
      type: String
    },
    question6:{
      type: String
    },
    question7:{
      type: String
    },
    courseName:{
      type: String
    },
    programName:{
      type: String
    },
    studentFirstName:{
      type: String
    },
    studentLastName:{
      type: String
    },
    questions: [
      {
        question: {
          type: String,
        },
        type: {
          type: String,
          enum: ["single", "multi", "text"],
        },
        choices: {
          type: [String],
        }
      }
    ],
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    isDeleted: { type: Boolean, default: false }
  },
  MongoSchemaAddOn
);

// Create Survey model
surveySchema.plugin(mongoosePaginate);

const Survey = mongoose.model("SurveyBuilder", surveySchema);
module.exports = Survey;
