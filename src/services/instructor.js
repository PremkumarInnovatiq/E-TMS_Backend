import Instructor from '../models/instructor';
import { getQueryParams } from '../utilities/helpers';


export const createInstructor = async (instructorData) => {
    try {
        const instructor = new Instructor(instructorData);
        const newInstructor = await instructor.save();
        return newInstructor;
    } catch (error) {
        throw new Error(`Could not create instructor: ${error.message}`);
    }
};

exports.getAllInstructors = {
    async getAllInstructors(query) {
        const params = getQueryParams(query, null, true);
        return await Instructor.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy, populate: 'user_id' });
    }

}

export const getAllInstructorsName = async () => {
    try {
        const instructors = await Instructor.find().select('id').populate('user_id', 'name last_name id');
        return instructors.map(instructor => ({
            
            instructor_id: instructor.id,
            user_id: instructor.user_id,
            user_id: {
                name: instructor.user_id.name,
                last_name: instructor.user_id.last_name,
                user_id: instructor.user_id.id
            }
        }));
    } catch (error) {
        throw new Error(`Could not get instructors: ${error.message}`);
    }
};


export const getInstructorById = async (instructorId) => {
    try {
        const instructor = await Instructor.findById(instructorId).populate('user_id');
        if (!instructor) {
            throw new Error(`Instructor with id ${instructorId} not found`);
        }
        return instructor;
    } catch (error) {
        throw new Error(`Could not get instructor: ${error.message}`);
    }
};

export const updateInstructor = async (instructorId, instructorData) => {
    try {
        const instructor = await Instructor.findByIdAndUpdate(
            instructorId,
            instructorData,
            { new: true }
        ).populate('user_id');
        if (!instructor) {
            throw new Error(`Instructor with id ${instructorId} not found`);
        }
        return instructor;
    } catch (error) {
        throw new Error(`Could not update instructor: ${error.message}`);
    }
};

export const deleteInstructor = async (instructorId) => {
    try {
        const instructor = await Instructor.findByIdAndDelete(instructorId);
        if (!instructor) {
            throw new Error(`Instructor with id ${instructorId} not found`);
        }
        return instructor;
    } catch (error) {
        throw new Error(`Could not delete instructor: ${error.message}`);
    }
};

