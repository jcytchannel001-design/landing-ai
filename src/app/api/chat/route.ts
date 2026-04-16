import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { SiteConfig } from "@/lib/siteTypes";

const client = new Anthropic();

const CHAT_SYSTEM = `You are an AI assistant embedded in a landing page editor called Landify.
The user has a landing page config (JSON) and wants to modify it by chatting with you.

Your job:
1. Understand what the user wants to change (text, colors, images, structure, etc.)
2. Apply those changes to the provided config JSON
3. Return a JSON response with:
   - "updatedConfig": the full updated SiteConfig object
   - "message": a brief friendly confirmation in the SAME LANGUAGE as the user's request

RULES:
- Preserve ALL fields from the original config — only modify what the user asks
- If the user uploads images, acknowledge them but note they'll be stored as base64
- Keep your "message" short (1-2 sentences max)
- Return ONLY valid JSON, no markdown fences, no extra text
- If the user asks about deploying to a domain, respond with a helpful message and set updatedConfig to null

OUTPUT FORMAT (always):
{
  "updatedConfig": { ...full SiteConfig... } | null,
  "message": "Brief response to the user"
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      message: string;
      images?: string[];
      config: SiteConfig;
    };

    const { message, images = [], config } = body;
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const userContent: Anthropic.MessageParam["content"] = [];

    // Attach images if provided
    for (const img of images.slice(0, 3)) {
      if (img.startsWith("data:image/")) {
        const matches = img.match(/^data:(image\/[a-z]+);base64,(.+)$/);
        if (matches) {
          userContent.push({
            type: "image",
            source: {
              type: "base64",
              media_type: matches[1] as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: matches[2],
            },
          });
        }
      }
    }

    userContent.push({
      type: "text",
      text: `Current config:\n${JSON.stringify(config, null, 2)}\n\nUser request: ${message}\n\nReturn ONLY the JSON object as specified.`,
    });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      system: CHAT_SYSTEM,
      messages: [{ role: "user", content: userContent }],
    });

    const textBlock = response.content.find(b => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No response from AI");
    }

    let jsonText = textBlock.text.trim()
      .replace(/^```json\n?/i, "").replace(/\n?```$/i, "").trim();

    const firstBrace = jsonText.indexOf("{");
    const lastBrace = jsonText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      jsonText = jsonText.slice(firstBrace, lastBrace + 1);
    }

    const result = JSON.parse(jsonText) as {
      updatedConfig: SiteConfig | null;
      message: string;
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Error procesando tu solicitud" }, { status: 500 });
  }
}
