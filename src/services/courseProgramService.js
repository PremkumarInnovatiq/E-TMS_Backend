import CourseProgram from '../models/course-program/index';
import { getQueryParams } from '../utilities/helpers';
import Class from '../models/program-class/index'

exports.getAllCourseProgram = {
  async getAllCourseProgram(query,status) {
    try{
    const params = getQueryParams(query, status);
    const paginatedResults = await CourseProgram.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
    const courses = await CourseProgram.populate(paginatedResults.docs, [
    {
      path: 'electiveprogramCourse.electiveProgramName',
      model: 'new_courses'
    },
    {
      path: 'coreprogramCourse.coreProgramName', // Populate the coreProgramId field
      model: 'new_courses' // Specify the model to use for populating
    },

  ]);
    return {
      ...paginatedResults,
      docs: courses
    };} catch (error){
      console.error('Error populating coreProgramName:', error);

    }
  }
};

export const createCourseProgram = async (courseProgramData, userData) => {
  try {
    const courseProgram = await CourseProgram.create(courseProgramData);
    return courseProgram;
  } catch (error) {
    throw new Error('Failed to create Program');
  }
};
export const getProgramById = async (id) => {
  try {
      const courseKit = await CourseProgram.findById(id)        
      .populate({
        path: "programKit",
        populate: "videoLink"
      })
      .populate([{
        path: 'coreprogramCourse.coreProgramName', // Populate the coreProgramId field
        model: 'new_courses' // Specify the model to use for populating
      },
      {
        path: 'electiveprogramCourse.electiveProgramName',
        model: 'new_courses'
      }
    ]);
  

      return courseKit;
  } catch (error) {
    console.log("----")
      throw new Error('Failed to fetch Course Kit');
  }
};

export const updateCourseProgramById = async (id, courseProgramData) => {
  try {
    for (const programCourse of courseProgramData.coreprogramCourse) {

      if (programCourse.courseId) {
        const matchingClasses = await Class.find({ courseId: programCourse.courseId });

        for (const matchingClass of matchingClasses) {
          // Check if any sessions exist in the matching class
          if (matchingClass.sessions && matchingClass.sessions.length > 0) {
            const error = new Error('Session(s) exist and cannot be made inactive');
            error.statusCode = 400;
            throw error;
          }
        }
      }
    }
    for (const programCourse of courseProgramData.electiveprogramCourse) {

      if (programCourse.courseId) {
        const matchingClasses = await Class.find({ courseId: programCourse.courseId });

        for (const matchingClass of matchingClasses) {
          // Check if any sessions exist in the matching class
          if (matchingClass.sessions && matchingClass.sessions.length > 0) {
            const error = new Error('Session(s) exist and cannot be made inactive');
            error.statusCode = 400;
            throw error;
          }
        }
      }
    }

    const updatedCourseProgram = await CourseProgram.findByIdAndUpdate(
      id,
      courseProgramData,
      { new: true }
    );
    return updatedCourseProgram;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
};


exports.programDeleteServices = {
  async deleteProgramById(id) {
    try {
      return await CourseProgram.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  },
};
