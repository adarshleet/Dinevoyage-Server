import UserMessageRepository from "./interface/userMessageRepository";
import UserMessage from "../domain/userMessage";


class UserMessageUsecase{
    private UserMessageRepository : UserMessageRepository

    constructor(UserMessageRepository:UserMessageRepository){
        this.UserMessageRepository = UserMessageRepository
    }


    async newMessage(message:UserMessage){
        try {
            const newMessage = await this.UserMessageRepository.newMessage(message)
            return{
                status:200,
                data:newMessage
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

    
    async getMessages(conversationId:string){
        try {
            const messages =  await this.UserMessageRepository.findMessages(conversationId)
            return{
                status:200,
                data:messages
            }
        } catch (error) {
            return{
                status:400,
                return:error
            }
        }
    }


}

export default UserMessageUsecase