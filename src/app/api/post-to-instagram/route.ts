import { NextResponse } from "next/server";
import { postToInstagram } from "./(InstagramAPIs)/InstagramPostAPI";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { caption, ig, snap, schoolID, validUrls } = body;

    if (!schoolID || !validUrls || validUrls.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
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
          instagramResponse,
        });
      } catch (instagramError) {
        console.error("Instagram posting failed:", instagramError);
        return NextResponse.json({
          success: false,
          message: "Instagram post failed.",
        });
      }
    }
  } catch {}
}
