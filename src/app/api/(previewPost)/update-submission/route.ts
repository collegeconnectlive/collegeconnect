import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { studentId, bio, photos } = req.body;

  try {
    // Update the student's caption
    await prisma.student.update({
      where: { id: String(studentId) },
      data: { bio },
    });

    // Update photo data
    await prisma.$transaction(
      photos.map((photo: { id: string; url: string; order: number }) =>
        prisma.photo.update({
          where: { id: photo.id },
          data: { url: photo.url, order: photo.order },
        })
      )
    );

    return res
      .status(200)
      .json({ message: "Submission updated successfully!" });
  } catch (error) {
    console.error("Error updating submission:", error);
    return res.status(500).json({ error: "Failed to update submission" });
  }
}
