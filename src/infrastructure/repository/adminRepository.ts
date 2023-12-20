import Admin from "../../domain/admin";
import AdminModel from "../database/adminModel";
import UserModel from "../database/userModel";
import vendorModel from "../database/vendorModel";
import AdminRepository from "../../usecase/interface/adminRepository";
import { UpdateResult } from 'mongodb';


class adminRepository implements AdminRepository {

    //ADMIN LOGIN
    async adminLoginCheck(email: string): Promise<Admin | null> {
        try {
            const adminFound = await AdminModel.findOne({ email: email })
            if(adminFound) return adminFound
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async allUsers(page:number):Promise<any> {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }

    async blockUser(id: string):Promise<UpdateResult | null> {
        try {
            const user = await UserModel.findById(id);
            if (user) {
                const newStatus = !user.isBlocked;
                const userStatus = await UserModel.updateOne(
                    { _id: id },
                    { $set: { isBlocked: newStatus } }
                );
                return userStatus;
            }
            else return null
        } catch (error) {
            console.log(error)
            return null
        }
    }


    async allVendors(page: number):Promise<any> {
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

    async blockVendor(id: string):Promise<UpdateResult | null> {
        const vendor = await vendorModel.findById(id)
        if(vendor){
            const newStatus = !vendor.isBlocked
            const vendorStatus = await vendorModel.updateOne(
                {_id:id},
                {$set:{isBlocked:newStatus}}
            )
            return vendorStatus
        }
        else return null
    }
    
}

export default adminRepository