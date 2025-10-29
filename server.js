// import express from "express";
// import dotenv from "dotenv";
// import './db/db.js'
// // import { redisClient } from "./db/connectRedis.js";
// // import adminRoutes from "./routes/adminRoutes.js";
// // import courseRoutes from "./routes/courseRoutes.js";
// // import recommendationRoutes from "./routes/recommendationRoutes.js";

// import { redisClient } from "./db/connectRedis.js";

// dotenv.config();
// const app = express();
// app.use(express.json());

// // app.use("/api/admin", adminRoutes);
// // app.use("/api/courses", courseRoutes);
// // app.use("/api/recommendations", recommendationRoutes);

// app.get("/", (req, res) => res.send("Backend running ✅"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });






import express from "express";
import dotenv from "dotenv";
import "./db/db.js";
import { redisClient } from "./db/connectRedis.js";
import adminRoutes from "./routes/adminRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import recommendationRoutes from "./routes/recommendationRoutes.js"
import { connectDB } from "./db/db.js";
import cors from "cors";


dotenv.config();


const app = express();
app.use(express.json());

await connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourfrontenddomain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);


app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => res.send("Backend running ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
