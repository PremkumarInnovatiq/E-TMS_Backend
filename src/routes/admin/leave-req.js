const router = require("express").Router();
var leaveController = require("../../controllers/admin/leaveController");
router
  .route("/")
  .get(leaveController.get)
  .post( leaveController.create);

router
  .route("/:id")
  .get(leaveController.getLeaveById)
  .put( leaveController.updateLeaveById)
  .delete(leaveController.deleteLeaveById);

router.route("/instructorList/:id").get(leaveController.getLeaveByInstructorId)

router
  .route("/:id/:studentId")
  .get(leaveController.getLeaveByStudentId)




module.exports = router;
