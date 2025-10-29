import csv from "csv-parser";
import fs from "fs";
import { Course } from "../models/Course.js";
import { redisClient } from "../db/connectRedis.js";

// export const uploadCourses = async (req, res) => {
//   const results = [];
//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on("data", (data) => results.push(data))
//     .on("end", async () => {
//       await Course.insertMany(results);
//       res.json({ msg: "Courses uploaded successfully", count: results.length });
//     });
// };

export const uploadCourses = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          course_id: data["Unique ID"],
          title: data["Course Name"],
          description: data["Overview/Description"] || data["Summary"],
          category: data["Discipline/Major"] || data["Department/School"],
          instructor: data["Professor Name"],
          duration: data["Duration (Months)"] || "N/A",
        });
      })
      .on("end", async () => {
        await Course.insertMany(results);
        res.json({
          msg: "Courses uploaded successfully",
          count: results.length,
        });
      });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getCourse = async (req, res) => {
  const { id } = req.params;

  
  const cached = await redisClient.get(`course:${id}`);
  if (cached) {
    console.log("✅ Returned from Redis cache");
    return res.json(JSON.parse(cached));
  }


  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ msg: "Course not found" });


  await redisClient.setEx(`course:${id}`, 3600, JSON.stringify(course));

  console.log("📦 Stored in Redis for next requests");
  res.json(course);
};
