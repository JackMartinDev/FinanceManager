import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { NotAuthError } from "./errors";

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretValue';

export const Hash = async(saltRounds: number, password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);
        return hash;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const ValidateUser = async(password:string, hash:string) => {
    try {
        const valid = await bcrypt.compare(password, hash);
        console.log(valid);
        return valid;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const isEmailPresent = (email:string) =>{
    return /^\s*\S.*$/.test(email);
}

export const isPasswordPresent = (password:string) =>{
    return /^\s*\S.*$/.test(password);
}

export const isValidUsername = (username: string) =>{
    return /^.{2,16}$/.test(username)
}

export const isValidEmail = (email: string) => {
	return /^\S+@\S+\.\S+$/.test(email);
};

export const isValidPassword = (password: string) => {
	return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
};


export const checkAuthMiddleware = async(req:Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    console.log(token);

    if(token) {
        jwt.verify(token, jwtSecret, (err: VerifyErrors | null) => {
            if (err) {
                res.clearCookie("jwt");
                return res.status(401).json(new NotAuthError())
            } else {
                next();
            }
        })
    } else {
        return res.status(401).json(new NotAuthError("Not authorized, no auth token"));
    }
}
