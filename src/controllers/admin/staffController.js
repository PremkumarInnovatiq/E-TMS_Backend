
  import { staffPostServices , staffGetServices, staffPutServices, staffDeleteServices} from "../../services/staffService"
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      if (!requestData.status) {
        requestData.status = "active";
      }
      const staff = await staffPostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Staff created successfully",
        data: staff,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  export async function get(req, res, next) {
    try {
      const staffs = await staffGetServices.getAll(req.query);
      res.status(200).json({
        status: "success",
        message: "Staff fetched successfully",
        data: staffs,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  const getStaffById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const staff = await staffGetServices.getStaffById(id);
      res.status(200).json(staff);
    } catch (err) {
      next(err);
    }
  };
  
  const updateStaffById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const staffDetails = req.body.staff;
      const { id } = req.params;
      const updatedStaff = await staffPutServices.updateStaffById(
        id,
        req.body,
        userData,
        staffDetails
      );
      res.status(200).json({
        status: "success",
        message: "Staff updated successfully",
        data: updatedStaff,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteStaffById = async (req, res, next) => {
    try {

      console.log("req",req.params)
      const { id } = req.params;
      const deletedStaff = await staffDeleteServices.deleteStaffById(id);
      res.status(200).json({
        status: "success",
        message: "Staff deleted successfully",
        data: deletedStaff,
      });
    } catch (err) {
      next(err);
    }
  };

 
  
  export {
    create,
    getStaffById,
    updateStaffById,
    deleteStaffById
  };
  