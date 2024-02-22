import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import User from "../models/user";
import { TUser } from "../utils/types";
import { Hash } from "../utils/auth";

export const getUsers = async(_: Request, res: Response) => {
    try {
        const users = await User.fetchAll();
        return res.status(200).json(users)
    } catch (error) {
        throw error 
    }
} 

export const getUser = async(req: Request, res: Response) =>{
    const {id} = req.params;
    try {
        const user = await User.fetchById(id);
        if (!user) {
            return res.status(400).json({error: "No user found"})
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}

export const createUser = async(req: Request<{}, {}, TUser>, res:Response) => {
    try {
        //Add some validation here
        const username = req.body.username;
        const password = await Hash(10,req.body.password);
        const email = req.body.email;
        const id = crypto.randomUUID();


        const user = new User({id, username, email, password});
        user.create();
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}

export const patchUser = async(req: Request<ParamsDictionary, {}, TUser>, res:Response) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const user = new User(data, id);
        user.update();
        res.status(200).json({message: "User updated successfully"})
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}

export const deleteUser = async(req: Request, res:Response) => {
    const {id} = req.params;
    try {
        const is_success =  await User.deleteById(id);
        if(is_success) {
            res.status(200).json({message: `Deleted client with ID: ${id}`});
        }else {
            res.status(400).json({message: `No client exists with ID: ${id}`});
        }
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}
