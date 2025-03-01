import express, { urlencoded } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Admin from "../models/Adminmodel.js"; // Make sure to import the Admin model
import multer from "multer";
import isauthenticated from "../utils/authmiddlewware.js";

const router = express.Router();
router.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// const isauthenticated = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "login first" });
//   }

//   try {
//     const decoded = jwt.verify(token, "krushna");
//     req.Admin = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

router.post("/home", isauthenticated, async (req, res) => {
  res.status(200).json({
    message: "This is the home page",
    AdminDetails: await Admin.findOne({ Admin_id: req.Admin.Admin_id }), // Sending Admin details in response
    // AdminDetails: req.Admin // Sending Admin details in response
  });
});


// login section starts here
router.post("/login", async (req, res) => {
  try {
    const { Admin_id, password } = req.body;
    const Admindata = await Admin.findOne({Admin_id:Admin_id });
    if (!Admindata) {
      return res.status(401).json({ message: "Unauthorized: invalid id" });
    }
    if (Admindata.password !== password) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: Admindata._id,
        Admin_id: Admindata.Admin_id,
      },
      process.env.JWTSECREAT
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Successfully logged in",
      Admin: {
        id: Admindata.Admin_id,
        name: Admindata.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// logout section
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
