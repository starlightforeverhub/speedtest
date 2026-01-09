import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  // We don't need to do anything with the request body.
  // The client is just sending data to measure upload speed.
  return NextResponse.json({ success: true });
}
