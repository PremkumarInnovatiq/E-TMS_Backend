const router = require('express').Router();
var courseProgramController = require('../../controllers/admin/courseProgramController');

router
    .route('/')
    .get(courseProgramController.getAllProgramCourse)
    .post(courseProgramController.createCourseProgramController)

router
    .route('/:id')
    .get(courseProgramController.getProgramByIdController)
    .put(courseProgramController.updateCourseProgramByIdController)
    .delete(courseProgramController.deleteProgramById);


module.exports = router;