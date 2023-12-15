import Survey from "../models/survey";
import { getQueryParams } from "../utilities/helpers";

exports.createSurvey = async surveyData => {
  try {
    const newSurvey = new Survey(surveyData);
    const createdSurvey = await newSurvey.save();
    return createdSurvey;
  } catch (error) {
    throw new Error("Failed to create survey.");
  }
};

exports.getAllSurveys = {
  async getAllSurveys(query) {
    const params = getQueryParams(query, null, true);
    return await Survey.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy
    });
  }
};

export async function getTotalResponseCountByCourseId(query) {
  const params = getQueryParams(query, null, true);
  const sort = params.sortBy ? { [params.sortBy]: 1 } : null;

  const pipeline = [
    {
      $lookup: {
        from: "new_courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course"
      }
    },
    {
      $group: {
        _id: "$courseId",
        totalResponse: { $sum: 1 },
        avgRating: { $sum: { $sum: ["$rating.overallRatingCourse"] } },
        courseId: { $first: "$courseId" },
        surveyName: { $first: "$name" },
        title: { $first: "$course.title" }
      }
    },
    {
      $sort: sort
    },
    {
      $skip: (params.page - 1) * params.limit
    },
    {
      $limit: params.limit
    }
  ];

  const responseCounts = await Survey.aggregate(pipeline);

  const totalCount = await Survey.aggregate([
    { $group: { _id: "$courseId", count: { $sum: 1 } } }
  ]);

  const totalPages = Math.ceil(totalCount.length / params.limit);

  return {
    data: responseCounts.map(data => ({
      ...data,
      avgRating: data.avgRating / data.totalResponse || 0
    })),
    page: params.page,
    limit: params.limit,
    sortBy: params.sortBy,
    totalPages: totalPages,
    totalCount: totalCount.length
  };
}

export async function getCourseReviews(courseId, filterReviews) {
  try {
    if (filterReviews === "topThree") {
      const top3Reviews = await Survey.find({ courseId })
        .sort({ "rating.overallRatingCourse": -1 })
        .limit(3);
      console.log("called");
      return top3Reviews;
    }

    if (filterReviews === "latestReviews") {
      const latest3Reviews = await Survey.find({ courseId })
        .sort({ createdAt: -1 })
        .limit(3);
      return latest3Reviews;
    }

    const getAllDetails = await Survey.find({ courseId }).populate({
      path: "studentId"
    }).populate({
      path: "courseId"
    }).populate({
      path: "instructorId"
    });
    return getAllDetails;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to get course reviews");
  }
}

export async function getInstuctorReviews(instructorId, filterReviews) {
  try {
    if (filterReviews === "topThree") {
      const top3Reviews = await Survey.find({ instructorId })
        .sort({ "rating.overallRatingInstructor": -1 })
        .limit(3);
      return top3Reviews;
    }

    if (filterReviews === "latestReviews") {
      const latest3Reviews = await Survey.find({ instructorId })
        .sort({ createdAt: -1 })
        .limit(3);
      return latest3Reviews;
    }

    const getAllDetails = await Survey.find({ instructorId });
    return getAllDetails;
  } catch (error) {
    throw new Error("Failed to get course reviews");
  }
}

export async function calculateAverageCourseRating(courseId) {
  try {
    const surveys = await Survey.find({ courseId });
    const totalRatings = surveys.reduce((sum, survey) => sum + survey.rating.overallRatingCourse, 0);
    const averageRating = totalRatings / surveys.length;
    const numberOfRatings = surveys.length;
    return { averageRating, numberOfRatings };
  } catch (error) {
    throw new Error('Failed to calculate the average course rating.');
  }
}

export async function calculateAverageInstructorRating(instructorId) {
  try {
    const surveys = await Survey.find({ instructorId });
    const totalRatings = surveys.reduce(
      (sum, survey) => sum + survey.rating.overallRatingInstructor,
      0
    );
    const averageRating = totalRatings / surveys.length;
    return averageRating;
  } catch (error) {
    throw new Error("Failed to calculate the average instructor rating.");
  }
}

export async function getCourseRatingDetails(courseId) {
  try {
    const ratings = await Survey.find({ courseId }).select("rating");
    return ratings;
  } catch (error) {
    throw new Error("Failed to get course rating details");
  }
}

export async function getInstructorRatingDetails(instructorId) {
  try {
    const ratings = await Survey.find({ instructorId }).select("rating");
    return ratings;
  } catch (error) {
    throw new Error("Failed to get instructor rating details");
  }
}

exports.getSurveyById = async surveyId => {
  try {
    const survey = await Survey.findById(surveyId)
      .populate({
        path: "courseId",
        select: "courseCode"
      })
      .populate({
        path: "instructorId",
        populate: {
          path: "user_id",
          model: "User",
          select: "name last_name email"
        }
      })
      .populate({
        path: "studentId",
        select: "name last_name email"
      });
    if (!survey) {
      throw new Error("Survey not found.");
    }
    return survey;
  } catch (error) {
    throw new Error("Failed to retrieve survey.");
  }
};

exports.updateSurvey = async (surveyId, updateData) => {
  try {
    const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, updateData, {
      new: true
    });
    if (!updatedSurvey) {
      throw new Error("Survey not found.");
    }
    return updatedSurvey;
  } catch (error) {
    throw new Error("Failed to update survey.");
  }
};

exports.deleteSurvey = async surveyId => {
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(surveyId);
    if (!deletedSurvey) {
      throw new Error("Survey not found.");
    }
    return deletedSurvey;
  } catch (error) {
    throw new Error("Failed to delete survey.");
  }
};

export const getAllResponses = async (courseId) => {
  try {
    const responses = await Survey.find({ courseId });
    const averages = {
      courseObjectiveClear: calculateAverage(responses, 'agreementLevelForCourse.courseObjectiveClear'),
      courseTextbookClear: calculateAverage(responses, 'agreementLevelForCourse.courseTextbookClear'),
      assignmentsHelpful: calculateAverage(responses, 'agreementLevelForCourse.assignmentsHelpful'),
      courseIncreasedInterest: calculateAverage(responses, 'agreementLevelForCourse.courseIncreasedInterest'),
      courseMetExpectations: calculateAverage(responses, 'agreementLevelForCourse.courseMetExpectations'),
      instructorKnowledgeable: calculateAverage(responses, 'agreementLevelInstructor.instructorKnowledgeable'),
      instructorPreparedContent: calculateAverage(responses, 'agreementLevelInstructor.instructorPreparedContent'),
      instructorEncouragedFeedback: calculateAverage(responses, 'agreementLevelInstructor.instructorEncouragedFeedback'),
      instructorEnthusiastic: calculateAverage(responses, 'agreementLevelInstructor.instructorEnthusiastic'),
      overallRatingCourse: calculateAverageNumeric(responses, 'rating.overallRatingCourse'),
      overallRatingInstructor: calculateAverageNumeric(responses, 'rating.overallRatingInstructor'),
      likelihoodToRecommend: calculateAverageNumeric(responses, 'rating.likelihoodToRecommend'),
      courseAttendance: calculateFrequency(responses, 'courseAttendance'),
      expectedGrade: calculateFrequency(responses, 'expectedGrade'),
    };
    return { averages };
  } catch (error) {
    console.log(error)
    throw new Error('Internal server error');
  }
};