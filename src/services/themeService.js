import { getQueryParams } from "../utilities/helpers";
import Theme from "../models/theme";
const mongoose = require('mongoose');


exports.themePostServices = {
    async saveRequest(requestData, userData) {
        try {
            requestData.modifiedBy = userData;
            return await Theme.create(requestData);
        } catch (e) {
            throw e;
        }
    },
};

exports.themeGetServices = {

    async getThemeByUserId(id) {
        try {
          const theme = await Theme.find( { userId: mongoose.Types.ObjectId(id)})
          return theme;
        } catch (error) {
          throw error;
        }
      }
    };
    
exports.themePutServices = {
  async updateThemeById(id, requestData, userData) {
    try {
      requestData.modifiedBy = userData;
      return await Theme.updateOne({ userId: mongoose.Types.ObjectId(id) }, requestData);
    } catch (e) {
      throw e;
    }
  }
};


