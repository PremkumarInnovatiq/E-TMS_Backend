import MainCategory from '../../models/main-category/index'
import SubCategory from '../../models/sub-category/index'
import { getQueryParams } from '../../utilities/helpers';

exports.mainPostServices = {

    async createMainCategory(requestData) {
        try {
            const newMainCategory = await MainCategory.create(requestData);
            return newMainCategory;
        } catch (e) {
            throw e;
        }
    },
};

exports.mainGetServices = {

    async getMainCategoryById(id) {
        return await MainCategory.findById(id).populate({
            path: 'subCategories',
            select: 'category_name createdAt updatedAt',
        });
    },
};

exports.mainDeleteServices = {
    async deleteMainCategoryById(id) {
        try {
            return await MainCategory.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    },
};
exports.mainPutServices = {
    async updateMainCategoryById(id, requestData) {
        try {
            return await MainCategory.findByIdAndUpdate(id, requestData, { new: true });
        } catch (e) {
            throw e;
        }
    },
};




export const getAllMainCategoriesAll = async (query) => {
    const params = getQueryParams(query, null, true);
    const options = {
        page: params.page,
        limit: params.limit,
        sort: params.sortBy,
    };
    try {
        const mainCategories = await MainCategory.paginate(params.filter, options);
        const populatedMainCategories = await MainCategory.populate(mainCategories.docs, {
            path: 'subCategories',
            select: 'category_name createdAt updatedAt',
        });
        return {
            ...mainCategories,
            docs: populatedMainCategories,
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


