import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["info"],
  });
} else {
  prisma = new PrismaClient();
}

// Gracefully disconnect from the Prisma client
process.on("beforeExit", async () => {
  await prisma.$disconnect();
  console.log("Prisma client disconnected");
});

export default prisma;
