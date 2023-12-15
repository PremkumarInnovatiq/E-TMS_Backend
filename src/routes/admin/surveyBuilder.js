const router = require("express").Router();
const surveyBuilderController = require("../../controllers/admin/surveyBuilderController");

router
  .route("/")
  .post(surveyBuilderController.createSurveyBuilder)
  .get(surveyBuilderController.getAllSurveys);

router
  .route("/:id")
  .get(surveyBuilderController.getSurveyById)
  .put(surveyBuilderController.updateSurvey)
  .delete(surveyBuilderController.deleteSurvey);

module.exports = router;
