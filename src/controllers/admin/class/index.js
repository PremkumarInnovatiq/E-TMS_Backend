import {
    createClass,
    getClassById,
    getAllClasses,
    getClassByCourseId,
    updateClass,
    deleteClass,
    getStudentClassDetails,
    checkAvailableInstructor,
    checkAvailableLaboratory,
    updateSession,
    updateProgramSession,
    getSession,
    getProgramSession
} from '../../../services/class/index';
export const createClassController = async (req, res, next) => {
    try {
        const userData=req.user._id;
        //if(req.body.sessions)
        const createdClass = await createClass.createClass(req.body,userData);
        res.status(201).json({
            success: true,
            message: "class created successfully",
            data: createdClass
        });
    } catch (error) {
        next(error);
    }
};

export const getClassByIdController = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const foundClass = await getClassById(classId);
        res.status(200).json({ success: true, data: foundClass });
    } catch (error) {
        next(error);
    }
};


export const getStudentClassByClassId = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const foundClass = await getStudentClassDetails(classId);
        res.status(200).json({ success: true, data: foundClass });
    } catch (error) {
        next(error);
    }
};


exports.getAllClassesController = async (req, res) => {
    try {
        const classes = await getAllClasses(req,req.query);
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getClassByCourseIdController = async (req, res, next) => {
    try {
        console.log('req',req)
        const courseId = req.params.course_id;
        const foundClass = await getClassByCourseId(courseId);
        res.status(200).json({ success: true, data: foundClass });
    } catch (error) {
        next(error);
    }
};

exports.updateSession = async (req, res) => {
    try {
        const classes = await updateSession(req,req.body);
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateProgramSession = async (req, res) => {
    try {
        const classes = await updateProgramSession(req,req.body);
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSession = async (req, res) => {
    console.log(req.params)
    try {
        const classes = await getSession(req, req.query);
        res.status(200).json({ success: true, data: classes.docs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getProgramSession = async (req, res) => {
    console.log(req.params)
    try {
        const classes = await getProgramSession(req, req.query);
        res.status(200).json({ success: true, data: classes.docs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateClassController = async (req, res, next) => {
    try {
        const userData=req.user._id;
        const classId = req.params.id;
        const updateData = req.body;
        const updatedClass = await updateClass(classId, updateData);
        updatedClass.modifiedBy = userData;
        res.status(200).json({ success: true, message: "class updated successfully", data: updatedClass });
    } catch (error) {
        next(error);
    }
};

export const deleteClassController = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const deletedClass = await deleteClass(classId);
        res.status(200).json({ success: true, message: "class deleted successfully", data: deletedClass });
    } catch (error) {
        next(error);
    }
};

export const checkAvailableInstructorController = async (req, res, next) => {
    try {
        const instructorId = req.params.instructorId;
        const { sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime } = req.query;
        if (!sessionStartDate || !sessionStartTime || !sessionEndDate || !sessionEndTime) {
            throw new Error('Please provide sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime.')
        }
        const classes = await checkAvailableInstructor(instructorId, sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime)
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        next(error);
    }
}

export const checkAvailableLaboratoryController = async (req, res, next) => {
    try {
        const laboratoryId = req.params.laboratoryId;
        const { sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime } = req.query;
        if (!sessionStartDate || !sessionStartTime || !sessionEndDate || !sessionEndTime) {
            throw new Error('Please provide sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime.')
        }
        const classes = await checkAvailableLaboratory(laboratoryId, sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime)
        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        next(error);
    }
}