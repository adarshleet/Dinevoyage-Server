interface CuisineRepository {
    facilityExistCheck(facility: string),
    addFacility(facility: string),
    allFacilities(),
    addCuisine(cuisine:string),
    allCuisines()
}

export default CuisineRepository;