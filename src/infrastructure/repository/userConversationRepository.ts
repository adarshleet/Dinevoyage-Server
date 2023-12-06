import userConversationModel from "../database/userConversation";
import userConversation from "../../domain/userConversation";
import UserConversationRepository from "../../usecase/interface/userConversationRepository,";

class userConversationRepository implements UserConversationRepository{
    async newConversation(senderId:string,recieverId:string) {
        try {

            const chatFound = await userConversationModel.findOne({members:{$all:[senderId,recieverId]}})
            if(chatFound){
                return chatFound
            }


            const conversation = new userConversationModel({
                members:[senderId,recieverId]
            })

            const newConversation = await conversation.save()
            return newConversation

        } catch (error) {
            console.log(error)
        }
    }


    async getConversations(vendorid: string) {
        try {
            const conversations = await userConversationModel.find({members:{$in:[vendorid]}})
            return conversations
        } catch (error) {
            console.log(error)
        }
    }


    async getConversation(conversationId: string) {
        try {
            const conversation = await userConversationModel.findById(conversationId)
            return conversation
        } catch (error) {
            console.log(error)
        }
    }


}

export default userConversationRepository