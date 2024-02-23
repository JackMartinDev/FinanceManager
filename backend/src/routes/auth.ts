import express from "express"
import {authLogin, refresh} from "../controllers/authController"

const router = express.Router();

router.post("/login", authLogin);

router.get("/me", refresh);

export default router
