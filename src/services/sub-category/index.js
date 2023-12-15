import SubCategory from '../../models/sub-category/index'
import { getQueryParams } from '../../utilities/helpers';


exports.subPostServices = {
    async createSubCategory(requestData) {
        try {
            return await SubCategory.create(requestData);
        } catch (e) {
            throw e;
        }
    },
};


exports.subGetServices = {
    async getAllSubCategories(query) {
        const params = getQueryParams(query, null, true);
        return await SubCategory.paginate(params.filter, {
            page: params.page,
            limit: params.limit,
            sort: params.sortBy
        });
    },

    async getSubCategoryById(mainCategoryId) {
        const filter = {
            main_category_id: mainCategoryId
        }

        return await SubCategory.find(filter).populate('main_category_id');
    },
};

exports.subPutServices = {
    async updateSubCategoryById(id, requestData) {
        try {
            console.log("=====",id+"======",requestData)
            
            for (const item of requestData) {
                if(item.sub_id){
                const updatedItem = await SubCategory.findByIdAndUpdate(item.sub_id, { category_name: item.category_name });
                }else{
                 const createItem=   await SubCategory.create(item);

                }
              }
              let res={
                sucess:"All are updated Succesfully"
              }
            
        return res;
            
        } catch (e) {
            throw e;
        }
    },
};

exports.subDeleteServices = {
    async deleteSubCategoryById(id) {
        try {
            return await SubCategory.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    },
};
