import mongoose, { Schema, Document, ObjectId } from 'mongoose';


export interface IUserConversation extends Document{
    _id :string,
    members : Array<string>
}


const userConversationSchema:Schema = new Schema({
    members:{
        type:Array
    }
},
{
    timestamps:true
}
)


const userConversationModel = mongoose.model<IUserConversation>('UserConversation',userConversationSchema)

export default userConversationModel