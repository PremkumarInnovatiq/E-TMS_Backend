import { getQueryParams } from "../utilities/helpers";
import Staff from "../models/staff"

exports.staffPostServices = {
  async saveRequest(requestData, userData) {
    try {
      requestData.modifiedBy = userData;
      return await Staff.create(requestData);
    } catch (e) {
      throw e;
    }
  },
};

exports.staffGetServices = {
  async getAll(query) {
    const params = getQueryParams(query, null, true);
    return await Staff.find({status:'active'})
  },
  
 

  async getStaffById(id) {
    try {
      const staff = await Staff.findById(id)
      return staff;
    } catch (error) {
      throw error;
    }
  }
};

exports.instructorList = async function (req, res, next) {
	try {
		const query = req.query;
		const body = req.body;      
        const user = await userGetServices.getRequest(query,body)
        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: user
        });
    } catch (e) {
        next(e)
    }
	
}

exports.staffPutServices = {
  async updateStaffById(id, requestData, userData, stafftDetails) {
    try {
      requestData.modifiedBy = userData;
      requestData.title = stafftDetails;
      return await Staff.findByIdAndUpdate(id, requestData, { new: true });
    } catch (e) {
      throw e;
    }
  },
};

exports.staffDeleteServices = {
  async deleteStaffById(id) {
    try {
      return await Staff.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  },
};


