import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import User from "../models/user";
import { TUser } from "../utils/types";
import { Hash } from "../utils/auth";

export const getUsers = async(_: Request, res: Response) => {
    const {result, error} = await User.fetchAll();
    if(error){
        return res.status(500).json({error: "An error occured"});
    }
    return res.status(200).json(result)
} 

export const getUser = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const {result, error} = await User.fetchById(id);
    if(error) {
        return res.status(500).json({error: "An error occured"})
    }

    if (!result) {
        return res.status(404).json({error: "No user found"})
    }
    return res.status(200).json(result);
}

// Not currently in use
export const createUser = async(req: Request<{}, {}, TUser>, res:Response) => {
    //Add some validation here
    const username = req.body.username;
    const password = await Hash(10,req.body.password);
    const email = req.body.email;
    const id = crypto.randomUUID();


    const user = new User({id, username, email, password});
    const {result, error} = await user.create();
    if(error) {
        res.status(500).json({error: "An error occured"})
    }
    res.status(201).json({message: "User created successfully"})
}

// Not currently in use
export const updateUser = async(req: Request<ParamsDictionary, {}, TUser>, res:Response) => {
    const {id} = req.params;
    const data = req.body;
    const user = new User(data, id);
    const {result, error} = await user.update();
    if(error) {
        res.status(500).json({error: "An error occured"})
    }
    res.status(200).json({message: "User updated successfully"})
}

// Not currently in use
export const deleteUser = async(req: Request, res:Response) => {
    const {id} = req.params;
    const {result, error} =  await User.deleteById(id);
    if(error) {
        res.status(500).json({error: "An error occured"})
    }
    if(result) {
        res.status(200).json({message: `Deleted client with ID: ${id}`});
    }else {
        res.status(400).json({message: `No client exists with ID: ${id}`});
    }
}
