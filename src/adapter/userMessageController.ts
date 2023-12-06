import { Request,Response } from "express"
import UserMessageUsecase from "../usecase/userMessageUsecase"
import jwt,{JwtPayload} from "jsonwebtoken";



class UserMessageController{
    private UserMessageUsecase : UserMessageUsecase
    constructor(UserMessageUsecase:UserMessageUsecase){
        this.UserMessageUsecase = UserMessageUsecase
    }


    async newMessage(req:Request,res:Response){
        try {

            const message = req.body

            const newMessage = await this.UserMessageUsecase.newMessage(message)
            res.status(200).json(newMessage)

        } catch (error) {
            console.log(error)
        }
    }



    async getMessages(req:Request,res:Response){
        try {
            const conversationId = req.query.conversationId as string
            const messages = await this.UserMessageUsecase.getMessages(conversationId)
            res.status(200).json(messages)
        } catch (error) {
            console.log(error)
        }
    }

    
}

export default UserMessageController