import {
    createUserType,
    // getUserTypeById,
    getAllUserType,
    updateUserType,
    deleteUserType,
  } from '../../services/userType';
  import User from '../../models/User';
  
  export const createUserTypeController = async (req, res, next) => {
    try {
      const createdUserType = await createUserType(req.body);
      res.status(201).json({
        success: true,
        message: "User Type created successfully",
        data: createdUserType
      });
    } catch (error) {
      next(error);
    }
  };
  

  
  export const getAllUserTypeController = async (req, res) => {
    try {
      const userData = await getAllUserType(req.query);
      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const updateUserTypeController = async (req, res, next) => {
    try {
      const userTypeId = req.params.id;
      const updateData = req.body;
      const updatedUserType = await updateUserType(userTypeId, updateData);
      res.status(200).json({
        success: true,
        message: "User type updated successfully",
        data: updatedUserType,
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
  export const deleteUserTypeController = async (req, res, next) => {
    try {
      const deletedUserType = await deleteUserType(req.params.id,req.query);
      res.status(200).json({ success: true, message: "User Type deleted successfully", data: deletedUserType });
    } catch (error) {
      next(error);
    }
  };
  