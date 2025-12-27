import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findAdminUsers() {
  console.log("🔍 Searching for admin users...\n");

  const adminUsers = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (adminUsers.length === 0) {
    console.log("❌ No admin users found in the database.");
    console.log("\n💡 To create an admin user, you can:");
    console.log("   1. Register a new user via the UI");
    console.log(
      "   2. Update their role to ADMIN using Prisma Studio (http://localhost:5555)"
    );
    console.log("   3. Or run the create-admin.ts script");
  } else {
    console.log(`✅ Found ${adminUsers.length} admin user(s):\n`);
    adminUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Created: ${user.createdAt.toLocaleString()}`);
      console.log("");
    });
  }

  await prisma.$disconnect();
}

findAdminUsers().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
