"use client"
import React, { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/DropDown";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { FormSubmit } from "@/app/api/submit-form/(formSubmissionFlow)/FormSubmit";

type SchoolData = {
  id: string;
  name: string;
};

type HomeScreenProps = {
  schools: SchoolData[]; // Array of objects with `id` and `name`
  school: SchoolData | null; // A single school or null
};

const HomeScreen: React.FC<HomeScreenProps> = ({ schools, school }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [caption, setCaption] = useState("");
  const [phone, setPhone] = useState("");
  const [snap, setSnap] = useState("");
  const [ig, setIG] = useState("");
  const [schoolID, setSchoolID] = useState<string>(school?.id || ""); // Store selected school ID
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      email,
      caption,
      ig,
      snap,
      schoolID: schoolID, // Pass selected school ID
      images,
    };
    setLoading(true);
    const response = await FormSubmit(formData);

    if (response.message?.toLowerCase().includes("success")) {
      setLoading(false);
      router.push("/upload-success");
    } else {
      setLoading(false);
      setMessage(response.message || "Error occurred during upload.");
    }
  };

  if (loading) {
    return <Loading />;
  }
console.log(schoolID)
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
      <PhoneNumberInput
        label="Phone number"
        placeholder="(123) 456-7890"
        value={phone}
        onChange={setPhone}
      />
      <TextInput
        label="Email"
        placeholder="Personal or school email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Dropdown for schools */}
      <Dropdown
        label="Select Your School"
        options={schools.map((school) => ({ value: school.id, label: school.name }))} // Map to Dropdown options
        selected={schoolID}
        onSelect={(value) => setSchoolID(value)} // Store the school ID
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
      <ImageUpload
        label="Upload Your Pictures"
        maxImages={5}
        images={images}
        setImages={setImages}
      />
      <Button label="Submit" type="submit" />
      <div className="text-green-600 text-lg">{message}</div>
    </form>
  );
};

export default HomeScreen;
