import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_id: String,
  title: String,
  description: String,
  category: String,
  instructor: String,
  duration: String,
});

export const Course = mongoose.model("Course", courseSchema);
