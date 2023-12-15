const router = require('express').Router();
var instructorController = require('../../controllers/admin/instructor')

router
    .route('/')
    .post(instructorController.createInstructorController)
    .get(instructorController.getAllInstructorsController)

router.route('/name')
    .get(instructorController.getAllInstructorsControllerName)


router
    .route('/:id')
    .get(instructorController.getInstructorByIdController)
    .put(instructorController.updateInstructorController)
    .delete(instructorController.deleteInstructorController);

module.exports = router;