import express from 'express'
const router = express.Router()
import { multerMid } from '../middlewares/multerMiddleware'

import adminRepository from '../repository/adminRepository'
import adminController from '../../adapter/adminController'
import Adminusecase from '../../usecase/adminUsecase'
import Encrypt from '../utils/hashPassword'
import JwtCreate from '../utils/jwtCreate'

const encrypt = new Encrypt()
const jwtCreate = new JwtCreate()

const repository = new adminRepository()
const usecase = new Adminusecase(repository,encrypt,jwtCreate)
const controller = new adminController(usecase)



router.post('/api/admin/login',(req,res)=>controller.adminLogin(req,res))
router.get('/api/admin/allUsers',(req,res)=>controller.getAllUsers(req,res))
router.put('/api/admin/blockUser',(req,res)=>controller.blockUser(req,res))
router.get('/api/admin/allVendors',(req,res)=>controller.getAllVendors(req,res))
router.put('/api/admin/blockVendor',(req,res)=>controller.blockVendor(req,res))
router.get('/api/admin/logout',(req,res)=>controller.adminLogout(req,res))

//-------------------------------------------------------------------------------------------//

//cuisine and facility routes
import cuisineRepository from '../repository/cuisineRepository'
import cuisineController from '../../adapter/cuisineController'
import CuisineUseCase from '../../usecase/cuisineUsecase'

const cuisineRepo = new cuisineRepository()
const cuisineusecase = new CuisineUseCase(cuisineRepo)
const cuisineControll = new cuisineController(cuisineusecase)

router.get('/api/admin/allFacilities',(req,res)=>cuisineControll.allFacilities(req,res))
router.post('/api/admin/addFacility',(req,res)=>cuisineControll.addFacility(req,res))
router.post('/api/admin/editFacility',(req,res)=>cuisineControll.editFacility(req,res))
router.post('/api/admin/deleteFacility',(req,res)=>cuisineControll.deleteFacility(req,res))

router.post('/api/admin/addCuisine',(req,res)=>cuisineControll.addCuisine(req,res))
router.get('/api/admin/allCuisines',(req,res)=>cuisineControll.allCuisines(req,res))
router.post('/api/admin/editCuisine',(req,res)=>cuisineControll.editCuisine(req,res))
router.post('/api/admin/deleteCuisine',(req,res)=>cuisineControll.deleteCuisine(req,res))

//-------------------------------------------------------------------------------------------//



//restaurant details for admin
import restaurantRepository from '../repository/restaurantRepository'
import restaurantController from '../../adapter/restaurantController'
import RestaurantUsecase from '../../usecase/restaurantUsecase'
import Cloudinary from '../utils/cloudinary'


const restaurantRepo = new restaurantRepository()
const cloudinary = new Cloudinary()
const restaurantusecase = new RestaurantUsecase(restaurantRepo,cloudinary)
const restaurantControll = new restaurantController(restaurantusecase)


router.get('/api/admin/allRequests',(req,res)=>restaurantControll.restaurantRequests(req,res))
router.get('/api/admin/restaurantRequest/:id',(req,res)=>restaurantControll.singleRestaurantRequest(req,res))
router.post('/api/admin/changeRestaurantStatus',(req,res)=>restaurantControll.changeRestaurantStatus(req,res))


//-------------------------------------------------------------------------------------------------------------------//


//banner management by admin
import bannerRepository from '../repository/bannerRepository'
import BannerController from '../../adapter/bannerrController'
import BannerUsecase from '../../usecase/bannerUsecase'

const BannerRepository = new bannerRepository()
const bannerUsecase = new BannerUsecase(BannerRepository,cloudinary)
const bannerController = new BannerController(bannerUsecase)


router.post('/api/admin/addBanner',multerMid.single('image'),(req,res)=>bannerController.addBanner(req,res))
router.get('/api/admin/getBanners',(req,res)=>bannerController.getBanners(req,res))
router.put('/api/admin/deleteBanner',(req,res)=>bannerController.deleteBanner(req,res))


//---------------------------------------------------------------------------------------------------------------------//


//location management by admin
import locationRepository from '../repository/locationRepository'
import locationUsecase from '../../usecase/locationUsecase'
import locationController from '../../adapter/locationController'

const locationRepo = new locationRepository()
const LocationUsecase = new locationUsecase(locationRepo)
const locationControll = new locationController(LocationUsecase)

router.post('/api/admin/addLocality',(req,res)=>locationControll.addLocation(req,res))
router.get('/api/admin/allLocality',(req,res)=>locationControll.allLocality(req,res))


//----------------------------------------------------------------------------------------------------------------------//


import bookingRepository from '../repository/bookingRepository'
import BookingUsecase from '../../usecase/bookingUsecase'
import BookingController from '../../adapter/bookingController'
import StripePayment from '../utils/stripe'
import Session from '../repository/session'

const bookingRepo = new bookingRepository()
const stripe = new StripePayment()
const session =  new Session()
const bookingUsecase = new BookingUsecase(bookingRepo,stripe)
const bookingController = new BookingController(bookingUsecase,session)


router.get('/api/admin/dashboard',(req,res)=>bookingController.adminDashboard(req,res))

//-----------------------------------------------------------------------------------------------------------------------//


export default router


