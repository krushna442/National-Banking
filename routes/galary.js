import express from "express";
import mongoose from "mongoose";
import multer from "multer";

const router = express.Router();

// // Multer setup for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const Galary = mongoose.model("Galary", {
  image: String,
});

router.post("/galary/add", upload.single("image"), async (req, res) => {
  const imageBase64 = req.file ? req.file.buffer.toString("base64") : null;
  try {
    await Galary.create({
      image: imageBase64,
    });
    res.status(201).json({ message: "Galary created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get('/galary/show', async (req, res) => {
    try {
      const galary = await Galary.find().sort({ _id: -1 }); // Fetch blogs in reverse order (newest first)
      
      res.json( galary );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
export default router;
