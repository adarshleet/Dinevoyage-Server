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

export default router


