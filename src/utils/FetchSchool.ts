import prisma from "@/lib/db";

export async function FetchSchool(slug: string): Promise<string | null> {
  if (!slug || typeof slug !== "string") {
    throw new Error("Invalid slug parameter");
  }

  try {
    const school = await prisma.university.findUnique({
      select: { name: true },
      where: { slug },
    });

    if (!school) {
      console.warn(`No school found with slug: ${slug}`);
      return null;
    }

    return school.name;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching school:", error.message, {
        slug,
        stack: error.stack,
      });
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw new Error("Failed to fetch school data. Please try again later.");
  }
}
