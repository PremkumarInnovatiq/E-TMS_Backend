const router = require("express").Router();
var themeController = require("../../controllers/admin/themeController");
router
  .route("/")
  .post( themeController.create);

  router
  .route("/:id")
  .get(themeController.getThemeByUserId)
  .put( themeController.updateThemeById)




module.exports = router;
