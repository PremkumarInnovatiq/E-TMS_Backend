import {
    createProgramClass,
    getProgramClassById,
    getAllProgramClasses,
    updateProgramClass,
    deleteProgramClass,
    getStudentClassDetails
} from '../../../services/program-class/index';
export const createProgramClassController = async (req, res, next) => {
    try {
        const userData=req.user._id;
        const createdClass = await createProgramClass.createProgramClass(req.body,userData);
        res.status(201).json({
            success: true,
            message: "class created successfully",
            data: createdClass
        });
    } catch (error) {
        next(error);
    }
};

export const getProgramClassByIdController = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const foundClass = await getProgramClassById(classId);
        res.status(200).json({ success: true, data: foundClass });
    } catch (error) {
        next(error);
    }
};


// export const getStudentClassByClassId = async (req, res, next) => {
//     try {
//         const classId = req.params.id;
//         const foundClass = await getStudentClassDetails(classId);
//         res.status(200).json({ success: true, data: foundClass });
//     } catch (error) {
//         next(error);
//     }
// };


exports.getAllProgramClassesController = async (req, res) => {
    try {
        const classes = await getAllProgramClasses(req.query);
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProgramClassController = async (req, res, next) => {
    try {
        const userData=req.user._id;
        const classId = req.params.id;
        const updateData = req.body;
        const updatedClass = await updateProgramClass(classId, updateData);
        updatedClass.modifiedBy = userData;
        res.status(200).json({ success: true, message: "class updated successfully", data: updatedClass });
    } catch (error) {
        next(error);
    }
};

export const deleteProgramClassController = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const deletedClass = await deleteProgramClass(classId);
        res.status(200).json({ success: true, message: "class deleted successfully", data: deletedClass });
    } catch (error) {
        next(error);
    }
};

