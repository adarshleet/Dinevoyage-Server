interface CuisineRepository {
    facilityExistCheck(facility: string),

    addFacility(facility: string),
    allFacilities(),
    editFacility(facility:string,index:number)
    deleteFacilty(facility:string)

    addCuisine(cuisine:string),
    allCuisines()
    editCuisine(cuisine:string,index:number)
    deleteCuisine(cuisine:string)
}

export default CuisineRepository;