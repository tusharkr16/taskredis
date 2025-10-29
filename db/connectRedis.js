
import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));


(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("❌ Redis initial connection failed:", err);
  }
})();
