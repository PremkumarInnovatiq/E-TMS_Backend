const router = require('express').Router();
var courseKitController = require('../../controllers/admin/course-kit')

router
    .route('/')
    .post(courseKitController.createCourseKitController)
    .get(courseKitController.getAllCourseKitsController)
router.route('/CreateProgramCourseKit').post(courseKitController.createProgramCourse)
router.route('/ListProgramCourseKit').get(courseKitController.geAllProgramCourseList)
router.route('/ListProgramCourseKit/:id').get(courseKitController.getProgramCourseKitByIdController)
router.route('/updateProgramCourseKit/:id').put(courseKitController.updateProgramCourseKitByIdController)
router.route('/deletedProgramCourseKit/:id').delete(courseKitController.deleteProgramCourseKitByIdController)

router
    .route('/:id')
    .get(courseKitController.getCourseKitByIdController)
    .put(courseKitController.updateCourseKitByIdController)
    .delete(courseKitController.deleteCourseKitByIdController);

module.exports = router;