const router = require("express").Router();
var videoPlayedController = require("../../controllers/admin/videoPlayedController");
router
  .route("/")
  .post( videoPlayedController.create);

router
  .route("/:studentId/:classId/:videoId")
  .get(videoPlayedController.getVideoPlayedById)





module.exports = router;
