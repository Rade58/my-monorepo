import db from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await db.todo.findUnique({ where: { id: params.id } });

  return NextResponse.json({ data });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await db.todo.delete({ where: { id: params.id } });

  return NextResponse.json({ data });
}
