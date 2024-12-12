"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/DropDown";
import ImageUpload from "@/components/ImageUpload";
import { FormSubmit } from "@/utils/FormSubmit";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import PhoneNumberInput from "@/components/PhoneNumberInput";

type HomeScreenProps = {
  schools: string[];
  school: string | null;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ schools, school }) => {
  const [message, setMessage] = useState(""); // For displaying success/error message
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [phone, setPhone] = useState("");
  const [snap, setSnap] =  useState("");
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
      snap,
      phone,
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
        option = {school}
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
      <TextInput
        label="Instagram"
        placeholder="your handle ..."
        prefix="@"
        value={ig}
        onChange={(e) => setIG(e.target.value)}
      />
      <TextInput
        label="Snapchat"
        placeholder="your handle ..."
        prefix="@"
        value={snap}
        onChange={(e) => setSnap(e.target.value)}
      />
      <PhoneNumberInput
        label="Phone number"
        placeholder="(123) 456-7890"
        value={phone}
        onChange={setPhone}
      />
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
