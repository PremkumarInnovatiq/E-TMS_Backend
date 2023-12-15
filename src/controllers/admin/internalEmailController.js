import {
    sendEmail,
    sendReplyEmail,
    internalEmailGetServices,
    internalEmailPutServices,
    internalEmailDeleteServices
  } from "../../services/internalEmailService";
  
  const create = async function (req, res, next) {
    try {
      const requestData = req.body;
      const mail = await sendEmail(requestData);
      res.status(200).json({
        status: "success",
        message: "Mail sent successfully",
        data: mail,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  
  const reply = async function (req, res, next) {
    try {
      const requestData = req;
      const id =req.params.id
      const mail = await sendReplyEmail(requestData,id);
      res.status(200).json({
        status: "success",
        message: "Mail replied successfully",
        data: mail,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  export async function get(req, res, next) {
    try {
      const internalEmails = await internalEmailGetServices.getMailsByMailId(req.query);
      res.status(200).json({
        status: "success",
        message: "Mails fetched successfully",
        data: internalEmails,
      });
    } catch (e) {
      next(e);
    }
  }
  
  
  const getMailById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const mail = await internalEmailGetServices.getMailById(id);
      res.status(200).json(mail);
    } catch (err) {
      next(err);
    }
  };

  

  
  const updateMailById = async (req, res, next) => {
    try {
      if(req.params){
        const updatedmail = await internalEmailPutServices.updateMailById(
          req.body,
          req.params.id,
        );
        res.status(200).json({
          status: "success",
          message: "Mail updated successfully",
          data: updatedmail,
        });
      } else {
      const userData = req.user._id;
      const updatedmail = await internalEmailPutServices.updateMailById(
        req.body,
        userData,
      );
      res.status(200).json({
        status: "success",
        message: "Mail updated successfully",
        data: updatedmail,
      });
}
    } catch (err) {
      next(err);
    }
  };
  
  const deleteMailsById = async (req, res, next) => {
    try {
      const deletedleave = await internalEmailDeleteServices.deleteMailsById(req.body);
      res.status(200).json({
        status: "success",
        message: "Mail deleted successfully",
        data: deletedleave,
      });
    } catch (err) {
      next(err);
    }
  };

 
  
  export {
    create,
    reply,
    getMailById,
    updateMailById,
    deleteMailsById,
  };
  