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


    async getAllUsers(req:Request,res:Response){
        try {
            const page:number = req.query.page ? parseInt(req.query.page as string) : 1
            const allUsers = await this.Adminusecase.getAllUsers(page)
            res.status(200).json(allUsers?.data)
        } catch (error) {
            console.log(error)
        }
    }


    async blockUser(req:Request,res:Response){
        try {
            const id = req.body.id as string
            console.log(id)
            const userStatus = await this.Adminusecase.blockUser(id)
            // console.log(userStatus)
            res.status(200).json(userStatus)
        } catch (error) {
            console.log(error)
        }
    }

}

export default adminController