import express from "express"
import {authLogin} from "../controllers/authController"

const router = express.Router();

router.post("/login", authLogin);

export default router
