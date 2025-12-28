import { faker } from "@faker-js/faker";
import { BookingStatus, DurationUnit, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  {
    title: "Elderly Care & Companionship",
    slug: "elderly-care",
    description:
      "Compassionate in-home care for seniors. Our caregivers provide companionship, medication reminders, assistance with daily activities, and a friendly face to brighten the day.",
    category: "Elderly Care",
    baseRate: 500,
    imageUrl: "/services/elderly.jpg",
  },
  {
    title: "Childcare & Babysitting",
    slug: "childcare-babysitting",
    description:
      "Trusted, verified babysitters for your peace of mind. Whether for a date night or daily support, our caregivers engage your children in safe, fun, and educational activities.",
    category: "Childcare",
    baseRate: 400,
    imageUrl: "/services/childcare.jpg",
  },
  {
    title: "Professional Nursing Care",
    slug: "professional-nursing",
    description:
      "Skilled nursing care for post-operative recovery, wound dressing, vital monitoring, and injections. Bringing hospital-quality medical support to the comfort of your home.",
    category: "Nursing",
    baseRate: 800,
    imageUrl: "/services/nursing.jpg",
  },
  {
    title: "Physiotherapy & Rehab",
    slug: "physiotherapy-rehab",
    description:
      "Expert physiotherapy sessions at home to help with mobility, injury recovery, and pain management. Personalized exercises designed for your specific needs.",
    category: "Therapy",
    baseRate: 1000,
    imageUrl: "/services/physio.jpg",
  },
  {
    title: "Palliative Care",
    slug: "palliative-care",
    description:
      "Specialized care focused on providing relief from the symptoms and stress of a serious illness. Our goal is to improve quality of life for both the patient and the family.",
    category: "Nursing",
    baseRate: 900,
    imageUrl: "/services/nursing.jpg", // Reusing nursing image
  },
  {
    title: "Full-time Nanny Service",
    slug: "full-time-nanny",
    description:
      "Dedicated full-time nannies to support your growing family. Experienced in infant care, toddler activities, and maintaining a structured routine for your children.",
    category: "Childcare",
    baseRate: 15000, // Monthly or day rate logic can be handled in UI, keeping int for now
    imageUrl: "/services/childcare.jpg", // Reusing childcare image
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create Services
  const createdServices = [];
  for (const service of services) {
    const activeService = await prisma.service.upsert({
      where: { slug: service.slug },
      update: service, // Update existing records with new data
      create: service,
    });
    createdServices.push(activeService);
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

  // Create 10 Random Users
  const userPassword = await bcrypt.hash("User@123456", 10);
  const usersToCreate = 10;

  console.log(`Creating ${usersToCreate} random users...`);

  for (let i = 0; i < usersToCreate; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    // Create User
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        passwordHash: userPassword,
        role: "USER",
        contact: faker.phone.number(),
        nid: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
        image: faker.image.avatar(),
      },
    });

    console.log(`Created user: ${user.name} (${user.email})`);

    // Create 1-3 Booking per user
    const numberOfBookings = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < numberOfBookings; j++) {
      const randomService =
        createdServices[
          faker.number.int({ min: 0, max: createdServices.length - 1 })
        ];
      const bookingDuration = faker.number.int({ min: 1, max: 10 });
      const totalCost = randomService.baseRate * bookingDuration;

      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          serviceId: randomService.id,
          durationUnit: DurationUnit.HOUR,
          durationValue: bookingDuration,
          division: faker.location.state(),
          district: faker.location.city(),
          city: faker.location.city(),
          area: faker.location.street(),
          address: faker.location.streetAddress(),
          totalCost: totalCost,
          status: faker.helpers.arrayElement([
            "PENDING",
            "CONFIRMED",
            "COMPLETED",
          ]) as BookingStatus,
        },
      });

      // Decide if payment is made
      if (["CONFIRMED", "COMPLETED"].includes(booking.status)) {
        await prisma.payment.create({
          data: {
            bookingId: booking.id,
            amount: totalCost,
            currency: "BDT",
            stripePaymentIntentId: `pi_${faker.string.alphanumeric(24)}`,
            status: "succeeded",
          },
        });
        console.log(` > Paid booking for ${randomService.title}`);
      } else {
        console.log(` > Created pending booking for ${randomService.title}`);
      }
    }
  }

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
