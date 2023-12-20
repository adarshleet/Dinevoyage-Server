import User from '../../domain/user'

interface UserRepository{
    save(user:User):Promise<any>
    mobileExistCheck(mobile:string):Promise<any>
    emailExistCheck(email:string):Promise<any>
    findUserById(user:string):Promise<any>

    usernameChange(userId: string , name:string):Promise<any>
    mobileChange(userId:string , mobile:string):Promise<any>
    changePassword(userId:string,password:string):Promise<any>
    forgotPasswordChange(mobile:string,password:string):Promise<any>

    restaurantsToShow(page:number):Promise<any>
    restaurantsToShowInMap():Promise<any>
    singleRestaurant(restauarantId:string):Promise<any>
}

export default UserRepository