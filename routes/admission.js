import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

const router = express.Router();

const admissionFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    dob: String,
    mobile: String,
    altNumber: String,
    address: String,
    pinCode: String,
    guardianRelation: String,
    guardianPhone: String,
    guardianNumber: String,
    guardianOccupation: String,
    tenthYear: String,
    tenthBoard: String,
    tenthMode: String,
    tenthPercentage: String,
    twelfthYear: String,
    twelfthBoard: String,
    twelfthStream: String,
    twelfthPercentage: String,
    twelfthMode: String,
    graduationYear: String,
    graduationBoard: String,
    graduationStream: String,
    graduationPercentage: String,
    graduationMode: String,
    postGraduationYear: String,
    postGraduationBoard: String,
    postGraduationStream: String,
    postGraduationPercentage: String,
    postGraduationMode: String,
    course: String,
    modeOfTraining: String,
    modeOfPayment: String,
    promo: String,
}, { timestamps: true });

const AdmissionForm = mongoose.model("AdmissionForm", admissionFormSchema);

// POST: Create a new admission form entry
router.post("/admissionForm", async (req, res) => {
    try {
        const formattedData = req.body;
        const admissionForm = new AdmissionForm(formattedData);

        await admissionForm.save()
            .then(data => res.json(data));
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET: Fetch all admission form entries
router.get('/admin/admissiondetail', async (req, res) => {
    try {
        const admissionForm = await AdmissionForm.find().sort({ _id: -1 });
        res.json(admissionForm);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE: Remove an admission form entry by ID
router.delete('/admin/admissiondetail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEntry = await AdmissionForm.findByIdAndDelete(id);
        
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
