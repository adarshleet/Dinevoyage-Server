import { Twilio } from 'twilio'
import Itwilio from '../../usecase/interface/twilioInterface'

import dotenv from 'dotenv'
dotenv.config()

const serviceID = process.env.SERVICE_SID
const accountSID = process.env.ACC_SID
const authToken = process.env.AUTH_TOKEN

const client = new Twilio('AC8d4bf4bf01f1bca9eddbe2dbd66abc7a', 'cc3f234f256fa5ef0b31f9a7b875178b');


class TwilioService implements Itwilio {

    async sendTwilioOtp(mobile: string): Promise<boolean> {
        try {
            if(serviceID){
                await client.verify.v2
                .services(serviceID).verifications.create({
                    to: `+91${mobile}`,
                    channel: "sms",
                })
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async verifyOtp(mobile: string, otp: string): Promise<boolean> {
        try {
            if(serviceID){
                const var_check = await client.verify.v2
                .services(serviceID)
                .verificationChecks.create({ to: `+91${mobile}`, code: otp });
                return var_check.status === "approved";
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


}

export default TwilioService