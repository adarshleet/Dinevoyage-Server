import BannerRepository from "../../usecase/interface/bannerRepository";
import BannerModel from "../database/bannerModel";
import Banner from "../../domain/banner";
import { UpdateResult } from 'mongodb';



class bannerRepository implements BannerRepository{
    async addBanner(banner: string):Promise<Banner | UpdateResult> {
        const bannerAdd = await BannerModel.updateOne({},{$push:{banners:banner}})
        return bannerAdd
    }



    async getBanners():Promise<Array<Banner> | null> {
        const banners = await BannerModel.findOne({}) as Array<Banner> | null
        return banners
    }


    async deleteBanner(banner: string):Promise<UpdateResult> {
        const bannerDelete =  await BannerModel.updateOne({},{$pull:{banners:banner}})
        return bannerDelete
    }

}

export default bannerRepository