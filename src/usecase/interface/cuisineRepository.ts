interface CuisineRepository {

    addFacility(facility: string):Promise<any>;
    allFacilities():Promise<any>
    editFacility(facility:string,index:number):Promise<any>
    deleteFacilty(facility:string):Promise<any>

    addCuisine(cuisine:string):Promise<any>
    allCuisines():Promise<any>
    editCuisine(cuisine:string,index:number):Promise<any>
    deleteCuisine(cuisine:string):Promise<any>
}

export default CuisineRepository;