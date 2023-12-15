const router = require('express').Router();
var fundingGrantController = require('../../controllers/admin/funding-grant')

router
    .route('/')
    .post(fundingGrantController.createFundingGrantController)
    .get(fundingGrantController.getAllFundingGrantsController)


router
    .route('/:id')
    .get(fundingGrantController.getFundingGrantByIdController)
    .put(fundingGrantController.updateFundingGrantController)
    .delete(fundingGrantController.deleteFundingGrantController);

module.exports = router;