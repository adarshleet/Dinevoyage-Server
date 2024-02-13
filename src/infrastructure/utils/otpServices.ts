import IOtpServices from '../../usecase/interface/twilioInterface'
// import {sendOTP} from 'otpless-node-js-auth-sdk'

import dotenv from 'dotenv'
dotenv.config()



class TwilioService implements IOtpServices {

    async sendTwilioOtp(mobile: string): Promise<boolean> {
        try {
            // if(serviceID){
            //     await client.verify.v2
            //     .services(serviceID).verifications.create({
            //         to: `+91${mobile}`,
            //         channel: "sms",
            //     })
            // }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async verifyOtp(mobile: string, otp: string): Promise<boolean> {
        try {
            // if(serviceID){
            //     const var_check = await client.verify.v2
            //     .services(serviceID)
            //     .verificationChecks.create({ to: `+91${mobile}`, code: otp });
            //     return var_check.status === "approved";
            // }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


}

export default TwilioService