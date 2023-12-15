import {
    chatbotPostServices,
    chatbotGetServices,
    chatbotPutServices,
    chatbotDeleteServices,
  } from "../../services/chatbotService";
  
  const create = async function (req, res, next) {
    try {
      const userData = req.user._id;
      const requestData = req.body;
      const chat = await chatbotPostServices.saveRequest(requestData, userData);
      res.status(200).json({
        status: "success",
        message: "Chat saved successfully",
        data: chat,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  export async function get(req, res, next) {
    try {
      const chats = await chatbotGetServices.getAll(req.query);
      res.status(200).json({
        status: "success",
        message: "Chats fetched successfully",
        data: chats,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  const getChatById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const chat = await chatbotGetServices.getChatById(id);
      res.status(200).json(chat);
    } catch (err) {
      next(err);
    }
  };


  const updateChatBotById = async (req, res, next) => {
    try {
      const userData = req.user._id;
      const chatDetails = req.body;
      const { id } = req.params;
      const updatedChat = await chatbotPutServices.updateChatById(
        id,
        req.body,
        userData,
        chatDetails
      );
      res.status(200).json({
        status: "success",
        message: "Chat updated successfully",
        data: updatedChat,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const deleteChatById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedchat = await chatbotDeleteServices.deleteChatById(id);
      res.status(200).json({
        status: "success",
        message: "Chat deleted successfully",
        data: deletedchat,
      });
    } catch (err) {
      next(err);
    }
  };

 
  
  export {
    create,
    getChatById,
    updateChatBotById,
    deleteChatById,
  };
  