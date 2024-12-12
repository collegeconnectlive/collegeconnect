import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { postToInstagram } from "./(InstagramAPIs)/InstagramPostAPI";

const prisma = new PrismaClient();
// Rekognition client setup with explicit credentials

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, caption, ig, snap, school, phone, validUrls } = body;
    console.log(body);
    if (!name || !school || !validUrls || validUrls.length === 0) {
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
        phoneNumber: phone, // Assuming IG handle is stored here
        ig: ig,
        snap: snap,
        university: {
          connectOrCreate: {
            where: { name: school },
            create: { name: school },
          },
        },
        photos: {
          create: validUrls.map((url: string) => ({ url })),
        },
      },
    });

    // Call Instagram posting function if conditions are met
    if (validUrls.length > 0) {
      try {
        const instagramResponse = await postToInstagram({
          caption: `${name}: ${caption}`,
          images: validUrls,
        });

        return NextResponse.json({
          success: true,
          message: "Form data saved and Instagram post published!",
          student,
          instagramResponse,
        });
      } catch (instagramError) {
        console.error("Instagram posting failed:", instagramError);
        return NextResponse.json({
          success: true,
          message: "Form data saved, but Instagram post failed.",
          student,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Form data saved successfully!",
      student,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json(
      { message: "Error saving form data" },
      { status: 500 }
    );
  }
}
