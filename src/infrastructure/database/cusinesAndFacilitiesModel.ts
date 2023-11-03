import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface ICuisines extends Document{
    _id : ObjectId;
    cuisines : Array<string> | null;
    facilities : Array<string> | null;
}

const cuisineSchema: Schema = new Schema({
    cuisines:{
        type:Array
    },

    facilities:{
        type:Array
    }
})


const cuisineModel = mongoose.model<ICuisines>('cuisine',cuisineSchema)
export default cuisineModel