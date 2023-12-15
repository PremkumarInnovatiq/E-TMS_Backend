import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';

const userTypeSchema = new mongoose.Schema(
  {
    typeName: {
      type: String,
    },
    userType:{
      type: String
    },
    description: {
      type: String,
    },
    menuItems: {
      type: Array,
      default:[],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  MongoSchemaAddOn
);

userTypeSchema.plugin(mongoosePaginate);

const UserType = mongoose.model("UserType", userTypeSchema);

export default UserType;
