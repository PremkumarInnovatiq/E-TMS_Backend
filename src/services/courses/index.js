import NewCourses from "../../models/courses/index";
//import NewCourses from "../../models/Programs/
import NewProgrames from '../../models/course-program/index';





import { getQueryParams } from "../../utilities/helpers";
import StudentClasses from "../../models/studentClasses";
import CourseProgram from "../../models/course-program/index";
import Class from "../../models/class/index";
import MainCategory from '../../models/main-category/index'
import User from "../../models/User"

exports.coursePostServices = {
  async saveRequest(requestData, userData) {
    try {
      requestData.modifiedBy = userData;
      return await NewCourses.create(requestData);
    } catch (e) {
      throw e;
    }
  },
};

exports.courseGetServices = {
  async getAll(query) {
    const params = getQueryParams(query, null, true);
    return await NewCourses.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy,
    });
  },
  
  async getCount() {
    try {
      const allCourses = await NewCourses.countDocuments();
      const programs = await CourseProgram.countDocuments();
      const instructors = await User.countDocuments({ role: 'Instructor' });
      const students = await User.countDocuments({ role: 'Student' });
      const users = await User.countDocuments();
      const admins = await User.countDocuments({ role: 'Admin' });

      return {
        courses: allCourses,
        programs: programs,
        instructors:instructors,
        students:students,
        users:users,
        admins:admins
      };
    } catch (error) {
      throw error;
    }
  },

  async getCoursesCount() {
    try {
      const runningCourseIds = await Class.distinct("courseId");
      const uniqueCourseIds = [...new Set(runningCourseIds)];
      const runningCourseCount = uniqueCourseIds.length;

      const currentMonth = new Date().getUTCMonth(); // Get the current month (0-11)
      const currentYear = new Date().getUTCFullYear(); // Get the current year

      const startOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
      const startOfNextMonth = new Date(
        Date.UTC(currentYear, currentMonth + 1, 1)
      );

      const new_courses_CourseIds = await Class.distinct("courseId", {
        "sessions.sessionStartDate": {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      });
      const newCoursesCount = new_courses_CourseIds.length;

      const allCourses = await NewCourses.countDocuments();
      const stackedProgram = await CourseProgram.countDocuments();

      return {
        running_courses: runningCourseCount,
        overall_courses: allCourses,
        new_courses: newCoursesCount,
        stacked_program: stackedProgram,
      };
    } catch (error) {
      throw error;
    }
  },

  async getCoursesCountWithFilter(months) {
    try {
      const currentDate = new Date();
      const currentMonth = new Date().getUTCMonth();
      const currentYear = new Date().getUTCFullYear();
      const startOfPreviousMonths = new Date(currentDate);
      startOfPreviousMonths.setMonth(startOfPreviousMonths.getMonth() - months);

      const startOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
      const startOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1));

      const pipeline = [
        {
          $match: {
            createdAt: {
              $gte: startOfPreviousMonths,
              $lt: currentDate,
            },
          },
        },
        {
          $facet: {
            running_classes: [
              {
                $match: {
                  sessions: {
                    $elemMatch: {
                      sessionStartDate: {
                        $gte: startOfPreviousMonths,
                        $lt: currentDate,
                      },
                    },
                  },
                },
              },
              {
                $count: "count",
              },
            ],
            current_classes: [
              {
                $match: {
                  sessions: {
                    $elemMatch: {
                      sessionStartDate: {
                        $gte: startOfMonth,
                        $lt: startOfNextMonth,
                      },
                    },
                  },
                },
              },
              {
                $count: "count",
              },
            ],
            overall_classes: [
              {
                $count: "count",
              },
            ],
            stacked_program: [
              {
                $match: {
                  createdAt: {
                    $gte: startOfPreviousMonths,
                    $lt: currentDate,
                  },
                },
              },
              {
                $count: "count",
              },
            ],
          },
        },
      ];

      const result = await Class.aggregate(pipeline);

      return {
        running_classes: result[0].running_classes[0]?.count || 0,
        current_classes: result[0].current_classes[0]?.count || 0,
        overall_classes: result[0].overall_classes[0]?.count || 0,
        stacked_program: result[0].stacked_program[0]?.count || 0,
      };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },




  async getCourseSummaryDetails() {
    try {
      const pipeline = [
        {
          $lookup: {
            from: "studentclasses",
            localField: "_id",
            foreignField: "courseId",
            as: "registeredStudents",
          },
        },
        {
          $match: {
            "registeredStudents.status": { $nin: ["withdraw", "cancel", "registered"] },
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            registeredStudentsCount: { $size: "$registeredStudents" },
          },
        },
        {
          $match: {
            registeredStudentsCount: { $gt: 0 },
          },
        },
      ];

      const courseCounts = await NewCourses.aggregate(pipeline);

      return {
        courseCounts,
      };
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to fetch course details");
    }
  },



  async getCourseSummaryDetailsWithFilter(year) {
    try {
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      const pipeline = [
        {
          $lookup: {
            from: "studentclasses",
            let: { courseId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$courseId", "$$courseId"] },
                      { $not: { $in: ["$status", ["withdraw", "cancel", "registered"]] } },
                      { $gte: ["$createdAt", startDate] },
                      { $lte: ["$createdAt", endDate] },
                    ],
                  },
                },
              },
              {
                $count: "registeredStudentsCount",
              },
            ],
            as: "registeredStudents",
          },
        },
        {
          $match: {
            registeredStudents: { $ne: [] },
          },
        },
        {
          $project: {
            _id: 0,
            courseId: "$_id",
            title: 1,
            registeredStudentsCount: {
              $ifNull: [{ $arrayElemAt: ["$registeredStudents.registeredStudentsCount", 0] }, 0],
            },
          },
        },
        {
          $match: {
            registeredStudentsCount: { $gt: 0 },
          },
        },
      ];

      const courseCounts = await NewCourses.aggregate(pipeline);

      return {
        courseCounts,
      };
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to fetch course details");
    }
  },




  async getFellowshipProgrammesDetails(year) {
    try {
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      const registeredStudents = await StudentClasses.distinct("studentId", {
        status: "registered",
        createdAt: { $gte: startDate, $lte: endDate }
      });
      const registeredCount = registeredStudents.length;

      const approvedStudents = await StudentClasses.distinct("studentId", {
        status: "approved",
        createdAt: { $gte: startDate, $lte: endDate }
      });
      const approvedCount = approvedStudents.length;

      const inProgressStudents = await StudentClasses.distinct("studentId", {
        status: "inProgress",
        createdAt: { $gte: startDate, $lte: endDate }
      });
      const inProgressCount = inProgressStudents.length;

      const rejectedStudents = await StudentClasses.distinct("studentId", {
        status: "cancel",
        createdAt: { $gte: startDate, $lte: endDate }
      });
      const rejectedCount = rejectedStudents.length;

      return {
        Applied_count: registeredCount,
        Approved_count: approvedCount,
        InProgress_count: inProgressCount,
        Rejected_count: rejectedCount
      };
    } catch (error) {
      throw error;
    }
  },


  async getFeaturedCourseDetails() {
    try {
      const allCourses = await NewCourses.find({ main_category: { $exists: true } }, { main_category: 1, title: 1 });

      // Fetch the count of registered students and duration for each course
      let courseCounts = await Promise.all(
        allCourses.map(async (course) => {
          const courseId = course._id;
          const category = course.main_category;
          const title = course.title

          // Fetch the category name from the main_category collection using the category _id
          const mainCategory = await MainCategory.findOne({ _id: category });
          const category_name = mainCategory ? mainCategory.category_name : "";

          // Find classes for the current course
          const classes = await Class.findOne({ courseId });

          let duration = 0;
          if (classes) {
            const { sessions } = classes;
            if (sessions && sessions.length > 0) {
              let minStartDate = new Date(sessions[0].sessionStartDate);
              let maxEndDate = new Date(sessions[0].sessionEndDate);

              for (const session of sessions) {
                const sessionStartDate = new Date(session.sessionStartDate);
                const sessionEndDate = new Date(session.sessionEndDate);

                if (sessionStartDate < minStartDate) {
                  minStartDate = sessionStartDate;
                }
                if (sessionEndDate > maxEndDate) {
                  maxEndDate = sessionEndDate;
                }
              }

              duration = this.calculateMonthDuration(minStartDate, maxEndDate);
            }
          }


          return {
            courseId,
            title,
            category: category_name,
            duration,
          };
        })
      );
      // const randomRecords = courseCounts.sort(() => 0.5 - Math.random()).slice(0, 4);
      courseCounts = courseCounts.filter((course) => course.duration)
      return {
        courseCounts,
      };
    } catch (error) {
      throw new Error('Failed to fetch course details');
    }
  },

  calculateMonthDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months;
  },





  async getDiplomaCoursesDetails() {
    try {
      console.log("Fetching diploma course details...");

      const pipeline = [
        {
          $lookup: {
            from: "classes",
            localField: "programCourse.courseId",
            foreignField: "courseId",
            as: "classes",
          },
        },
        {
          $addFields: {
            minStartDate: {
              $min: "$classes.sessions.sessionStartDate",
            },
            maxEndDate: {
              $max: "$classes.sessions.sessionEndDate",
            },
          },
        },
        {
          $addFields: {
            minStartDate: { $arrayElemAt: ["$minStartDate", 0] },
            maxEndDate: { $arrayElemAt: ["$maxEndDate", 0] },
            duration: {
              $ceil: {
                $divide: [
                  {
                    $subtract: [
                      { $arrayElemAt: ["$maxEndDate", 0] },
                      { $arrayElemAt: ["$minStartDate", 0] },
                    ],
                  },
                  1000 * 60 * 60 * 24 * 30, // milliseconds in a month
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            courseIds: "$programCourse.courseId",
            numberOfCourses: { $size: "$programCourse" },
            title: 1,
            duration: 1,
          },
        },
      ];

      console.log("Executing aggregation pipeline...");

      const courseCounts = await CourseProgram.aggregate(pipeline).exec();

      console.log("Fetched course counts:", courseCounts);

      return {
        courseCounts,
      };
    } catch (error) {
      console.error("Error:", error.message);
      throw new Error("Failed to fetch course details");
    }
  },







  async getCourseById(id) {
    try {
      const courses = await NewCourses.findById(id)
        .populate("main_category")
        .populate("sub_category")
        .populate("course_kit")
        .populate("funding_grant")
        .populate("survey")
        .populate({
          path: "course_kit",
          populate: "videoLink"
        })
        .populate({
          path: "course_instructor",
          populate: {
            path: "user_id",
            select: "name last_name",
          },
        });
      return courses;
    } catch (error) {
      throw error;
    }
  },

  async getCoursesWithIdAndTitle(status) {
    try {
      const query = status ? { status } : {};
      const courses = await NewCourses.find(query, "_id title status");
      return courses;
    } catch (error) {
      throw error;
    }
  },
  async getProgramsWithIdAndTitle(status) {
    try {
      const query = status ? { status } : {};
      const courses = await NewProgrames.find(query, "_id title status");
      return courses;
    } catch (error) {
      throw error;
    }
  },
};


exports.coursePutServices = {
  async updateCourseById(id, requestData, userData, courseDetails) {
    try {
      requestData.modifiedBy = userData;
      requestData.title = courseDetails;
      return await NewCourses.findByIdAndUpdate(id, requestData, { new: true });
    } catch (e) {
      throw e;
    }
  },
};

exports.courseDeleteServices = {
  async deleteCourseById(id) {
    try {
      return await NewCourses.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  },
};


