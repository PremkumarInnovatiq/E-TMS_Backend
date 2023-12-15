import { createInstructor, getInstructorById, getAllInstructors, updateInstructor, deleteInstructor, getAllInstructorsName } from '../../services/instructor';

export const createInstructorController = async (req, res, next) => {
    try {
        const { user_id, linkedin, about, experience, website } = req.body;
        const instructorData = { user_id, linkedin, about, experience, website };
        const newInstructor = await createInstructor(instructorData);
        res.status(201).json({
            status: 'success',
            message: 'Instructor created successfully',
            data: newInstructor,
        });
    } catch (error) {
        next(error);
    }
};

export const getInstructorByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const instructor = await getInstructorById(id);

        if (!instructor) {
            const error = new Error(`Instructor with id ${id} not found`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            status: 'success',
            message: 'Instructor fetched successfully',
            data: instructor,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllInstructorsController = async (req, res, next) => {
    try {
        const query = req.query;
        const classes = await getAllInstructors.getAllInstructors(query);
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        next(error);
    }
};

export const getAllInstructorsControllerName = async (req, res, next) => {
    try {
        const instructors = await getAllInstructorsName();
        res.status(200).json({
            status: 'success',
            message: 'Instructors fetched successfully',
            data: instructors
        });
    } catch (error) {
        next(error);
    }
};

export const updateInstructorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id, linkedin, about, experience, website } = req.body;
        const instructorData = { user_id, linkedin, about, experience, website };
        const updatedInstructor = await updateInstructor(id, instructorData);
        res.status(200).json({
            status: 'success',
            message: 'Instructor updated successfully',
            data: updatedInstructor,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteInstructorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedInstructor = await deleteInstructor(id);
        res.status(200).json({
            status: 'success',
            message: 'Instructor deleted successfully',
            data: deletedInstructor,
        });
    } catch (error) {
        next(error);
    }
};
