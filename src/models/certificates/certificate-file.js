import mongoose from "mongoose";
import { MongoSchemaAddOn } from "../../utilities/mongoCommonCollection";

const mongoosePaginate = require("mongoose-paginate-v2");

// Create certificate schema
const certificateFileSchema = new mongoose.Schema(
  {
filename: {
    type: String,
},
url: {
    type: String
},
jobId: {
    type: String
},
status: {
    type: String,
},
createdAt: {
    type: Date,
    default: Date.now
},
inputUrl: {
    type: String
},

}, MongoSchemaAddOn);

// Create certificate model
certificateFileSchema.plugin(mongoosePaginate);

const certificateFile = mongoose.model("CertificateFile", certificateFileSchema);
module.exports = certificateFile;
