import express from "express"
import {getUsers, getUser, createUser, patchUser, deleteUser} from "../controllers/userController"

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser)

router.post("/", createUser);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

export default router
