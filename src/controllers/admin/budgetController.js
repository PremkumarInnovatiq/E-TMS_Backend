import {
    budgetPostServices,
    budgetGetServices,
    budgetPutServices,
    budgetDeleteServices,
  } from "../../services/budgetService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      const budget = await budgetPostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "budget created successfully",
        data: budget,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  export async function get(req, res, next) {
    try {
      const budgets = await budgetGetServices.getAll(req.query);
      res.status(200).json({
        status: "success",
        message: "budgets fetched successfully",
        data: budgets,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  const getBudgetById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const budget = await budgetGetServices.getBudgetById(id);
      res.status(200).json(budget);
    } catch (err) {
      next(err);
    }
  };

  
  const updateBudgetById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const budgetDetails = req.body.budget;
      const { id } = req.params;
      const updatedbudget = await budgetPutServices.updateBudgetById(
        id,
        req.body,
        userData,
        budgetDetails
      );
      res.status(200).json({
        status: "success",
        message: "budget updated successfully",
        data: updatedbudget,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteBudgetById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedbudget = await budgetDeleteServices.deleteBudgetById(id);
      res.status(200).json({
        status: "success",
        message: "budget deleted successfully",
        data: deletedbudget,
      });
    } catch (err) {
      next(err);
    }
  };

 
  
  export {
    create,
    getBudgetById,
    updateBudgetById,
    deleteBudgetById,
  };
  