import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { randomUUID } from "crypto";
import { saveConfig } from "@/lib/configStore";
import type { SiteConfig } from "@/lib/siteTypes";

const client = new Anthropic();

/**
 * Attempts to repair truncated or malformed JSON by closing
 * unclosed strings, arrays and objects.
 */
function repairJson(raw: string): string {
  let s = raw.trim();

  // Remove trailing comma before closing bracket/brace
  s = s.replace(/,\s*([}\]])/g, "$1");

  // Walk through and track open structures
  const stack: string[] = [];
  let inString = false;
  let escape = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") stack.push("}");
    else if (ch === "[") stack.push("]");
    else if (ch === "}" || ch === "]") stack.pop();
  }

  // Close unclosed string
  if (inString) s += '"';

  // Close unclosed structures in reverse order
  while (stack.length) s += stack.pop()!;

  return s;
}

const SYSTEM_PROMPT = `You are an expert web designer and copywriter who creates website configurations for ANY type of business.

Given a business description, generate a JSON configuration for a professional landing page.

RULES:
- Write ALL text in the SAME LANGUAGE as the business description
- Adapt all content 100% to the specific business type — do NOT use real estate or photography examples
- Choose a primaryColor hex that fits the business industry and tone
- Choose a bgColor that's a very light, warm neutral complementing the primary color
- Generate realistic stats, services, and testimonials that make sense for THIS specific business
- Testimonials should have realistic local names matching the business location/language
- Return ONLY valid JSON — no markdown fences, no explanation, just the JSON object
- headlineLine2 is an optional middle line in the hero headline — use it to add a relevant phrase like "para tu restaurante", "en tiempo récord", "que enamora", etc. matching the business type. Keep it concise (2-4 words). If it doesn't add value, omit it.

ICON NAMES (use only these for services): Camera, Home, Plane, Video, Lightbulb, Layers, Star, Heart, Briefcase, Coffee, Music, Utensils, Scissors, Car, Laptop, Globe, ShoppingBag, Dumbbell, Leaf, Palette

OUTPUT JSON SCHEMA (fill in all fields):
{
  "brand": {
    "name": "Business name",
    "tagline": "Short professional tagline",
    "primaryColor": "#hexcolor",
    "bgColor": "#lightneutral",
    "darkColor": "#1C1714",
    "phone": "digits only, no spaces",
    "email": "email@domain.com",
    "location": "City · Available area",
    "instagram": "@handle",
    "whatsapp": "countrycodephonenumber",
    "city": "City"
  },
  "navbar": {
    "brandName": "Business Name",
    "links": [
      {"href": "#servicios", "label": "Services"},
      {"href": "#portfolio", "label": "Portfolio"},
      {"href": "#proceso", "label": "Process"},
      {"href": "#testimonios", "label": "Testimonials"},
      {"href": "#contacto", "label": "Contact"}
    ],
    "ctaText": "Get a Quote",
    "primaryColor": "#hexcolor"
  },
  "hero": {
    "badge": "Category · City",
    "headline": "Main headline (2-4 words)",
    "accentWord": "one word from headline to highlight with shimmer",
    "headlineLine2": "optional short phrase (2-4 words) for middle line — omit if not needed",
    "headlineAccent": "closing line with impact",
    "subheadline": "2-3 sentences describing the service and its benefits",
    "ctaPrimary": "Primary CTA",
    "ctaSecondary": "Secondary CTA",
    "trustText": "+N happy clients",
    "statBadge": {"value": "-45%", "label": "Metric label", "sublabel": "context line"},
    "images": ["/fotos/foto15.jpg", "/fotos/foto6.jpg", "/fotos/foto16.jpg"]
  },
  "stats": [
    {"value": 500, "suffix": "+", "label": "Projects"},
    {"value": 300, "suffix": "+", "label": "Happy clients"},
    {"value": 8, "suffix": " years", "label": "Experience"},
    {"value": 98, "suffix": "%", "label": "Repeat rate"}
  ],
  "services": [
    {"iconName": "Camera", "title": "Service 1", "desc": "Description", "detail": "Detail · Detail · Detail"},
    {"iconName": "Home", "title": "Service 2", "desc": "Description", "detail": "Detail · Detail · Detail"},
    {"iconName": "Plane", "title": "Service 3", "desc": "Description", "detail": "Detail · Detail · Detail"},
    {"iconName": "Video", "title": "Service 4", "desc": "Description", "detail": "Detail · Detail · Detail"},
    {"iconName": "Lightbulb", "title": "Service 5", "desc": "Description", "detail": "Detail · Detail · Detail"},
    {"iconName": "Layers", "title": "Service 6", "desc": "Description", "detail": "Detail · Detail · Detail"}
  ],
  "gallery": {
    "title": "Every project",
    "subtitle": "tells a story",
    "photos": [
      {"src": "/fotos/foto1.jpg", "alt": "description", "cat": "Category1", "span": "col-span-2 row-span-2"},
      {"src": "/fotos/foto2.jpg", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "/fotos/foto3.jpg", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "/fotos/foto4.jpg", "alt": "description", "cat": "Category2", "span": "col-span-2"},
      {"src": "/fotos/foto5.jpg", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "/fotos/foto6.jpg", "alt": "description", "cat": "Category2", "span": ""},
      {"src": "/fotos/foto7.jpg", "alt": "description", "cat": "Category1", "span": "col-span-2"},
      {"src": "/fotos/foto8.jpg", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "/fotos/foto9.jpg", "alt": "description", "cat": "Category3", "span": ""},
      {"src": "/fotos/foto10.jpg", "alt": "description", "cat": "Category3", "span": "col-span-2 row-span-2"},
      {"src": "/fotos/foto11.jpg", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "/fotos/foto12.jpg", "alt": "description", "cat": "Category3", "span": ""}
    ],
    "categories": ["All", "Category1", "Category2", "Category3"]
  },
  "whyUs": {
    "badge": "Why choose us",
    "title": "The difference is",
    "titleAccent": "in the details",
    "subtitle": "Years of experience have taught us exactly what makes a business stand out.",
    "features": [
      {"title": "Feature 1", "desc": "Description of benefit"},
      {"title": "Feature 2", "desc": "Description of benefit"},
      {"title": "Feature 3", "desc": "Description of benefit"},
      {"title": "Feature 4", "desc": "Description of benefit"},
      {"title": "Feature 5", "desc": "Description of benefit"},
      {"title": "Feature 6", "desc": "Description of benefit"}
    ],
    "statBadge": {"value": "+12%", "label": "Metric", "sublabel": "context"},
    "images": ["/fotos/foto13.jpg", "/fotos/foto17.jpg"]
  },
  "process": {
    "badge": "Process",
    "title": "It is",
    "titleAccent": "that simple",
    "subtitle": "From first contact to delivery in under 48 hours.",
    "steps": [
      {"title": "Step 1", "desc": "Description"},
      {"title": "Step 2", "desc": "Description"},
      {"title": "Step 3", "desc": "Description"},
      {"title": "Step 4", "desc": "Description"}
    ],
    "stripImages": ["/fotos/foto1.jpg", "/fotos/foto8.jpg", "/fotos/foto12.jpg", "/fotos/foto14.jpg"]
  },
  "testimonials": {
    "badge": "Testimonials",
    "title": "What our",
    "titleAccent": "clients say",
    "subtitle": "Hundreds of clients trust us for their projects.",
    "items": [
      {"name": "Name 1", "role": "Role · Company", "text": "Testimonial text.", "rating": 5, "initials": "N1"},
      {"name": "Name 2", "role": "Role · Company", "text": "Testimonial text.", "rating": 5, "initials": "N2"},
      {"name": "Name 3", "role": "Role · Company", "text": "Testimonial text.", "rating": 5, "initials": "N3"},
      {"name": "Name 4", "role": "Role · Company", "text": "Testimonial text.", "rating": 5, "initials": "N4"},
      {"name": "Name 5", "role": "Role · Company", "text": "Testimonial text.", "rating": 5, "initials": "N5"},
      {"name": "Name 6", "role": "Role · Company", "text": "Testimonial text.", "rating": 5, "initials": "N6"}
    ],
    "ratingValue": "4.9",
    "ratingCount": "200"
  },
  "contact": {
    "badge": "Contact",
    "title": "Ready to",
    "titleAccent": "get started?",
    "subtitle": "Tell us about your project and we will get back to you in under 2 hours.",
    "phone": "digits only",
    "email": "email@domain.com",
    "location": "City",
    "instagram": "@handle",
    "whatsapp": "countrycodephonenumber",
    "image": "/fotos/foto11.jpg"
  },
  "footer": {
    "description": "Short description of the business.",
    "services": ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5", "Service 6"],
    "areas": ["Area 1", "Area 2", "Area 3", "Area 4", "Area 5"],
    "tickerPhotos": ["/fotos/foto1.jpg", "/fotos/foto5.jpg", "/fotos/foto9.jpg", "/fotos/foto13.jpg", "/fotos/foto3.jpg", "/fotos/foto7.jpg", "/fotos/foto11.jpg", "/fotos/foto15.jpg"],
    "name": "Business Legal Name",
    "whatsapp": "countrycodephonenumber"
  }
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, images = [], primaryColor } = body as {
      prompt: string;
      images?: string[];
      primaryColor?: string;
    };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    // Generation is free — payment gates the editor after seeing the result

    const userContent: Anthropic.MessageParam["content"] = [];

    // Add uploaded images so Claude can see the brand/style
    for (const img of images.slice(0, 5)) {
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

    const colorHint = primaryColor
      ? ` Use "${primaryColor}" as the primary brand color.`
      : "";

    userContent.push({
      type: "text",
      text: `Generate a website configuration for this business:\n\n${prompt}${colorHint}\n\nReturn ONLY the JSON object, no markdown.`,
    });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      // No thinking — not needed for JSON generation and consumes output tokens
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    // Extract the text content
    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    // Clean up markdown fences
    let jsonText = textBlock.text.trim();
    jsonText = jsonText.replace(/^```json\n?/i, "").replace(/\n?```$/i, "").trim();
    // Extract outermost JSON object in case there's extra text
    const firstBrace = jsonText.indexOf("{");
    const lastBrace = jsonText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonText = jsonText.slice(firstBrace, lastBrace + 1);
    }

    let config: SiteConfig;
    try {
      config = JSON.parse(jsonText);
    } catch (parseErr) {
      // Attempt to repair common truncation issues
      const repaired = repairJson(jsonText);
      config = JSON.parse(repaired);
    }
    const id = randomUUID();
    config.id = id;

    saveConfig(id, config);

    return NextResponse.json({ id, config });
  } catch (err) {
    console.error("Generate error:", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
