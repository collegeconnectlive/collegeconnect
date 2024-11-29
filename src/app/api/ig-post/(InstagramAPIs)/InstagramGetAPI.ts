
export const fetchUserMedia = async () => {
    const IG_USER_ID = "9287068194670992"; // Replace with your Instagram User ID
    const ACCESS_TOKEN = "EAAMZAshxqcZAMBO0a2GKdnFb3LGtAaRq1NCZBy5orZBO6rEkSE3IO2vIWZAjVXTipilK2uf6HH2WgRxZAKhuY0Dac9gwiQSgTghrKGd62nERo5WjvuIjD8JDsSdssYZAHAogjoR1GSCfQEV88VzdvrAzpZAuJNE2FYJSOV8FE8tBZBdlX2OlBuL52SmIHVp8t2NdsLuqZBO9Qm"; // Replace with your Instagram Graph API access token
    const API_VERSION = "v21.0"; // Use the desired API version
  
    try {
      const response = await fetch(
        `https://graph.facebook.com/${API_VERSION}/${IG_USER_ID}?fields=id&access_token=${ACCESS_TOKEN}`
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Instagram API Error Response:", errorData);
        throw new Error(
          `Error fetching media: ${errorData.error?.message || response.statusText}`
        );
      }
      
  
      const data = await response.json();
      console.log("Media Data:", data);
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
  
