import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/db.js';

async function main() {
  const email = 'neotele@gmail.com';
  const password = 'neotelemetri';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log('Admin user seeded:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
