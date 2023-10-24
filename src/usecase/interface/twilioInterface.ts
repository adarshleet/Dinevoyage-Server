interface Itwilio{
    sendTwilioOtp(mobile:string):Promise<boolean>
    verifyOtp(mobile:string,otp:string):Promise<boolean>
}

export default Itwilio