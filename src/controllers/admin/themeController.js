import {
    themePostServices,
    themeGetServices,
    themePutServices
  } from "../../services/themeService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      const theme = await themePostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Theme added successfully",
        data: theme,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  const getThemeByUserId = async (req, res, next) => {
    try {
      const  id = req.params.id;
      const theme = await themeGetServices.getThemeByUserId(id);
      res.status(200).json({
        status: "success",
        message: "Theme fetched successfully",
        data: theme,
      });
    } catch (err) {
      next(err);
    }
  };

  const updateThemeById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const { id } = req.params;
      const updatedTheme = await themePutServices.updateThemeById(id,req.body,userData);
      res.status(200).json({
        status: "success",
        message: "Theme updated successfully",
        data: updatedTheme,
      });
    } catch (err) {
      next(err);
    }
  };


  
//   export async function get(req, res, next) {
//     try {
//       const leaves = await themeGetServices.getAll(req.query);
//       res.status(200).json({
//         status: "success",
//         message: "Leaves fetched successfully",
//         data: leaves,
//       });
//     } catch (e) {
//       next(e);
//     }
//   }
  

 
  
  export {
    create,
    getThemeByUserId,
    updateThemeById
  };
  