import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';


const Staff = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
        type: String,
        required: true,
      },
    gender: {
        type: String,
        required: true,
      },
    designation: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: false,
    },
    password: {
        type: String,
        required: true,
      },
      conformPassword: {
        type: String,
        required: true,
      },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    
    joiningDate: {
      type: Date,
    },
      dob: {
        type: String,
        required: true,
      },
      education: {
        type: String,
      },
 
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
   
    collectionName: { type: String, default: 'staffs' },
    modifiedBy: { type: String }
  },
  MongoSchemaAddOn
);
// Staff.plugin(mongoosePaginate);

module.exports = mongoose.model('staffs', Staff);
