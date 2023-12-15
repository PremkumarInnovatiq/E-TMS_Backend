import {
    videoPlayedPostServices,
    videoPlayedGetServices,
  } from "../../services/videoPlayedService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      const videoPlayed = await videoPlayedPostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Video playback saved successfully",
        data: videoPlayed,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  
  
  const getVideoPlayedById = async (req, res, next) => {
    try {
      const studentId  = req.params.studentId;
      const classId  = req.params.classId;
      const videoId = req.params.videoId;
      const videoPlayed = await videoPlayedGetServices.getVideoPlayedById(studentId,classId,videoId);
      res.status(200).json(videoPlayed);
    } catch (err) {
      next(err);
    }
  };

  

  
  
 
  
  export {
    create,
    getVideoPlayedById,
  };
  