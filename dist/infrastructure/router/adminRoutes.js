"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multerMiddleware_1 = require("../middlewares/multerMiddleware");
const adminAuth_1 = require("../middlewares/adminAuth");
const adminRepository_1 = __importDefault(require("../repository/adminRepository"));
const adminController_1 = __importDefault(require("../../adapter/adminController"));
const adminUsecase_1 = __importDefault(require("../../usecase/adminUsecase"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const jwtCreate_1 = __importDefault(require("../utils/jwtCreate"));
const encrypt = new hashPassword_1.default();
const jwtCreate = new jwtCreate_1.default();
const repository = new adminRepository_1.default();
const usecase = new adminUsecase_1.default(repository, encrypt, jwtCreate);
const controller = new adminController_1.default(usecase);
router.post('/api/admin/login', (req, res) => controller.adminLogin(req, res));
router.get('/api/admin/allUsers', (adminAuth_1.protect), (req, res) => controller.getAllUsers(req, res));
router.put('/api/admin/blockUser', (adminAuth_1.protect), (req, res) => controller.blockUser(req, res));
router.get('/api/admin/allVendors', (adminAuth_1.protect), (req, res) => controller.getAllVendors(req, res));
router.put('/api/admin/blockVendor', (adminAuth_1.protect), (req, res) => controller.blockVendor(req, res));
router.get('/api/admin/logout', (req, res) => controller.adminLogout(req, res));
//-------------------------------------------------------------------------------------------//
//cuisine and facility routes
const cuisineRepository_1 = __importDefault(require("../repository/cuisineRepository"));
const cuisineController_1 = __importDefault(require("../../adapter/cuisineController"));
const cuisineUsecase_1 = __importDefault(require("../../usecase/cuisineUsecase"));
const cuisineRepo = new cuisineRepository_1.default();
const cuisineusecase = new cuisineUsecase_1.default(cuisineRepo);
const cuisineControll = new cuisineController_1.default(cuisineusecase);
router.get('/api/admin/allFacilities', (adminAuth_1.protect), (req, res) => cuisineControll.allFacilities(req, res));
router.post('/api/admin/addFacility', (adminAuth_1.protect), (req, res) => cuisineControll.addFacility(req, res));
router.post('/api/admin/editFacility', (adminAuth_1.protect), (req, res) => cuisineControll.editFacility(req, res));
router.post('/api/admin/deleteFacility', (adminAuth_1.protect), (req, res) => cuisineControll.deleteFacility(req, res));
router.post('/api/admin/addCuisine', (adminAuth_1.protect), (req, res) => cuisineControll.addCuisine(req, res));
router.get('/api/admin/allCuisines', (adminAuth_1.protect), (req, res) => cuisineControll.allCuisines(req, res));
router.post('/api/admin/editCuisine', (adminAuth_1.protect), (req, res) => cuisineControll.editCuisine(req, res));
router.post('/api/admin/deleteCuisine', (adminAuth_1.protect), (req, res) => cuisineControll.deleteCuisine(req, res));
//-------------------------------------------------------------------------------------------//
//restaurant details for admin
const restaurantRepository_1 = __importDefault(require("../repository/restaurantRepository"));
const restaurantController_1 = __importDefault(require("../../adapter/restaurantController"));
const restaurantUsecase_1 = __importDefault(require("../../usecase/restaurantUsecase"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const restaurantRepo = new restaurantRepository_1.default();
const cloudinary = new cloudinary_1.default();
const restaurantusecase = new restaurantUsecase_1.default(restaurantRepo, cloudinary);
const restaurantControll = new restaurantController_1.default(restaurantusecase);
router.get('/api/admin/allRequests', (adminAuth_1.protect), (req, res) => restaurantControll.restaurantRequests(req, res));
router.get('/api/admin/restaurantRequest/:id', (adminAuth_1.protect), (req, res) => restaurantControll.singleRestaurantRequest(req, res));
router.post('/api/admin/changeRestaurantStatus', (adminAuth_1.protect), (req, res) => restaurantControll.changeRestaurantStatus(req, res));
//-------------------------------------------------------------------------------------------------------------------//
//banner management by admin
const bannerRepository_1 = __importDefault(require("../repository/bannerRepository"));
const bannerrController_1 = __importDefault(require("../../adapter/bannerrController"));
const bannerUsecase_1 = __importDefault(require("../../usecase/bannerUsecase"));
const BannerRepository = new bannerRepository_1.default();
const bannerUsecase = new bannerUsecase_1.default(BannerRepository, cloudinary);
const bannerController = new bannerrController_1.default(bannerUsecase);
router.post('/api/admin/addBanner', (adminAuth_1.protect), multerMiddleware_1.multerMid.single('image'), (req, res) => bannerController.addBanner(req, res));
router.get('/api/admin/getBanners', (adminAuth_1.protect), (req, res) => bannerController.getBanners(req, res));
router.put('/api/admin/deleteBanner', (adminAuth_1.protect), (req, res) => bannerController.deleteBanner(req, res));
//---------------------------------------------------------------------------------------------------------------------//
//location management by admin
const locationRepository_1 = __importDefault(require("../repository/locationRepository"));
const locationUsecase_1 = __importDefault(require("../../usecase/locationUsecase"));
const locationController_1 = __importDefault(require("../../adapter/locationController"));
const locationRepo = new locationRepository_1.default();
const LocationUsecase = new locationUsecase_1.default(locationRepo);
const locationControll = new locationController_1.default(LocationUsecase);
router.post('/api/admin/addLocality', (adminAuth_1.protect), (req, res) => locationControll.addLocation(req, res));
router.get('/api/admin/allLocality', (adminAuth_1.protect), (req, res) => locationControll.allLocality(req, res));
//----------------------------------------------------------------------------------------------------------------------//
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
router.get('/api/admin/dashboard', (adminAuth_1.protect), (req, res) => bookingController.adminDashboard(req, res));
//-----------------------------------------------------------------------------------------------------------------------//
//admin coupon management
const couponRepository_1 = __importDefault(require("../repository/couponRepository"));
const couponController_1 = __importDefault(require("../../adapter/couponController"));
const couponUsecase_1 = __importDefault(require("../../usecase/couponUsecase"));
const couponRepo = new couponRepository_1.default();
const couponUsecase = new couponUsecase_1.default(couponRepo);
const couponController = new couponController_1.default(couponUsecase);
router.post('/api/admin/addCoupon', (adminAuth_1.protect), (req, res) => couponController.addCoupon(req, res));
router.get('/api/admin/allCoupons', (adminAuth_1.protect), (req, res) => couponController.allCoupons(req, res));
//-------------------------------------------------------------------------------------------------------------------------//
exports.default = router;
