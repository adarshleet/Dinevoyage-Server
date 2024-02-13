interface IOtpServices{
    sendTwilioOtp(mobile:string):Promise<boolean>
    verifyOtp(mobile:string,otp:string):Promise<boolean>
}

export default IOtpServices