import Admin from "../../domain/admin";
import AdminModel from "../database/adminModel";
import UserModel from "../database/userModel";
import AdminRepository from "../../usecase/interface/adminRepository";

class adminRepository implements AdminRepository {
    async adminLoginCheck(email: string) {
        const adminFound = await AdminModel.findOne({ email: email })
        return adminFound
    }

    async allUsers(page:number) {
        let limit = 2
        const allUsers = await UserModel.find().skip((page-1)*limit).limit(limit)
        const totalUsers = await UserModel.countDocuments()
        const usersDetails={
            allUsers,
            totalUsers,
            totalPages : Math.ceil(totalUsers/limit),
            limit
        }
        return usersDetails
    }

    async blockUser(id: string) {
        const user = await UserModel.findById(id);
        if (user) {
            const newStatus = !user.isBlocked;

            const userStatus = await UserModel.updateOne(
                { _id: id },
                { $set: { isBlocked: newStatus } }
            );

            return userStatus;
        }
    }
    
}

export default adminRepository