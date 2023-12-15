import mongoose from 'mongoose';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import mongoosePaginate from 'mongoose-paginate-v2';


const Departments = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    hod: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: false,
    },

    email: {
      type: String,
    },
    departmentStartDate: {
      type: Date,
    },
    studentCapacity: {
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
   
    collectionName: { type: String, default: 'departments' },
    modifiedBy: { type: String }
  },
  MongoSchemaAddOn
);
Departments.plugin(mongoosePaginate);

module.exports = mongoose.model('departments', Departments);
