import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ valid: false });

  if (!process.env.STRIPE_SECRET_KEY) {
    // Dev mode: allow any non-empty token
    return NextResponse.json({ valid: true });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({ valid: session.payment_status === "paid" });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
