// import { generateText } from "ai"
// import { createGoogleGenerativeAI } from "@ai-sdk/google"
// import { NextResponse } from "next/server"

// // Create Google AI instance with the API key
// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_GEMINI_API_KEY,
// })

// export async function POST() {
//   try {
//     const { text } = await generateText({
//       model: google("gemini-1.5-flash"),
//       prompt:
//         "Generate 5 practical and specific daily tasks that would be useful for most people. Format them as a numbered list with each task on a new line. Be concise and specific. Tasks should be actionable and help with productivity, well-being, or personal growth.",
//       system:
//         "You are a helpful AI assistant that specializes in productivity and task management. Your suggestions should be practical, specific, and actionable.",
//     })

//     // Parse the numbered list into an array of tasks
//     const taskList = text
//       .split("\n")
//       .filter((line) => /^\d+\./.test(line))
//       .map((line) => line.replace(/^\d+\.\s*/, "").trim())
//       .filter((task) => task.length > 0)

//     return NextResponse.json({ suggestions: taskList })
//   } catch (error) {
//     console.error("Error generating suggestions:", error)
//     return NextResponse.json(
//       {
//         error: "Failed to generate task suggestions",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     )
//   }
// }

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextResponse } from "next/server";

// ✅ Load Gemini model using API key from .env.local
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

// ✅ POST: Main endpoint used by the frontend
export async function POST() {
  try {
    console.log("🟢 [POST] /api/generate-tasks called");

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error("❌ GOOGLE_GEMINI_API_KEY is missing");
      throw new Error("Missing GOOGLE_GEMINI_API_KEY");
    }

    const result = await generateText({
      model: google("gemini-1.5-flash"), // Or try "gemini-pro" if needed
      prompt:
        "Generate 5 practical and specific daily tasks that would be useful for most people. Format them as a numbered list with each task on a new line. Be concise and specific. Tasks should be actionable and help with productivity, well-being, or personal growth.",
      system:
        "You are a helpful AI assistant that specializes in productivity and task management. Your suggestions should be practical, specific, and actionable.",
    });

    console.log("✅ Gemini Response:", result);

    const { text } = result;

    if (!text) {
      throw new Error("Gemini returned no text");
    }

    const taskList = text
      .split("\n")
      .filter((line) => /^\d+\./.test(line)) // lines that start with "1."
      .map((line) => line.replace(/^\d+\.\s*/, "").trim()) // remove "1. "
      .filter((task) => task.length > 0);

    console.log("✅ Parsed Task List:", taskList);

    return NextResponse.json({ suggestions: taskList });
  } catch (error) {
    console.error("❌ Error in /api/generate-tasks:", error);
    return NextResponse.json(
      {
        error: "Failed to generate task suggestions",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ✅ GET: Optional, for browser testing and preventing 405
export async function GET() {
  return NextResponse.json({
    message:
      "✅ This endpoint works! Send a POST request to receive AI task suggestions.",
    usage: "POST /api/generate-tasks",
  });
}

