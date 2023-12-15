import { getQueryParams } from "../utilities/helpers";
import Chatbot from "../models/chatbot";
const mongoose = require('mongoose');

exports.chatbotPostServices = {
    async saveRequest(requestData, userData) {
        try {
            requestData.modifiedBy = userData;
            return await Chatbot.create(requestData);
        } catch (e) {
            throw e;
        }
    },
};

exports.chatbotGetServices = {
    async getAll(query) {
        const params = getQueryParams(query, null, true);
        return await Chatbot.paginate(params.filter, {
            page: params.page,
            limit: params.limit,
            sort: params.sortBy,
        });
    },
    async getChatById(id) {
        try {
            const chat = await Chatbot.findById(id)
            return chat;
        } catch (error) {
            throw error;
        }
    }
};


exports.chatbotPutServices = {
    async updateChatById(requestData, id) {
    try{
        if(id){
            return await Chatbot.findOneAndUpdate({_id: id}, requestData, { new: true });
        }else{
            _throwException('chat not found');
        }
    }catch(e){
        throw e
    }
},
};

exports.chatbotDeleteServices = {
    async deleteChatById(id) {
        try {
            return await Chatbot.findByIdAndDelete(id);
        } catch (e) {
            throw e;
        }
    },
};


