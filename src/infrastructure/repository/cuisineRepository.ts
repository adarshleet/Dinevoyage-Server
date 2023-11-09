import cuisineModel from "../database/cusinesAndFacilitiesModel";
import CuisineRepository from "../../usecase/interface/cuisineRepository";

class cuisineRepository implements CuisineRepository{
    async facilityExistCheck(facility: string) {
        
    }

    async addFacility(facility: string) {
        const newFacility = await cuisineModel.updateOne(
            {},
            {$addToSet:{facilities:facility}},
            { upsert: true }
        )
        console.log(newFacility)
        return newFacility
    }


    async allFacilities(){
        const facilities = await cuisineModel.find({},{facilities:1})
        return facilities
    }


    async addCuisine(cuisine: string) {
        const newCuisine = await cuisineModel.updateOne(
            {},
            {$addToSet:{cuisines:cuisine}},
            {upsert:true}
        )
        return newCuisine
    }

    async allCuisines(){
        const cuisines = await cuisineModel.find({},{cuisines:1})
        return cuisines 
    }


    async editCuisine(cuisine: string, index: number) {
        const cuisineExists = await cuisineModel.findOne({ cuisines: { $in: [cuisine] } }); 
        if(cuisineExists){
            return false
        }
        const cuisineEdit = await cuisineModel.updateMany(
            {},
            { $set: { [`cuisines.${index}`]: cuisine } }
        );
        return cuisineEdit
    }


    async deleteCuisine(cuisine:string) {
        const cuisineDelete = await cuisineModel.updateOne(
            {},{$pull:{cuisines:cuisine}}
        );
        return cuisineDelete
    }


}




export default cuisineRepository