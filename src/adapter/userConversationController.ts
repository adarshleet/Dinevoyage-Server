import { Request,Response } from "express";
import UserConversationUsecase from "../usecase/userConversationUsercase";
import jwt,{JwtPayload} from "jsonwebtoken";


class UserConversationController{
    private UserConversationUsecase : UserConversationUsecase
    constructor(UserConversationUsecase:UserConversationUsecase){
        this.UserConversationUsecase = UserConversationUsecase
    }


    //restaurant and user chat
    async newConversation(req:Request,res:Response){
        try {
            let senderId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                senderId = decoded.id
            }

            const recieverId = req.query.recieverId as string
            console.log(senderId,recieverId)
            const newConversation = await this.UserConversationUsecase.newConversation(senderId,recieverId)
            res.status(200).json(newConversation)
        } catch (error) {
            console.log(error)
        }
    }


    //get conversations
    async getConversations(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const conversations = await this.UserConversationUsecase.getConversations(restaurantId)
            res.status(200).json(conversations)
        } catch (error) {
            console.log(error)
        }
    }


    async getConversation(req:Request,res:Response){
        try {
            const conversationId = req.query.conversationId as string
            const conversation = await this.UserConversationUsecase.getConversation(conversationId)
            res.status(200).json(conversation)
        } catch (error) {
            console.log(error)
        }
    }

}


export default UserConversationController