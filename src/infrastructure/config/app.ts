import express from 'express'
import userRoute from '../router/userRoute'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//configuring express
export const createServer = ()=>{
    try {

        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use(cookieParser())

        // Allow requests from 'http://localhost:3000'
        app.use(
            cors({
            origin: 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true, // If you need to send cookies or authentication headers
            })
        );

        app.use(userRoute);

        return app

    } catch (error) {
        console.log(error)
    }
}