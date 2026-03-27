import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAjl5EFQ2NqJODQgG413KCTzQfxBMTLgN0";
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
  
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Respond with 'OK'");
      console.log(`Model ${m} works! Response: ${result.response.text()}`);
      break;
    } catch (e) {
      console.error(`Model ${m} failed:`, e.message);
    }
  }
}

test();
