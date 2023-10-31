import Admin from "../../domain/admin";

interface AdminRepository{
    adminLoginCheck(email:string),
    allUsers()
    blockUser(id:string)
}

export default AdminRepository