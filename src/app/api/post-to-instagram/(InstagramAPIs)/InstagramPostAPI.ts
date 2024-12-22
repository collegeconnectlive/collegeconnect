import postCarousel from "./postCarousel";
import postSingleImage from "./postSingleImage";

const API_VERSION = "v21.0"; // Replace with the latest version
const PAGE_ACCESS_TOKEN =
  "EAAd7hi61tAEBOZB1tboHwekMhQr62tVjkZAdsxtwSLA98yVN7oKrZCzaPlqfmU7KymblApMO0cvAGiFry2ND27QVxHAxkpRqZAdpmN9AGrtTlxTwmZAUnYuKJbeaMisn8IlS3ZBZAs35sfyzOl69t5JIgZCZCAPBMv64UtBCSrUTmYGJek18p7DrmK4ZAeVSBVHq03KhtjhZCB8h09CqerujS03QrkwOZCWTMqwj1QZDZD"; // Store securely in your .env file
type MediaPayload = {
  caption: string;
  images: string[]; // Array of image files
  schoolID: string;
};

export const postToInstagram = async (media: MediaPayload) => {
  const { caption, images, schoolID } = media;

  if (!images || images.length === 0) {
    throw new Error("At least 1 image is required to post.");
  }

  if (images.length === 1) {
    // Call the single image post function
    return await postSingleImage(
      caption,
      images[0],
      schoolID,
      API_VERSION,
      PAGE_ACCESS_TOKEN
    );
  }

  // Call the carousel post function
  return await postCarousel(
    caption,
    images,
    schoolID,
    API_VERSION,
    PAGE_ACCESS_TOKEN
  );
};
