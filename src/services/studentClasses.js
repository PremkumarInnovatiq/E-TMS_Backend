import StudentClasses from "../models/studentClasses";
import fellowStudent from "../models/fellowStudent";
import { getQueryParams, getQueryParamsNew } from "../utilities/helpers";
import Classes from "../models/class/index";
import ProgramClass from '../models/program-class/index'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PaymentHistory = require('../models/transactions/paymentHistory');
const ProgramsPaymentHistory = require('../models/transactions/programsPaymentHistory');
import ExamSchedule from "../models/examShedule";
import ProgramexamShedule from '../models/ProgramexamShedule';
import { emailType, sendEmail } from '../utilities/emailHelper';




const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.createStudentClass = async (studentData, userData,event) => {
  try {
    // Find the class in the Classes collection based on the classId
    const classData = await Classes.findOne({ _id: studentData.classId });

    if (!classData) {
      throw new Error("Class not found");
    }
    const courseId = classData.courseId;

    // Assign the courseId to studentData
    studentData.courseId = courseId;
    studentData.registeredOn = new Date();
    studentData.modifiedBy = userData
    const studentClasses = new StudentClasses(studentData);
    const lineItems = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: studentData.courseTitle,
        },
        unit_amount: studentData.courseFee * 100,
      },
      quantity: 1,
    },
    ]
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // Specify the mode as 'payment' for one-time payments
      success_url: `http://18.142.249.36:3006/student/sucess-course/${studentData.classId}`,
      cancel_url: `http://18.142.249.36:3006/student/fail-course/${studentData.classId}`,
      customer_email: studentData.email,
      line_items: lineItems
    });
    if(event !== null){
      const paymentData = {
        course: studentData.courseTitle,
        email: studentData.email,
        name: studentData.name,
        price: studentData.courseFee ,
        transactionId: session.id,
        payment_intent: event.data.object.payment_intent,
        paymentType: 'paid',
        status: event.data.object.status == 'complete' ? 'Success' : 'Failed',
      };
      let addPaymentHistory = await PaymentHistory.create(paymentData);
  
    const createdStudentClass = await studentClasses.save();
    sendEmail(emailType.NEW_COURSE_REGISTERED_EMAIL, paymentData);
    return { createdStudentClass, session }
    } else return { session}
  } catch (error) {
    throw error;
  }
};

exports.createStudentProgram = async (studentData, userData, userName) => {
  try {
    const classData = await ProgramClass.findOne({ _id: studentData.classId });

    if (!classData) {
      throw new Error("Class not found");
    }
    const courseId = classData.courseId;
    studentData.programId = courseId;
    studentData.registeredOn = new Date();
    studentData.modifiedBy = userData;
    studentData.student_name = userName;
    const studentClasses = new fellowStudent(studentData);
    const lineItems = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: studentData.programTitle,
        },
        unit_amount: studentData.programFee * 100,
      },
      quantity: 1,
    },
    ]
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // Specify the mode as 'payment' for one-time payments
      success_url: `http://18.142.249.36:3006/student/sucess-program/${studentData.classId}`,
      cancel_url: `http://18.142.249.36:3006/student/fail-program/${studentData.classId}`,
      customer_email: studentData.email,
      line_items: lineItems
    });
    const paymentData = {
      program: studentData.programTitle,
      email: studentData.email,
      name: studentData.name,
      price: studentData.programFee * 100,
      transactionId: session.id,
      payment_intent: session.payment_intent,
      paymentType: 'paid',
      status: session.payment_status == 'paid' ? 'failed' : 'success',
    };
    let addPaymentHistory = await ProgramsPaymentHistory.create(paymentData);
    const createdStudentClass = await studentClasses.save();
    sendEmail(emailType.NEW_PROGRAM_REGISTERED_EMAIL, paymentData);
    return { createdStudentClass, session }
  } catch (error) {
    throw error;
  }
};



