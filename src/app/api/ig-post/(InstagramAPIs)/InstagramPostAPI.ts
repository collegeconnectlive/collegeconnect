const API_VERSION = "v21.0"; // Replace with the latest version
const PAGE_ACCESS_TOKEN = "EAAMZAshxqcZAMBO0a2GKdnFb3LGtAaRq1NCZBy5orZBO6rEkSE3IO2vIWZAjVXTipilK2uf6HH2WgRxZAKhuY0Dac9gwiQSgTghrKGd62nERo5WjvuIjD8JDsSdssYZAHAogjoR1GSCfQEV88VzdvrAzpZAuJNE2FYJSOV8FE8tBZBdlX2OlBuL52SmIHVp8t2NdsLuqZBO9Qm"; // Store securely in your .env file
const IG_USER_ID = "9287068194670992"; // The Instagram User ID

type MediaPayload = {
  caption: string;
  images: File[]; // Array of image files
};

export const postCarouselToInstagram = async (media: MediaPayload) => {
  const { caption, images } = media;
  if (!images || images.length < 2) {
    throw new Error("A carousel post requires at least 2 images.");
  }

  const creationIds: string[] = []; // Array to hold media object creation IDs

  // Step 1: Upload Each Image and Get Creation IDs
  for (const image of images) {
    const uploadResponse = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}/media`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: image, // Assume you handle file to URL conversion elsewhere
          is_carousel_item: true,
        }),
      }
    );

    const uploadData = await uploadResponse.json();
    if (!uploadData.id) {
      throw new Error(`Failed to upload image: ${uploadData.error.message}`);
    }

    creationIds.push(uploadData.id);
  }

  // Step 2: Create Carousel Container
  const carouselResponse = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}/media`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        children: creationIds, // List of media object creation IDs
        caption,
      }),
    }
  );

  const carouselData = await carouselResponse.json();
  if (!carouselData.id) {
    throw new Error(
      `Failed to create carousel container: ${carouselData.error.message}`
    );
  }

  // Step 3: Publish Carousel
  const publishResponse = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}/media_publish`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creation_id: carouselData.id,
      }),
    }
  );

  const publishData = await publishResponse.json();
  if (!publishData.id) {
    throw new Error(
      `Failed to publish carousel: ${publishData.error.message}`
    );
  }

  return publishData; // Return the final response
};
