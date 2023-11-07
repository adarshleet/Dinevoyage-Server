import express from 'express'
import { multerMid } from '../middlewares/multerMiddleware'
const route = express.Router()


import vendorController from '../../adapter/vendorController'
import vendoRepository from '../repository/vendorRepository'
import Vendorusecase from '../../usecase/vendorUsecase'
import TwilioService from '../utils/twilio'
import Encrypt from '../utils/hashPassword'
import JwtCreate from '../utils/jwtCreate'

const twilio = new TwilioService()
const encrypt = new Encrypt() 
const jwtCreate = new JwtCreate()

const repository = new vendoRepository()
const usecase = new Vendorusecase(repository,twilio,encrypt,jwtCreate)
const controller = new vendorController(usecase)


route.post('/api/vendor/register',(req,res)=>controller.vendorRegister(req,res))
route.post('/api/vendor/otpverify',(req,res)=>controller.otpVerification(req,res))
route.post('/api/vendor/login',(req,res)=>controller.login(req,res))
route.get('/api/vendor/vendorLogout',(req,res)=>controller.vendorLogout(req,res))


//vendor restaurant management
import restaurantRepository from '../repository/restaurantRepository'
import RestaurantUsecase from '../../usecase/restaurantUsecase'
import restaurantController from '../../adapter/restaurantController'
import Cloudinary from '../utils/cloudinary'

const cloudinary = new Cloudinary()
const restaurantRepo = new restaurantRepository()
const restaurantUsecase = new RestaurantUsecase(restaurantRepo,cloudinary)
const restaurantControll = new restaurantController(restaurantUsecase)

route.post('/api/vendor/addRestaurant',multerMid.array('image'),(req,res)=>restaurantControll.addRestaurant(req,res))
route.get('/api/vendor/getRestaurant',(req,res)=>restaurantControll.restaurantForVendor(req,res))

export default route