import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, caption, ig, snap, schoolID, images } = body;

    // Validate required fields
    if (!name || !schoolID || !images || images.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const universityExists = await prisma.university.findUnique({
      where: { id: schoolID },
    });

    if (!universityExists) {
      return NextResponse.json(
        { message: "University not found", success: false },
        { status: 404 }
      );
    }

    // Create student record
    const student = await prisma.student.create({
      data: {
        name,
        caption: caption,
        phoneNumber: phone,
        email,
        ig,
        snap,
        university: {
          connect: {
            id: schoolID,
          },
        },
        photos: {
          create: images.map((photo: { url: string; order: number }) => ({
            url: photo.url,
            order: photo.order,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Form data saved successfully!",
      student,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json(
      { message: "Error saving form data", success: false },
      { status: 500 }
    );
  }
}
