import Banner from "../../domain/banner"
import { UpdateResult } from 'mongodb';


interface BannerRepository{
    addBanner(banner:string):Promise<Banner | UpdateResult>
    getBanners():Promise<Array<Banner> | null>
    deleteBanner(banner:string):Promise<UpdateResult>
}

export default BannerRepository