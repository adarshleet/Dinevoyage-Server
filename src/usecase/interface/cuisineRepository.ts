interface CuisineRepository {
    facilityExistCheck(facility: string),
    addFacility(facility: string),
    allFacilities(),
    addCuisine(cuisine:string),
    allCuisines()
    editCuisine(cuisine:string,index:number)
    deleteCuisine(cuisine:string)
}

export default CuisineRepository;