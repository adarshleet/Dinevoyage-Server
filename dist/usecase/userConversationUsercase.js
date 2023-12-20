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
class UserConversationUsecase {
    constructor(UserConversationRepository) {
        this.UserConversationRepository = UserConversationRepository;
    }
    newConversation(senderId, recieverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newConversation = yield this.UserConversationRepository.newConversation(senderId, recieverId);
                return {
                    status: 200,
                    data: newConversation
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    getConversations(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield this.UserConversationRepository.getConversations(vendorId);
                return {
                    status: 200,
                    data: conversations
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    getConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield this.UserConversationRepository.getConversation(conversationId);
                return {
                    status: 200,
                    data: conversation
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
}
exports.default = UserConversationUsecase;
