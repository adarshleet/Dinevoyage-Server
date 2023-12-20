
interface LocationRepository{
    addLocality(district:string,locality:string):Promise<any>
    allLocality():Promise<any>
}

export default LocationRepository