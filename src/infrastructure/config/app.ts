import express from 'express'
import userRoute from '../router/userRoute'
import adminRoute from '../router/adminRoutes'
import vendorRoute from '../router/vendorRoutes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session, { SessionOptions } from 'express-session';
import http from 'http'
import { SocketRepository } from '../utils/socketRepository'


//configuring express
// export const createServer = ()=>{
//     try {

        const app = express()

        const httpServer = http.createServer(app);

        const socket = new SocketRepository(httpServer);

        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use(cookieParser())

        // Allow requests from 'http://localhost:3000'
        app.use(
            cors({
            // origin: process.env.CORS_URL,
            origin: 'https://dinvoyage-client.vercel.app',

            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true, // If you need to send cookies or authentication headers
            })
        );


        const sessionOptions: SessionOptions = {
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: {
              secure: false, 
              maxAge: 3600000, 
            },
        };
      
        app.use(session(sessionOptions));

        app.use(userRoute);
        app.use(adminRoute)
        app.use(vendorRoute)

        export {httpServer}

//     } catch (error) {
//         console.log(error)
//     }
// }