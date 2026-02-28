import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", ProjectController.getAll);
router.get("/:slug", ProjectController.getBySlug);
router.post("/", upload.single('coverImage'), ProjectController.create);
router.delete("/:id", ProjectController.delete);

export default router;
