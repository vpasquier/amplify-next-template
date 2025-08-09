import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { a, b } = await request.json();
  const result = Number(a) + Number(b);
  return NextResponse.json({ result });
}
