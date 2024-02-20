import express, { Application } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import { checkAuthMiddleware } from './utils/auth';

const app:Application = express();

//TODO Add .env file
const PORT = 3000;

app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
