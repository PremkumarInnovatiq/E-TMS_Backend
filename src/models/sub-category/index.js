import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';


const subCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
    main_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'main_category',
        required: true,
    }
}, MongoSchemaAddOn);

subCategorySchema.plugin(mongoosePaginate);

// export default mongoose.model('sub_category', subCategorySchema);
const SubCategory = mongoose.model('sub_category', subCategorySchema);

module.exports = SubCategory;

