const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

export async function generateAIContent(prompt: string, systemPrompt?: string) {
  try {
    if (!OPENROUTER_API_KEY) {
      console.warn("OpenRouter API Key missing. Using fallback simulated response.");
      return JSON.stringify({
        status: "success",
        message: "Simulated AI Response (Add OPENROUTER_API_KEY to your Vercel for actual live engine actions).",
        data: "This is an automated preview placeholder for Business OS tools."
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://business-os.vercel.app",
        "X-Title": "Business OS Engine"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("AI Router Engine Error:", error);
    throw new Error("Failed to reach decentralized model router.");
  }
}

