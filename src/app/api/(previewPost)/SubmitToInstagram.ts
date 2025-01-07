type FormDataType = {
  caption: string;
  ig?: string;
  snap?: string;
  schoolID: string;
  images: { file: File; order: number }[]; // Include order in the image objects
  message?: string;
};

type FormSubmitResponse = {
  message: string; // Explicitly define that the response includes a message
  success: boolean;
};

export const SubmitToInstagram = async (
  state: FormDataType,
  setProgress: (value: number) => void
): Promise<FormSubmitResponse> => {
  const { caption, schoolID, images } = state;

  try {
    // Step 1: Upload Images to S3 and get URLs
    setProgress(50);
    const sortedImages = images.sort((a, b) => a.order - b.order);
    const imageUploadFormData = new FormData();
    sortedImages.forEach((image) => {
      imageUploadFormData.append("images", image.file);
    });
    imageUploadFormData.append("school", schoolID);

    const s3Response = await fetch("/api/s3-upload", {
      method: "POST",
      body: imageUploadFormData,
    });
    if (!s3Response.ok) {
      throw new Error("Failed to upload images to S3");
    }

    const { fileUrls } = await s3Response.json();

    // Step 2: Validate Images
    setProgress(75);
    const awsRekResponse = await fetch("/api/verify-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileUrls }),
    });

    if (!awsRekResponse.ok) {
      throw new Error("Failed to validate images");
    }

    const { validUrls } = await awsRekResponse.json();
    // Step 4: Submit Form Data with Ordered URLs to Prisma
    setProgress(90);
    const formData: FormDataType = {
      caption,
      schoolID,
      images: validUrls, // Send ordered image URLs with order to the backend
    };

    const formResponse = await fetch("/api/post-to-instagram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!formResponse.ok) {
      console.log("I'm in the Graph API \n", formResponse);
      throw new Error("Failed to submit form data");
    }
    const result = await formResponse.json();
    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
    return { message: "You must fill out all fields!", success: false };
  }
};
