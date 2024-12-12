import postCarousel from "./postCarousel";
import postSingleImage from "./postSingleImage";

const API_VERSION = "v21.0"; // Replace with the latest version
const PAGE_ACCESS_TOKEN =
  "EAAMZAshxqcZAMBOZC85lUFRNEsQ8ZBptTZAYiDT0kXfdYP8jKZCsF30DhkuISc7yu73bZBfARaQWxgTXcFIJwj38gMxGv6SDNe7azhy6pHn536d0yxlKIhiJpZBN2N8EUgw8xOJ4hJWxJgfbZBKiv6LrUmBBzNz4KZCm63v9t9oZAVtKqQIMxa3CcHFDHFz"; // Store securely in your .env file
const IG_USER_ID = "17841470713645375"; // The Instagram User ID

type MediaPayload = {
  caption: string;
  images: string[]; // Array of image files
};

export const postToInstagram = async (media: MediaPayload) => {
  const { caption, images } = media;

  if (!images || images.length === 0) {
    throw new Error("At least 1 image is required to post.");
  }

  if (images.length === 1) {
    // Call the single image post function
    return await postSingleImage(
      caption,
      images[0],
      IG_USER_ID,
      API_VERSION,
      PAGE_ACCESS_TOKEN
    );
  }

  // Call the carousel post function
  return await postCarousel(
    caption,
    images,
    IG_USER_ID,
    API_VERSION,
    PAGE_ACCESS_TOKEN
  );
};
