import User from '../../domain/user'

interface UserRepository{
    save(user:User),
    mobileExistCheck(mobile:string),
    emailExistCheck(email:string),
    findUserById(user:string)

    usernameChange(userId: string , name:string)
    mobileChange(userId:string , mobile:string)
    changePassword(userId:string,password:string)
    forgotPasswordChange(mobile:string,password:string)

    restaurantsToShow(page:number)
    singleRestaurant(restauarantId:string)
}

export default UserRepository