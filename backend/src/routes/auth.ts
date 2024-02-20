import express from "express"
import {authLogin} from "../controllers/authController"

const router = express.Router();

router.post("/", authLogin);

export default router
