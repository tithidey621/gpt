import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use 'gemini-1.5-flash' for the best balance of speed and stability
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const getGeminiResponse = async (message) => {
    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text();
    } catch (err) {
        console.error("❌ Gemini SDK Error:", err);
        throw err;
    }
}

export default getGeminiResponse;

// import dotenv from "dotenv";
// dotenv.config();

// const getOpenAIAPIResponse = async(message) => {
//   console.log("=== OPENAI FUNCTION CALLED ===");
//     console.log("Message received:", message);
//     console.log("API Key exists:", !!process.env.OPENAI_API_KEY);
//     console.log("API Key (first 10 chars):", process.env.OPENAI_API_KEY?.substring(0, 10));
    
//     const options = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//    body: JSON.stringify({
//     "model": "gpt-4o-mini",
//    "messages": [
//     {
//     role: "user",
//     content: message
//    }
//   ]
//    }),
//   };
//   try{
//   const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data = await response.json();
//     return data.choices[0].message.content; //reply
//   } catch(err) {
//     console.log(err);
//   }
// }

// export default getOpenAIAPIResponse;