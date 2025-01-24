import sharp from "sharp";

/**
 * Validates and crops an image buffer to ensure it meets the acceptable aspect ratio range for Instagram.
 * If the image is too wide, it will be cropped to a 1:1 (square) ratio.
 * Instagram's aspect ratio range: 4:5 (0.8) to 1.91:1.
 *
 * @param buffer - The image buffer to process.
 * @returns A promise that resolves to the processed image buffer.
 */
export async function validateAndCropImage(buffer: Buffer): Promise<Buffer> {
  const minAspectRatio = 4 / 5; // 0.8
  const maxAspectRatio = 1.91; // ~1.91:1

  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Invalid image metadata");
  }

  const aspectRatio = metadata.width / metadata.height;

  // If the aspect ratio is within the acceptable range, return the buffer as-is
  if (aspectRatio >= minAspectRatio && aspectRatio <= maxAspectRatio) {
    return buffer;
  }

  // Calculate target dimensions for cropping
  let width = metadata.width;
  let height = metadata.height;

  if (aspectRatio < minAspectRatio) {
    // Too tall, crop height
    height = Math.round(metadata.width / minAspectRatio);
  } else if (aspectRatio > maxAspectRatio) {
    // Too wide, crop to 1:1 (square) ratio
    const targetSize = Math.min(metadata.width, metadata.height); // Use the smaller dimension
    width = targetSize;
    height = targetSize;
  }

  // Resize and crop the image to fit the acceptable aspect ratio
  return image.resize({ width, height, fit: sharp.fit.cover }).toBuffer();
}
