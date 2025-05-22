
import express, { Application } from "express"

const app: Application = express();
const PORT = process.env.PORT || 3000;

import basicUsageRouter from "./routes/basic-usage"
import { errorHandler } from "./middlewares/errorHandler";

// app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use("/api", basicUsageRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});