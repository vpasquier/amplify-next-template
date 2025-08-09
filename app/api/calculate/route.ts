import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { a, b } = await request.json();
  const result = Number(a) + Number(b);
  return NextResponse.json({ result });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  return NextResponse.json({ message: `Hello, ${name}!` });
}
