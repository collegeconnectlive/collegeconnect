type FormDataType = {
  name: string;
  caption: string;
  ig?: string;
  snap?: string;
  email?: string;
  phone?: string;
  schoolID: string;
  images: File[];
  message?: string;
};

type FormSubmitResponse = {
  message: string; // Explicitly define that the response includes a message
};

export const FormSubmit = async (
  state: FormDataType
): Promise<FormSubmitResponse> => {
  const { name, phone, email, caption, ig, snap, schoolID, images } = state;

  try {
    // Step 1: Upload Images to S3 and get URLs
    const imageUploadFormData = new FormData();
    images.forEach((image) => imageUploadFormData.append("images", image));
    imageUploadFormData.append("school", schoolID); // switch this to id

    const s3Response = await fetch("/api/s3-upload", {
      method: "POST",
      body: imageUploadFormData,
    });

    if (!s3Response.ok) {
      throw new Error("Failed to upload images to S3");
    }

    const { fileUrls } = await s3Response.json();

    // Step 2: Validate Images
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

    // Step 3: Submit Form Data with URLs to Prisma
    const formData = {
      name,
      phone,
      email,
      caption,
      ig,
      snap,
      schoolID,
      validUrls,
    };

    const formResponse = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!formResponse.ok) {
      throw new Error("Failed to submit form data");
    }

    const result = await formResponse.json();
    return { message: result.message || "Form submitted successfully!" };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { message: "You must fillout all fields!" };
  }
};
