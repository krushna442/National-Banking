import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const router = express.Router();



const franchise_enquire_schema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  job_title: { type: String, required: true },
  investment_range: { type: String, required: true },
  holding_franchise: { type: String, required: true },
},{ timestamps: true });
const franchise_enquire = mongoose.model("franchise_enquire", franchise_enquire_schema);
router.post("/franchise_enquire", async (req, res) => {
  const {
    name,
    phone,
    city,
    email,
    job_title,
    investment_range,
    holding_franchise,
  } = req.body;
  try {
    await franchise_enquire.create({
      name: name,
      phone: phone,
      city: city,
      email: email,
      job_title: job_title,
      investment_range: investment_range,
      holding_franchise: holding_franchise,
    });

    res.status(201).send("created");
  } catch (error) {
    console.error("Error saving enquiry:", error);
    res.status(400).json({ error: error.message });
  }
});

router .get("/admin/franchisedetails", async (req, res) => {
  try {
     const franchise_enquires = await franchise_enquire.find().sort({ createdAt: -1 });
     res.json(franchise_enquires);
     } catch (error) {
      console.error("Error fetching franchise enquires:", error);
      res.status(500).json({ error: "Error fetching franchise enquires" });
      }
      });



      router.delete('/admin/franchisedetails/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deletedEntry = await franchise_enquire.findByIdAndDelete(id);
            
            if (!deletedEntry) {
                return res.status(404).json({ error: "Record not found" });
            }
            
            res.json({ message: "Record deleted successfully", deletedEntry });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

export default router;
