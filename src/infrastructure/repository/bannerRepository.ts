import BannerRepository from "../../usecase/interface/bannerRepository";
import BannerModel from "../database/bannerModel";


class bannerRepository implements BannerRepository{
    async addBanner(banner: string) {
        const bannerAdd = await BannerModel.updateOne({},{$push:{banners:banner}},{upsert:true})
        return bannerAdd
    }



    async getBanners() {
        const banners = await BannerModel.findOne({})
        return banners
    }


    async deleteBanner(banner: string) {
        const bannerDelete =  await BannerModel.updateOne({},{$pull:{banners:banner}})
        return bannerDelete
    }

}

export default bannerRepository