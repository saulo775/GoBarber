import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import configAuth from '../config/auth';

import AppError from '../errors/AppError';



interface tokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticaded(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if( !authHeader ){
        throw new AppError("JWT token in missing", 401);
    }

    const [, token] = authHeader.split(' ');


    try {
        const decoded = verify(token, configAuth.JWT.secret)

        const { sub } = decoded as tokenPayload;

        request.user = {
            id: sub,
        }

        console.log(decoded);
        return next();
    } catch  {
       throw new AppError(" Invalid JWT token", 401);
    }

}
