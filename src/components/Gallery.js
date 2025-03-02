"use client";

import React, { useState, useEffect } from "react";
import ImageGrid from "./ImageGrid";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("pre-wedding");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const { isAdmin, logout } = useAuth();

const fetchImages = async () => {
  try {
    setLoading(true);
    setError(null);
    const apiUrl = "https://sagarharale9.github.io/Wedding-Gallery"; // Use environment variable
    const res = await fetch(`${apiUrl}/images?category=${activeTab}`);
    // const res = await fetch(`${apiUrl}/api/images?category=${activeTab}`);
    // const res = await fetch(`/api/images?category=${activeTab}`);

    if (!res.ok) throw new Error("Failed to fetch images");

    const data = await res.json();
    console.log("-------",data);
    if (Array.isArray(data)) {
      setImages(data);
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchImages();
  }, [activeTab]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gray-500 p-5">Pre-Wedding & Wedding Gallery</h1>
      {/* <div className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold justify-center">Wedding Gallery</h1>
    </div> */}
    {/* Show Login or Logout Button */}
    {isAdmin ? (
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      ) : (
        <Link href="/login" className="bg-red-500 px-4 py-2 rounded " style={{float:'right'}}>Admin</Link>
      )}
      {/* Tab Buttons */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 text-black rounded-md ${activeTab === "pre-wedding" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("pre-wedding")}
        >
          Pre-Wedding
        </button>
        <button
          className={`px-4 py-2 mx-2 text-black rounded-md ${activeTab === "wedding" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("wedding")}
        >
          Wedding
        </button>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">Loading images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display Images */}
      {!loading && !error && <ImageGrid images={images} title={activeTab} refreshImage={fetchImages} />}
    </div>
  );
}
