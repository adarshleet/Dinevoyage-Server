"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const userAuth_1 = require("../middlewares/userAuth");
//----------------------------------------------------------------------------------------------------------
const userController_1 = __importDefault(require("../../adapter/userController"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const userUsecase_1 = __importDefault(require("../../usecase/userUsecase"));
const twilio_1 = __importDefault(require("../utils/twilio"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const jwtCreate_1 = __importDefault(require("../utils/jwtCreate"));
const twilio = new twilio_1.default();
const encrypt = new hashPassword_1.default();
const jwtCreate = new jwtCreate_1.default();
const repository = new userRepository_1.default();
const usecase = new userUsecase_1.default(repository, twilio, encrypt, jwtCreate);
const controller = new userController_1.default(usecase);
route.post('/api/user/signup', (req, res) => controller.signUp(req, res));
route.post('/api/user/otpVerify', (req, res) => controller.otpVerification(req, res));
route.post('/api/user/login', (req, res) => controller.login(req, res));
route.get('/api/user/logout', (req, res) => controller.userLogout(req, res));
route.get('/api/user/findUser', (req, res) => controller.findUser(req, res));
route.get('/api/user/findUserById', (req, res) => controller.findUserById(req, res));
route.put('/api/user/changeName', (userAuth_1.protect), (req, res) => controller.changeName(req, res));
route.post('/api/user/verifyNewMobile', (userAuth_1.protect), (req, res) => controller.verifyNewMobile(req, res));
route.put('/api/user/changeMobile', (userAuth_1.protect), (req, res) => controller.changeMobile(req, res));
route.put('/api/user/changePassword', (userAuth_1.protect), (req, res) => controller.changePassword(req, res));
route.get('/api/user/forgotPassword', (req, res) => controller.forgotPassword(req, res));
route.post('/api/user/mobileVerify', (req, res) => controller.verifyMobile(req, res));
route.put('/api/user/forgotPasswordChange', (req, res) => controller.forgotPasswordChange(req, res));
route.get('/api/user/restaurantsToDisplay', (req, res) => controller.restaurantsToDisplay(req, res));
route.get('/api/user/singleRestaurant', (req, res) => controller.singleRestaurant(req, res));
route.get('/api/user/restaurantsForMap', (req, res) => controller.restaurantsForMap(req, res));
//-----------------------------------------------------------------------------------------------------------
const kitchenController_1 = __importDefault(require("../../adapter/kitchenController"));
const kitchenUsecase_1 = __importDefault(require("../../usecase/kitchenUsecase"));
const kitchenRepository_1 = __importDefault(require("../repository/kitchenRepository"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const cloudinaryM = new cloudinary_1.default();
const kitchenRepo = new kitchenRepository_1.default();
const kitchenUsecase = new kitchenUsecase_1.default(kitchenRepo, cloudinaryM);
const kitchenController = new kitchenController_1.default(kitchenUsecase);
route.get('/api/user/allKitchenItems', (req, res) => kitchenController.allItems(req, res));
route.get('/api/user/kitchenItems', (req, res) => kitchenController.allKitchenItems(req, res));
//------------------------------------------------------------------------------------------------------------
const bookingRepository_1 = __importDefault(require("../repository/bookingRepository"));
const bookingController_1 = __importDefault(require("../../adapter/bookingController"));
const bookingUsecase_1 = __importDefault(require("../../usecase/bookingUsecase"));
const session_1 = __importDefault(require("../repository/session"));
const stripe_1 = __importDefault(require("../utils/stripe"));
const bookingRepo = new bookingRepository_1.default();
const stripe = new stripe_1.default();
const bookingUsecase = new bookingUsecase_1.default(bookingRepo, stripe);
const session = new session_1.default();
const bookingController = new bookingController_1.default(bookingUsecase, session);
route.get('/api/user/seatDetails', (req, res) => bookingController.dateSeatDetails(req, res));
route.post('/api/user/tableCounts', (req, res) => bookingController.tableCounts(req, res));
route.post('/api/user/confirmBooking', (req, res) => bookingController.confirmBooking(req, res));
route.post('/api/user/proceedToPayment', (userAuth_1.protect), (req, res) => bookingController.makePayment(req, res));
route.get('/api/user/allbookings', (userAuth_1.protect), (req, res) => bookingController.userBookings(req, res));
route.put('/api/user/cancelBooking', (userAuth_1.protect), (req, res) => bookingController.userBookingCancellation(req, res));
route.post('/api/user/payWithWallet', (userAuth_1.protect), (req, res) => bookingController.bookingWithWallet(req, res));
//--------------------------------------------------------------------------------------------------------//
//restaurant details for user
const restaurantRepository_1 = __importDefault(require("../repository/restaurantRepository"));
const restaurantController_1 = __importDefault(require("../../adapter/restaurantController"));
const restaurantUsecase_1 = __importDefault(require("../../usecase/restaurantUsecase"));
const cloudinary_2 = __importDefault(require("../utils/cloudinary"));
const cloudinary = new cloudinary_2.default();
const restaurantRepo = new restaurantRepository_1.default();
const restaurantusecase = new restaurantUsecase_1.default(restaurantRepo, cloudinary);
const restaurantControll = new restaurantController_1.default(restaurantusecase);
route.get('/api/user/search', (req, res) => restaurantControll.searchRestaurants(req, res));
route.post('/api/user/filterRestaurants', (req, res) => restaurantControll.filterRestaurants(req, res));
//-----------------------------------------------------------------------------------------------------------//
const couponRepository_1 = __importDefault(require("../repository/couponRepository"));
const couponController_1 = __importDefault(require("../../adapter/couponController"));
const couponUsecase_1 = __importDefault(require("../../usecase/couponUsecase"));
const couponRepo = new couponRepository_1.default();
const couponUsecase = new couponUsecase_1.default(couponRepo);
const couponController = new couponController_1.default(couponUsecase);
route.get('/api/user/couponsToShow', (req, res) => couponController.couponToShow(req, res));
//-------------------------------------------------------------------------------------------------------------//
const userConversationRepository_1 = __importDefault(require("../repository/userConversationRepository"));
const userConversationController_1 = __importDefault(require("../../adapter/userConversationController"));
const userConversationUsercase_1 = __importDefault(require("../../usecase/userConversationUsercase"));
const userConversationRepo = new userConversationRepository_1.default();
const userConversationUsercase = new userConversationUsercase_1.default(userConversationRepo);
const userConversationController = new userConversationController_1.default(userConversationUsercase);
route.post('/api/user/newConversation', (req, res) => userConversationController.newConversation(req, res));
route.get('/api/user/getConversations', (req, res) => userConversationController.getConversations(req, res));
route.get('/api/user/getConversation', (req, res) => userConversationController.getConversation(req, res));
//----------------------------------------------------------------------------------------------------------------//
const userMessage_1 = __importDefault(require("../repository/userMessage"));
const userMessageController_1 = __importDefault(require("../../adapter/userMessageController"));
const userMessageUsecase_1 = __importDefault(require("../../usecase/userMessageUsecase"));
const userMessageRepo = new userMessage_1.default;
const userMessageUsecase = new userMessageUsecase_1.default(userMessageRepo);
const userMessageController = new userMessageController_1.default(userMessageUsecase);
route.post('/api/user/newMessage', (req, res) => userMessageController.newMessage(req, res));
route.get('/api/user/getMessages', (req, res) => userMessageController.getMessages(req, res));
//------------------------------------------------------------------------------------------------------------------//
const reviewRepository_1 = __importDefault(require("../repository/reviewRepository"));
const reviewController_1 = __importDefault(require("../../adapter/reviewController"));
const reviewUsecase_1 = __importDefault(require("../../usecase/reviewUsecase"));
const reviewRepo = new reviewRepository_1.default();
const reviewUsecase = new reviewUsecase_1.default(reviewRepo);
const reviewController = new reviewController_1.default(reviewUsecase);
route.post('/api/user/addReview', (userAuth_1.protect), (req, res) => reviewController.addReview(req, res));
route.get('/api/user/getReviews', (req, res) => reviewController.getReviews(req, res));
route.get('/api/user/averageRating', (req, res) => reviewController.getAverage(req, res));
route.get('/api/user/userInBooking', (userAuth_1.protect), (req, res) => reviewController.userInBooking(req, res));
route.get('/api/user/findReview', (userAuth_1.protect), (req, res) => reviewController.findReview(req, res));
route.put('/api/user/editReview', (userAuth_1.protect), (req, res) => reviewController.editReview(req, res));
exports.default = route;
