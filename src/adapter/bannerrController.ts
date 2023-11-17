import { Request,Response } from "express";
import BannerUsecase from "../usecase/bannerUsecase";



class BannerController{
    private bannerUsecase : BannerUsecase

    constructor(bannerUsecase:BannerUsecase){
        this.bannerUsecase = bannerUsecase
    }


    async addBanner(req:Request,res:Response){
        try {
            const banner = req.file
            const bannerAdd = await this.bannerUsecase.addBanner(banner)
            res.status(200).json(bannerAdd)
        } catch (error) {
            console.log(error)
        }
    }


    async getBanners(req:Request,res:Response){
        try {
            const banners = await this.bannerUsecase.getBanners()
            res.status(200).json(banners)
        } catch (error) {
            console.log(error)
        }
    }



    async deleteBanner(req:Request,res:Response){
        try {
            const banner = req.query.banner as string
            const bannerDelete = await this.bannerUsecase.deleteBanner(banner)
            res.status(200).json(bannerDelete)
        } catch (error) {
            console.log(error)
        }
    }


}

export default BannerController