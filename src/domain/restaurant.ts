import { ObjectId } from "mongoose";

interface Restaurant{
    id ?: string,
    vendorId?: ObjectId,
    restaurantName?: string,
    landmark?:string,
    locality?:string,
    district?:string,
    openingTime?:string,
    closingTime?:string,
    minCost?:string,
    contactNumber?:string,
    tableCounts?: object,
    status?: string,
    banners?: Array<Object> | any
}

export default Restaurant