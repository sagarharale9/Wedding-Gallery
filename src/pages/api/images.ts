import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed - Only GET allowed" });
  }

  const { category } = req.query;

  if (!category || (category !== "pre-wedding" && category !== "wedding")) {
    return res.status(400).json({ error: "Invalid category" });
  }

  try {
    // Define the path to the category folder
    const imagesDirectory = path.join(process.cwd(), "public", "images", category as string);

    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Read all image files in the directory
    const files = fs.readdirSync(imagesDirectory);
    const imagePaths = files
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Filter only image files
      .map((file) => `/images/${category}/${file}`); // Adjust path for GitHub Pages
  console.log("========",imagePaths,typeof imagePaths);
    return res.status(200).json(imagePaths);
  } catch (error) {
    console.error("Error loading images:", error);
    return res.status(500).json({ error: "Failed to load images" });
  }
}
