import userConversation from "../../domain/userConversation";

interface UserConversationRepository{
    newConversation(senderId:string,recieverId:string)
    getConversations(vendorid:string)

    getConversation(conversationId:string)
}
export default UserConversationRepository