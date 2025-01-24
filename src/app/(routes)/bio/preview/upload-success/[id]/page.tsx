import { schoolMap } from "@/utils/SchoolsHashmap";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const schoolID = (await params).id;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 text-center flex flex-col max-w-[300px] items-center justify-center">
        <h1 className="text-2xl font-bold text-black">Upload Successful!</h1>
        <p className="text-black">Your files have been uploaded successfully.</p>
        <Link
          href={`${schoolMap[schoolID]}`}
          className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Check out your post!
        </Link>
      </div>
    </div>
  );
}
