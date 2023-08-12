import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export const SECRET = 'SEcr3t';
export const authenticateJwt = ( req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, ( err, user) => {
            console.log(user);
            if(err){
                return res.sendStatus(403);
            }
            if(!user){
                return res.sendStatus(403);
            }
            if(typeof user === "string"){
                return res.sendStatus(403);
            }
            req.headers['username'] = user.username;
            req.headers['password'] = user.password;
            next();
        });
    }else{
        return res.sendStatus(401);
    }
};
