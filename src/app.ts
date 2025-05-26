
import express, { Application } from "express"
// import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv"
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

import "./config/db"
import { errorHandler } from "./middlewares/errorHandler";
import basicUsageRouter from "./routes/basic-usage";
import registrationRouter from "./routes/registration"


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use("/api", basicUsageRouter);
app.use("/api", registrationRouter);


// Error handler goes at the very end
app.use(errorHandler);
// app.use(errorHandler as (err: unknown, req: Request, res: Response, next: NextFunction) => void);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});