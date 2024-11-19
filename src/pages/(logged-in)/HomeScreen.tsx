"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/DropDown";
import ImageUpload from "@/components/ImageUpload";

const HomeScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [ig, setIG] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [images, setImages] = useState<File[]>([]); // State to manage uploaded images, initialized as an empty array

  const schools = ["Santa Cruz", "uPitt", "Option 3"];

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className=" text-center font-sans flex text-xl font-bold text-black select-none">
        Fill Out Your Information For Submission:
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
        onSelect={(value) => setDropdownValue(value)}
      />
      <TextInput
        label="Bio"
        placeholder="Tell the students in your class about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        multiLine={true}
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
            className="pl-10 px-4 py-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none text-black"
          />
        </div>
      </div>
      <ImageUpload
        label="Upload Your Pictures"
        maxImages={5}
        images={images}
        setImages={setImages}
      />
      <Button label="Submit" onClick={() => alert("Button clicked!")} />
    </div>
  );
};

export default HomeScreen;
