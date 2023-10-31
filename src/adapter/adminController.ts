import { Request,Response } from "express";
import Adminusecase from "../usecase/adminUsecase";
import Admin from "../domain/admin";

class adminController{
    private Adminusecase : Adminusecase
    constructor(Adminusecase : Adminusecase){
        this.Adminusecase = Adminusecase
    }

    async adminLogin(req:Request,res:Response){
        try {
            const admin = req.body
            console.log(admin)
            const loginStatus = await this.Adminusecase.adminLogin(admin)
            console.log(loginStatus)
            if (loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data) {
                res.cookie('adminJWT', loginStatus.data.token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
            res.status(loginStatus.status).json(loginStatus)
        } catch (error) {
            console.log(error)
        }
    }

}

export default adminController