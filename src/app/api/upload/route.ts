import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploaded: string[] = [];

    for (const file of files.slice(0, 10)) {
      if (!file.type.startsWith("image/")) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filename = `${randomUUID()}.${ext}`;
      const uploadDir = join(process.cwd(), "public", "uploads");
      await writeFile(join(uploadDir, filename), buffer);
      uploaded.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ urls: uploaded });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
