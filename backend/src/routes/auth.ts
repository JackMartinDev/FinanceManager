import express from "express"
import {authLogin, authLogout, refresh} from "../controllers/authController"

const router = express.Router();

router.post("/login", authLogin);

router.get("/logout", authLogout);

router.get("/me", refresh);

export default router
