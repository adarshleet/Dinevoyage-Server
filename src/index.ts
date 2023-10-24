import { createServer } from "./infrastructure/config/app";
import { connectDb } from "./infrastructure/config/connectDb";
import dotenv from 'dotenv'
dotenv.config()

const startServer = async()=>{
    try {
        await connectDb()

        const app = createServer()

        app?.listen(3000,()=>{
            console.log('connected to server')
        })

    } catch (error) {
        console.log(error)
    }
}
startServer();