exports.getStudentClassById = async (studentId, classId) => {
  try {
    const studentObjectId = new ObjectId(studentId);
    const classObjectId = new ObjectId(classId);

    const studentClass = await StudentClasses.findOne({
      studentId: studentObjectId,
      classId: classObjectId,
    });

    if (!studentClass) {
      throw new Error("Student class not found");
    }

    return studentClass;
  } catch (error) {
    console.error('Error:', error);
    throw new Error("Failed to get student class by ID");
  }
};

exports.getStudentCourseById = async (studentId, courseId) => {
  try {
    const studentObjectId = new ObjectId(studentId);
    const courseObjectId = new ObjectId(courseId);
    const results = await StudentClasses.findOne({
      studentId: studentObjectId,
      courseId: courseObjectId,
    });

    const studentClass = await StudentClasses.populate(results, {
      path: "courseId"
    });

    if (!studentClass) {
      throw new Error("Student class not found");
    }

    return studentClass;
  } catch (error) {
    console.error('Error:', error);
    throw new Error("Failed to get student class by ID");
  }
};


exports.getStudentClasses = async (query) => {
  if (query.isAll) {
    const results = await StudentClasses.find({ status: query.status, studentId: query.studentId }).sort({ 'approvedOn': -1 })
    const studentClass = await StudentClasses.populate(results, {
      path: "courseId"
    });

    const studentClasses = await StudentClasses.populate(studentClass, {
      path: "classId",
      populate: {
        path: "courseId",
      },
    });
    const populatedStudentClasses = await StudentClasses.populate(studentClasses, {
      path: "studentId",
      select: "name last_name email"
    });
    return populatedStudentClasses
  } else if (query.title) {
    let regex = new RegExp(query.title, "i");
    let where = {
      "title": { $regex: regex },
      studentId: query.studentId,
      status: query.status
    }
    const params = getQueryParamsNew(query, null, true);
    const paginatedResults = await StudentClasses.paginate(where, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy,
    });
    const studentClasses = await StudentClasses.populate(paginatedResults.docs, {
      path: "classId",
      populate: {
        path: "courseId",
      },
    });
    const populatedStudentClasses = await StudentClasses.populate(studentClasses, {
      path: "studentId",
      select: "name last_name email"
    });
    return {
      ...paginatedResults,
      docs: populatedStudentClasses,
    }
  }
  else {
    const params = getQueryParamsNew(query, null, true);
    const paginatedResults = await StudentClasses.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy,
    });
    const studentClasses = await StudentClasses.populate(paginatedResults.docs, {
      path: "classId",
      populate: {
        path: "courseId",
      },
    });
    const populatedStudentClasses = await StudentClasses.populate(studentClasses, {
      path: "studentId",
      select: "name last_name email"
    });
    return {
      ...paginatedResults,
      docs: populatedStudentClasses,
    }
  }
};

