import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  {
    title: "Elderly Care",
    slug: "elderly-care",
    description:
      "Compassionate care for seniors, including companionship, medication reminders, and assistance with daily activities.",
    category: "elderly",
    baseRate: 500, // BDT per hour/unit
  },
  {
    title: "Baby Care",
    slug: "baby-care",
    description:
      "Professional babysitting and childcare services ensuring safety and engagement for your little ones.",
    category: "baby",
    baseRate: 400,
  },
  {
    title: "Post-Operative Care",
    slug: "post-operative-care",
    description:
      "Specialized support for patients recovering from surgery, wound dressing, and monitoring vitals.",
    category: "sick",
    baseRate: 700,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create Services
  for (const service of services) {
    const activeService = await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
    console.log(`Created service: ${activeService.title}`);
  }

  // Create Admin User
  const adminPassword = await bcrypt.hash("Admin@123456", 10);
  const adminValue = {
    email: "admin@care.xyz",
    name: "System Admin",
    passwordHash: adminPassword,
    role: "ADMIN" as const,
    contact: "01700000000",
    nid: "1234567890",
  };

  const admin = await prisma.user.upsert({
    where: { email: "admin@care.xyz" },
    update: {
      passwordHash: adminPassword,
      role: "ADMIN", // Ensure role is enforced
    },
    create: adminValue,
  });

  console.log(`Created admin user: ${admin.email}`);
  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
