import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authMiddleware = (userType: 'admin' | 'employee') => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        const userId = Number(decoded.uid);

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                idCourse: true,
                userType: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if(user === null) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if(user.userType.name.toLowerCase() !== userType) {
            res.status(401).json({ message: 'Your role is not allowed for this action' });
            return;
        }

        req.body.user = user;

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
