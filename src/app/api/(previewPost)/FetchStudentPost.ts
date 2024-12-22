import prisma from "@/lib/db";

interface SubmissionData {
  id: string;
  photos: { order: number }[];
}

export async function FetchStudentPost(
  studentId: string
): Promise<SubmissionData | null> {
  if (!studentId || typeof studentId !== "string") {
    throw new Error("Invalid studentId parameter");
  }

  try {
    const submission = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        photos: {
          orderBy: { order: "asc" }, // Ensure photos are returned in the correct order
        },
      },
    });

    if (!submission) {
      console.warn(`No submission found for studentId: ${studentId}`);
      return null;
    }

    return submission;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching submission:", error.message, {
        studentId,
        stack: error.stack,
      });
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw new Error("Failed to fetch submission data. Please try again later.");
  }
}
