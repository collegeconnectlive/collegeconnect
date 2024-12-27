import { NextResponse } from "next/server";
import { postToInstagram } from "./(InstagramAPIs)/InstagramPostAPI";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { caption, schoolID, images } = body;

    // Validate required fields
    if (!schoolID || !images || images.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      // Call the Instagram API with the provided data
      const instagramResponse = await postToInstagram({
        caption: caption || "", // Provide a fallback for caption if undefined
        images: images,
        schoolID: schoolID,
      });

      return NextResponse.json({
        success: true,
        message: "Form data saved and Instagram post published!",
        instagramResponse,
      });
    } catch (instagramError) {
      // Log the Instagram error for debugging
      console.error("Instagram posting failed:", instagramError);
      return NextResponse.json(
        {
          success: false,
          message: "Instagram post failed. Please try again later.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Log any unexpected errors for debugging
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
