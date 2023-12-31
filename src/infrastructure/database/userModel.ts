import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers extends Document {
    _id: ObjectId;
    mobile: String | null;
    email: String | null;
    isBlocked: Boolean | null;
    password: String | null;
    name: String | null;
}

const UsersSchema: Schema = new Schema({
    name: {
        type: String,
        required:true
    },
    mobile: { 
        type: String,
    },
    email: { 
        type: String 
    },
    password: { 
        type: String,
        require:true 
    },
    wallet:{
        type:Number,
        default:0
    },
    walletHistory:[{
        transactionType: String,
        method: String,
        amount: Number,
        date: Date,
    }],   
    isBlocked: { 
        type: Boolean,
        default:false 
    },
},
{
    timestamps:true
}

);

const UserModel = mongoose.model<IUsers>('User', UsersSchema);

export default UserModel;

