import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import vendorRepository from '../repository/vendorRepository'

const vendorRepo = new vendorRepository();

declare global {
    namespace Express {
        interface Request {
            venforId?: string;
        }
    }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.vendorJWT;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;

            if (decoded && (!decoded.role || decoded.role != 'vendor')) {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }

            const vendor = await vendorRepo.findVendorById(decoded.id as string);
            if (vendor) {
                // req.userId = user._id;
                if (vendor.isBlocked) {
                    return res.status(401).json({ message: 'Vendor have been blocked by admin' });
                } else {
                    next();
                }
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