import { mainPostServices, mainGetServices, mainPutServices, mainDeleteServices, getAllMainCategoriesAll } from '../../../services/main-category/index';
import MainCategory from '../../../models/main-category/index'


const createMainCategory = async (req, res, next) => {
    try {
        const mainCategory = await mainPostServices.createMainCategory(req.body);
        res.status(200).json({
            status: "success",
            message: "Main category created successfully",
            data: mainCategory
        });
    } catch (err) {
        next(err);
    }
};

const getAllMainCategories = async (req, res, next) => {
    try {
        const categories = await getAllMainCategoriesAll(req.query);
        res.status(200).json({
            status: "success",
            message: "categories fetched successfully",
            data: categories
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};




const getMainCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mainCategory = await mainGetServices.getMainCategoryById(id);
        console.log("===",mainCategory)
        res.status(200).json(mainCategory);
    } catch (err) {
        next(err);
    }
};

const updateMainCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedMainCategory = await mainPutServices.updateMainCategoryById(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Main category updated successfully",
            data: updatedMainCategory
        });
    } catch (err) {
        next(err);
    }
};

const deleteMainCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedMainCategory = await mainDeleteServices.deleteMainCategoryById(id);
        res.status(200).json({
            status: "success",
            message: "Main category deleted successfully",
            data: deletedMainCategory
        });
    } catch (err) {
        next(err);
    }
};

export { createMainCategory, getMainCategoryById, getAllMainCategories, updateMainCategoryById, deleteMainCategoryById }