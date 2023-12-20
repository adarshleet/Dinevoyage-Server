interface IStripe{
    makePayment(totalPrice:number):Promise<any>
}

export default IStripe