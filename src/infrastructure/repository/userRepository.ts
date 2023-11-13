import User from '../../domain/user'
import UserModel from '../database/userModel'
import UserRepository from '../../usecase/interface/userRepository'
import restaurantModel from '../database/restaurantModel'
import kitchenModel from '../database/KitchenModel'

class userRepository implements UserRepository{

    //saving user to databse
    async save(user: User) {
        const newUser = new UserModel(user)
        await newUser.save()
        return newUser
    }

    
    //checking given mobile exist on database
    async mobileExistCheck(mobile:string){
        const userFound = await UserModel.findOne({mobile})
        return userFound
    }

    async emailExistCheck(email: string) {
        const userFound = await UserModel.findOne({email})
        return userFound
    }






    //restaurant to showing 
    async restaurantsToShow() {
        const restaurantIds = await kitchenModel.find({
            items: { $exists: true, $not: { $size: 0 } }
        }, { restaurantId: 1, _id: 0 })

        const restaurantIdStrings = restaurantIds.map((res)=>res.restaurantId?.toString())
        
        const restaurants = await restaurantModel.find({ _id: { $in: restaurantIdStrings } })
        return restaurants


    }



    //single restaurant page
    async singleRestaurant(restauarantId: string) {
        const restaurant = await restaurantModel.findOne({_id:restauarantId})
        return restaurant
    }





}

export default userRepository