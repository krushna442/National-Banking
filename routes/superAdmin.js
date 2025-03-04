import express from "express";
import multer from "multer";
import Admin from "../models/Adminmodel.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/admin/register", upload.single("image"), async (req, res) => {
  const { Admin_id, name, email, password } = req.body;
  const imageBase64 = req.file ? req.file.buffer.toString("base64") : null;
  try {
  const response = await Admin.create({
    Admin_id,
    name,
    email,
    password,
    image: imageBase64,
  });
  res.status(200).json({ message: "admin added succesfully " });
} catch (error) {
    res.status(500).json({ message: "Error adding admin",error });
    }
});

router.delete("/deleteadmin", async (req, res) => {
  const { Admin_id } = req.body;
  const response = await Admin.deleteOne({ Admin_id: Admin_id });
  res.status(200).json({ message: "admin deleted succesfully " });
});

router.get("/admin/showadmin", async (req, res) => {
  try {
    const franchise_enquires = await Admin.find().sort({ _id: -1 });
    res.json(franchise_enquires);
  } catch (error) {
    console.error("Error fetching franchise enquires:", error);
    res.status(500).json({ error: "Error fetching franchise enquires" });
  }
});

export default router;
