import express from 'express'
import { multerMid } from '../middlewares/multerMiddleware'
const route = express.Router()
import { protect } from '../middlewares/vendorAuth'


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

//-------------------------------------------------------------------------------//

//vendor restaurant management
import restaurantRepository from '../repository/restaurantRepository'
import RestaurantUsecase from '../../usecase/restaurantUsecase'
import restaurantController from '../../adapter/restaurantController'
import Cloudinary from '../utils/cloudinary'

const cloudinary = new Cloudinary()
const restaurantRepo = new restaurantRepository()
const restaurantUsecase = new RestaurantUsecase(restaurantRepo,cloudinary)
const restaurantControll = new restaurantController(restaurantUsecase)

route.post('/api/vendor/addRestaurant',(protect),multerMid.array('image'),(req,res)=>restaurantControll.addRestaurant(req,res))
route.get('/api/vendor/getRestaurant',(protect),(req,res)=>restaurantControll.restaurantForVendor(req,res))
route.post('/api/vendor/selectCuisines',(protect),(req,res)=>restaurantControll.selectCuisines(req,res))
route.post('/api/vendor/selectFacilities',(protect),(req,res)=>restaurantControll.selectFacilities(req,res))
route.get('/api/vendor/selectedCuisinesAndFacilities',(protect),(req,res)=>restaurantControll.selectedCuisinesAndFacilities(req,res))
route.get('/api/vendor/getRestaurantDetails',(req,res)=>restaurantControll.getRestaurantDetails(req,res))
route.put('/api/vendor/deleteBanner',(req,res)=>restaurantControll.removeRestaurantBanner(req,res))
route.put('/api/vendor/editRestaurant',multerMid.array('image'),(req,res)=>restaurantControll.editRestaurant(req,res))


//------------------------------------------------------------------------------------------------------------------------//


//vendor category management
import categoryRepository from '../repository/categoryRepository'
import CategoryUsecase from '../../usecase/categoryUsecase'
import CategoryContoller from '../../adapter/categoryController'


const CategoryRepository = new categoryRepository()
const categoryUsecae = new CategoryUsecase(CategoryRepository)
const categoryController = new CategoryContoller(categoryUsecae)

route.post('/api/vendor/addCategory',(protect),(req,res)=>categoryController.addCategory(req,res))
route.get('/api/vendor/categories',(protect),(req,res)=>categoryController.allCategories(req,res))
route.post('/api/vendor/editCategory',(protect),(req,res)=>categoryController.editCategory(req,res))
route.post('/api/vendor/changeCategoryStatus',(protect),(req,res)=>categoryController.changeCategoryStatus(req,res))



//---------------------------------------------------------------------------------------------------------------------//

//vendor kitchen management

import kitchenRepository from '../repository/kitchenRepository'
import KitchenUsecase from '../../usecase/kitchenUsecase'
import KitchenController from '../../adapter/kitchenController'

const KitchenRepository = new kitchenRepository()
const kitchenUsecase = new KitchenUsecase(KitchenRepository,cloudinary)
const kitchenController = new KitchenController(kitchenUsecase)

route.post('/api/vendor/addItem',(protect),multerMid.single('image'),(req,res)=>kitchenController.addItem(req,res))
route.get('/api/vendor/viewItems',(protect),(req,res)=>kitchenController.viewItems(req,res))
route.patch('/api/vendor/editItem',multerMid.single('image'),(req,res)=>kitchenController.editItem(req,res))
route.put('/api/vendor/changeItemStatus',(req,res)=>kitchenController.changeItemStatus(req,res))


export default route