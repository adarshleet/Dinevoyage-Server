import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUserMessages{
    _id : string,
    conversationId:string,
    sender:string,
    text:string
}


const userMessageSchema:Schema = new Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
},{
    timestamps:true
})


const userMessageModel = mongoose.model<IUserMessages>('UserMessage',userMessageSchema)

export default userMessageModel