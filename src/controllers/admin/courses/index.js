import {
  coursePostServices,
  courseGetServices,
  coursePutServices,
  courseDeleteServices,
} from "../../../services/courses/index.js";

const _new = async function (req, res, next) {
  try {
    const userData = req.user._id;
    const requestData = req.body;
    if (!requestData.status) {
      requestData.status = "inactive";
    }
    const course = await coursePostServices.saveRequest(requestData, userData);
    res.status(200).json({
      status: "success",
      message: "course created successfully",
      data: course,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export async function index(req, res, next) {
  try {
    const courses = await courseGetServices.getAll(req.query);
    res.status(200).json({
      status: "success",
      message: "courses fetched successfully",
      data: courses,
    });
  } catch (e) {
    next(e);
  }
}

export async function getCourseDetails(req, res, next) {
  try {
    const { months } = req.params;
    const coursesCount = await courseGetServices.getCoursesCount(months);
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCourseSummary(req, res, next) {
  try {

    const coursesCount = await courseGetServices.getCourseSummaryDetails();
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}

export async function getFellowshipProgrammes(req, res, next) {
  try {
    const { year } = req.params;
    const coursesCount = await courseGetServices.getFellowshipProgrammesDetails(year);
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}


export async function getFilteredCourseSummary(req, res, next) {
  try {
    const { year } = req.params;
    const coursesCount = await courseGetServices.getCourseSummaryDetailsWithFilter(year);
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}

export async function getFilteredCourseDetails(req, res, next) {
  try {
    const { months } = req.params;
    const coursesCount = await courseGetServices.getCoursesCountWithFilter(months);
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}


export async function getFeaturedCourse(req, res, next) {
  try {

    const coursesCount = await courseGetServices.getFeaturedCourseDetails();
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}
export async function getDiplomaCourses(req, res, next) {
  try {

    const coursesCount = await courseGetServices.getDiplomaCoursesDetails();
    res.status(200).json({
      status: "success",
      message: "Course details fetched successfully",
      data: coursesCount,
    });
  } catch (error) {
    next(error);
  }
}

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseGetServices.getCourseById(id);
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const userData = req.user._id;
    const courseDetails = req.body.title;
    const { id } = req.params;
    const updatedCourse = await coursePutServices.updateCourseById(
      id,
      req.body,
      userData,
      courseDetails
    );
    res.status(200).json({
      status: "success",
      message: "course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCourse = await courseDeleteServices.deleteCourseById(id);
    res.status(200).json({
      status: "success",
      message: "course deleted successfully",
      data: deletedCourse,
    });
  } catch (err) {
    next(err);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const { status } = req.query;
    const courses = await courseGetServices.getCoursesWithIdAndTitle(status);
    res.status(200).json({
      status: "success",
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getPrograms = async (req, res, next) => {
  try {
    const { status } = req.query;
    const courses = await courseGetServices.getProgramsWithIdAndTitle(status);
    res.status(200).json({
      status: "success",
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCount = async (req, res, next) => {
  try {
    const courses = await courseGetServices.getCount();
    res.status(200).json({
      status: "success",
      message: "Details fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  _new as new,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getCourses,
  getCount,
  getPrograms
};
