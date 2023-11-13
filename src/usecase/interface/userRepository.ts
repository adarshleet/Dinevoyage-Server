import User from '../../domain/user'

interface UserRepository{
    save(user:User),
    mobileExistCheck(mobile:string),
    emailExistCheck(email:string),

    restaurantsToShow()
    singleRestaurant(restauarantId:string)
}

export default UserRepository