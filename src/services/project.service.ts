import { prisma } from "../lib/db.js";

const generateSlug = (name: string) => {
  return name.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export class ProjectService {
  static async getAll() {
    return await prisma.project.findMany({
      orderBy: { creationDate: 'desc' }
    });
  }

  static async getBySlug(slug: string) {
    const project = await prisma.project.findUnique({
      where: { slug }
    });
    if (!project) throw new Error("Project not found");
    return project;
  }

  static async create(data: any, fileName: string | undefined) {
    const slug = generateSlug(data.name);
    
    const existing = await prisma.project.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    return await prisma.project.create({
      data: {
        ...data,
        slug: finalSlug,
        coverImage: fileName ? `/uploads/${fileName}` : null
      }
    });
  }

  static async delete(id: string) {
    return await prisma.project.delete({ where: { id } });
  }
}
