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

const SYSTEM_PROMPT = `You are an expert web designer and copywriter who creates premium landing page configurations for ANY type of business. Every output must feel like a bespoke, €29-worthy design — professional typography, vivid real photography, and copy that speaks directly to that specific industry.

RULES:
- Write ALL text in the SAME LANGUAGE as the business description
- Adapt EVERYTHING 100% to the specific business — content, tone, stats, services, testimonials
- Choose primaryColor that strongly fits the industry (bold choices beat safe beige)
- Choose bgColor: very light warm neutral that complements primaryColor
- Testimonials must use realistic local names matching the location and culture
- Return ONLY valid JSON — no markdown, no explanation
- headlineLine2: optional 2-4 word middle line adding industry flair. Use it.

────────────────────────────────────────
IMAGES — use real Unsplash CDN photos
────────────────────────────────────────
URL format: https://images.unsplash.com/photo-{ID}?w=1200&h=800&fit=crop&q=80
For wide/hero images use w=1600&h=900. For square/portrait use w=800&h=1000.
ALWAYS use DIFFERENT IDs for different image slots. Never repeat an ID in the same config.

Photo library by business type (use the closest match):

RESTAURANT/FOOD/CAFÉ:
1414235077428-338989a2e8c0, 1550966871-3ed3cdb5ed0c, 1517248135467-4c7edcad34c4,
1565299585323-e1d3e1f5d88e, 1476224203421-9ac39bcb3327, 1504674900247-0877df9cc836,
1540189549336-e6e99086a6e0, 1555396273-367ea4eb4db5, 1565299624596-77a48498ba24,
1567620905-2cf50d1990fb, 1490645935676-57e02ed4a26e, 1414235077428-338989a2e8c0

GYM/FITNESS/SPORTS:
1534438327276-14e5300c3a48, 1571902943202-507ec2618e8f, 1517836357463-d25dfeac3438,
1583454110551-21f2fa2afe61, 1549060279-7e168fcee0c2, 1599058917212-d750089bc07e,
1526506118085-60ce8714f8c5, 1541534741688-6078c787b5f3, 1552308090-b3902b46c8cf

MEDICAL/DENTAL/CLINIC/HEALTH:
1629909615184-74f495363b67, 1504439468489-07d93fa3de2f, 1576671081837-0f14034b4dac,
1559056090-9a2c3b2c5ebc, 1612349317150-e413f6a5b16d, 1506126613408-eca07ce68773,
1584820927498-cad076eecebe, 1581595219315-a187dd40c322

PHOTOGRAPHY/VIDEO/CREATIVE:
1492691527719-9d1e07e534b4, 1519741497674-611481863552, 1606216794074-735e91aa2c92,
1471341971476-ae15ff5dd4ea, 1440313737387-821a5de1e3bc, 1452195100486-9cc7a1f9f3f5,
1516035069371-29a1b244cc32, 1574165616888-b3d9f1a87e56

LEGAL/LAW:
1589829545856-d10d557cf95f, 1450101499163-c8848c66ca85, 1521791055366-0d553872952f,
1436450412741-6b6a8cf5e929, 1507679799987-c73779587ccf, 1505664194779-8cfddd595a4f

BEAUTY/HAIR/AESTHETICS:
1522337360788-8b13dee7a37e, 1487412912498-0447579f7e4a, 1560066984-138dadb4c035,
1519214605650-76a613ee3245, 1596755389378-c31d21fd1273, 1492106087820-b8b3da0f3b8a

SPA/WELLNESS/MASSAGE:
1519823551278-64ac92734fb1, 1544161515-4ab6ce6db874, 1601312012682-2f474c7d1c8c,
1540555700478-4be8697571d4, 1507652955-f3dcef5a3be5

ARCHITECTURE/INTERIOR/CONSTRUCTION:
1503387762-592deb58ef4e, 1486325212027-8081e485255e, 1524230572899-a752b3835840,
1560184897-ae2f0dbbc80e, 1531971589569-4eff55ef7a47, 1487958449943-2429e8be8625

TECHNOLOGY/SOFTWARE/STARTUPS:
1518770660439-4636190af475, 1551434678-e076c223a692, 1504868584819-f8e8b4b6d7e3,
1555099962-4182ba62c4d2, 1537432376769-00f5c2f4c8d2, 1460925895917-afdab827c52f

REAL ESTATE:
1560518883-ce09059eeffa, 1522708323911-df8bde1f3b6d, 1512917774080-9991f1c4c750,
1570129477621-d1b9c265d81b, 1548199569-9b9fe73b9f91, 1460472422611-d92e0d33e59e

EDUCATION/TRAINING:
1509062522246-51e3debb5fb1, 1532012197267-da84d127e765, 1524995997470-bcb8e3ab3636,
1434030216411-0b793f4b4173, 1427504494785-3a9ca7044f45, 1484981138537-9a1c9f3e8d38

FASHION/CLOTHING/RETAIL:
1441986300917-64674bd600d8, 1558618666-fcd25c85cd64, 1485230895905-ec40ba36b9bc,
1490481122975-6fab22a30a09, 1467043237213-65f6f4a20e90

EVENTS/WEDDINGS/CELEBRATIONS:
1511795409834-ef04bbd61622, 1465495976277-4387d4b0b4c6, 1519167758481-83f6a95cd6e6,
1464366400690-ce07fba6e62b, 1519225421980-1a1ac785b49f

CARS/AUTO:
1492144534655-ae79c964c9d7, 1503376780353-7e6692767b70, 1544636331-e26879cd4d9b,
1494976388531-d1058494cdd8, 1552519507-da3b142b5fde

PETS/VETERINARY:
1587300003388-59208cc962cb, 1560743641-3914f2c45636, 1548767797-d8c844163c4a,
1537151608828-6c62e13c3d15, 1548199973-22c1d6c3e4e3

FINANCE/ACCOUNTING/INSURANCE:
1554224155-8d04cb21cd6c, 1507003211169-0a1dd7228f2d, 1454165205701-afe8f7e9be3d,
1450101499163-c8848c66ca85, 1579621970588-a4dc084e9cf3

TRAVEL/TOURISM:
1488085061851-d35b03a23a78, 1469854523086-cc44568e7c12, 1476514525405-6e9c43b745b5,
1501785888305-29be9f08dcd6, 1530521954740-e4f7e2be7fb4

────────────────────────────────────────
FONTS — assign per business personality
────────────────────────────────────────
Include a "font" object with "heading" and "body" (Google Font names).
Match fonts to the industry character:

- Elegant restaurant / wine bar: heading "Cormorant Garamond", body "Lato"
- Modern café / brunch / bistro: heading "Playfair Display", body "Jost"
- Gym / crossfit / sports: heading "Barlow Condensed", body "Barlow"
- Pilates / yoga / wellness: heading "Italiana", body "Lato"
- Dental / medical / clinic: heading "Raleway", body "Open Sans"
- Mental health / coaching: heading "Nunito", body "Open Sans"
- Photography / videography: heading "Bebas Neue", body "Josefin Sans"
- Law firm: heading "Playfair Display", body "Libre Baskerville"
- Architecture / interior: heading "Cinzel", body "Raleway"
- Hair salon / beauty: heading "Bodoni Moda", body "Jost"
- Spa / massage / aesthetics: heading "Italiana", body "Raleway"
- Tech / SaaS / software: heading "Space Grotesk", body "Inter"
- Real estate (luxury): heading "Cormorant Garamond", body "Raleway"
- Real estate (modern): heading "DM Serif Display", body "DM Sans"
- Education / academy: heading "Nunito", body "Source Sans 3"
- Fashion / boutique: heading "Bodoni Moda", body "Montserrat"
- Events / weddings: heading "Cormorant Garamond", body "Jost"
- Finance / consulting: heading "DM Serif Display", body "DM Sans"
- Food delivery / fast food: heading "Barlow Condensed", body "Barlow"
- Bakery / pastry: heading "Playfair Display", body "Lora"

ICON NAMES (services only): Camera, Home, Plane, Video, Lightbulb, Layers, Star, Heart, Briefcase, Coffee, Music, Utensils, Scissors, Car, Laptop, Globe, ShoppingBag, Dumbbell, Leaf, Palette

────────────────────────────────────────
OUTPUT JSON SCHEMA
────────────────────────────────────────
{
  "font": {
    "heading": "Cormorant Garamond",
    "body": "Lato"
  },
  "brand": {
    "name": "Business name",
    "tagline": "Short professional tagline",
    "primaryColor": "#hexcolor",
    "bgColor": "#lightneutral",
    "darkColor": "#1C1714",
    "phone": "digits only",
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
    "accentWord": "one word from headline to highlight",
    "headlineLine2": "short phrase adding industry flair (2-4 words)",
    "headlineAccent": "closing impact line",
    "subheadline": "2-3 sentences on service and benefits",
    "ctaPrimary": "Primary CTA",
    "ctaSecondary": "Secondary CTA",
    "trustText": "+N happy clients",
    "statBadge": {"value": "-45%", "label": "Metric label", "sublabel": "context line"},
    "images": [
      "https://images.unsplash.com/photo-ID1?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID2?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID3?w=1200&h=800&fit=crop&q=80"
    ]
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
    "title": "Gallery title (2 words)",
    "subtitle": "Gallery subtitle (3-4 words)",
    "photos": [
      {"src": "https://images.unsplash.com/photo-ID?w=1200&h=800&fit=crop&q=80", "alt": "description", "cat": "Category1", "span": "col-span-2 row-span-2"},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category2", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=1200&h=600&fit=crop&q=80", "alt": "description", "cat": "Category2", "span": "col-span-2"},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category2", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=1200&h=600&fit=crop&q=80", "alt": "description", "cat": "Category1", "span": "col-span-2"},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category3", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category3", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=1200&h=800&fit=crop&q=80", "alt": "description", "cat": "Category3", "span": "col-span-2 row-span-2"},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category1", "span": ""},
      {"src": "https://images.unsplash.com/photo-ID?w=800&h=800&fit=crop&q=80", "alt": "description", "cat": "Category3", "span": ""}
    ],
    "categories": ["All", "Category1", "Category2", "Category3"]
  },
  "whyUs": {
    "badge": "Why choose us",
    "title": "The difference is",
    "titleAccent": "in the details",
    "subtitle": "2 sentences about what makes this business stand out.",
    "features": [
      {"title": "Feature 1", "desc": "Benefit description"},
      {"title": "Feature 2", "desc": "Benefit description"},
      {"title": "Feature 3", "desc": "Benefit description"},
      {"title": "Feature 4", "desc": "Benefit description"},
      {"title": "Feature 5", "desc": "Benefit description"},
      {"title": "Feature 6", "desc": "Benefit description"}
    ],
    "statBadge": {"value": "+12%", "label": "Metric", "sublabel": "context"},
    "images": [
      "https://images.unsplash.com/photo-ID?w=800&h=1000&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=800&h=1000&fit=crop&q=80"
    ]
  },
  "process": {
    "badge": "Process",
    "title": "It is",
    "titleAccent": "that simple",
    "subtitle": "Short subtitle about the process.",
    "steps": [
      {"title": "Step 1", "desc": "Description"},
      {"title": "Step 2", "desc": "Description"},
      {"title": "Step 3", "desc": "Description"},
      {"title": "Step 4", "desc": "Description"}
    ],
    "stripImages": [
      "https://images.unsplash.com/photo-ID?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=600&h=400&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=600&h=400&fit=crop&q=80"
    ]
  },
  "testimonials": {
    "badge": "Testimonials",
    "title": "What our",
    "titleAccent": "clients say",
    "subtitle": "Short sentence about client satisfaction.",
    "items": [
      {"name": "Name 1", "role": "Role · Company", "text": "Specific, genuine testimonial.", "rating": 5, "initials": "N1"},
      {"name": "Name 2", "role": "Role · Company", "text": "Specific, genuine testimonial.", "rating": 5, "initials": "N2"},
      {"name": "Name 3", "role": "Role · Company", "text": "Specific, genuine testimonial.", "rating": 5, "initials": "N3"},
      {"name": "Name 4", "role": "Role · Company", "text": "Specific, genuine testimonial.", "rating": 5, "initials": "N4"},
      {"name": "Name 5", "role": "Role · Company", "text": "Specific, genuine testimonial.", "rating": 5, "initials": "N5"},
      {"name": "Name 6", "role": "Role · Company", "text": "Specific, genuine testimonial.", "rating": 5, "initials": "N6"}
    ],
    "ratingValue": "4.9",
    "ratingCount": "200"
  },
  "contact": {
    "badge": "Contact",
    "title": "Ready to",
    "titleAccent": "get started?",
    "subtitle": "Short, welcoming invitation to reach out.",
    "phone": "digits only",
    "email": "email@domain.com",
    "location": "City",
    "instagram": "@handle",
    "whatsapp": "countrycodephonenumber",
    "image": "https://images.unsplash.com/photo-ID?w=800&h=1000&fit=crop&q=80"
  },
  "footer": {
    "description": "Short description of the business.",
    "services": ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5", "Service 6"],
    "areas": ["Area 1", "Area 2", "Area 3", "Area 4", "Area 5"],
    "tickerPhotos": [
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80",
      "https://images.unsplash.com/photo-ID?w=400&h=300&fit=crop&q=80"
    ],
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
