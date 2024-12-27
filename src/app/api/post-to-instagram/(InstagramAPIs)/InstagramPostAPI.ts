import postCarousel from "./postCarousel";
import postSingleImage from "./postSingleImage";

if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
  throw new Error(`Missing required Instagram Access Token`);
}

const API_VERSION = "v21.0"; // Replace with the latest version
const PAGE_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

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
