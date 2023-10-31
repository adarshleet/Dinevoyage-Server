import Admin from "../../domain/admin";
import AdminModel from "../database/adminModel";
import AdminRepository from "../../usecase/interface/adminRepository";

class adminRepository implements AdminRepository{
        async adminLoginCheck(email: string) {
            const adminFound = await AdminModel.findOne({email:email})
            return adminFound
        }
}

export default adminRepository