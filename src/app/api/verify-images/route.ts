import { NextResponse } from "next/server";
import {
  DetectModerationLabelsCommand,
  RekognitionClient,
} from "@aws-sdk/client-rekognition";

// Validate environment variables
if (
  !process.env.AWS_S3_REGION ||
  !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error(`Missing required AWS environment variables`);
}

// Configure Rekognition client
const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Function to verify image content using AWS Rekognition
async function verifyImages(
  fileUrls: string[]
): Promise<{ valid: string[]; invalid: string[] }> {
  const validUrls: string[] = [];
  const invalidUrls: string[] = [];
  for (const url of fileUrls) {
    try {
      // Fetch the image data
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${url}: ${response.statusText}`);
        invalidUrls.push(url);
        continue; // Skip further processing for this URL
      }

      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const params = {
        Image: { Bytes: bytes },
        MinConfidence: 80, // Adjust as necessary
      };

      const command = new DetectModerationLabelsCommand(params);
      const rekognitionResponse = await rekognitionClient.send(command);

      const hasInappropriateContent =
        rekognitionResponse.ModerationLabels?.some(
          (label) =>
            label.Name &&
            ["Explicit Nudity", "Violence", "Hate Symbols"].includes(label.Name)
        );

      if (!hasInappropriateContent) {
        validUrls.push(url); // Add valid URL
      } else {
        invalidUrls.push(url); // Add invalid URL
        console.warn(`Inappropriate content detected for URL: ${url}`);
      }
    } catch (error) {
      console.error(`Error analyzing URL ${url}:`, error);
      invalidUrls.push(url); // Treat as invalid if there's an error
    }
  }
  return { valid: validUrls, invalid: invalidUrls };
}

// POST handler
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fileUrls = data.fileUrls as string[];

    if (!fileUrls || fileUrls.length === 0) {
      return NextResponse.json(
        { message: "At least one image URL is required!" },
        { status: 400 }
      );
    }

    // Verify image URLs using Rekognition
    const { valid, invalid } = await verifyImages(fileUrls);

    return NextResponse.json({
      success: true,
      validUrls: valid,
      invalidUrls: invalid,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Error processing request!" },
      { status: 500 }
    );
  }
}
