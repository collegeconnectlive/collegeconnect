// Install sharp if you haven't already: npm install sharp

import sharp from "sharp";
import { extname } from "path";

/**
 * Converts WEBP or HEIC files to JPEG format.
 *
 * @param buffer - The file buffer to process.
 * @param fileName - The name of the file (used to determine file type).
 * @returns A promise resolving to an object containing the converted buffer and updated file name.
 */
export async function convertToJpeg(
  buffer: Buffer,
  fileName: string
): Promise<{ buffer: Buffer; fileName: string }> {
  const ext = extname(fileName).toLowerCase();

  // Check if the file type is WEBP or HEIC
  if (
    ext.toLocaleLowerCase() === ".webp" ||
    ext.toLocaleLowerCase() === ".heic"
  ) {
    try {
      // Convert the image to JPEG using sharp
      const convertedBuffer = await sharp(buffer)
        .jpeg({ quality: 90 })
        .toBuffer();

      // Change the file extension to .jpg
      const newFileName = fileName.replace(ext, ".jpg");

      return { buffer: convertedBuffer, fileName: newFileName };
    } catch (error) {
      console.error("Error converting file to JPEG:", error);
      throw new Error("Failed to convert file to JPEG");
    }
  }

  // If not WEBP or HEIC, return the original buffer and file name
  return { buffer, fileName };
}
