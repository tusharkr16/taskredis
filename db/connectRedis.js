
import { createClient } from "redis";

export const redisClient = createClient({
  url: "rediss://red-d40ravvgi27c73cuha7g:vYqOWXrNnWHosBrLMTDVfwaHwRaIE2CM@oregon-keyvalue.render.com:6379",
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
