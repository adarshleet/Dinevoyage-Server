import userMessageModel from "../database/userMessage";
import UserMessageRepository from "../../usecase/interface/userMessageRepository";
import UserMessage from "../../domain/userMessage";
 
class userMessageRepository implements UserMessageRepository{
    async newMessage(message: UserMessage) {
        try {
            const newMessage = new userMessageModel(message)
            const savedMessage = await newMessage.save()
            return savedMessage
        } catch (error) {
            console.log(error)
        }
    }


    async findMessages(conversationId: string) {
        try {
            const messages = await userMessageModel.find({conversationId})
            return messages
        } catch (error) {
            console.log(error)
        }
    }

}


export default userMessageRepository