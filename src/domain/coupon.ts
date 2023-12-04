
interface Coupon{
    _id:string,
    couponName: string,
    maximumDisount : number,
    minimumPurchase : number,
    expiryDate : string,
    usedUsers : Array<string> | null,
    isListed: boolean | null
}

export default Coupon