import Ijwt from "../../usecase/interface/jwt";
import jwt from "jsonwebtoken"

class JwtCreate implements Ijwt{
    createJwt(userId: string,role:string): string {
        const jwtKey = process.env.JWT_KEY
        if(jwtKey){
            const token:string = jwt.sign(
                {id:userId ,role:role},
                jwtKey
            );
            return token
        }
        throw new Error("JWT_KEY is not defined");
    }
}

export default JwtCreate