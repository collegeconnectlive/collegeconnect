"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const Home: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartExploring = () => {
    setIsLoading(true); // Show the loading component
    router.push("/bio/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl md:text-4xl font-extrabold text-black text-center mb-6">
            WELCOME TO <span className="text-yellow-500 text-4xl md:text-6xl">COLLEGE CONNECT</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 text-center mb-12 max-w-2xl">
            The fastest, simplest, and automated way to meet your class! 
          </p>
          <button
            onClick={handleStartExploring}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md text-lg hover:scale-110 transition duration-300 ease-in-out"
          >
            Get Started
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
