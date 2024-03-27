import { Request, Response } from "express";
import Subscription from "../models/subscription"; 
import { TSubscription } from "../utils/types";
import camelcaseKeys from "camelcase-keys";
import { groupSubscriptionsService } from "../services/groupSubscriptionsService";

export const getSubscriptions = async(_: Request, res: Response) => {
    const {result, error} = await Subscription.fetchAll();
    if(error){
        return res.status(500).json({error: "An error occurred"});
    }
    return res.status(200).json(result); 
};

export const getSubscription = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {result, error} = await Subscription.fetchByUserId(id)

    if(error) {
        return res.status(500).json({error: "An error occurred"})
    }

    if (!result) {
        return res.status(404).json({error: "No subscription found"}) 
    }
    const groupedResult = groupSubscriptionsService(camelcaseKeys(result))

    return res.status(200).json(groupedResult); 
};

export const createSubscription = async(req: Request<{}, {}, TSubscription>, res: Response) => {
    // Add some validation here
    const { name, price, startDate, endDate, userId } = req.body;

    const id = crypto.randomUUID();
    const subscription = new Subscription({ id, name, price, startDate, endDate, userId});
    const {result, error} = await subscription.create();
    if(error) {
        return res.status(500).json({error: "An error occurred"});
    }
    return res.status(201).json({message: "Subscription created successfully", subscription: result});
};

export const updateSubscription = async(req: Request, res: Response) => {
    const {id} = req.params;
    const data = req.body;
    const subscription = new Subscription(data, id);
    const {result, error} = await subscription.update();
    if(error) {
        return res.status(500).json({error: "An error occurred"});
    }
    return res.status(200).json({message: "Subscription updated successfully", updatedSubscription: result});
};

export const deleteSubscription = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {result, error} = await Subscription.deleteById(id);
    if(error) {
        return res.status(500).json({error: "An error occurred"});
    }
    if(result) {
        return res.status(200).json({message: `Deleted subscription with ID: ${id}`});
    }else {
        return res.status(404).json({message: `No subscription exists with ID: ${id}`});
    }
};

