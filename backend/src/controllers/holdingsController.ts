import { Request, Response } from "express";
import Holding from "../models/holding"; 
import { THolding } from "../utils/types";

export const getHoldings = async(_: Request, res: Response) => {
    const {result, error} = await Holding.fetchAll();
    if(error){
        return res.status(500).json({error: "An error occurred"});
    }
    return res.status(200).json(result); 
};

export const getHolding = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {result, error} = await Holding.fetchByUserId(id);
    if(error) {
        return res.status(500).json({error: "An error occurred"})
    }

    if (!result) {
        return res.status(404).json({error: "No holding found"}) 
    }
    return res.status(200).json(result); 
};

export const createHolding = async(req: Request<{}, {}, THolding>, res: Response) => {
    // Add some validation here
    const { code, name, color, volume, buyPrice, userId } = req.body;

    const id = crypto.randomUUID();
    const holding = new Holding({ id, code, name, volume, buyPrice, color, userId});
    const {result, error} = await holding.create();
    if(error) {
        return res.status(500).json({error: "An error occurred"});
    }
    return res.status(201).json({message: "Holding created successfully", holding: result});
};

export const updateHolding = async(req: Request, res: Response) => {
    const {id} = req.params;
    const data = req.body;
    const holding = new Holding(data, id);
    const {result, error} = await holding.update();
    if(error) {
        return res.status(500).json({error: "An error occurred"});
    }
    return res.status(200).json({message: "Holding updated successfully", updatedHolding: result});
};

export const deleteHolding = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {result, error} = await Holding.deleteById(id);
    if(error) {
        return res.status(500).json({error: "An error occurred"});
    }
    if(result) {
        return res.status(200).json({message: `Deleted holding with ID: ${id}`});
    }else {
        return res.status(404).json({message: `No holding exists with ID: ${id}`});
    }
};

