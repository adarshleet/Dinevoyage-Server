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
Object.defineProperty(exports, "__esModule", { value: true });
class UserMessageController {
    constructor(UserMessageUsecase) {
        this.UserMessageUsecase = UserMessageUsecase;
    }
    newMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = req.body;
                const newMessage = yield this.UserMessageUsecase.newMessage(message);
                res.status(200).json(newMessage);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.query.conversationId;
                const messages = yield this.UserMessageUsecase.getMessages(conversationId);
                res.status(200).json(messages);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserMessageController;
