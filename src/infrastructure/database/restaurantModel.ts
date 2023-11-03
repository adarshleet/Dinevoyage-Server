import mongoose,{Schema,Document,ObjectId} from "mongoose";


export interface IRestaurants extends Document{
    _id : string;
    vendorId : ObjectId;
    restaurantName: string;
    landmark :string;
    locality :string;
    district :string;
    openingTime :string;
    closingTime :string;
    minCost :string;
    contactNumber :string;
    googlemapLocation : string;
    tableCounts : object;
    status : string;
    banners : Array<string>;
    cuisines : Array<string>;
    facilities : Array<string>
}


const restaurantSchema: Schema = new Schema({
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Vendor'
    },
    restaurantName:{
        type:String
    },
    landmark:{
        type:String
    },
    locality:{
        type:String
    },
    district:{
        type:String
    },
    openingTime:{
        type:String
    },
    closingTime:{
        type:String
    },
    minCoast:{
        type:Number
    },
    contactNumber:{
        type:String
    },
    status:{
        type:String
    },
    tableCounts:{
        type:Object
    },
    banners:{
        type:Array
    },
    cuisines:{
        type: Array
    },
    facilities:{
        type:Array
    },
    googlemapLocation:{
        type:String
    }
})


const restaurantModel = mongoose.model<IRestaurants>('Restaurant',restaurantSchema)

export default restaurantModel