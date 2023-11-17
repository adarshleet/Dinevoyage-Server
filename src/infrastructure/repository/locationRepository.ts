import locationModel from "../database/locationModel";
import LocationRepository from "../../usecase/interface/locationRepository";

class locationRepository implements LocationRepository{
    async addLocality(district: string, locality: string) {
        const localityFound = await locationModel.findOne({district,'locations.locality':locality})
        if(localityFound){
            return false
        }
        else{
            const localityAdd = await locationModel.updateOne({district},{$addToSet:{locations:{locality}}},{upsert:true})
            return localityAdd
        } 
    }



    async allLocality() {
        try {
            const allLocality = await locationModel.find({})
            return allLocality
        } catch (error) {
            console.log(error)
        }
    }
}


export default locationRepository