import { Request, Response } from "express"
import User from "../models/user"
import { ValidateUser } from "../utils/auth";

export const authLogin = async(req: Request, res: Response) => {
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
                return res.status(200).json({message: "Successful login", user: user});
            } else {
                return res.status(400).json({error: "Incorrect username or password"});
            }
        } else {
            return res.status(400).json({error: "Incorrect username or password"});
        }
    } catch (error) {
        throw error
    }
}
