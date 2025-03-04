import { Response } from 'express';

const returnResponse = (res: Response, status: number, message: string, data?: any) => {
    return res.status(status).json({ message, data });
};

export default returnResponse;
