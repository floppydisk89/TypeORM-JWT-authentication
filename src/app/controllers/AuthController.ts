import {Request, Response} from "express"
import {getRepository} from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

require('dotenv').config()

import User from "../models/User";

class AuthController{
    async authenticate(request: Request, response: Response){

        const secret = process.env.JWT_SECRET;
        const repository = getRepository(User);

        const {email, password} = request.body;

        const emailSanitized =  email.toString();
        const passwordSanitized = password.toString();

        const user = await repository.findOne({where: {email: emailSanitized}});
        
        if(!user){
            return response.status(401).json({error: 401});
        }
        
        const isValidPassword = await bcrypt.compare(passwordSanitized, user.password);
        
        if(!isValidPassword){
            return response.status(401).json({error: 401});
        }
        
        
        const token = jwt.sign({id: user.id}, secret , {expiresIn: "1d"});
        
        delete user.password;

        return response.status(200).json({
            user,
            token,
        })
    }
}

export default new AuthController();