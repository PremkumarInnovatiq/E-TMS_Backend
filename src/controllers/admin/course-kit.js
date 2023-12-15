import { createCourseKit, getAllCourseKits, getCourseKitById, updateCourseKitById, deleteCourseKitById, createProgramCourseKit,getAllProgramCourseKits,getCourseProgramKitById,updateProgramCourseKitById,deleteProgramCourseKitById } from '../../services/course-kit';

export const createCourseKitController = async (req, res, next) => {
    try {
        const userData = req.user._id;
        const { courseId, name, shortDescription, longDescription, videoLink, documentLink ,sections,startDate,endDate} = req.body;
        const courseKitData = {
            courseId,
            name,
            shortDescription,
            longDescription,
            videoLink,
            documentLink,
            sections,
            startDate,
            endDate
        };
        const courseKit = await createCourseKit(courseKitData, userData);
        res.status(201).json({
            status: 'success',
            message: 'Course Kit created successfully',
            data: courseKit,
        });
    } catch (error) {
        next(error);
    }
};
export const createProgramCourse = async (req, res, next) => {
    try {
        const userData = req.user._id;
        const { courseId, name, shortDescription, longDescription, videoLink, documentLink ,sections,startDate,endDate} = req.body;
        const courseKitData = {
            courseId,
            name,
            shortDescription,
            longDescription,
            videoLink,
            documentLink,
            sections,
            startDate,
            endDate
        };
        const courseKit = await createProgramCourseKit(courseKitData, userData);
        res.status(201).json({
            status: 'success',
            message: 'Programe Course Kit created successfully',
            data: courseKit,
        });
    } catch (error) {
        next(error);
    }
};



export const getAllCourseKitsController = async (req, res, next) => {
    try {
        const query = req.query;

        const courseKits = await getAllCourseKits.getAllCourseKits(query)
        res.status(200).json({
            message: 'Course Kits fetched successfully',
            data: courseKits,
        });
    } catch (error) {
        next(error);
    }
};
export const geAllProgramCourseList = async (req, res, next) => {
    try {
        const query = req.query;

        const courseKits = await getAllProgramCourseKits.getAllProgramCourseKits(query)
        res.status(200).json({
            message: 'Program Kits fetched successfully',
            data: courseKits,
        });
    } catch (error) {
        next(error);
    }
};


export const getCourseKitByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseKit = await getCourseKitById(id);
        if (!courseKit) {
            return res.status(404).json({ message: 'Course Kit not found' });
        }
        res.status(200).json(courseKit);
    } catch (error) {
        next(error);
    }
};
export const getProgramCourseKitByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courseKit = await getCourseProgramKitById(id);
        if (!courseKit) {
            return res.status(404).json({ message: 'Course Kit not found' });
        }
        res.status(200).json(courseKit);
    } catch (error) {
        next(error);
    }
};


export const updateCourseKitByIdController = async (req, res, next) => {
    try {

        const userData = req.user._id;
        const { id } = req.params;
        const { name, shortDescription, longDescription, videoLink, documentLink ,startDate,endDate} = req.body;
        const courseKitData = {
            name,
            shortDescription,
            longDescription,
            videoLink,
            documentLink,
            startDate,
            endDate
        };
        const courseKit = await updateCourseKitById(id, courseKitData, userData);
        if (!courseKit) {
            return res.status(404).json({ message: 'Course Kit not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Course Kit updated successfully',
            data: courseKit,
        });
    } catch (error) {
        next(error);
    }
};
export const updateProgramCourseKitByIdController = async (req, res, next) => {
    try {

        const userData = req.user._id;
        const { id } = req.params;
        const { name, shortDescription, longDescription, videoLink, documentLink ,startDate,endDate} = req.body;
        const courseKitData = {
            name,
            shortDescription,
            longDescription,
            videoLink,
            documentLink,
            startDate,
            endDate
        };
        const courseKit = await updateProgramCourseKitById(id, courseKitData, userData);
        if (!courseKit) {
            return res.status(404).json({ message: 'Course Kit not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Course Kit updated successfully',
            data: courseKit,
        });
    } catch (error) {
        next(error);
    }
};
export const deleteProgramCourseKitByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteProgramCourseKitById(id);
        res.status(200).json({
            status: 'success',
            message: 'Course Kit deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};



export const deleteCourseKitByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteCourseKitById(id);
        res.status(200).json({
            status: 'success',
            message: 'Course Kit deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};


