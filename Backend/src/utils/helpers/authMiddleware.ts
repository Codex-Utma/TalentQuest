import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (userType: 'admin' | 'user') => (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No provided token' });
        }

        const SECRET_KEY = process.env.SECRET_KEY as string;
        if(!SECRET_KEY) {
            return res.status(500).json({ message: 'SECRET_KEY is not defined' });
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if(decoded.userType !== userType) {
            return res.status(401).json({ message: 'Your role is not allowed for this action' });
        }

        req.body.tokenData = decoded;

        next();
    } catch (error: any) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if(error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default authMiddleware;
