import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
require('dotenv').config();

interface TokenPayload{
    id: string;
    iad: number;
    exp: number;
}

export default function authMiddleware(request: Request, response:Response, next:NextFunction){
    const secret = process.env.JWT_SECRET;
    const {authorization} = request.headers;

    if(!authorization){
        return response.sendStatus(401);
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, secret);
        const {id} = data as TokenPayload;

        request.userId = id;

        next();

    } catch {
        return response.sendStatus(401); 
    }
}