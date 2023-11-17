interface BannerRepository{
    addBanner(banner:string)
    getBanners()
    deleteBanner(banner:string)
}

export default BannerRepository