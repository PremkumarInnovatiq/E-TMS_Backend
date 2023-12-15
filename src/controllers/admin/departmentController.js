import {
    departmentPostServices,
    departmentGetServices,
    departmentPutServices,
    departmentDeleteServices,
  } from "../../services/departmentService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      if (!requestData.status) {
        requestData.status = "active";
      }
      const department = await departmentPostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Department created successfully",
        data: department,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  export async function get(req, res, next) {
    try {
      const departments = await departmentGetServices.getAll(req.query);
      res.status(200).json({
        status: "success",
        message: "Departments fetched successfully",
        data: departments,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  const getDepartmentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const department = await departmentGetServices.getDepartmentById(id);
      res.status(200).json(department);
    } catch (err) {
      next(err);
    }
  };
  
  const updateDepartmentById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const departmentDetails = req.body.department;
      const { id } = req.params;
      const updatedDepartment = await departmentPutServices.updateDepartmentById(
        id,
        req.body,
        userData,
        departmentDetails
      );
      res.status(200).json({
        status: "success",
        message: "Department updated successfully",
        data: updatedDepartment,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteDepartmentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedDepartment = await departmentDeleteServices.deleteDepartmentById(id);
      res.status(200).json({
        status: "success",
        message: "Department deleted successfully",
        data: deletedDepartment,
      });
    } catch (err) {
      next(err);
    }
  };

 
  
  export {
    create,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById
  };
  