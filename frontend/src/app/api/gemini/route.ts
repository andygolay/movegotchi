import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("📨 /api/gemini HIT");

  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid input: text is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key missing on server" },
        { status: 500 }
      );
    }

    const promptText = `
You are Narwhal AI 🐳, the friendly assistant of Narwhal Moverz.
Be concise, helpful, and fun.

User message:
${text}
`;

    // Gemini API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: {
            sections: [
              {
                content: [{ text: promptText }]
              }
            ]
          },
          temperature: 0.7,
          candidateCount: 1
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", data);

    if (!response.ok) {
      console.error("Gemini API returned error:", data);
      return NextResponse.json(
        { error: "Gemini service failed" },
        { status: response.status }
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.[0]?.text ?? "No response from AI";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Gemini API error" },
      { status: 500 }
    );
  }
}
