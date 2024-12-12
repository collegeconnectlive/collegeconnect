export default async function postCarousel(
  caption: string,
  images: string[],
  IG_USER_ID: string,
  API_VERSION: string,
  PAGE_ACCESS_TOKEN: string
) {
  if (images.length < 2) {
    throw new Error("A carousel post requires at least 1 image.");
  }

  const creationIds: string[] = [];
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
          image_url: image,
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

  const carouselResponse = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}/media`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        children: creationIds,
        media_type: "CAROUSEL",
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
    throw new Error(`Failed to publish carousel: ${publishData.error.message}`);
  }

  return publishData;
}
