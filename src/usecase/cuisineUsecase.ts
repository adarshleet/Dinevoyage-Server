import CuisineRepository from "./interface/cuisineRepository"

class CuisineUseCase{
    private cuisineRepository:CuisineRepository

    constructor(cuisineRepository:CuisineRepository){
        this.cuisineRepository = cuisineRepository
    }

    async addFacility(facility:string){
        try {
            const facilityStatus = await this.cuisineRepository.addFacility(facility)
            console.log(facilityStatus)
            return{
                status:200,
                data:facilityStatus
            }
        } catch (error) {
            console.log(error)
        }
    }


    async allFacilities(){
        try {
            const facilities = await this.cuisineRepository.allFacilities()
            return{
                status:200,
                data:facilities
            }
        } catch (error) {
            console.log(error)
        }
    }


    async addCuisine(cuisine:string){
        try {
            const cuisineStatus = await this.cuisineRepository.addCuisine(cuisine)
            return{
                status:200,
                data: cuisineStatus
            }
        } catch (error) {
            console.log(error)
        }
    }

    async allCuisines(){
        try {
            const allCuisines = await this.cuisineRepository.allCuisines()
            return{
                status:200,
                data:allCuisines
            }
        } catch (error) {
            console.log(error)
        }
    }

    async editCuisine(cuisine:string,index:number){
        try {
            const cuisineEdit = await this.cuisineRepository.editCuisine(cuisine,index)
            return{
                status:200,
                data : cuisineEdit
            }
        } catch (error) {
            console.log(error)
        }
    }


    async deleteCuisine(cuisine:string){
        try {
            const cuisineDelete = await this.cuisineRepository.deleteCuisine(cuisine)
            return{
                status:200,
                data:cuisineDelete
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default CuisineUseCase