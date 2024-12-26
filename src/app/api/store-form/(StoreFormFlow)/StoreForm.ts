type FormDataType = {
  name: string;
  email?: string;
  phone: string;
  ig?: string;
  snap?: string;
  schoolID: string;
};

type Student = {
  id: string;
  name: string;
  phoneNumber: string;
  ig: string;
  snap: string;
  email: string;
  universityId: string;
};

type FormSubmitResponse = {
  message: string; // Explicitly define that the response includes a message
  success: boolean;
  student?: Student;
};

export const StoreForm = async (
  state: FormDataType,
  setProgress: (value: number) => void
): Promise<FormSubmitResponse> => {
  const { name, phone, email, ig, snap, schoolID } = state;

  try {
    // Submit Form Data to Prisma
    setProgress(25);
    const formData: FormDataType = {
      name,
      phone,
      email,
      snap,
      ig,
      schoolID,
    };

    const formResponse = await fetch("/api/store-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await formResponse.json();

    if (!formResponse.ok) {
      return {
        message: result.message || "Failed to submit form data",
        success: false,
      };
    }

    return result; // Return success response from the API
  } catch (error: unknown) {
    console.error("Error submitting form:", error);

    // Check if the error is an instance of Error and handle it accordingly
    if (error instanceof Error) {
      return {
        message: error.message || "An unexpected error occurred",
        success: false,
      };
    }

    // Fallback for non-Error objects
    return {
      message: "An unexpected error occurred",
      success: false,
    };
  }
};
