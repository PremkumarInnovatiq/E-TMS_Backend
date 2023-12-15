const router = require('express').Router();
var projectController = require('../../controllers/admin/projectsController');
const studentProjectIdeaController = require('../../controllers/admin/studentProjectIdeaController');
import { validateProject } from '../../middleware/validators/userValidations';
import fileUpload from '../../config/multerLocal';

const requiredFiles = [
    { name: 'week1DurationFile', maxCount: 1 },
    { name: 'week2DurationFile', maxCount: 1 },
    { name: 'week3DurationFile', maxCount: 1 },
    { name: 'week4DurationFile', maxCount: 1 },
    { name: 'week5DurationFile', maxCount: 1 },
    { name: 'week6DurationFile', maxCount: 1 }
]

router.route('/')
    .get(projectController.index)
    .post(projectController.new)

router.route('/files/upload')
    .post(fileUpload('uploads/projects', 'video').fields(requiredFiles), projectController.uploadFiles);

router.route('/studentnewproject').get(projectController.getStudentProject);
router.route('/mentornewproject').get(projectController.getMentorProject);
router.route('/getProjectPaymentData').post(projectController.getProjectPaymentData);

router.route('/studentprojectActivation').post(projectController.UpdateStudentProjectStatus);
router.route('/mentorprojectActivation').post(projectController.UpdateMentorProjectStatus);

router.route('/:id')
    .get(projectController.view)
    .put(projectController.edit)
    .delete(projectController.delete);

router.route('/student-project-idea/list')
    .get(studentProjectIdeaController.getAll);

router.post('/addProjectFeesData', projectController.add_ProjectFeesData);
router.post('/updateProjectFeesData', projectController.updateProjectFeesData);

module.exports = router;