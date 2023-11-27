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


    async findUserById(user: string) {
        const userFound = await UserModel.findById(user)
        return userFound
    }


    //user name change
    async usernameChange(userId:string ,name: string) {
        try {
            const nameChangeStatus = await UserModel.findByIdAndUpdate(userId,{$set:{name}})
            return nameChangeStatus
        } catch (error) {
            console.log(error)
        }    
    }

    //user mobile change
    async mobileChange(userId: string, mobile: string) {
        try {
            console.log("red",mobile,userId)
            const mobileChangeStatus = await UserModel.findByIdAndUpdate(userId,{$set:{mobile}},{new:true})
            return mobileChangeStatus
        } catch (error) {
            console.log(error)
        }
    }


    //change password
    async changePassword(userId: string, password: string) {
        try {
            const passwordChangeStatus = await UserModel.findByIdAndUpdate(userId,{$set:{password}},{new:true})
            return passwordChangeStatus
        } catch (error) {
            console.log(error)
        }
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