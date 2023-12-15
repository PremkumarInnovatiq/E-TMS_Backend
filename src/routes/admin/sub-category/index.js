const router = require('express').Router();
var subController = require('../../../controllers/admin/sub-category/index');


router.route('/')
    .get(subController.getAllSubCategories)
    .post(subController.createSubCategory)

router.route('/:id')
    .put(subController.updateSubCategoryById)
    .delete(subController.deleteSubCategoryById);

router.route('/main-category')
    .get(subController.getSubCategoryById)

module.exports = router;
