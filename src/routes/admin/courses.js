const router = require('express').Router();
var courseController = require('../../controllers/admin/courseController');
import { validateCourseList } from '../../middleware/validators/userValidations';
router.route('/')
    .get(courseController.index)
    .post(validateCourseList,courseController.new)

router.route('/:id')
    .get(courseController.view)
    .put(validateCourseList,courseController.edit)
    .delete(courseController.delete)

module.exports = router;