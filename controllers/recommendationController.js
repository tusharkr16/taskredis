import { GoogleGenerativeAI } from "@google/generative-ai";


export const getRecommendations = async (req, res) => {
  try {
    const { topics = [], level = "beginner" } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const prompt = `
      Recommend 5 online courses for topics: ${topics.join(", ")} at ${level} level.
      Return results as a JSON array like:
      [{ title, category, level, duration, description }]
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    let recommendations;
    try {
      recommendations = JSON.parse(text);
    } catch {
      recommendations = [{ note: "Gemini output not in JSON", raw: text }];
    }

    res.json({ recommendations });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: err.message });
  }
};


