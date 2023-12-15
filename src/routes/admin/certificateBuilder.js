const router = require("express").Router();
const certificateBuilderController = require("../../controllers/admin/certificateBuilderController");

router.route('/certificatesList').get(certificateBuilderController.certificateList);

router
  .route("/")
  .post(certificateBuilderController.createCertificateBuilder)
  .get(certificateBuilderController.getAllCertificates);

router
  .route("/:id")
  .get(certificateBuilderController.getCertificateById)
  .put(certificateBuilderController.updateCertificate)
  .delete(certificateBuilderController.deleteCertificate);



module.exports = router;
