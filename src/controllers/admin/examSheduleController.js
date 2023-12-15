import {
    examShedulePostServices,
    examSheduleGetServices,
    examShedulePutServices,
    examSheduleDeleteServices,
  } from "../../services/examSheduleService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      if (!requestData.status) {
        requestData.status = "active";
      }
      const department = await examShedulePostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Exam Schedule created successfully",
        data: department,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  const createProgramExam = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      if (!requestData.status) {
        requestData.status = "active";
      }
      const department = await examShedulePostServices.saveProgramRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Exam Schedule created successfully",
        data: department,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  
  export async function get(req, res, next) {
    try {
      const departments = await examSheduleGetServices.getAll(req.query);
      res.status(200).json({
        status: "success",
        message: "Exam Schedule fetched successfully",
        data: departments,
      });
    } catch (e) {
      next(e);
    }
  }
  export async function getProgramExamList(req, res, next) {

    
    try {
      const departments = await examSheduleGetServices.getProgramExamList(req.query);
      res.status(200).json({
        status: "success",
        message: "Exam Schedule fetched successfully",
        data: departments,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  
  const getExamById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const department = await examSheduleGetServices.getExamById(id);
      res.status(200).json(department);
    } catch (err) {
      next(err);
    }
  };
  const getProgramExamById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const department = await examSheduleGetServices.getProgramExamById(id);
      res.status(200).json(department);
    } catch (err) {
      next(err);
    }
  };
  
  
  
  

  
  const updateExamById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const departmentDetails = req.body;
      const { id } = req.params;
      const updatedDepartment = await examShedulePutServices.updateExamById(
        id,
        req.body,
        userData,
        //departmentDetails
      );
      res.status(200).json({
        status: "success",
        message: "Exam Schedule updated successfully",
        data: updatedDepartment,
      });
    } catch (err) {
      next(err);
    }
  };

  const updateProgramExam = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const departmentDetails = req.body;
      const { id } = req.params;
      const updatedDepartment = await examShedulePutServices.updateProgramExam(
        id,
        req.body,
        userData,
        //departmentDetails
      );
      res.status(200).json({
        status: "success",
        message: "Exam Schedule updated successfully",
        data: updatedDepartment,
      });
    } catch (err) {
      next(err);
    }
  };
  
  
  const deleteExamById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedDepartment = await examSheduleDeleteServices.deleteExamById(id);
      res.status(200).json({
        status: "success",
        message: "Exam Schedule deleted successfully",
        data: deletedDepartment,
      });
    } catch (err) {
      next(err);
    }
  };

  const deleteProgramExam = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedDepartment = await examSheduleDeleteServices.deleteProgrameExamById(id);
      res.status(200).json({
        status: "success",
        message: "Exam Schedule deleted successfully",
        data: deletedDepartment,
      });
    } catch (err) {
      next(err);
    }
  };


 
  
  export {
    create,
    getExamById,
    updateExamById,
    updateProgramExam,
    deleteExamById,
    deleteProgramExam,
    createProgramExam,
    getProgramExamById
  };
  