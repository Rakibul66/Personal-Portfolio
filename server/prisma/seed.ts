import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔒 Ensuring admin account...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rakibulhr.dev';
  const rawPassword = process.env.ADMIN_PASSWORD || 'admin_secure_password_123';
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
    },
  });
  console.log(`👤 Admin account verified (${adminEmail})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
