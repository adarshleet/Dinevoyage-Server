import userConversation from "../../domain/userConversation";

interface UserConversationRepository{
    newConversation(senderId:string,recieverId:string):Promise<any>
    getConversations(vendorid:string):Promise<any>

    getConversation(conversationId:string):Promise<any>
}
export default UserConversationRepository