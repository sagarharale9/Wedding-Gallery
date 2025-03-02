import React, { useState } from "react";
import ImageModal from "./ImageModal";
import { useAuth } from "@/context/AuthContext";

export default function ImageGrid({ images, title, refreshImage }) {
  const { isAdmin } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = async (imageUrl) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const res = await fetch("/api/delete-image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagePath: imageUrl }),
    });

    if (res.ok) {
      alert("Image deleted successfully");
      refreshImage(); // Refresh the image list after deletion
    } else {
      alert("Failed to delete image");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">{title} Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`${title} ${index + 1}`}
              className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              loading="lazy"
              onClick={() => setSelectedImage(src)}
            />

            {/* Show Delete Button for Admins */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(src)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm p-1 rounded shadow"
              >
                ✖ Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal (Zoom & Download) */}
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}
