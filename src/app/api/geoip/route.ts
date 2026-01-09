import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '8.8.8.8'; // Use a default for local dev
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();
  return NextResponse.json(data);
}
