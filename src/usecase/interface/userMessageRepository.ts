import UserMessage from "../../domain/userMessage"

interface UserMessageRepository{
    newMessage(message:UserMessage)
    findMessages(conversationId:string)
}


export default UserMessageRepository