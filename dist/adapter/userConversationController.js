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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserConversationController {
    constructor(UserConversationUsecase) {
        this.UserConversationUsecase = UserConversationUsecase;
    }
    //restaurant and user chat
    newConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let senderId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    senderId = decoded.id;
                }
                const recieverId = req.query.recieverId;
                console.log(senderId, recieverId);
                const newConversation = yield this.UserConversationUsecase.newConversation(senderId, recieverId);
                res.status(200).json(newConversation);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get conversations
    getConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const conversations = yield this.UserConversationUsecase.getConversations(restaurantId);
                res.status(200).json(conversations);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.query.conversationId;
                const conversation = yield this.UserConversationUsecase.getConversation(conversationId);
                res.status(200).json(conversation);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserConversationController;
