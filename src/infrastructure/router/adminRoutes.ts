import express from 'express'
const router = express.Router()

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


//cuisine and facility routes
import cuisineRepository from '../repository/cuisineRepository'
import cuisineController from '../../adapter/cuisineController'
import CuisineUseCase from '../../usecase/cuisineUsecase'

const cuisineRepo = new cuisineRepository()
const cuisineusecase = new CuisineUseCase(cuisineRepo)
const cuisineControll = new cuisineController(cuisineusecase)

router.get('/api/admin/allFacilities',(req,res)=>cuisineControll.allFacilities(req,res))
router.post('/api/admin/addFacility',(req,res)=>cuisineControll.addFacility(req,res))
router.post('/api/admin/addCuisine',(req,res)=>cuisineControll.addCuisine(req,res))
router.get('/api/admin/allCuisines',(req,res)=>cuisineControll.allCuisines(req,res))

export default router

