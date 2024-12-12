import { fetchUserMedia } from "@/app/api/submit-form/(InstagramAPIs)/InstagramGetAPI";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetchUserMedia();

    return NextResponse.json({
      message: "data fetched successfuly!",
      response,
    });
  } catch (error) {
    console.error("Failed to fetch Instagram:", error);
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}
