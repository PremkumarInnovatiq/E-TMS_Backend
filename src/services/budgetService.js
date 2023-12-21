import { getQueryParams } from "../utilities/helpers";
import Budgets from "../models/budget";
const mongoose = require('mongoose');


exports.budgetPostServices = {
    async saveRequest(requestData, userData) {
        try {
            requestData.modifiedBy = userData;
            return await Budgets.create(requestData);
        } catch (e) {
            throw e;
        }
    },
};

exports.budgetGetServices = {
    async getAll(query) {
        const params = getQueryParams(query, null, true);
        return await Budgets.paginate(params.filter, {
            page: params.page,
            limit: params.limit,
            sort: params.sortBy,
        });
    },
    async getBudgetById(id) {
        try {
            const budget = await Budgets.findById(id)
            return budget;
        } catch (error) {
            throw error;
        }
    }
};


exports.budgetPutServices = {
    async updateBudgetById(id, requestData, userData, budgetDetails) {
        try {
            requestData.modifiedBy = userData;
            requestData.title = budgetDetails;
            return await Budgets.findByIdAndUpdate(id, requestData, { new: true });
        } catch (e) {
            throw e;
        }
    },
};

exports.budgetDeleteServices = {
    async deleteBudgetById(id) {
        try {
            return await Budgets.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    },
};


