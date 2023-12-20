interface CloudinaryRepository{
    saveToCloudinary(file:Object):Promise<any>
}

export default CloudinaryRepository