import { getQueryParams } from "../utilities/helpers";
import Departments from "../models/department"

exports.departmentPostServices = {
  async saveRequest(requestData, userData) {
    try {
      requestData.modifiedBy = userData;
      return await Departments.create(requestData);
    } catch (e) {
      throw e;
    }
  },
};

exports.departmentGetServices = {
  async getAll(query) {
    const params = getQueryParams(query, null, true);
    return await Departments.paginate(params.filter, {
      page: params.page,
      limit: params.limit,
      sort: params.sortBy,
    });
  },
  
 

  async getDepartmentById(id) {
    try {
      const department = await Departments.findById(id)
      return department;
    } catch (error) {
      throw error;
    }
  }
};

exports.departmentPutServices = {
  async updateDepartmentById(id, requestData, userData, departmentDetails) {
    try {
      requestData.modifiedBy = userData;
      requestData.title = departmentDetails;
      return await Departments.findByIdAndUpdate(id, requestData, { new: true });
    } catch (e) {
      throw e;
    }
  },
};

exports.departmentDeleteServices = {
  async deleteDepartmentById(id) {
    try {
      return await Departments.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  },
};


