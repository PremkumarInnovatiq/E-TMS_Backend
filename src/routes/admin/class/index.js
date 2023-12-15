const router = require('express').Router();
var classController = require('../../../controllers/admin/class/index');

router.route('/')
    .post(classController.createClassController)
    .get(classController.getAllClassesController)

router.route('/:id')
    .get(classController.getClassByIdController)
    .put(classController.updateClassController)
    .delete(classController.deleteClassController)

router.route('/class/:course_id')
    .get(classController.getClassByCourseIdController)


router.route('/instructor/:instructorId/check-available')
    .get(classController.checkAvailableInstructorController)

router.route('/lab/:laboratoryId/check-available')
    .get(classController.checkAvailableLaboratoryController)

router.route('/getStudentDetails/:id')
    .get(classController.getStudentClassByClassId)
    
router.route('/updateSession')
    .post(classController.updateSession)
    router.route('/updateProgramSession')
    .post(classController.updateProgramSession)
router.route('/getSession/:id')
    .get(classController.getSession)
router.route('/getProgramSession/:id')
    .get(classController.getProgramSession)


module.exports = router;