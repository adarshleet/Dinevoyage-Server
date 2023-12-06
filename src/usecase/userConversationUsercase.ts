import UserConversationRepository from "./interface/userConversationRepository,";


class UserConversationUsecase{
    private UserConversationRepository : UserConversationRepository
    constructor(UserConversationRepository:UserConversationRepository){
        this.UserConversationRepository = UserConversationRepository
    }


    async newConversation(senderId:string,recieverId:string){
        try {
            const newConversation = await this.UserConversationRepository.newConversation(senderId,recieverId)
            return{
                status:200,
                data:newConversation
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

    async getConversations(vendorId:string){
        try {
            const conversations = await this.UserConversationRepository.getConversations(vendorId)
            return{
                status:200,
                data:conversations
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }
    

    async getConversation(conversationId:string){
        try {
            const conversation = await this.UserConversationRepository.getConversation(conversationId)
            return{
                status:200,
                data:conversation
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

}

export default UserConversationUsecase