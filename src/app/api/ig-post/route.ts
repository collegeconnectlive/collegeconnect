import { NextResponse } from "next/server";

import { postCarouselToInstagram } from "@/app/api/ig-post/(InstagramAPIs)/InstagramPostAPI";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { caption, images } = data;

    // Validate input
    if (!caption || !images || images.length < 2) {
      console.log(images[0])
      return NextResponse.json(
        { message: "Caption and at least 2 images are required for a carousel." },
        { status: 400 }
      );
    }

    // Post carousel to Instagram
    const response = await postCarouselToInstagram({ caption, images });

    return NextResponse.json({
      message: "Carousel posted successfully!",
      response,
    });
  } catch (error) {
    console.error("Error posting carousel to Instagram:", error);
    return NextResponse.json(
      { message: "Failed to post carousel to Instagram." },
      { status: 500 }
    );
  }
}
