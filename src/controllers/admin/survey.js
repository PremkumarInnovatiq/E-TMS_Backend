
import {
    createSurvey,
    getAllSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey,
    calculateAverageCourseRating,
    calculateAverageInstructorRating,
    getCourseRatingDetails,
    getInstructorRatingDetails,
    getCourseReviews,
    getInstuctorReviews,
    getTotalResponseCountByCourseId,
    getAllResponses
} from '../../services/survey';

export const createSurveyController = async (req, res, next) => {
    try {
        const surveyData = req.body;
        const createdSurvey = await createSurvey(surveyData);
        res.status(201).json({ success: true, message: "survey created successfully", data: createdSurvey });
    } catch (error) {
        next(error);
    }
};


export const getAllSurveysController = async (req, res, next) => {
    try {
        const query = req.query;
        const surveys = await getAllSurveys.getAllSurveys(query);
        res.status(200).json({ success: true, data: surveys });
    } catch (error) {
        next(error);
    }
};

export const getSurveyByIdController = async (req, res, next) => {
    try {
        const surveyId = req.params.id;
        const survey = await getSurveyById(surveyId);
        res.status(200).json({ success: true, data: survey });
    } catch (error) {
        next(error);
    }
};

export const updateSurveyController = async (req, res, next) => {
    try {
        const surveyId = req.params.id;
        const updateData = req.body;
        const updatedSurvey = await updateSurvey(surveyId, updateData);
        res.status(200).json({ success: true, message: 'Survey updated successfully', data: updatedSurvey });
    } catch (error) {
        next(error);
    }
};

export const deleteSurveyController = async (req, res, next) => {
    try {
        const surveyId = req.params.id;
        const deletedSurvey = await deleteSurvey(surveyId);
        res.status(200).json({ success: true, message: 'Survey deleted successfully', data: deletedSurvey });
    } catch (error) {
        next(error);
    }
};

export async function calculateCourseRating(req, res) {
    const { courseId } = req.params;

    try {
        const result = await calculateAverageCourseRating(courseId);
        const averageRating = result.averageRating;
        const numberOfRatings = result.numberOfRatings;
        res.json({
            success: true,
            averageRating: averageRating,
            numberOfRatings: numberOfRatings,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate the average course rating.' });
    }
}

export async function calculateInstructorRating(req, res) {
    const { instructorId } = req.params;

    try {
        const averageRating = await calculateAverageInstructorRating(instructorId);
        res.json({
            success: true,
            averagerating: averageRating
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate the average instructor rating.' });
    }
}

export async function getCourseRatingDetailsController(req, res) {
    const { courseId } = req.params;
    // console.log(req.params);
    try {
        const ratings = await getCourseRatingDetails(courseId);
        res.json({ ratings });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get course rating details' });
    }
}


export async function getCourseReviewsController(req, res) {
    const { courseId, filterReviews } = req.params;
    console.log(req.params);
    try {
        const data = await getCourseReviews(courseId, filterReviews);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get course reviews' });
    }
}

export async function getInstructorReviewsController(req, res) {
    const { instructorId, filterReviews } = req.query;
    try {
        const data = await getInstuctorReviews(instructorId, filterReviews);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get course reviews' });
    }
}


export async function getInstructorRatingDetailsController(req, res) {
    const { instructorId } = req.params;
    try {
        const ratings = await getInstructorRatingDetails(instructorId);
        res.json({ ratings });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get instructor rating details' });
    }
}


export async function getTotalResponseCount(req, res) {
    const query = req.query;
    try {
        const responseCounts = await getTotalResponseCountByCourseId(query);
        res.json({
            success: true,
            data: responseCounts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllSurveyResponses = async (req, res) => {
    try {
        const { courseId } = req.params;
        const response = await getAllResponses(courseId);
        res.json(response);
    } catch (error) {
        console.error(error, 'err fun');
        res.status(500).json({ message: 'Internal server error' });
    }
};
