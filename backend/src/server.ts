import express, { Request, Response } from "express";
import authRouter from './routes/auth.route'

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Welcome to Blog Backend API</h1>");
});

app.use('/api/auth', authRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at - http://localhost:${PORT}/`);
});
