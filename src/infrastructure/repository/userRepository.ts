import User from '../../domain/user'
import UserModel from '../database/userModel'
import UserRepository from '../../usecase/interface/userRepository'

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


}

export default userRepository