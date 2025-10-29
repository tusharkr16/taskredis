
import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://red-d40ravvgi27c73cuha7g:6379",
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
