const router = require('express').Router();
var mainController = require('../../../controllers/admin/main-category/index');


router
    .route('/')
    .get(mainController.getAllMainCategories)
    .post(mainController.createMainCategory)

router
    .route('/:id')
    .get(mainController.getMainCategoryById)
    .delete(mainController.deleteMainCategoryById)
    .put(mainController.updateMainCategoryById);


module.exports = router;
