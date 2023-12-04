import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            adminId?: string;
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.adminJWT;

    if (token) {
               try {
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
            if (decoded) {
                next();
            } else {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

export { protect };