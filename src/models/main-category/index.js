import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';

const mainCategorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            required: true,
        }
    },
    MongoSchemaAddOn
);

mainCategorySchema.plugin(mongoosePaginate);

mainCategorySchema.virtual('subCategories', {
    ref: 'sub_category',
    foreignField: 'main_category_id',
    localField: '_id',
});

const MainCategory = mongoose.model('main_category', mainCategorySchema);

module.exports = MainCategory;
