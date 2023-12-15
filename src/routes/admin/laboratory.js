const router = require('express').Router();
var laboratoryController = require('../../controllers/admin/laboratory');

router.route('/')
    .post(laboratoryController.createLaboratoryController)
    .get(laboratoryController.getAllLaboratoryController)

router.route('/:id')
    .get(laboratoryController.getLaboratoryByIdController)
    .put(laboratoryController.updateLaborotaryController)
    .delete(laboratoryController.deleteLaboratoryController)

module.exports = router;