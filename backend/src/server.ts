import express, { Request, Response } from "express";
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blog.route";

const app = express();
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Welcome to Blog Backend API</h1>");
});

//Authentication views
app.use("/api/auth", authRouter);

//BLog views
app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at - http://localhost:${PORT}/`);
});
