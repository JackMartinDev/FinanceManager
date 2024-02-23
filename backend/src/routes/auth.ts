import express from "express"
import {authLogin, authLogout, authRegister, refresh} from "../controllers/authController"

const router = express.Router();

router.post("/login", authLogin);

router.get("/logout", authLogout);

router.post("/register", authRegister);

router.get("/me", refresh);

export default router
