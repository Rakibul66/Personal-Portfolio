import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create default admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rakibulhr.dev';
  const rawPassword = process.env.ADMIN_PASSWORD || 'admin_secure_password_123';
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Rakibul Hasan',
      password: hashedPassword,
    },
  });
  console.log(`👤 Admin user created (${adminEmail})`);

  // 2. Seed projects from existing portfolio
  const projects = [
    {
      title: 'E-Commerce Platform',
      subtitle: 'Modern Flutter Shopping Application',
      description: 'A full-featured shopping app with state management, clean architecture, payment gateway integration, and real-time order tracking.',
      technologies: ['Flutter', 'Dart', 'Bloc', 'REST API', 'Firebase', 'Stripe'],
      category: 'Mobile App',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      githubUrl: 'https://github.com/Rakibul-Hasan-Roxy',
      liveUrl: 'https://example.com',
      featured: true,
      order: 1,
    },
    {
      title: 'Task Management App',
      subtitle: 'Productivity & Collaboration Tool',
      description: 'Collaborative task management application featuring drag-and-drop boards, offline caching, and push notifications.',
      technologies: ['Flutter', 'Riverpod', 'Hive', 'WebSocket', 'Tailwind'],
      category: 'Mobile App',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      githubUrl: 'https://github.com/Rakibul-Hasan-Roxy',
      featured: true,
      order: 2,
    },
    {
      title: 'Fintech Wallet Application',
      subtitle: 'Secure Mobile Banking & Payments',
      description: 'Secure digital wallet with biometric authentication, transaction history, QR payments, and spending analytics.',
      technologies: ['Flutter', 'Clean Architecture', 'Bloc', 'Local Auth', 'Charts'],
      category: 'Fintech',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
      githubUrl: 'https://github.com/Rakibul-Hasan-Roxy',
      featured: false,
      order: 3,
    },
  ];

  for (const proj of projects) {
    const existing = await prisma.project.findFirst({ where: { title: proj.title } });
    if (!existing) {
      await prisma.project.create({ data: proj });
    }
  }
  console.log(`💼 Seeded ${projects.length} initial projects`);

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
