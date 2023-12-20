import UserMessage from "../../domain/userMessage"

interface UserMessageRepository{
    newMessage(message:UserMessage):Promise<any>
    findMessages(conversationId:string):Promise<any>
}


export default UserMessageRepository