import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBanner extends Document{
    _id:ObjectId,
    banners:Array<string>
}


const bannerSchema:Schema = new Schema({
    banners:{
        type:Array
    }
})

const BannerModel = mongoose.model<IBanner>('Banner',bannerSchema);

export default BannerModel