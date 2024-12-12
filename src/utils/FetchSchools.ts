import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function FetchSchools() {
  try {
    const schools = await prisma.university.findMany({
      select: { name: true },
    });

    return schools.map((school) => school.name);
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw new Error("Failed to fetch schools");
  }
}
