import { getQueryParams } from "../utilities/helpers";
import ExamSchedule from "../models/examShedule";
import ProgramexamShedule from "../models/ProgramexamShedule";


exports.examShedulePostServices = {
  async saveRequest(requestData, userData) {
    try {
      requestData.modifiedBy = userData;
      return await ExamSchedule.create(requestData);
    } catch (e) {
      throw e;
    }
  },
  async saveProgramRequest(requestData, userData) {
    try {
      requestData.modifiedBy = userData;
      return await ProgramexamShedule.create(requestData);
    } catch (e) {
      throw e;
    }
  },
};

exports.examSheduleGetServices = {
  async getAll(query) {
    //const params = getQueryParams(query, null, true);
    return await ExamSchedule.find()
    //});
  },
  async getProgramExamList(query) {
    //const params = getQueryParams(query, null, true);
    return await ProgramexamShedule.find()
    //});
  },
  
  
 

  async getExamById(id) {
    try {
      const department = await ExamSchedule.findById(id)
      return department;
    } catch (error) {
      throw error;
    }
  },
  async getProgramExamById(id) {
    try {
      const department = await ProgramexamShedule.findById(id)
      return department;
    } catch (error) {
      throw error;
    }
  }
};

exports.examShedulePutServices = {
  async updateExamById(id, requestData, userData) {
    try {
      console.log("ddd",requestData)
      requestData.modifiedBy = userData;
      //requestData.title = departmentDetails;
      return await ExamSchedule.findByIdAndUpdate(id, requestData, { new: true });
    } catch (e) {
      throw e;
    }
  },

  
  async updateProgramExam(id, requestData, userData) {
    try {
      console.log("ddd",requestData)
      requestData.modifiedBy = userData;
      //requestData.title = departmentDetails;
      return await ProgramexamShedule.findByIdAndUpdate(id, requestData, { new: true });
    } catch (e) {
      throw e;
    }
  },
};

exports.examSheduleDeleteServices = {
  async deleteExamById(id) {
    try {
      return await ExamSchedule.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  },
  async deleteProgrameExamById(id) {
    try {
      return await ProgramexamShedule.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  },
};


