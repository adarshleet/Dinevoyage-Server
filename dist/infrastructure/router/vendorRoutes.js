"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerMiddleware_1 = require("../middlewares/multerMiddleware");
const route = express_1.default.Router();
const vendorAuth_1 = require("../middlewares/vendorAuth");
const vendorController_1 = __importDefault(require("../../adapter/vendorController"));
const vendorRepository_1 = __importDefault(require("../repository/vendorRepository"));
const vendorUsecase_1 = __importDefault(require("../../usecase/vendorUsecase"));
const twilio_1 = __importDefault(require("../utils/twilio"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const jwtCreate_1 = __importDefault(require("../utils/jwtCreate"));
const twilio = new twilio_1.default();
const encrypt = new hashPassword_1.default();
const jwtCreate = new jwtCreate_1.default();
const repository = new vendorRepository_1.default();
const usecase = new vendorUsecase_1.default(repository, twilio, encrypt, jwtCreate);
const controller = new vendorController_1.default(usecase);
route.post('/api/vendor/register', (req, res) => controller.vendorRegister(req, res));
route.post('/api/vendor/otpverify', (req, res) => controller.otpVerification(req, res));
route.post('/api/vendor/login', (req, res) => controller.login(req, res));
route.get('/api/vendor/vendorLogout', (req, res) => controller.vendorLogout(req, res));
route.get('/api/vendor/getVendorDetails', (vendorAuth_1.protect), (req, res) => controller.getVendorDetails(req, res));
route.put('/api/vendor/changeName', (vendorAuth_1.protect), (req, res) => controller.changeVendorName(req, res));
route.post('/api/vendor/verifyMobile', (vendorAuth_1.protect), (req, res) => controller.verifyNewMobile(req, res));
route.put('/api/vendor/changeMobile', (vendorAuth_1.protect), (req, res) => controller.changeMobile(req, res));
route.put('/api/vendor/changePassword', (vendorAuth_1.protect), (req, res) => controller.changePassword(req, res));
route.get('/api/vendor/forgotPassword', (req, res) => controller.forgotPassword(req, res));
route.put('/api/vendor/forgotPasswordChange', (req, res) => controller.forgotPasswordChange(req, res));
//-------------------------------------------------------------------------------//
//vendor restaurant management
const restaurantRepository_1 = __importDefault(require("../repository/restaurantRepository"));
const restaurantUsecase_1 = __importDefault(require("../../usecase/restaurantUsecase"));
const restaurantController_1 = __importDefault(require("../../adapter/restaurantController"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const cloudinary = new cloudinary_1.default();
const restaurantRepo = new restaurantRepository_1.default();
const restaurantUsecase = new restaurantUsecase_1.default(restaurantRepo, cloudinary);
const restaurantControll = new restaurantController_1.default(restaurantUsecase);
route.post('/api/vendor/addRestaurant', (vendorAuth_1.protect), multerMiddleware_1.multerMid.array('image'), (req, res) => restaurantControll.addRestaurant(req, res));
route.get('/api/vendor/getRestaurant', (vendorAuth_1.protect), (req, res) => restaurantControll.restaurantForVendor(req, res));
route.post('/api/vendor/selectCuisines', (vendorAuth_1.protect), (req, res) => restaurantControll.selectCuisines(req, res));
route.post('/api/vendor/selectFacilities', (vendorAuth_1.protect), (req, res) => restaurantControll.selectFacilities(req, res));
route.get('/api/vendor/selectedCuisinesAndFacilities', (vendorAuth_1.protect), (req, res) => restaurantControll.selectedCuisinesAndFacilities(req, res));
route.get('/api/vendor/getRestaurantDetails', (req, res) => restaurantControll.getRestaurantDetails(req, res));
route.put('/api/vendor/deleteBanner', (req, res) => restaurantControll.removeRestaurantBanner(req, res));
route.put('/api/vendor/editRestaurant', multerMiddleware_1.multerMid.array('image'), (req, res) => restaurantControll.editRestaurant(req, res));
//------------------------------------------------------------------------------------------------------------------------//
//vendor category management
const categoryRepository_1 = __importDefault(require("../repository/categoryRepository"));
const categoryUsecase_1 = __importDefault(require("../../usecase/categoryUsecase"));
const categoryController_1 = __importDefault(require("../../adapter/categoryController"));
const CategoryRepository = new categoryRepository_1.default();
const categoryUsecae = new categoryUsecase_1.default(CategoryRepository);
const categoryController = new categoryController_1.default(categoryUsecae);
route.post('/api/vendor/addCategory', (vendorAuth_1.protect), (req, res) => categoryController.addCategory(req, res));
route.get('/api/vendor/categories', (vendorAuth_1.protect), (req, res) => categoryController.allCategories(req, res));
route.post('/api/vendor/editCategory', (vendorAuth_1.protect), (req, res) => categoryController.editCategory(req, res));
route.post('/api/vendor/changeCategoryStatus', (vendorAuth_1.protect), (req, res) => categoryController.changeCategoryStatus(req, res));
//---------------------------------------------------------------------------------------------------------------------//
//vendor kitchen management
const kitchenRepository_1 = __importDefault(require("../repository/kitchenRepository"));
const kitchenUsecase_1 = __importDefault(require("../../usecase/kitchenUsecase"));
const kitchenController_1 = __importDefault(require("../../adapter/kitchenController"));
const KitchenRepository = new kitchenRepository_1.default();
const kitchenUsecase = new kitchenUsecase_1.default(KitchenRepository, cloudinary);
const kitchenController = new kitchenController_1.default(kitchenUsecase);
route.post('/api/vendor/addItem', (vendorAuth_1.protect), multerMiddleware_1.multerMid.single('image'), (req, res) => kitchenController.addItem(req, res));
route.get('/api/vendor/viewItems', (vendorAuth_1.protect), (req, res) => kitchenController.viewItems(req, res));
route.patch('/api/vendor/editItem', multerMiddleware_1.multerMid.single('image'), (req, res) => kitchenController.editItem(req, res));
route.put('/api/vendor/changeItemStatus', (req, res) => kitchenController.changeItemStatus(req, res));
//---------------------------------------------------------------------------------------------------------------------
//booking management by vendor
const bookingRepository_1 = __importDefault(require("../repository/bookingRepository"));
const bookingUsecase_1 = __importDefault(require("../../usecase/bookingUsecase"));
const bookingController_1 = __importDefault(require("../../adapter/bookingController"));
const stripe_1 = __importDefault(require("../utils/stripe"));
const session_1 = __importDefault(require("../repository/session"));
const bookingRepo = new bookingRepository_1.default();
const stripe = new stripe_1.default();
const session = new session_1.default();
const bookingUsecase = new bookingUsecase_1.default(bookingRepo, stripe);
const bookingController = new bookingController_1.default(bookingUsecase, session);
route.get('/api/vendor/allBookingDetails', (req, res) => bookingController.allBookings(req, res));
route.put('/api/vendor/changeBookingStatus', (req, res) => bookingController.changeBookingStatus(req, res));
route.get('/api/vendor/salesChart', (req, res) => bookingController.salesChart(req, res));
exports.default = route;
