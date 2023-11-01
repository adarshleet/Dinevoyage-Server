import mongoose,{Document, ObjectId, Schema} from "mongoose";

export interface IVendors extends Document{
    _id:ObjectId
    mobile: String | null;
    email: String | null;
    isBlocked: Boolean | null;
    password: String | null;
    vendorName: String | null;
}


const vendorSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type : String
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }

})


const vendorModel = mongoose.model<IVendors>('Vendor',vendorSchema)
export default vendorModel