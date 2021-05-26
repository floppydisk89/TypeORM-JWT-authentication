import {Request, Response} from "express"
import {getRepository} from "typeorm";

import User from "../models/User";

class UserController{

    index(request:Request, response: Response){
        return response.send({userId: request.userId});
    }

    async store(request: Request, response: Response){

        const repository = getRepository(User);
        const {email, password} = request.body;

        const userExists = await repository.findOne({where: {email}});
        if(userExists){
            return response.status(409).json({error: 409, type: "Email already in use."});
        }
        
        const user =  repository.create({email, password});
        await repository.save(user);

        return response.status(200).json({success: 200, type: "User creation success."});
    }
}

export default new UserController();