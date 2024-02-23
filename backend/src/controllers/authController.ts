import { Request, Response } from "express"
import User from "../models/user"
import { ValidateUser } from "../utils/auth";
import jwt from "jsonwebtoken";
import { NotAuthError } from "../utils/errors";

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretValue';

export const refresh = async(req:Request, res: Response) => {
    const token = req.cookies.jwt;
    console.log(token);

    if(token) {
        const payload = jwt.decode(token);
        return res.status(200).json(payload);
    } else {
        return res.status(401).json(new NotAuthError);
    }
}



//TODO: Add message field to errors

//TODO: Add user registration route, Also assign jwt

export const authLogin = async(req: Request, res: Response) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    //TODO: Add username, password validation
    const {email, password} = req.body; 
    if(!email || !password) {
        return res.status(400).json({error: "Email or password not present"});
    }

    //TODO: Add JWT support
    try {
        const user = await User.findOne(email);
        if(user) {
            if(await ValidateUser(password, user.password)) {
                //Change what info is sent to the FE
                
                const maxAge = 6 * 60 * 60 ;
                
                const token = jwt.sign(
                    {id: user.id, email: user.email, username: user.username},
                    jwtSecret,
                    {expiresIn: maxAge}
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: maxAge * 1000,
                });
                const responseUser = {id: user.id, username: user.username}
                return res.status(200).json({message: "Successful login", user: responseUser});

            } else {
                //use differenr erro codes maybe
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


export const authLogout = async(_:Request, res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    return res.status(200).json({message: "Succesfully logged out"});
}

