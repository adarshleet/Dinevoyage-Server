import express from 'express'
const route = express.Router()
import { protect } from '../middlewares/userAuth'




//----------------------------------------------------------------------------------------------------------

import userController from '../../adapter/userController'
import userRepository from '../repository/userRepository'
import Userusecase from '../../usecase/userUsecase'
import TwilioService from '../utils/otpServices'
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

route.get('/api/user/findUser',(req,res)=>controller.findUser(req,res))
route.get('/api/user/findUserById',(req,res)=>controller.findUserById(req,res))
route.put('/api/user/changeName',(protect),(req,res)=>controller.changeName(req,res))
route.post('/api/user/verifyNewMobile',(protect),(req,res)=>controller.verifyNewMobile(req,res))
route.put('/api/user/changeMobile',(protect),(req,res)=>controller.changeMobile(req,res))
route.put('/api/user/changePassword',(protect),(req,res)=>controller.changePassword(req,res))

route.get('/api/user/forgotPassword',(req,res)=>controller.forgotPassword(req,res))
route.post('/api/user/mobileVerify',(req,res)=>controller.verifyMobile(req,res))
route.put('/api/user/forgotPasswordChange',(req,res)=>controller.forgotPasswordChange(req,res))

route.get('/api/user/restaurantsToDisplay',(req,res)=>controller.restaurantsToDisplay(req,res))
route.get('/api/user/singleRestaurant',(req,res)=>controller.singleRestaurant(req,res))
route.get('/api/user/restaurantsForMap',(req,res)=>controller.restaurantsForMap(req,res))



//-----------------------------------------------------------------------------------------------------------


import KitchenController from '../../adapter/kitchenController'
import KitchenUsecase from '../../usecase/kitchenUsecase'
import kitchenRepository from '../repository/kitchenRepository'
import CloudinaryM from '../utils/cloudinary'

const cloudinaryM = new CloudinaryM()
const kitchenRepo = new kitchenRepository()
const kitchenUsecase = new KitchenUsecase(kitchenRepo,cloudinaryM)
const kitchenController = new KitchenController(kitchenUsecase)


route.get('/api/user/allKitchenItems',(req,res)=>kitchenController.allItems(req,res))

route.get('/api/user/kitchenItems',(req,res)=>kitchenController.allKitchenItems(req,res))

//------------------------------------------------------------------------------------------------------------

import bookingRepository from '../repository/bookingRepository'
import BookingController from '../../adapter/bookingController'
import BookingUsecase from '../../usecase/bookingUsecase'
import Session from '../repository/session'
import StripePayment from '../utils/stripe'

const bookingRepo = new bookingRepository()
const stripe = new StripePayment()
const bookingUsecase = new BookingUsecase(bookingRepo,stripe)
const session = new Session()
const bookingController = new BookingController(bookingUsecase,session)


route.get('/api/user/seatDetails',(req,res)=>bookingController.dateSeatDetails(req,res))
route.post('/api/user/tableCounts',(req,res)=>bookingController.tableCounts(req,res))

route.post('/api/user/confirmBooking',(req,res)=>bookingController.confirmBooking(req,res))
route.post('/api/user/proceedToPayment',(protect),(req,res)=>bookingController.makePayment(req,res))
route.get('/api/user/allbookings',(protect),(req,res)=>bookingController.userBookings(req,res))
route.put('/api/user/cancelBooking',(protect),(req,res)=>bookingController.userBookingCancellation(req,res))

route.post('/api/user/payWithWallet',(protect),(req,res)=>bookingController.bookingWithWallet(req,res))

//--------------------------------------------------------------------------------------------------------//

//restaurant details for user
import restaurantRepository from '../repository/restaurantRepository'
import restaurantController from '../../adapter/restaurantController'
import RestaurantUsecase from '../../usecase/restaurantUsecase'
import Cloudinary from '../utils/cloudinary'
const cloudinary = new Cloudinary()

const restaurantRepo = new restaurantRepository()
const restaurantusecase = new RestaurantUsecase(restaurantRepo,cloudinary)
const restaurantControll = new restaurantController(restaurantusecase)


route.get('/api/user/search',(req,res)=>restaurantControll.searchRestaurants(req,res))
route.post('/api/user/filterRestaurants',(req,res)=>restaurantControll.filterRestaurants(req,res))
route.get('/api/user/popularRestaurants',(req,res)=>restaurantControll.popularRestaurants(req,res))

//-----------------------------------------------------------------------------------------------------------//

import CouponRepository from '../repository/couponRepository'
import CouponController from '../../adapter/couponController'
import CouponUsecase from '../../usecase/couponUsecase'

const couponRepo = new CouponRepository()
const couponUsecase = new CouponUsecase(couponRepo)
const couponController = new CouponController(couponUsecase)


route.get('/api/user/couponsToShow',(req,res)=>couponController.couponToShow(req,res))

//-------------------------------------------------------------------------------------------------------------//
import userConversationRepository from '../repository/userConversationRepository'
import UserConversationController from '../../adapter/userConversationController'
import UserConversationUsecase from '../../usecase/userConversationUsercase'

const userConversationRepo = new userConversationRepository()
const userConversationUsercase = new UserConversationUsecase(userConversationRepo)
const userConversationController = new UserConversationController(userConversationUsercase)


route.post('/api/user/newConversation',(req,res)=>userConversationController.newConversation(req,res))
route.get('/api/user/getConversations',(req,res)=>userConversationController.getConversations(req,res))
route.get('/api/user/getConversation',(req,res)=>userConversationController.getConversation(req,res))


//----------------------------------------------------------------------------------------------------------------//

import userMessageRepository from '../repository/userMessage'
import UserMessageController from '../../adapter/userMessageController'
import UserMessageUsecase from '../../usecase/userMessageUsecase'

const userMessageRepo = new userMessageRepository
const userMessageUsecase = new UserMessageUsecase(userMessageRepo)
const userMessageController = new UserMessageController(userMessageUsecase)

route.post('/api/user/newMessage',(req,res)=>userMessageController.newMessage(req,res))
route.get('/api/user/getMessages',(req,res)=>userMessageController.getMessages(req,res))

//------------------------------------------------------------------------------------------------------------------//

import reviewRepository from '../repository/reviewRepository'
import ReviewController from '../../adapter/reviewController'
import ReviewUsecase from '../../usecase/reviewUsecase'

const reviewRepo = new reviewRepository()
const reviewUsecase = new ReviewUsecase(reviewRepo)
const reviewController = new ReviewController(reviewUsecase)

route.post('/api/user/addReview',(protect),(req,res)=>reviewController.addReview(req,res))
route.get('/api/user/getReviews',(req,res)=>reviewController.getReviews(req,res))
route.get('/api/user/averageRating',(req,res)=>reviewController.getAverage(req,res))
route.get('/api/user/userInBooking',(protect),(req,res)=>reviewController.userInBooking(req,res))
route.get('/api/user/findReview',(protect),(req,res)=>reviewController.findReview(req,res))
route.put('/api/user/editReview',(protect),(req,res)=>reviewController.editReview(req,res))



export default route
