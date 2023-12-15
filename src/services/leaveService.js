import { getQueryParams } from "../utilities/helpers";
import Leaves from "../models/leave-req";
const mongoose = require('mongoose');


exports.leavePostServices = {
    async saveRequest(requestData, userData) {
        try {
            requestData.modifiedBy = userData;
            return await Leaves.create(requestData);
        } catch (e) {
            throw e;
        }
    },
};

exports.leaveGetServices = {
    async getAll(query) {
        const params = getQueryParams(query, null, true);
        return await Leaves.paginate(params.filter, {
            page: params.page,
            limit: params.limit,
            sort: params.sortBy,
        });
    },
    async getLeaveByStudentId(id, queryParams) {
        if(queryParams.isAll){
            const leave = await Leaves.find({studentId: mongoose.Types.ObjectId(id),status:queryParams.status})
            return leave;
        } else {
        try {
            const params = getQueryParams(queryParams, null, true);
            const query = { studentId: mongoose.Types.ObjectId(id) };
            const leaves = await Leaves.paginate(query, {
                page: params.page,
                limit: params.limit,
                sort: params.sortBy,
                
            })
            return leaves;
        } catch (error) {
            console.log('eror',error)
            throw error;
        }
    }
    },
    async getLeaveByInstructorId(id, queryParams) {
        console.log("====",id)
        try {
            const params = getQueryParams(queryParams, null, true);
            const query = { instructorId: mongoose.Types.ObjectId(id) };
            const populateQuery = [{ path: 'studentId' }];
            const leaves = await Leaves.paginate(query, {
                page: params.page,
                limit: params.limit,
                sort: params.sortBy,
                populate: populateQuery
            })
            return leaves;
        } catch (error) {
            console.log('eror',error)
            throw error;
        }
    },

    async getLeaveById(id) {
        try {
            const leave = await Leaves.findById(id)
            return leave;
        } catch (error) {
            throw error;
        }
    }
};


exports.leavePutServices = {
    async updateLeaveById(id, requestData, userData, leaveDetails) {
        try {
            requestData.modifiedBy = userData;
            requestData.title = leaveDetails;
            return await Leaves.findByIdAndUpdate(id, requestData, { new: true });
        } catch (e) {
            throw e;
        }
    },
};

exports.leaveDeleteServices = {
    async deleteLeaveById(id) {
        try {
            return await Leaves.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    },
};


