import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (userType: 'admin' | 'employee') => (req: Request, res: Response, next: NextFunction): void => {
    try {

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'No provided token' });
            return;
        }

        const SECRET_KEY = process.env.JWT_SECRET as string;
        if(!SECRET_KEY) {
            res.status(500).json({ message: 'SECRET_KEY is not defined' });
            return;
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if(decoded.userType !== userType) {
            res.status(401).json({ message: 'Your role is not allowed for this action' });
            return;
        }

        req.body.tokenData = decoded;

        next();
    } catch (error: any) {
        if(error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        if(error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}

export default authMiddleware;
