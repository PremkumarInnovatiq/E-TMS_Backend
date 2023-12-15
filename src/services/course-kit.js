import CourseKit from "../models/course-kit";
import ProgramCourseKit from "../models/course-Program";
import { getQueryParams } from '../utilities/helpers';


export const createCourseKit = async (courseKitData, userData) => {
    try {
        courseKitData.modifiedBy = userData;
        const courseKit = await CourseKit.create(courseKitData);
        return courseKit;
    } catch (error) {
        throw new Error('Failed to create Course Kit');
    }
};

export const createProgramCourseKit = async (courseKitData, userData) => {
    try {
        courseKitData.modifiedBy = userData;
        const courseKit = await ProgramCourseKit.create(courseKitData);
        return courseKit;
    } catch (error) {
        throw new Error('Failed to create Course Kit');
    }
};

exports.getAllCourseKits = {
    async getAllCourseKits(query) {
        const params = getQueryParams(query, null, true);
        return await CourseKit.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy, populate: 'videoLink' });
    }

}
exports.getAllProgramCourseKits = {
    async getAllProgramCourseKits(query) {
        const params = getQueryParams(query, null, true);
        return await ProgramCourseKit.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy, populate: 'videoLink' });
    }

}


export const getCourseKitById = async (id) => {
    try {
        const courseKit = await CourseKit.findById(id).populate('videoLink')
        return courseKit;
    } catch (error) {
        throw new Error('Failed to fetch Course Kit');
    }
};
export const getCourseProgramKitById = async (id) => {
    try {
        const courseKit = await ProgramCourseKit.findById(id).populate('videoLink')
        return courseKit;
    } catch (error) {
        throw new Error('Failed to fetch Course Kit');
    }
};

export const updateCourseKitById = async (id, courseKitData, userData) => {
    try {
        courseKitData.modifiedBy = userData
        const courseKit = await CourseKit.findByIdAndUpdate(id, courseKitData, { new: true });
        return courseKit;
    } catch (error) {
        throw new Error('Failed to update Course Kit');
    }
};
export const updateProgramCourseKitById
= async (id, courseKitData, userData) => {
    try {
        courseKitData.modifiedBy = userData
        const courseKit = await ProgramCourseKit.findByIdAndUpdate(id, courseKitData, { new: true });
        return courseKit;
    } catch (error) {
        throw new Error('Failed to update Course Kit');
    }
};

export const deleteProgramCourseKitById = async (id) => {
    try {
        await ProgramCourseKit.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Failed to delete Course Kit');
    }
};

export const deleteCourseKitById = async (id) => {
    try {
        await CourseKit.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Failed to delete Course Kit');
    }
};
