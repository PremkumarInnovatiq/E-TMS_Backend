const router = require("express").Router();
var staffController = require("../../controllers/admin/staffController");
router
  .route("/")
  .get(staffController.get)
  .post(staffController.create);

// router.route("/title").get(courseController.getCourses);
router
  .route("/:id")
  .get(staffController.getStaffById)
  .put( staffController.updateStaffById)
  .delete(staffController.deleteStaffById);

module.exports = router;
