import React from "react";

export default function ImageModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageUrl.split("/").pop(); // Extract filename from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg flex flex-col items-center max-w-[90vw] max-h-[80vh]">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full p-1" onClick={onClose}>
          ✖
        </button>

        {/* Responsive Image (Maintains Aspect Ratio) */}
        <img
          src={imageUrl}
          alt="Zoomed"
          className="w-auto h-auto max-w-[90vw] max-h-[70vh] object-contain rounded-lg"
        />

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Download Image
        </button>
      </div>
    </div>
  );
}
