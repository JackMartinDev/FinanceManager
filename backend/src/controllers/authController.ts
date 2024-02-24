import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user"
import { Hash, ValidateUser, isEmailPresent, isPasswordPresent, isValidEmail, isValidPassword, isValidUsername } from "../utils/auth";
import { EmailInUseError, FailedLoginError, NotAuthError } from "../utils/errors";
import { TUser } from "../utils/types";

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

export const authRegister = async(req: Request<{}, {}, TUser>, res:Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = await Hash(10,req.body.password);
    const id = crypto.randomUUID();

    if(!isValidEmail(email) || !isValidPassword(req.body.password) || !isValidUsername(username)) {
        return res.status(400).json({error: "Email, username or password is not valid"});
    }



    try {
        const test = await User.findOne(email);
        if (test){
            return res.status(409).json(new EmailInUseError)
        }
        const user = new User({id, username, email, password});
        user.create();

        const maxAge = 6 * 60 * 60 ;

        const token = jwt.sign(
            {id, email, username},
            jwtSecret,
            {expiresIn: maxAge}
        );
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: maxAge * 1000,
        });
        //Also change this to the new user, not the request info
        const responseUser = {id, username}
        return res.status(200).json({message: "User created succesfully", user: responseUser});
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}

//TODO: Add message field to errors


export const authLogin = async(req: Request, res: Response) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const {email, password} = req.body; 
    if(!isEmailPresent(email) || !isPasswordPresent(password)) {
        return res.status(400).json({error: "Email or password not present"});
    }

    try {
        const user = await User.findOne(email);
        if(user) {
            if(await ValidateUser(password, user.password)) {

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
                return res.status(401).json(new FailedLoginError);
            }
        } else {
            return res.status(401).json(new FailedLoginError);
        }
    } catch (error) {
        throw error
    }
}


export const authLogout = async(_:Request, res: Response) => {
    res.clearCookie("jwt");
    return res.status(200).json({message: "Succesfully logged out"});
}

