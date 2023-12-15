const router = require("express").Router();
var chatbotController = require("../../controllers/admin/chatbotController");
router
  .route("/")
  .get(chatbotController.get)
  .post( chatbotController.create);

router
  .route("/:id")
  .get(chatbotController.getChatById)
  .put( chatbotController.updateChatBotById)
  .delete(chatbotController.deleteChatById);

module.exports = router;
