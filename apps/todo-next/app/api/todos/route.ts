import db from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const data = await db.todo.findMany();

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  const data = await db.todo.create({
    data: {
      content,
    },
  });

  return NextResponse.json({ data });
}
