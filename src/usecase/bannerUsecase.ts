import BannerRepository from "./interface/bannerRepository";
import Cloudinary from "../infrastructure/utils/cloudinary";
import Banner from "../domain/banner";


class BannerUsecase{
    private BannerRepository : BannerRepository
    private cloudinary : Cloudinary

    constructor(BannerRepository:BannerRepository,cloudinary:Cloudinary){
        this.BannerRepository = BannerRepository
        this.cloudinary = cloudinary
    }

    async addBanner(banner:any){
        try {
            const bannerUpload = await this.cloudinary.saveToCloudinary(banner)
            const bannerAdd = await this.BannerRepository.addBanner(bannerUpload)
            return{
                status:200,
                data:bannerAdd
            }
        } catch (error) {
            console.log(error)
        }
    }


    async getBanners(){
        try {
            const banners = await this.BannerRepository.getBanners()
            return{
                status:200,
                data:banners
            }
        } catch (error) {
            console.log(error)
        }
    }


    async deleteBanner(banner:string){
        try {
            const bannerDelete = await this.BannerRepository.deleteBanner(banner)
            return{
                status:200,
                data:bannerDelete
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default BannerUsecase