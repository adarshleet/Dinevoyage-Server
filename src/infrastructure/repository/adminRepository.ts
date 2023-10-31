import Admin from "../../domain/admin";
import AdminModel from "../database/adminModel";
import UserModel from "../database/userModel";
import AdminRepository from "../../usecase/interface/adminRepository";

class adminRepository implements AdminRepository {
    async adminLoginCheck(email: string) {
        const adminFound = await AdminModel.findOne({ email: email })
        return adminFound
    }

    async allUsers() {
        const allUsers = await UserModel.find()
        return allUsers
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