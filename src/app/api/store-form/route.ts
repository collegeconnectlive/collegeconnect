import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Rekognition client setup with explicit credentials

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, caption, ig, snap, schoolID, validUrls } = body;

    if (!name || !schoolID || !validUrls || validUrls.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create student record
    const student = await prisma.student.create({
      data: {
        name,
        bio: caption,
        phoneNumber: phone,
        email: email,
        ig: ig,
        snap: snap,
        university: {
          connect: {
            id: schoolID, // Ensure this field is unique or has a unique constraint
          },
        },
        photos: {
          create: validUrls.map((url: string) => ({ url })),
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
