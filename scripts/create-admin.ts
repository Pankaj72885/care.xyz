import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdminUser() {
  console.log("🔐 Creating admin user...\n");

  const adminEmail = "admin@care.xyz";
  const adminPassword = "Admin@123456";
  const adminName = "System Administrator";

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("⚠️  Admin user already exists!");
    console.log(`   Email: ${existingAdmin.email}`);
    console.log(`   Role: ${existingAdmin.role}`);

    if (existingAdmin.role !== "ADMIN") {
      console.log("\n🔄 Updating user role to ADMIN...");
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "ADMIN" },
      });
      console.log("✅ User role updated to ADMIN!");
    }
  } else {
    // Hash password
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log("✅ Admin user created successfully!\n");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);
    console.log("👤 Name:", adminName);
    console.log(
      "\n⚠️  IMPORTANT: Please change the password after first login!"
    );
  }

  await prisma.$disconnect();
}

createAdminUser().catch((error) => {
  console.error("❌ Error creating admin user:", error);
  process.exit(1);
});
