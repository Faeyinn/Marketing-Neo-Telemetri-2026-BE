import express from "express";
import { prisma } from "./src/lib/db.js";

const app = express();
app.use(express.json());

const port = parseInt(process.env.PORT || "8080");

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Marketing Neo API",
    version: "1.0.0",
    endpoints: {
      root: "/",
      api: "/api",
      projects: "/api/projects"
    }
  });
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
