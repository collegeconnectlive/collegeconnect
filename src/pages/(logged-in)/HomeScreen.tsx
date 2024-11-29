"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/DropDown";
import ImageUpload from "@/components/ImageUpload";
import { FormSubmit } from "@/utils/FormSubmit";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const schools = ["Santa Cruz", "uPitt", "Option 3"];
const HomeScreen: React.FC = () => {
  const [message, setMessage] = useState(""); // For displaying success/error message
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [ig, setIG] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = {
      name,
      caption,
      ig,
      school: dropdownValue,
      images,
    };
    setLoading(true);
    const response = await FormSubmit(formData); // Call the FormSubmit function

    if (response.message?.toLowerCase().includes("success")) {
      setLoading(false);
      router.push("/upload-success"); // Redirect to success page
    } else {
      setLoading(false);
      setMessage(response.message || "Error occurred during upload.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-center font-sans text-xl font-bold">
        Fill Out Your Information:
      </h1>

      <TextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Dropdown
        label="Select Your School"
        options={schools}
        selected={dropdownValue}
        onSelect={setDropdownValue}
      />
      <TextInput
        label="Bio"
        placeholder="Tell the students in your class about yourself"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        multiLine
        rows={6}
      />
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">Instagram</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
            @
          </span>
          <input
            type="text"
            placeholder="your handle ..."
            value={ig}
            onChange={(e) => setIG(e.target.value)}
            className="pl-10 outline-none px-4 py-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <ImageUpload
        label="Upload Your Pictures"
        maxImages={5}
        images={images}
        setImages={setImages}
      />
      <Button label="Submit" type="submit" />
      <div className=" text-green-600 text-lg"> {message}</div>
    </form>
  );
};

export default HomeScreen;
