import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, ig, schoolID, snap } = body;

    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!phone) missingFields.push("phone");
    if (!email) missingFields.push("email");
    if (!schoolID) missingFields.push("school");

    // Check if there are any missing fields
    if (missingFields.length > 0) {
      const missingMessage = missingFields.join(", ");
      return NextResponse.json(
        { message: `Missing required fields: ${missingMessage}` },
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
        phoneNumber: phone,
        email,
        ig,
        snap,
        university: {
          connect: {
            id: schoolID,
          },
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
