import express from "express"
import {getUsers, getUser, createUser, patchUser, deleteUser} from "../controllers/userController"

const router = express.Router();

router.get("/", getUsers);

export default router
