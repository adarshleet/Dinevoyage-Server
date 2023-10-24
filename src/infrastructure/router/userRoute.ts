import express,{Request,Response} from 'express'
const route = express.Router()

import userController from '../../adapter/userController'
import userRepository from '../repository/userRepository'
import Userusecase from '../../usecase/userUsecase'
import TwilioService from '../utils/twilio'
import Encrypt from '../utils/hashPassword'


//twilio service
const twilio =  new TwilioService()
const encrypt = new Encrypt()

const repository = new userRepository()
const usecase = new Userusecase(repository,twilio,encrypt)
const controller = new userController(usecase)

route.post('/api/user/signup',(req,res)=>controller.signUp(req,res))
route.post('/api/user/otpVerify',(req,res)=>controller.otpVerification(req,res))

export default route
