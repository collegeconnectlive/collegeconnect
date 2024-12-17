import { NextResponse } from "next/server";
import { postToInstagram } from "./(InstagramAPIs)/InstagramPostAPI";
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
    console.log("in Submit Form, school id is: ", schoolID);
    // Call Instagram posting function if conditions are met
    if (validUrls.length > 0) {
      try {
        const instagramResponse = await postToInstagram({
          caption:
            ig && snap
              ? `${caption}\n\nInstagram: @${ig}\nSnapchat: ${snap}`
              : ig
              ? `${caption}\n\nInstagram: @${ig}`
              : snap
              ? `${caption}\n\nSnapchat: ${snap}`
              : `${caption}`,
          images: validUrls,
          schoolID: schoolID,
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
