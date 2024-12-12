import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { extname } from "path";

// Validate environment variables
if (
  !process.env.AWS_S3_REGION ||
  !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_S3_BUCKET_NAME
) {
  throw new Error(`Missing required AWS environment variables`);
}

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Function to determine the ContentType based on the file extension
function getContentType(fileName: string): string {
  const ext = extname(fileName).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}

// Function to upload file to S3
async function uploadFileToS3(
  buffer: Buffer,
  fileName: string,
  school: string
): Promise<string> {
  const contentType = getContentType(fileName); // Determine content type

  try {
    const bucketName = process.env.AWS_S3_BUCKET_NAME as string;

    // Use the school name as part of the file path (Key)
    const uploadParams = {
      Bucket: bucketName,
      Key: `${school}/${fileName}`, // Add school name to the key
      Body: buffer,
      ContentType: contentType,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    // Return the file URL or key
    return `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${school}/${fileName}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// POST handler
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Collect all files from "images" key
    const images: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "images" && value instanceof File) {
        images.push(value);
      }
    }

    const school = formData.get("school") as string | null;
    if (images.length === 0) {
      return NextResponse.json(
        { message: "At least one image is required! " },
        { status: 400 }
      );
    }

    if (!school) {
      return NextResponse.json(
        { message: "School name is required! " },
        { status: 400 }
      );
    }

    // Upload each file to S3
    const uploadPromises = images.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`; // Generate unique file name
      return uploadFileToS3(buffer, fileName, school);
    });

    // Wait for all uploads to finish
    const fileUrls = await Promise.all(uploadPromises);

    // Encode URLs before returning them
    // const encodedFileUrls = fileUrls.map((url) => encodeURIComponent(url));

    return NextResponse.json({ success: true, fileUrls: fileUrls });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Error uploading files!" },
      { status: 500 }
    );
  }
}
