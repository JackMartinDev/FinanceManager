import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user"
import { Hash, ValidateUser, isEmailPresent, isPasswordPresent, isValidEmail, isValidPassword, isValidUsername } from "../utils/auth";
import { EmailInUseError, FailedLoginError, NotAuthError } from "../utils/errors";
import { TUser } from "../utils/types";

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretValue';

export const refresh = async(req:Request, res: Response) => {
    const token = req.cookies.jwt;

    if(token) {
        const payload = jwt.decode(token);
        return res.status(200).json(payload);
    } else {
        return res.status(401).json(new NotAuthError);
    }
}

const doesUserExist = async(email: string): Promise<boolean> => {
    const {result} = await User.findOne(email);

    if(!result) return false
    return true
}

export const authRegister = async(req: Request<{}, {}, TUser>, res:Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = await Hash(10,req.body.password);
    const id = crypto.randomUUID();

    if(!isValidEmail(email) || !isValidPassword(req.body.password) || !isValidUsername(username)) {
        return res.status(400).json({error: "Email, username or password is not valid"});
    }

    if (await doesUserExist(email)){
        return res.status(409).json(new EmailInUseError)
    }

    const user = new User({id, username, email, password});
    const {result, error} = await user.create();

    if(error) {
        return res.status(500).json({error: "An error occured!"})
    }

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

    return res.status(201).json({message: "User created succesfully", user: result});
}

export const authLogin = async(req: Request, res: Response) => {
    //Remove later
    await new Promise(resolve => setTimeout(resolve, 2000));

    const {email, password} = req.body; 
    if(!isEmailPresent(email) || !isPasswordPresent(password)) {
        return res.status(400).json({error: "Email or password not present"});
    }

    const {result, error} = await User.findOne(email);

    if(error) {
        return res.status(500).json({error: "An error occured!"});
    }

    if(result) {
        if(await ValidateUser(password, result.password)) {

            const maxAge = 6 * 60 * 60 ;

            const token = jwt.sign(
                {id: result.id, email: result.email, username: result.username},
                jwtSecret,
                {expiresIn: maxAge}
            );

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: maxAge * 1000,
            });

            const responseUser = {id: result.id, username: result.username}
            return res.status(200).json({message: "Successful login", user: responseUser});

        } else {
            return res.status(401).json(new FailedLoginError);
        }
    } else {
        return res.status(401).json(new FailedLoginError);
    }
}

export const authLogout = async(_:Request, res: Response) => {
    res.clearCookie("jwt");
    return res.status(200).json({message: "Succesfully logged out"});
}
