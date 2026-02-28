import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  division: z.string().min(1, "Division is required"),
  creationDate: z.string().transform((str) => new Date(str)),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
