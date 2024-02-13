import IOtpServices from '../../usecase/interface/twilioInterface'
// @ts-ignore
import { sendOTP,verifyOTP } from 'otpless-node-js-auth-sdk'

import dotenv from 'dotenv'
dotenv.config()



class TwilioService implements IOtpServices {

    async sendTwilioOtp(mobile: string): Promise<boolean> {
        try {
            console.log(process.env.OTP_CLIENT_ID, 
                process.env.OTP_CLIENT_SECRET)
            const response =await sendOTP(`91${mobile}`, null, 'SMS', undefined, undefined, 60, 6, process.env.OTP_CLIENT_ID, process.env.OTP_CLIENT_SECRET)
            return response.orderId
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async verifyOtp(mobile: string, otp: string,orderId:string): Promise<boolean> {
        try {
            const response = await verifyOTP(null, 
                `+91${mobile}`, 
                orderId ,otp, 
                process.env.OTP_CLIENT_ID, 
                process.env.OTP_CLIENT_SECRET
            );
            console.log(response)
            return response.isOTPVerified
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


}

export default TwilioService