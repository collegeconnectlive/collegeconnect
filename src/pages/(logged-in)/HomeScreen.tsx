"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/DropDown";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { StoreForm } from "@/app/api/store-form/(StoreFormFlow)/StoreForm";
import { useSharedPostContext } from "@/context/SharedPostContext";
import updateCaption from "@/utils/AppendToCaption";

type SchoolData = {
  id: string;
  name: string;
};

type HomeScreenProps = {
  schools: SchoolData[]; // Array of objects with `id` and `name`
  school: SchoolData | null; // A single school or null
};

const HomeScreen: React.FC<HomeScreenProps> = ({ schools, school }) => {
  const { caption, setCaption, images, setImages, setProgress, progress } = useSharedPostContext();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [snap, setSnap] = useState("");
  const [ig, setIG] = useState("");
  const [schoolID, setSchoolID] = useState<string>(school?.id || ""); // Store selected school ID
  const [loading, setLoading] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      setMessage("You must agree to the privacy policy to continue.");
      return;
    }

    const updatedCaption = updateCaption(caption, ig, snap);
    setCaption(updatedCaption);
    const formData = {
      name,
      phone,
      email,
      ig,
      snap,
      schoolID,
    };

    setLoading(true);
    setProgress(0);

    // Submit to StoreForm
    const response = await StoreForm(formData, setProgress);

    if (response.success) {
      if (school) {
        router.push(`preview/${schoolID}`);
      } else {
        router.push(`bio/preview/${schoolID}`);
      }
    } else {
      setLoading(false);
      setMessage(response.message || "Error occurred during upload.");
    }
  };

  if (loading) {
    return <Loading progress={progress} />;
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
      <Dropdown
        label="Select Your School"
        options={schools?.map((school) => ({
          value: school.id,
          label: school.name,
        }))} // Map to Dropdown options
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
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreeToPolicy"
          checked={agreedToPolicy}
          onChange={(e) => setAgreedToPolicy(e.target.checked)}
          className="form-checkbox h-4 w-4 text-yellow-500"
        />
        <label htmlFor="agreeToPolicy" className="text-gray-700 text-sm">
          I agree to the <a href="/privacy" className="text-yellow-500 underline">Privacy Policy</a> terms and conditions.
        </label>
      </div>
      <Button label="Continue" type="submit" />
      <div className="text-red-600 text-lg">{message}</div>
    </form>
  );
};

export default HomeScreen;
