import SurveyBuilder from "../models/surveys/survey-builder";
import { getQueryParams } from "../utilities/helpers";

exports.createSurvey = async surveyBuilderData => {
  try {
    const newSurvey = new SurveyBuilder(surveyBuilderData);
    const createdSurvey = await newSurvey.save();
    return createdSurvey;
  } catch (error) {
    throw new Error("Failed to create survey.");
  }
};

exports.getAllSurveysBuilt = {
  async getAllSurveysBuilt(query) {
    const params = getQueryParams(query, null, true);
    return await SurveyBuilder.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy
    });
  }
};

exports.getSurveyBuilderById = async surveyBuilderId => {
  try {
    const survey = await SurveyBuilder.findById(surveyBuilderId);
    if (!survey) {
      throw new Error("Survey not found.");
    }
    return survey;
  } catch (error) {
    throw new Error("Failed to retrieve survey.");
  }
};

exports.updateSurveyBuilder = async (surveyBuilderId, updateData) => {
  try {
    const updatedSurvey = await SurveyBuilder.findByIdAndUpdate(
      surveyBuilderId,
      updateData,
      {
        new: true
      }
    );
    if (!updatedSurvey) {
      throw new Error("Survey not found.");
    }
    return updatedSurvey;
  } catch (error) {
    throw new Error("Failed to update survey.");
  }
};

exports.deleteSurveyBuilder = async surveyBuilderId => {
  try {
    const deletedSurvey = await SurveyBuilder.findByIdAndDelete(
      surveyBuilderId
    );
    if (!deletedSurvey) {
      throw new Error("Survey not found.");
    }
    return deletedSurvey;
  } catch (error) {
    throw new Error("Failed to delete survey.");
  }
};
