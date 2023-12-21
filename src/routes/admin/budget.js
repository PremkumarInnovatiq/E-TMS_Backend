const router = require("express").Router();
var budgetController = require("../../controllers/admin/budgetController");
router
  .route("/")
  .get(budgetController.get)
  .post( budgetController.create);

router
  .route("/:id")
  .get(budgetController.getBudgetById)
  .put( budgetController.updateBudgetById)
  .delete(budgetController.deleteBudgetById);




module.exports = router;
