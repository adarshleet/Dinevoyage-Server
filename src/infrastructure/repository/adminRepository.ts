import Admin from "../../domain/admin";
import AdminModel from "../database/adminModel";
import UserModel from "../database/userModel";
import vendorModel from "../database/vendorModel";
import AdminRepository from "../../usecase/interface/adminRepository";

class adminRepository implements AdminRepository {

    //ADMIN LOGIN
    async adminLoginCheck(email: string) {
        const adminFound = await AdminModel.findOne({ email: email })
        return adminFound
    }

    async allUsers(page:number) {
        let limit = 5
        const allUsers = await UserModel.find().skip((page-1)*limit).limit(limit)
        const totalData = await UserModel.countDocuments()
        const usersDetails={
            allUsers,
            totalData,
            totalPages : Math.ceil(totalData/limit),
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


    async allVendors(page: number) {
        let limit = 5
        const allVendors = await vendorModel.find().skip((page-1)*limit).limit(limit)
        const totalData = await vendorModel.countDocuments()
        const vendorDetails={
                allVendors,
                totalData,
                totalPages : Math.ceil(totalData/limit),
            }
            return vendorDetails
    }

    async blockVendor(id: string) {
        const vendor = await vendorModel.findById(id)
        if(vendor){
            const newStatus = !vendor.isBlocked
            const vendorStatus = await vendorModel.updateOne(
                {_id:id},
                {$set:{isBlocked:newStatus}}
            )
            return vendorStatus
        }
    }
    
}

export default adminRepository