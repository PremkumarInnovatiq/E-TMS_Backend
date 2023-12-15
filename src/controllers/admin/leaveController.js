import {
    leavePostServices,
    leaveGetServices,
    leavePutServices,
    leaveDeleteServices,
  } from "../../services/leaveService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      if (!requestData.status) {
        requestData.status = "applied";
      }
      const leave = await leavePostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Leave created successfully",
        data: leave,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  export async function get(req, res, next) {
    try {
      const leaves = await leaveGetServices.getAll(req.query);
      res.status(200).json({
        status: "success",
        message: "Leaves fetched successfully",
        data: leaves,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  const getLeaveById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const leave = await leaveGetServices.getLeaveById(id);
      res.status(200).json(leave);
    } catch (err) {
      next(err);
    }
  };
  const getLeaveByStudentId = async (req, res, next) => {
    try {
      const  id = req.params.studentId;
      const leave = await leaveGetServices.getLeaveByStudentId(id,req.query);
      res.status(200).json({
        status: "success",
        message: "Leaves fetched successfully",
        data: leave,
      });
    } catch (err) {
      next(err);
    }
  };

  const getLeaveByInstructorId = async (req, res, next) => {
    console.log("===test=========")
    try {
      //const  id = req.params.studentId;
      const leave = await leaveGetServices.getLeaveByInstructorId(req.params.id,req.query);
      res.status(200).json({
        status: "success",
        message: "Leaves fetched successfully",
        data: leave,
      });
    } catch (err) {
      next(err);
    }
  };

  

  
  const updateLeaveById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const leaveDetails = req.body.leave;
      const { id } = req.params;
      const updatedleave = await leavePutServices.updateLeaveById(
        id,
        req.body,
        userData,
        leaveDetails
      );
      res.status(200).json({
        status: "success",
        message: "Leave updated successfully",
        data: updatedleave,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteLeaveById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedleave = await leaveDeleteServices.deleteLeaveById(id);
      res.status(200).json({
        status: "success",
        message: "Leave deleted successfully",
        data: deletedleave,
      });
    } catch (err) {
      next(err);
    }
  };

 
  
  export {
    create,
    getLeaveById,
    getLeaveByStudentId,
    updateLeaveById,
    deleteLeaveById,
    getLeaveByInstructorId
  };
  