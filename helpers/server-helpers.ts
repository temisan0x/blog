import prisma from "@/prisma";

export const connnectToDb = async()=> {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log(error);
    }
    throw new Error("Error connecting to prisma database");
}