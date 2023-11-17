import LocationRepository from "./interface/locationRepository";


class locationUsecase{
    private locationRepository : LocationRepository
    constructor(locationRepository:LocationRepository){
        this.locationRepository = locationRepository
    }

    async addLocation(district:string,locality:string){
        try {
            const locationAdd = await this.locationRepository.addLocality(district,locality)
            return{
                status:200,
                data:locationAdd
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async allLocality(){
        try {
            const allLocality = await this.locationRepository.allLocality()
            return{
                status:200,
                data:allLocality
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
            
        }
    }

}

export default locationUsecase