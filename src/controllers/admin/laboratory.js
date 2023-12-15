import { createLaboratory, getAllLaboratories, getLaboratoryById, updateLaboratory, deleteLaboratory } from '../../services/laboratory'

export const createLaboratoryController = async (req, res, next) => {
    try {
        const laboratoryData = req.body;
        const createdLaboratory = await createLaboratory(laboratoryData);
        res.status(201).json({ success: true, message: "laboratory created successfully", data: createdLaboratory });
    } catch (error) {
        next(error);
    }
}

export const getAllLaboratoryController = async (req, res, next) => {
    try {
        const query = req.query;
        const laboratorys = await getAllLaboratories.getAllLaboratories(query);
        res.status(200).json({ success: true, data: laboratorys });
    } catch (error) {
        next(error);
    }
};

export const getLaboratoryByIdController = async (req, res, next) => {
    try {
        const laboratoryId = req.params.id;
        const laboratory = await getLaboratoryById(laboratoryId);
        res.status(200).json({ success: true, data: laboratory });
    } catch (error) {
        next(error);
    }
};

export const updateLaborotaryController = async (req, res, next) => {
    try {
        const laboratoryId = req.params.id;
        const updateData = req.body;
        const updatedLaboratory = await updateLaboratory(laboratoryId, updatedLaboratory);
        res.status(200).json({ success: true, message: 'Laboratory updated successfully', data: updateData });
    } catch (error) {
        next(error);
    }
};

export const deleteLaboratoryController = async (req, res, next) => {
    try {
        const laboratoryId = req.params.id;
        const deletedLaboratory = await deleteLaboratory(laboratoryId);
        res.status(200).json({ success: true, message: 'Laboratory deleted successfully', data: deletedLaboratory });
    } catch (error) {
        next(error);
    }
};
