import express, { Application } from 'express';
import cors from "cors"

import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"

const app:Application = express();

//TODO Add .env file
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use("/test", userRoutes);

app.use("/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
