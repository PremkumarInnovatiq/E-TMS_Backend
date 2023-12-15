import mongoose from "mongoose";
import { MongoSchemaAddOn } from "../../utilities/mongoCommonCollection";

const mongoosePaginate = require("mongoose-paginate-v2");

// Create certificate schema
const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    organizationName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true

    },
    lastName: {
      type: String,

    },
    issuedDate: {
      type: Date,
      required: true
    },
    signature: {
      type: String,
    },
    courseName:{
      type:String,
      required: true
    },
    courseCode:{
      type:String,
    },
    name: {
      type: String,
    },
    course: {
      type: String,
    },
    passStatus: {
      type: String,
    },
    image: {
      type: String,
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    isDeleted: { type: Boolean, default: false }
  },
  MongoSchemaAddOn
);

// Create certificate model
certificateSchema.plugin(mongoosePaginate);

const certificate = mongoose.model("CertificateBuilder", certificateSchema);
module.exports = certificate;
