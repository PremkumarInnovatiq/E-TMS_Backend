import {
  createSurvey,
  getAllSurveysBuilt,
  getSurveyBuilderById,
  updateSurveyBuilder,
  deleteSurveyBuilder
} from "../../services/surveyBuilderService";

export const createSurveyBuilder = async (req, res, next) => {
  try {
    const surveyData = req.body;
    const createdSurvey = await createSurvey(surveyData);
    res.status(201).json({
      success: true,
      message: "survey created successfully",
      data: createdSurvey
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSurveys = async (req, res, next) => {
  try {
    const { query } = req;
    const surveys = await getAllSurveysBuilt.getAllSurveysBuilt(query);
    res.status(200).json({ success: true, data: surveys });
  } catch (error) {
    next(error);
  }
};

export const getSurveyById = async (req, res, next) => {
  try {
    const surveyBuilderId = req.params.id;
    const survey = await getSurveyBuilderById(surveyBuilderId);
    res.status(200).json({ success: true, data: survey });
  } catch (error) {
    next(error);
  }
};

export const updateSurvey = async (req, res, next) => {
  try {
    const surveyId = req.params.id;
    const updateData = req.body;
    const updatedSurvey = await updateSurveyBuilder(surveyId, updateData);
    res.status(200).json({
      success: true,
      message: "Survey updated successfully",
      data: updatedSurvey
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSurvey = async (req, res, next) => {
  try {
    const surveyId = req.params.id;
    const deletedSurvey = await deleteSurveyBuilder(surveyId);
    res.status(200).json({
      success: true,
      message: "Survey deleted successfully",
      data: deletedSurvey
    });
  } catch (error) {
    next(error);
  }
};
