import { Request, Response } from "express"
import User from "../models/user"
import { ValidateUser } from "../utils/auth";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretValue';

//TODO: Add message field to errors

//TODO: Add user registration route, Also assign jwt

export const authLogin = async(req: Request, res: Response) => {
    //TODO: Add username, password validation
    const {username, password} = req.body; 
    if(!username || !password) {
        return res.status(400).json({error: "Username or password not present"});
    }

    //TODO: Add JWT support
    try {
        const user = await User.findOne(username);
        if(user) {
            if(await ValidateUser(password, user.password)) {
                //Change what info is sent to the FE
                
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    {id: user.id, username: user.username},
                    jwtSecret,
                    {expiresIn: maxAge}
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                });

                return res.status(200).json({message: "Successful login", user: user});

            } else {
                return res.status(400).json({error: "Incorrect username or password"});
            }
        } else {
            return res.status(400).json({error: "Incorrect username or password"});
        }
    } catch (error) {
        throw error
//        res.status(400).json({
//            message: "An error occurred",
//            error: error.message,
//        });
    }
}
