const router = require('express').Router();
var studentClassController = require('../../controllers/admin/studentClasses');

router.route('/')
    .post(studentClassController.createStudentClassController)
    .get(studentClassController.getStudentClassesController)
    
router.route('/registerProgram').post(studentClassController.createStudentProgramController)
router.route('/studentApproveList').get(studentClassController.getStudentApproveList)
router.route('/studentApproveList/:id').put(studentClassController.updateStudentApproveList)
router.route('/students/Fellowship/completed')
    .get(studentClassController.getCompletedFellowShip);



router.route('/:id')
    .get(studentClassController.getStudentClassByIdController)
    .put(studentClassController.updateStudentClassController)
    .delete(studentClassController.deleteStudentClassController)
router.route('/course/:studentId/:courseId')
    .get(studentClassController.getStudentCourseByIdController)

router.route('/:course_id/completed-student-classes')
    .get(studentClassController.getCompletedStudentClassesByCourseId)

router.route('/students/completed')
    .get(studentClassController.getCompletedStudentsController);

router.route('/students/Exams/:id')
    .get(studentClassController.getExamsdata);
router.route('/students/Program/Exams/:id')
    .get(studentClassController.getProgramExamsdata);

router.route('/student/certificate')
    .put(studentClassController.certificate);

router.route('/program/certificate')
    .put(studentClassController.programCertificate)





module.exports = router;