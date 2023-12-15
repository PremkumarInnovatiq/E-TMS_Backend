const router = require("express").Router();
var courseController = require("../../../controllers/admin/courses/index.js");
import { validateCourse } from "../../../middleware/validators/userValidations";
router
  .route("/")
  .get(courseController.index)
  .post(validateCourse, courseController.new);

router.route("/count").get(courseController.getCount);
router.route("/title").get(courseController.getCourses);
router.route("/programes").get(courseController.getPrograms);
router.route("/getCourseDetails").get(courseController.getCourseDetails);
router.route("/getCourseDetails/:months?").get(courseController.getFilteredCourseDetails);
router.route("/getCourseSummary").get(courseController.getCourseSummary)
router.route("/getCourseSummary/:year").get(courseController.getFilteredCourseSummary)
router.route("/getFellowshipProgrammes/:year").get(courseController.getFellowshipProgrammes)
router.route("/getFeaturedCourse").get(courseController.getFeaturedCourse)
router.route("/getDiplomaCourses").get(courseController.getDiplomaCourses)

router
  .route("/:id")
  .get(courseController.getCourseById)
  .put(validateCourse, courseController.updateCourseById)
  .delete(courseController.deleteCourseById);

module.exports = router;
