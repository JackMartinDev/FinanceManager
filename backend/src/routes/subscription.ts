import express from "express"
import {getSubscriptions, getSubscription, createSubscription, updateSubscription, deleteSubscription} from "../controllers/subscriptionController"

const router = express.Router();

router.get("/", getSubscriptions);

router.get("/:id", getSubscription)

router.post("/", createSubscription);

router.patch("/:id", updateSubscription);

router.delete("/:id", deleteSubscription);

export default router
