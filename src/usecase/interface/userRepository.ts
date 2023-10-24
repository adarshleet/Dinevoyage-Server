import User from '../../domain/user'

interface UserRepository{
    save(user:User),
    mobileExistCheck(mobile:string)
}

export default UserRepository