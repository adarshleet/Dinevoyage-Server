"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userConversation_1 = __importDefault(require("../database/userConversation"));
class userConversationRepository {
    newConversation(senderId, recieverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatFound = yield userConversation_1.default.findOne({ members: { $all: [senderId, recieverId] } });
                if (chatFound) {
                    return chatFound;
                }
                const conversation = new userConversation_1.default({
                    members: [senderId, recieverId]
                });
                const newConversation = yield conversation.save();
                return newConversation;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getConversations(vendorid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield userConversation_1.default.find({ members: { $in: [vendorid] } });
                return conversations;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield userConversation_1.default.findById(conversationId);
                return conversation;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = userConversationRepository;
