import Admin from "../../domain/admin";
import { UpdateResult } from 'mongodb';


interface AdminRepository{
    adminLoginCheck(email:string): Promise<Admin | null>
    allUsers(page:number):Promise<any>
    blockUser(id:string):Promise<UpdateResult | null>
    allVendors(page:number):Promise<any>
    blockVendor(id:string):Promise<UpdateResult | null>
}

export default AdminRepository