exports.getStApproveList = async (query) => {
  if (query.isAll) {
    const results = await fellowStudent.find({ status: query.status, studentId: query.studentId }).sort({ 'approvedOn': -1 })
    const studentClass = await fellowStudent.populate(results, {
      path: "programId",
    });

    const studentClasses = await fellowStudent.populate(studentClass, {
      path: "classId",
      populate: {
        path: "courseId",
      },
    });
    const populatedStudentClasses = await fellowStudent.populate(studentClasses, {
      path: "studentId",
      select: "name last_name email"
    });
    return populatedStudentClasses
  } else if (query.title) {
    let regex = new RegExp(query.title, "i");
    let where = {
      "programTitle": { $regex: regex },
      studentId: query.studentId,
      status: query.status
    }

    const params = getQueryParamsNew(query, null, true);
    if (query.classId) {
      try {
        const studentObjectId = new ObjectId(query.studentId);
        const classObjectId = new ObjectId(query.classId);

        const studentClass = await fellowStudent.findOne({
          studentId: studentObjectId,
          classId: classObjectId,
        });

        if (!studentClass) {
          throw new Error("Student class not found");
        }

        return studentClass;
      } catch (error) {
        throw new Error("Failed to get student class by ID");
      }
    } else {
      const paginatedResults = await fellowStudent.paginate(where, {
        page: params.page,
        limit: params.limit,
        sort: params.sortBy,
      });
      const studentClasses = await fellowStudent.populate(paginatedResults.docs, {
        path: "classId",
        populate: {
          path: "courseId",
        },
      });
      const populatedStudentClasses = await fellowStudent.populate(studentClasses, {
        path: "studentId",
        select: "name last_name email"
      });
      return {
        ...paginatedResults,
        docs: populatedStudentClasses,
      };
    }
  } else {
    const params = getQueryParamsNew(query, null, true);
    if (query.classId) {
      try {
        const studentObjectId = new ObjectId(query.studentId);
        const classObjectId = new ObjectId(query.classId);

        const studentClass = await fellowStudent.findOne({
          studentId: studentObjectId,
          classId: classObjectId,
        });

        if (!studentClass) {
          throw new Error("Student class not found");
        }

        return studentClass;
      } catch (error) {
        throw new Error("Failed to get student class by ID");
      }
    } else {
      const paginatedResults = await fellowStudent.paginate(params.filter, {
        page: params.page,
        limit: params.limit,
        sort: params.sortBy,
      });
      const studentClasses = await fellowStudent.populate(paginatedResults.docs, {
        path: "classId",
        populate: {
          path: "courseId",
        },
      });
      const populatedStudentClasses = await fellowStudent.populate(studentClasses, {
        path: "studentId",
        select: "name last_name email"
      });
      return {
        ...paginatedResults,
        docs: populatedStudentClasses,
      };
    }
  }
};


