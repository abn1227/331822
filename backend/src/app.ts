import cors from "cors";
import express from "express";

import { config } from "./config";
import { connection } from "./config/database";
import userRoutes from "./routes/user.routes";

const app = express();

connection();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
