import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { config } from "./config";
import { connection } from "./config/database";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

connection();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Swagger Docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
