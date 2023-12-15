const router = require("express").Router();
var departmentController = require("../../controllers/admin/departmentController");
router
  .route("/")
  .get(departmentController.get)
  .post( departmentController.create);

// router.route("/title").get(courseController.getCourses);
router
  .route("/:id")
  .get(departmentController.getDepartmentById)
  .put( departmentController.updateDepartmentById)
  .delete(departmentController.deleteDepartmentById);

module.exports = router;
