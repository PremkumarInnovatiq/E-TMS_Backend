import { subPostServices, subGetServices, subPutServices, subDeleteServices } from '../../../services/sub-category/index';

const createSubCategory = async (req, res, next) => {
    try {
        const subCategory = await subPostServices.createSubCategory(req.body);
        res.status(200).json({
            status: "success",
            message: "Sub category created successfully",
            data: subCategory
        });
    } catch (err) {
        next(err);
    }
};

const getSubCategoryById = async (req, res, next) => {
    try {
        const { mainCategoryId } = req.query;
        const subCategory = await subGetServices.getSubCategoryById(mainCategoryId);
        res.status(200).json(subCategory);
    } catch (err) {
        next(err);
    }
};


const getAllSubCategories = async (req, res, next) => {
    try {
        const categories = await subGetServices.getAllSubCategories(req.query);
        res.status(200).json(categories);
    } catch (e) {
        next(e);
    }
};

const updateSubCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedSubCategory = await subPutServices.updateSubCategoryById(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Sub category updated successfully",
            data: updatedSubCategory
        });
    } catch (err) {
        next(err);
    }
};

const deleteSubCategoryById = async (req, res, next) => {
    try {
        const category = await subDeleteServices.deleteSubCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Sub Category not found' });
        }
        res.status(200).json({ message: 'Sub Category deleted successfully' });
    } catch (e) {
        next(e);
    }
};


export { createSubCategory, getSubCategoryById, getAllSubCategories, updateSubCategoryById, deleteSubCategoryById }