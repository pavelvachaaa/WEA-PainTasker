import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../vendor/pavel_vacha/exceptions/app_error';
import { IUser } from '../models/user.schema';

export interface CustomRequest extends Request {
    userData: IUser | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
        throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: 'Chybí vám přístupový token',
            isOperational: true
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as Secret);
        (req as CustomRequest).userData = decoded as IUser
    } catch (err) {
        throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: 'Neplatný přístupový token',
            isOperational: true
        });
    }

    next();
};