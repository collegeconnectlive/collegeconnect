export const fetchUserMedia = async () => {
  const IG_USER_ID = "17841471051295669"; // Replace with your Instagram User ID
  const ACCESS_TOKEN =
    "EAAd7hi61tAEBO3JhWycdBPIGz4yJAV6KUOYZB89A428ilGpbnpVI0rIrDmZCjSUakRkazSKo4ZCjXhYED7g1q8qoyAKrHashZA0c251i9aI0ZCQ48Rn4IywPO7xJDLZAEkd9jQUWlg4rdx7C9AfHHL6223xonfEyCqHAJ8KZAi1XgORwU2aOWy63JWNuBydcdNvCeZAZAFP78bNc1CyZAxPABWxJxESw0zS1ZBvzGNpsDvU8zwZD"; // Replace with your Instagram Graph API access token
  const API_VERSION = "v21.0"; // Use the desired API version

  try {
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}?fields=id&access_token=${ACCESS_TOKEN}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Instagram API Error Response:", errorData);
      throw new Error(
        `Error fetching media: ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
