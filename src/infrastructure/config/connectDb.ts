import mongoose from 'mongoose'

//connecting to db
export const connectDb = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        if(MONGO_URI){
            await mongoose.connect(MONGO_URI)
        }
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
}