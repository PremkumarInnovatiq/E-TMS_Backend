const router = require("express").Router();
var examController = require("../../controllers/admin/examSheduleController")
router
  .route("/")
  .get(examController.get)
  .post( examController.create);

router.route("/programExamList").get(examController.getProgramExamList)
router.route("/programExamCreate").post(examController.createProgramExam)
router.route("/programExamUpdate/:id").put(examController.updateProgramExam)
router.route("/programExamDelete/:id").delete(examController.deleteProgramExam)
router.route("/programExamById/:id").get(examController.getProgramExamById)
 // .post( examController.create);


// router.route("/title").get(courseController.getCourses);
router
  .route("/:id")
  .get(examController.getExamById)
  .put( examController.updateExamById)
  .delete(examController.deleteExamById);

module.exports = router;
