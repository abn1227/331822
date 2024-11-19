import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { config } from "./config";
import { connection } from "./config/database";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import handyManRoutes from "./routes/handyManRoutes";
import jobPetitionRoutes from "./routes/jobPetitionRoutes";
// import userRoutes from "./routes/userRoutes";
import adminSeeder from "./seeders/adminSeeder";
import categoriesSeeder from "./seeders/categoriesSeeder";

const app = express();

connection();

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/handyman", handyManRoutes);
app.use("/api/v1/job-petition", jobPetitionRoutes);
// app.use("/api/v1/user", userRoutes);

// Swagger Docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Seeders
adminSeeder();
categoriesSeeder();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
