import express from "express"
import {getHoldings, getHolding, createHolding, updateHolding, deleteHolding} from "../controllers/holdingsController"

const router = express.Router();

router.get("/", getHoldings);

router.get("/:id", getHolding)

router.post("/", createHolding);

router.patch("/:id", updateHolding);

router.delete("/:id", deleteHolding);

export default router
