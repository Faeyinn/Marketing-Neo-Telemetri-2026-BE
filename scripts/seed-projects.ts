import { prisma } from '../src/lib/db.js';

const projects = [
  {
    name: 'Neo E-Commerce Platform',
    slug: 'neo-e-commerce-platform',
    description: 'A robust e-commerce platform built with modern technologies to handle high traffic and transactions.',
    division: 'Programming',
    creationDate: new Date('2024-01-15'),
  },
  {
    name: 'Marketing Portfolio Website',
    slug: 'marketing-portfolio-website',
    description: 'A visually stunning portfolio website for showcasing marketing achievements and case studies.',
    division: 'Multimedia & Design',
    creationDate: new Date('2024-02-10'),
  },
  {
    name: 'Campus Network Infrastructure Upgrade',
    slug: 'campus-network-infrastructure-upgrade',
    description: 'Implementation of high-speed Wi-Fi 6 across the entire campus and modernization of server racks.',
    division: 'Sistem Komputer & Jaringan',
    creationDate: new Date('2024-03-05'),
  },
  {
    name: 'Smart Home Automation System',
    slug: 'smart-home-automation-system',
    description: 'An IoT-based system to control home appliances remotely using a mobile application.',
    division: 'Programming',
    creationDate: new Date('2024-04-20'),
  },
  {
    name: 'Neo Brand Identity Re-design',
    slug: 'neo-brand-identity-re-design',
    description: 'Complete overhaul of the Neo brand including logo, typography, and visual assets.',
    division: 'Multimedia & Design',
    creationDate: new Date('2024-05-12'),
  },
  {
    name: 'Cybersecurity Lab Setup',
    slug: 'cybersecurity-lab-setup',
    description: 'Designing and implementing a secure environment for testing network vulnerabilities and training.',
    division: 'Sistem Komputer & Jaringan',
    creationDate: new Date('2024-06-18'),
  },
  {
    name: 'Internal HR Management Dashboard',
    slug: 'internal-hr-management-dashboard',
    description: 'A centralized dashboard for managing employee records, payroll, and performance evaluations.',
    division: 'Programming',
    creationDate: new Date('2024-07-25'),
  },
  {
    name: '3D Architectural Visualization',
    slug: '3d-architectural-visualization',
    description: 'Creating high-fidelity 3D renders for a new urban planning project.',
    division: 'Multimedia & Design',
    creationDate: new Date('2024-08-30'),
  },
  {
    name: 'Hybrid Cloud Deployment',
    slug: 'hybrid-cloud-deployment',
    description: 'Integrating on-premise servers with public cloud services for improved scalability and disaster recovery.',
    division: 'Sistem Komputer & Jaringan',
    creationDate: new Date('2024-09-14'),
  }
];

async function main() {
  console.log('Seeding projects...');
  
  for (const projectData of projects) {
    const project = await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: projectData,
      create: projectData,
    });
    console.log(`- Seeded: ${project.name} (${project.division})`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
