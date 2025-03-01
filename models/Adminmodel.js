import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    Admin_id: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, unique: true },
    number: { type: Number, unique: true },
    password: { type: String },
    image: { type: String },
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
