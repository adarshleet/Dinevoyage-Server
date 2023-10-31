import Admin from "../domain/admin";
import AdminRepository from "./interface/adminRepository";
import Encrypt from "../infrastructure/utils/hashPassword";
import JwtCreate from "../infrastructure/utils/jwtCreate";

class Adminusecase {
    private AdminRepository : AdminRepository
    private Encrypt : Encrypt
    private JwtCreate : JwtCreate

    constructor(AdminRepositoy:AdminRepository,Encrypt:Encrypt,JwtCreate:JwtCreate){
        this.AdminRepository = AdminRepositoy
        this.Encrypt = Encrypt
        this.JwtCreate = JwtCreate
    }


    // async adminLogin(admin: { email: string, password: string }){
    //     try {
    //         const adminFound:any = await this.AdminRepository.adminLoginCheck(admin.email)
    //         if(adminFound){
    //             const passwordMatch = await this.Encrypt.compare(admin.password,adminFound.password)
    //             const token = this.JwtCreate.createJwt(adminFound._id)
    //             if(passwordMatch){
    //                 return{
    //                     status:200,
    //                     data:{
    //                         success:true,
    //                         message: "authentication successfull",
    //                         adminId:adminFound._id,
    //                         token:token
    //                     }
    //                 }
    //             }
    //             else{
    //                 return {
    //                     status: 200,
    //                     data: {
    //                         success : false,
    //                         message : 'invalid email or password',
    //                     }
    //                 }
    //             }
    //         }
    //         else{
    //             return {
    //                 status: 200,
    //                 data: {
    //                     success : false,
    //                     message : 'invalid email or password',
    //                 }
    //             }
    //         }
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    async adminLogin(admin: { email: string, password: string }) {
        try {
            const adminFound: any = await this.AdminRepository.adminLoginCheck(admin.email);
            console.log(adminFound)
            if (adminFound) {
                const passwordMatch = await this.Encrypt.compare(admin.password, adminFound.password);
                const token = this.JwtCreate.createJwt(adminFound._id);
    
                if (passwordMatch) {
                    return {
                        status: 200,
                        data: {
                            success: true,
                            message: "Authentication successful",
                            adminId: adminFound._id,
                            token: token
                        }
                    } as const;
                } else {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: 'Invalid email or password',
                        }
                    } as const;
                }
            } else {
                return {
                    status: 200,
                    data: {
                        success: false,
                        message: 'Invalid email or password',
                    }
                } as const;
            }
    
        } catch (error) {
            console.log(error);
            throw new Error('Internal server error');
        }
    }
    

}

export default Adminusecase