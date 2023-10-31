import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IAdmin extends Document{
    _id: ObjectId,
    email:string,
    password:string
}

const adminSchema: Schema = new Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
})

const AdminModel = mongoose.model<IAdmin>('Admin',adminSchema)
export default AdminModel