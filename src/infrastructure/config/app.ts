import express from 'express'
import userRoute from '../router/userRoute'
import cookieParser from 'cookie-parser'

//configuring express
export const createServer = ()=>{
    try {

        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use(cookieParser())

        app.use(userRoute);

        return app

    } catch (error) {
        console.log(error)
    }
}