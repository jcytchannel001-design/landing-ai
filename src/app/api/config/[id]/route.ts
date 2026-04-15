import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/configStore";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const config = getConfig(id);
  if (!config) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ config });
}
