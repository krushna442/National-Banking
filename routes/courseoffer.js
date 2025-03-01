import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';

const courseOfferSchema = mongoose .Schema({
    image : String
    });
    const CourseOffer = mongoose.model('CourseOffer', courseOfferSchema);
  

    const router = express.Router();
    
    // // Multer setup for handling image uploads
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
router .post('/courseoffer/add', upload.single('image'), async(req, res) => {
    const imageBase64 = req.file ? req.file.buffer.toString("base64") : null;
    try {
      await CourseOffer.create({
        image: imageBase64,
      });
      res.status(201).json({ message: "offer image added successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    });

    router.get('/courseoffer/show', async (req, res) => {
        try {
          const offer = await CourseOffer.find().sort({ _id: -1 }); // Fetch blogs in reverse order (newest first)
          
          res.json( offer );
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
    
      router.delete('/courseoffer/delete/:id', async (req, res) => {
        try {
          const offer = await CourseOffer.findByIdAndDelete(req.params.id);
          if (!offer) {
            return res.status(404).json({ message: "Image not found" });
          }
          res.status(200).json({ message: "Image deleted successfully" });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }); 

export  default router;