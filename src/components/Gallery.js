"use client";

import React, { useState, useEffect } from "react";
import ImageGrid from "./ImageGrid";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("wedding");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const { isAdmin, logout } = useAuth();

  const fetchImages=(activeTab)=>{
    console.log(activeTab)
    if (!activeTab) return;

    console.log("Fetching images for category:", activeTab); // Debugging log

    fetch("/Wedding-Gallery/images.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched images.json data:", data); // Debugging log
        if (data[activeTab]) {
          console.log("Setting images:", data[activeTab],activeTab); // Debugging log
          setImages(data[activeTab]);
          console.log(images);
          setLoading(false);
        } else {
          console.warn(`Category '${activeTab}' not found in images.json`);
          setImages([]);
        }
      })
      .catch((err) => console.error("Error loading images:", err));
  }

    useEffect(() => {
      fetchImages(activeTab);
    }, [activeTab]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gray-500 p-5">Pre-Wedding & Wedding Gallery</h1>
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
