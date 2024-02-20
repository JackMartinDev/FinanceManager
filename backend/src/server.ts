import express, { Application } from 'express';
import cors from "cors"

import userRoutes from "./routes/users"

const app:Application = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.use("/test", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
