import express from "express";
import multer from "multer";
import { uploadCourses, getCourse } from "../controllers/courseController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", verifyAdmin, upload.single("file"), uploadCourses);
router.get("/:id", getCourse);

export default router;
