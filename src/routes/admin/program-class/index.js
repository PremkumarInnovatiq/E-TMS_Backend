const router = require('express').Router();
var programClassController = require('../../../controllers/admin/program-class/index');
var classController = require('../../../controllers/admin/class/index');

router.route('/')
    .post(programClassController.createProgramClassController)
    .get(programClassController.getAllProgramClassesController)

router.route('/:id')
    .get(programClassController.getProgramClassByIdController)
    .put(programClassController.updateProgramClassController)
    .delete(programClassController.deleteProgramClassController)

router.route('/instructor/:instructorId/check-available')
    .get(classController.checkAvailableInstructorController)

router.route('/lab/:laboratoryId/check-available')
    .get(classController.checkAvailableLaboratoryController)

router.route('/getStudentDetails/:id')
    .get(classController.getStudentClassByClassId)    


module.exports = router;