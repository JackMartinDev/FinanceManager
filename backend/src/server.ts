import express, { Application } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import holdingRoutes from "./routes/holdings"
import { checkAuthMiddleware } from './utils/auth';

const app:Application = express();
dotenv.config();

//TODO Add .env file
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, _, next) => {
	console.log(req.path, req.method);
	next();
});

app.use("/auth",authRoutes);

//Prevent non logged in users from accessing content
app.use(checkAuthMiddleware);

app.use("/test", userRoutes);

app.use("/holding", holdingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
