import prisma from "@/lib/db";

interface SchoolData {
  id: string;
  name: string;
}

export async function FetchSchools(): Promise<SchoolData[]> {
  try {
    const schools = await prisma.university.findMany({
      select: { id: true, name: true },
    });

    return schools.map((school) => ({
      id: school.id,
      name: school.name,
    }));
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw new Error("Failed to fetch schools");
  }
}