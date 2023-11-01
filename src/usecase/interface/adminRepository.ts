import Admin from "../../domain/admin";

interface AdminRepository{
    adminLoginCheck(email:string),
    allUsers(page:number)
    blockUser(id:string)
}

export default AdminRepository