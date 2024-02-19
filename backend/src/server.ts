import express, { Application } from 'express';
import cors from "cors"

const app:Application = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
