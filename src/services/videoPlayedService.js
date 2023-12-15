import { getQueryParams } from "../utilities/helpers";
import VideoPlayed from "../models/video-played";
const mongoose = require('mongoose');


exports.videoPlayedPostServices = {
    async saveRequest(requestData, userData) {
        try {
            requestData.modifiedBy = userData;
            return await VideoPlayed.create(requestData);
        } catch (e) {
            throw e;
        }
    },
};

exports.videoPlayedGetServices = {
    // async getLeaveByStudentId(id, queryParams) {
    //     if(queryParams.isAll){
    //         const leave = await Leaves.find({studentId: mongoose.Types.ObjectId(id),status:queryParams.status})
    //         return leave;
    //     } else {
    //     try {
    //         const params = getQueryParams(queryParams, null, true);
    //         const query = { studentId: mongoose.Types.ObjectId(id) };
    //         const leaves = await Leaves.paginate(query, {
    //             page: params.page,
    //             limit: params.limit,
    //             sort: params.sortBy,
                
    //         })
    //         return leaves;
    //     } catch (error) {
    //         console.log('eror',error)
    //         throw error;
    //     }
    // }
    // },
    // async getLeaveByInstructorId(id, queryParams) {
    //     console.log("====",id)
    //     try {
    //         const params = getQueryParams(queryParams, null, true);
    //         const query = { instructorId: mongoose.Types.ObjectId(id) };
    //         const populateQuery = [{ path: 'studentId' }];
    //         const leaves = await Leaves.paginate(query, {
    //             page: params.page,
    //             limit: params.limit,
    //             sort: params.sortBy,
    //             populate: populateQuery
    //         })
    //         return leaves;
    //     } catch (error) {
    //         console.log('eror',error)
    //         throw error;
    //     }
    // },

    async getVideoPlayedById(studentId, classId,videoId) {
        try {
            const videoPlayed = await VideoPlayed.findOne({ studentId, classId,videoId });
            return videoPlayed;
        } catch (error) {
            throw error;
        }
    }
    };





