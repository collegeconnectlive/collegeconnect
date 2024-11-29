import Link from "next/link";
import React from "react";

const UploadSuccessPage: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Upload Successful!</h1>
      <p>Your files have been uploaded successfully.</p>
      <Link
        href="/"
        className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default UploadSuccessPage;
