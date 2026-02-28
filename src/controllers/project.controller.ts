import { Request, Response } from "express";
import { ProjectSchema } from "../schemas/project.schema.js";
import { ProjectService } from "../services/project.service.js";
import { z } from "zod";

/**
 * @swagger
 * tags:
 *   name: Projects
 */

export class ProjectController {
  /**
   * @swagger
   * /api/projects:
   *   get:
   *     summary: Get all projects
   *     tags: [Projects]
   *     responses:
   *       200:
   *         description: List of projects
   */
  static async getAll(req: Request, res: Response) {
    try {
      const projects = await ProjectService.getAll();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/projects/{slug}:
   *   get:
   *     summary: Get project by slug
   *     tags: [Projects]
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Project details
   *       404:
   *         description: Project not found
   */
  static async getBySlug(req: Request, res: Response) {
    try {
      const project = await ProjectService.getBySlug(req.params.slug as string);
      res.json(project);
    } catch (error) {
      if ((error as Error).message === "Project not found") {
        return res.status(404).json({ error: (error as Error).message });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/projects:
   *   post:
   *     summary: Create a new project
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               division:
   *                 type: string
   *                 enum: ["Programming", "Multimedia & Design", "Sistem Komputer & Jaringan"]
   *               creationDate:
   *                 type: string
   *                 format: date
   *                 example: "2024-02-28"
   *               coverImage:
   *                 type: string
   *                 format: binary
   *     responses:
   *       201:
   *         description: Project created
   *       400:
   *         description: Validation error
   *       401:
   *         description: Unauthorized
   */
  static async create(req: Request, res: Response) {
    try {
      const validatedData = ProjectSchema.parse(req.body);
      const project = await ProjectService.create(validatedData, req.file?.filename);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/projects/{id}:
   *   delete:
   *     summary: Delete project by ID
   *     tags: [Projects]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Project deleted
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  static async delete(req: Request, res: Response) {
    try {
      await ProjectService.delete(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
