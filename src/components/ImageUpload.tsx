import React from "react"; // Importing necessary React hooks (useState) for state management
import Image from "next/image"; // Importing the Image component from Next.js for optimized image handling

type ImageUploadProps = {
  label?: string; // Optional label prop to display a custom label above the upload area
  maxImages?: number; // Optional prop to limit the number of images that can be uploaded
  images: File[]; // Array of images (File objects)
  setImages: React.Dispatch<React.SetStateAction<File[]>>; // Function to update the images state
};

const ImageUpload: React.FC<ImageUploadProps> = ({ label = "Upload Images", maxImages = 5, setImages, images }) => {
//   const [images, setImages] = useState<File[]>([]); // State to manage uploaded images, initialized as an empty array

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // If no files are selected, exit the function
    // Convert FileList (from input) to an array, and limit the number of files based on maxImages
    const newImages = Array.from(e.target.files).slice(0, maxImages - images.length);
    // console.log(images)
    // Update the state with the newly selected images, ensuring no more than maxImages are selected
    setImages((prev) => [...prev, ...newImages].slice(0, maxImages)); 
  };

  const handleRemoveImage = (index: number) => {
    // Remove an image from the state array by filtering out the selected index
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-2"> 
      {label && <label className="text-gray-700 font-medium">{label}</label>} {/* Display label if provided */}
      <div className="border border-gray-300 rounded p-4"> {/* Container for the image upload area */}
        <div className="flex flex-wrap gap-4"> {/* Flexbox container to wrap the images and upload button */}
          {images.map((image, index) => (
            // Iterate over the images array to display each uploaded image
            <div key={index} className="relative w-24 h-24"> 
              {/* Image container with fixed dimensions */}
              <Image
                src={URL.createObjectURL(image)} // Convert the uploaded image to a URL object for display
                alt={`Uploaded ${index}`} // Alternative text for the image
                fill // Make the image fill its parent container (w-24 h-24)
                className="object-cover rounded" // Ensure the image covers the container without distortion and has rounded corners
              />
              <button
                onClick={() => handleRemoveImage(index)} // Remove the image when the "X" button is clicked
                className="absolute top-0 right-0 bg-black text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕ {/* "X" icon to remove the image */}
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            // Show the upload button only if the number of uploaded images is less than the maxImages
            <label
              htmlFor="file-upload"
              className="w-24 h-24 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:border-black"
            >
              + {/* Display a plus sign to indicate file upload */}
              <input
                id="file-upload" // Hidden input field for file selection
                type="file" // Set input type to "file" for image upload
                accept="image/*" // Limit file types to images
                multiple // Allow selecting multiple files at once
                onChange={handleUpload} // Trigger handleUpload function when files are selected
                className="hidden" // Hide the actual input field to show a custom label
              />
            </label>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">You can upload up to {maxImages} images.</p> 
        {/* Display a message telling the user how many images can be uploaded */}
      </div>
    </div>
  );
};

export default ImageUpload;
