const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "public/images");
const categories = ["pre-wedding", "wedding"];
const outputFilePath = path.join(__dirname, "public/images.json");

const imagesData = {};

categories.forEach((category) => {
  const directoryPath = path.join(basePath, category);
  if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath).filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );
    imagesData[category] = files.map((file) => `/images/${category}/${file}`);
  }
});

fs.writeFileSync(outputFilePath, JSON.stringify(imagesData, null, 2));

console.log("✅ images.json has been generated.");
