const router = require('express').Router();
var surveyController = require('../../controllers/admin/survey');

router.route('/')
    .post(surveyController.createSurveyController)
    .get(surveyController.getAllSurveysController)

router.route('/:id')
    .get(surveyController.getSurveyByIdController)
    .put(surveyController.updateSurveyController)
    .delete(surveyController.deleteSurveyController)

router.route('/course/:courseId/average-rating')
    .get(surveyController.calculateCourseRating);

router.route('/instructor/:instructorId/average-rating')
    .get(surveyController.calculateInstructorRating);

router.route('/course/:courseId/ratings')
    .get(surveyController.getCourseRatingDetailsController);

router.route('/instructor/:instructorId/ratings')
    .get(surveyController.getInstructorRatingDetailsController);

router.route('/course/:courseId/:filterReviews/getCourseUserReviews')
    .get(surveyController.getCourseReviewsController)

router.route('/course/getInstructorUserReviews')
    .get(surveyController.getInstructorReviewsController)

router.route('/course/getTotalResponses')
    .get(surveyController.getTotalResponseCount)

router.route('/responses/:courseId')
    .get(surveyController.getAllSurveyResponses)


module.exports = router;