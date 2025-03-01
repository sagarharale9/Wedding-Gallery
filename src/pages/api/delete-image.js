import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { imagePath } = req.body;

  if (!imagePath) {
    return res.status(400).json({ error: "No image path provided" });
  }

  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
}
