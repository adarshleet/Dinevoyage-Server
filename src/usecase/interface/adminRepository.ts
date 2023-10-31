import Admin from "../../domain/admin";

interface AdminRepository{
    adminLoginCheck(email:string)
}

export default AdminRepository