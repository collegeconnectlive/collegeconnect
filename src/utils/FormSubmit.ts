type FormDataType = {
  name: string;
  caption: string;
  ig: string;
  school: string;
  images: File[];
  message?: string;
};

export const FormSubmit = async (
  state: FormDataType
): Promise<FormDataType> => {
  const { name, caption, ig, school, images } = state;

  // Create a FormData object to handle files and other fields
  const formData = new FormData();
  formData.append("name", name);
  formData.append("caption", caption);
  formData.append("ig", ig);
  formData.append("school", school);

  // Append each image to the FormData object
  images.forEach((image) => {
    formData.append("images", image);
  });

  // Send the FormData object via fetch
  const res = await fetch("http://localhost:3000/api/s3-upload", {
    method: "POST",
    body: formData, // FormData is automatically serialized
  });

  // Assuming the response includes a message field for success or error
  const data = await res.json();
  return { ...state, message: data.message || "Form submitted successfully!" };
};
