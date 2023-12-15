import Laboratory from '../models/laboratory';
import { getQueryParams } from '../utilities/helpers';

exports.createLaboratory = async (data) => {
    try {
        const laboratory = new Laboratory(data);
        const savedLaboratory = await laboratory.save();
        return savedLaboratory;
    } catch (error) {
        console.error('Error occurred while creating laboratory:', error);
        throw error;
    }
}

exports.getAllLaboratories = {
    async getAllLaboratories(query) {
        const params = getQueryParams(query, null, true)
        return await Laboratory.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });

    }
};

exports.getLaboratoryById = async (id) => {
    try {
        const laboratory = await Laboratory.findById(id);
        return laboratory;
    } catch (error) {
        console.error(`Error occurred while fetching laboratory with ID ${id}:`, error);
        throw error;
    }
}



exports.updateLaboratory = async (id, data) => {
    try {
        const updatedLaboratory = await Laboratory.findByIdAndUpdate(id, data, { new: true });
        return updatedLaboratory;
    } catch (error) {
        console.error(`Error occurred while updating laboratory with ID ${id}:`, error);
        throw error;
    }
}

exports.deleteLaboratory = async (id) => {
    try {
        await Laboratory.findByIdAndRemove(id);
        return { success: true };
    } catch (error) {
        console.error(`Error occurred while deleting laboratory with ID ${id}:`, error);
        throw error;
    }
}


