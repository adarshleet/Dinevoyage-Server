import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface ILocation extends Document{
    _id:ObjectId,
    district:string,
    location:Array<string>
}


const locationSchema:Schema = new Schema({
    district:{
        type:String
    },
    locations:[{
        locality:{
            type:String
        },
        restaurantCount:{
            type:Number,
            default:0
        }
    }]
},{
    timestamps:true
}
)


const locationModel = mongoose.model<ILocation>('Location',locationSchema)

export default locationModel