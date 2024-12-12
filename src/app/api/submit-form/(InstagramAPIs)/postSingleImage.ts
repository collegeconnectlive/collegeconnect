// Function to post a single image
export default async function postSingleImage(
  caption: string,
  imageUrl: string,
  IG_USER_ID: string,
  API_VERSION: string,
  PAGE_ACCESS_TOKEN: string
) {
  const uploadResponse = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}/media`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: imageUrl,
        caption,
      }),
    }
  );

  const uploadData = await uploadResponse.json();

  if (!uploadResponse.ok) {
    console.error("Single Image Upload Error:", uploadData);
    throw new Error(`Failed to upload image: ${uploadData.error?.message}`);
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
        creation_id: uploadData.id,
      }),
    }
  );

  const publishData = await publishResponse.json();
  if (!publishResponse.ok) {
    console.error("Single Image Publish Error:", publishData);
    throw new Error(
      `Failed to publish single image: ${publishData.error?.message}`
    );
  }

  return publishData;
}
