import bcrypt from "bcrypt"
import Hashpassword from "../../usecase/interface/hashPassword"

class Encrypt implements Hashpassword {
    async createHash(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
        return passwordMatch
    }
}

export default Encrypt