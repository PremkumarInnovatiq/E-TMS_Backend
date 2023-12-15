import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const menuItemsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['admin', 'student'],
        required: true,
        unique: true
    },
    menu_items: {
        type: [String],
        required: true
    }
}, MongoSchemaAddOn);

menuItemsSchema.plugin(mongoosePaginate);

const MenuItems = mongoose.model('menuItems', menuItemsSchema);

module.exports = MenuItems;
