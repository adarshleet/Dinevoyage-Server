import express from 'express'
import userRoute from '../router/userRoute'

//configuring express
export const createServer = ()=>{
    try {

        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use(userRoute);

        return app

    } catch (error) {
        console.log(error)
    }
}