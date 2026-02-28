import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './lib/swagger.js';
import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON for debugging
app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Marketing Neo API",
    version: "1.1.0",
    endpoints: {
      root: "/",
      projects: "/api/projects",
      auth: "/api/auth"
    }
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

export default app;
