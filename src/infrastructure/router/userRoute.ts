import express from 'express'
const route = express.Router()
import { protect } from '../middlewares/userAuth'

//----------------------------------------------------------------------------------------------------------

import userController from '../../adapter/userController'
import userRepository from '../repository/userRepository'
import Userusecase from '../../usecase/userUsecase'
import TwilioService from '../utils/twilio'
import Encrypt from '../utils/hashPassword'
import JwtCreate from '../utils/jwtCreate'


const twilio =  new TwilioService()
const encrypt = new Encrypt()
const jwtCreate = new JwtCreate()


const repository = new userRepository()
const usecase = new Userusecase(repository,twilio,encrypt,jwtCreate)
const controller = new userController(usecase)

route.post('/api/user/signup',(req,res)=>controller.signUp(req,res))
route.post('/api/user/otpVerify',(req,res)=>controller.otpVerification(req,res));
route.post('/api/user/login',(req,res)=>controller.login(req,res))
route.get('/api/user/logout',(req,res)=>controller.userLogout(req,res))

route.get('/api/user/restaurantsToDisplay',(req,res)=>controller.restaurantsToDisplay(req,res))
route.get('/api/user/singleRestaurant',(req,res)=>controller.singleRestaurant(req,res))


//-----------------------------------------------------------------------------------------------------------


import KitchenController from '../../adapter/kitchenController'
import KitchenUsecase from '../../usecase/kitchenUsecase'
import kitchenRepository from '../repository/kitchenRepository'

const kitchenRepo = new kitchenRepository()
const kitchenUsecase = new KitchenUsecase(kitchenRepo)
const kitchenController = new KitchenController(kitchenUsecase)


route.get('/api/user/allKitchenItems',(req,res)=>kitchenController.allItems(req,res))

route.get('/api/user/kitchenItems',(req,res)=>kitchenController.allKitchenItems(req,res))

//------------------------------------------------------------------------------------------------------------

import bookingRepository from '../repository/bookingRepository'
import BookingController from '../../adapter/bookingController'
import BookingUsecase from '../../usecase/bookingUsecase'
import Session from '../repository/session'

const bookingRepo = new bookingRepository()
const bookingUsecase = new BookingUsecase(bookingRepo)
const session = new Session()
const bookingController = new BookingController(bookingUsecase,session)


route.get('/api/user/seatDetails',(req,res)=>bookingController.dateSeatDetails(req,res))
route.post('/api/user/confirmBooking',(req,res)=>bookingController.confirmBooking(req,res))
route.post('/api/user/tableCounts',(req,res)=>bookingController.tableCounts(req,res))




export default route
