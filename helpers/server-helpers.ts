import prisma from "@/prisma";

export const connectToDb = async () => {
  try {
    await prisma.$connect();
    console.log("connected");
  } catch (error) {
    console.log(error);
    throw Error("Error connecting to prisma database");
  }
};
