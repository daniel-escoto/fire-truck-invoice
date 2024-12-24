import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { link } = await req.json();

  if (!link) {
    return NextResponse.json({ message: "Link is required" }, { status: 400 });
  }

  // Simulate an API call (replace this with real backend integration)
  return NextResponse.json({
    message: `Link received: ${link}`,
  });
}
