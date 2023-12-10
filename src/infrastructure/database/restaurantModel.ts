import mongoose, { Schema, Document, ObjectId } from "mongoose";


export interface IRestaurants extends Document {
    _id: string;
    vendorId: ObjectId;
    restaurantName: string;
    landmark: string;
    locality: string;
    district: string;
    openingTime: string;
    closingTime: string;
    minCost: Number;
    contactNumber: string;
    googlemapLocation: string;
    tableCounts: object;
    location : object
    status: Number;
    banners: Array<string>;
    cuisines: Array<string>;
    facilities: Array<string>
}


const restaurantSchema: Schema = new Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    restaurantName: {
        type: String
    },
    landmark: {
        type: String
    },
    locality: {
        type: String
    },
    district: {
        type: String
    },
    location:{
        longitude:{
            type:Number
        },
        latitude:{
            type:Number
        }
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    minCost: {
        type: Number
    },
    contactNumber: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    tableCounts: {
        type: Object
    },
    banners: {
        type: Array
    },
    cuisines: {
        type: Array
    },
    facilities: {
        type: Array
    },
    googlemapLocation: {
        type: String
    }
},
    {
        timestamps: true
    }
)


const restaurantModel = mongoose.model<IRestaurants>('Restaurant', restaurantSchema)

export default restaurantModel