const router = require("express").Router();
var internalEmailController = require("../../controllers/admin/internalEmailController");
router
  .route("/")
  .post( internalEmailController.create)
  .put( internalEmailController.updateMailById)

  router
  .route("/reply/:id")
  .put( internalEmailController.reply)


router
  .route("/delete")
  .post( internalEmailController.deleteMailsById)


router
  .route("/mail-id/:id")
  .get(internalEmailController.getMailById)
  // .put( internalEmailController.updateMailById)


router
  .route("/mail")
  .get(internalEmailController.get)




module.exports = router;
