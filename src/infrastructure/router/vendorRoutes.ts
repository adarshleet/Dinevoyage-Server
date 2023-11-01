import express from 'express'
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

export default route