exports.updateStudentClass = async (studentId, updateData, userData) => {
  try {
    if (updateData.status == 'completed') {
      let classId = studentId
      const classData = await Classes.findOne({ _id: classId });

      if (!classData) {
        throw new Error("Class not found");
      }

      updateData.modifiedBy = userData
      const updatedStudentClass = await StudentClasses.findOneAndUpdate(
        { studentId: updateData.studentId, classId: classId },
        {
          $set: {
            "session.0.sessionStatus": updateData.status, status: updateData.status, modifiedBy: userData, playbackTime: updateData.playbackTime,
          }
        },
        { new: true }
      );

      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }

      return updatedStudentClass;

    } else if (updateData.playbackTime) {
      let classId = studentId
      const classData = await Classes.findOne({ _id: classId });

      if (!classData) {
        throw new Error("Class not found");
      }

      updateData.modifiedBy = userData
      const updatedStudentClass = await StudentClasses.findOneAndUpdate(
        {
          studentId: updateData.studentId,
          classId: classId,
          'coursekit.videoId': updateData.videoId // Match the specific videoId in the array
        },
        {
          $set:
          {
            'coursekit.$.playbackTime': updateData.playbackTime,
            modifiedBy: userData
          }
        },
        {
          new: true
        }
      );

      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }

      return updatedStudentClass;

    } else if (updateData.playBackTime) {
      console.log('hi', updateData)
      let classId = studentId
      const classData = await Classes.findOne({ _id: classId });

      if (!classData) {
        throw new Error("Class not found");
      }

      updateData.modifiedBy = userData
      const updatedStudentClass = await StudentClasses.findOneAndUpdate(
        {
          studentId: updateData.studentId,
          classId: classId,
        },
        {
          $set:
          {
            playbackTime: updateData.playBackTime,
            modifiedBy: userData
          }
        },
        {
          new: true
        }
      );

      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }

      return updatedStudentClass;

    } else if (updateData.status == 'notCompleted') {
      let classId = studentId
      const classData = await Classes.findOne({ _id: classId });

      if (!classData) {
        throw new Error("Class not found");
      }

      updateData.modifiedBy = userData
      const updatedStudentClass = await StudentClasses.findOneAndUpdate(
        {
          studentId: updateData.studentId,
          classId: classId,
        },
        {
          $set:
          {
            playbackTime: 50,
            modifiedBy: userData
          }
        },
        {
          new: true
        }
      );

      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }

      return updatedStudentClass;

    } else {
      const classData = await Classes.findOne({ _id: updateData.classId });
      if (!classData) {
        throw new Error("Class not found");
      }

      const sessionId = classData.sessions.map(
        (session) => session.sessionNumber
      );

      updateData.modifiedBy = userData
      const sessionIdMatched = updateData.session.every((session) =>
        sessionId.includes(session.sessionNumber)
      );

      if (!sessionIdMatched) {
        throw new Error("Session Number does not match");
      }

      const updatedStudentClass = await StudentClasses.findByIdAndUpdate(
        studentId,
        updateData,
        { new: true }
      );

      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }
      if (updatedStudentClass) {
        const updatedStudentClass1 = await StudentClasses.findOne(
          { studentId: updateData.studentId, classId: updateData.classId },
        ).populate
          ({ path: "studentId", select: "name last_name email" })
        let obj = { name: updatedStudentClass1.studentId.name, course: updatedStudentClass1.title, email: updatedStudentClass1.studentId.email }
        sendEmail(emailType.COURSE_APPROVAL, obj);
      }
      return updatedStudentClass;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.updateStudentProgramClass = async (classId, updateData, userData) => {
  try {
    if (updateData.status == 'completed') {
      const classData = await ProgramClass.findOne({ _id: classId });

      if (!classData) {
        throw new Error("Class not found");
      }
      updateData.modifiedBy = userData
      const updatedStudentClass = await fellowStudent.findOneAndUpdate(
        { studentId: updateData.studentId, classId: classId },
        {
          $set: {
            "session.0.sessionStatus": updateData.status, status: updateData.status, modifiedBy: userData, playbackTime: updateData.playbackTime,
          }
        },
        { new: true }
      );

      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }

      return updatedStudentClass;


    } else {
      const classData = await ProgramClass.findOne({ _id: updateData.classId });

      if (!classData) {
        throw new Error("Class not found");
      }
      updateData.modifiedBy = userData
      const sessionId = classData.sessions.map(
        (session) => session.sessionNumber
      );

      updateData.modifiedBy = userData
      const sessionIdMatched = updateData.session.every((session) =>
        sessionId.includes(session.sessionNumber)
      );

      if (!sessionIdMatched) {
        throw new Error("Session Number does not match");
      }

      const updatedStudentClass = await fellowStudent.findOneAndUpdate(
        { studentId: updateData.studentId, classId: updateData.classId },
        updateData,
        { new: true }
      );
      if (!updatedStudentClass) {
        throw new Error("Student class not found");
      }
      if (updatedStudentClass) {
        const updatedStudentClass1 = await fellowStudent.findOne(
          { studentId: updateData.studentId, classId: updateData.classId },
        ).populate
          ({ path: "studentId", select: "name last_name email" })
        let obj = { name: updatedStudentClass1.studentId.name, program: updatedStudentClass1.programTitle, email: updatedStudentClass1.studentId.email }
        sendEmail(emailType.PROGRAM_APPROVAL, obj);
      }
      return updatedStudentClass;


    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.deleteStudentClass = async (studentId) => {
  try {
    const deletedStudentClass = await StudentClasses.findByIdAndRemove(
      studentId
    );
    if (!deletedStudentClass) {
      throw new Error("Student class not found");
    }
    return deletedStudentClass;
  } catch (error) {
    throw new Error("Failed to delete student class");
  }
};

export const getCompletedStudentClasses = async (courseId) => {
  const completedStudentClasses = await StudentClasses.find({
    courseId,
    session: {
      $not: {
        $elemMatch: { sessionStatus: "scheduled" }
      },
      $elemMatch: { sessionStatus: "completed" }
    }
  });

  return completedStudentClasses;
};

export const getCompletedStudents = async (query) => {
  try {
    const params = getQueryParams(query, null, true);
    const students = await StudentClasses.paginate(
      { "session.sessionStatus": "completed" },
      {
        page: params.page,
        limit: params.limit,
        sort: params.sortBy,
        populate: [
          { path: "studentId", select: "name last_name email" },
          { path: "courseId", select: "title" },
          { path: "classId" }
        ]
      }
    );
    return students;
  } catch (error) {
    throw new Error("Failed to retrieve completed students.");
  }
};
export const getCompletedFellowShips = async (query) => {
  try {
    const params = getQueryParams(query, null, true);
    const students = await fellowStudent.paginate(
      { "session.sessionStatus": "completed" },
      {
        page: params.page,
        limit: params.limit,
        sort: params.sortBy,
        populate: [
          { path: "studentId", select: "name last_name email" },
          { path: "programId", select: "title" },
          { path: "classId" }
        ]
      }
    );
    return students;
  } catch (error) {
    throw new Error("Failed to retrieve completed students.");
  }
};

exports.updateCertificates = async (data, res) => {
  try {
    //console.log("vvvvvvvv",id)
    let cid = ObjectId(data.memberId);
    let CourseId = ObjectId(data.CourseId);

    const result = await StudentClasses.findOneAndUpdate({ courseId: CourseId, studentId: cid }, { certifiacteUrl: data.pdfurl, certificate: true },
      { new: true });
    if (result) {
      const updatedStudentClass1 = await StudentClasses.findOne(
        { studentId: cid, courseId: CourseId },
      ).populate
        ({ path: "studentId", select: "name last_name email" })
      let obj = { name: updatedStudentClass1.studentId.name, course: updatedStudentClass1.title, email: updatedStudentClass1.studentId.email, inputUrl: data.pdfurl }
      sendEmail(emailType.COURSE_COMPLETED, obj);
    }

    // console.log("======",examResult)


    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateProgramCertificates = async (data, res) => {
  try {
    let cid = ObjectId(data.memberId);
    let CourseId = ObjectId(data.CourseId);

    const result = await fellowStudent.findOneAndUpdate({ programId: CourseId, studentId: cid }, { certificateUrl: data.pdfurl, certificate: true },
      { new: true });
    if (result) {
      const updatedStudentClass1 = await fellowStudent.findOne(
        { studentId: cid, programId: CourseId },
      ).populate
        ({ path: "studentId", select: "name last_name email" })
      let obj = { name: updatedStudentClass1.studentId.name, program: updatedStudentClass1.title, email: updatedStudentClass1.studentId.email, inputUrl: data.pdfurl }
      sendEmail(emailType.PROGRAM_COMPLETED, obj);
      // sendEmail(emailType.COURSE_COMPLETED, obj);
    }

    return result;
  } catch (error) {
    throw error;
  }
};


exports.getExamsshedule = async (id, res) => {
  try {
    //console.log("vvvvvvvv",id)
    let cid = ObjectId(id);
    const currentDate = new Date();
    let examResult = []
    const result = await StudentClasses.find({ status: "approved", studentId: cid });
    console.log("=result==", result.length)
    for (let i = 0; i < result.length; i++) {
      console.log("===test=", result[i].courseId)
      let result1 = await ExamSchedule.find({
        courseId: result[i].courseId,
        endDate: {
          $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        },
      })
      if (result1.length > 0) {
        examResult.push(result1[0])
      }
    }
    // console.log("======",examResult)


    return examResult;
  } catch (error) {
    throw error;
  }
};
exports.getProgramExamsshedule = async (id, res) => {
  try {
    //console.log("vvvvvvvv",id)
    let cid = ObjectId(id);
    const currentDate = new Date();
    let examResult = []
    const result = await fellowStudent.find({ status: "approved", studentId: cid });

    for (let i = 0; i < result.length; i++) {
      console.log("===test=", result[i].programId)
      let result1 = await ProgramexamShedule.find({
        programId: result[i].programId,
        endDate: {
          $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        },
      })
      if (result1.length > 0) {
        examResult.push(result1[0])
      }
    }
    // console.log("======",examResult)


    return examResult;
  } catch (error) {
    throw error;
  }
};
